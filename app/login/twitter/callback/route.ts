import { twitter, lucia } from "@/auth/auth"; // Import your twitter OAuth setup
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic"; // Handle OAuth2 request errors
import { generateIdFromEntropySize } from "lucia"; // For generating user IDs
import { database } from "@/db/db"; // Database setup
import { oauth_account, userTable } from "@/db/schema"; // Your schema definitions
import { eq } from "drizzle-orm"; // Query builder
import { env } from "@/env"; // Environment variables
import { codeVerifier } from "../route";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("twitter_oauth_state")?.value ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        // Step 1: Validate the authorization code and get tokens
        const tokens = await twitter.validateAuthorizationCode(code, codeVerifier);

        // Step 2: Fetch user data from twitter API
        const twitterUserResponse = await fetch("https://api.twitter.com/2/users/me", {
            headers: {
                Authorization: `Bearer ${env.TWITTER_BEARER_TOKEN}`
            }
        });

        if (!twitterUserResponse.ok) {
            const errorText = await twitterUserResponse.text();
            throw new Error(`Error fetching user data: ${errorText}`);
        }

        const twitterUser: twitterUser = await twitterUserResponse.json();
        console.log(twitterUser, "User Data");

        // Step 3: Fetch user emails (if needed, twitter's userinfo already has email)
        const userEmail = twitterUser.email; // Get the email directly from the user data

        // Step 4: Check if the user exists in the database
        const [existingUser] = await database.select().from(oauth_account).where(eq(oauth_account.provider_id, twitterUser.sub));
        if (existingUser) {
            console.log(twitterUser.name, twitterUser.sub, twitterUser, "User already exists");
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

        // Step 5: Create a new user if they don't exist
        const userId = generateIdFromEntropySize(10); // Generate a new user ID

        const [user] = await database.insert(userTable).values({
            username: twitterUser.name,
            email: userEmail || "demo@gmail.com" // Fallback email
        }).returning();

        // Step 6: Insert the OAuth account information
        await database.insert(oauth_account).values({
            provider_id: twitterUser.sub,
            username: twitterUser.name,
            userId: user.id
        });

        // Step 7: Create a session for the new user
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
        console.log(e);
        // Handle errors appropriately
        if (e instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400
            });
        }
        return new Response(null, {
            status: 500
        });
    }
}

// Define the interface for twitter user data
interface twitterUser {
    sub: string; // twitter ID
    name: string; // User's name
    email: string; // User's email
}
