import { github, lucia } from "@/auth/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { database } from "@/db/db";
import { oauth_account, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { env } from "@/env";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		
		if (!githubUserResponse.ok) {
			const errorText = await githubUserResponse.text();
			throw new Error(`Error fetching user data: ${errorText}`);
		}
		
		const githubUser:GitHubUser = await githubUserResponse.json();
		console.log(githubUser, "User Data");
		
		const githubUserEmailResponse = await fetch("https://api.github.com/user/emails", {
			headers: {
				Authorization: `Bearer ${env.GITHUB_ACCESSTOKEN}`
			}
		});
		
		if (!githubUserEmailResponse.ok) {
			const errorText = await githubUserEmailResponse.text();
			throw new Error(`Error fetching user emails: ${errorText}`);
		}
		
		const githubUserEmail = await githubUserEmailResponse.json();
		console.log(githubUserEmail, "User Emails");
		
	
	
		const [existingUser] = await database.select().from(oauth_account).where(eq(oauth_account.provider_id ,githubUser.id ))
		if (existingUser) {
            console.log(githubUser.login,githubUser.id ,githubUser,"loginlogin")
			const session = await lucia.createSession(existingUser.userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/"
				}
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		// Replace this with your own DB client.
//    await database.insert(userTable).values({
// 	username: githubUser.login,
// 	email: 
//    })
const [user] = await database.insert(userTable).values({
	username: githubUser.login,
	email: githubUserEmail.find((email:any) => email.primary === true).email || "demo@gmail.com"

}).returning()

		await database.insert(oauth_account).values({
			provider_id: githubUser.id,
            username: githubUser.login,
			userId: user.id
		});

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
        console.log(e)
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GitHubUser {
	id: string;
	login: string;
}