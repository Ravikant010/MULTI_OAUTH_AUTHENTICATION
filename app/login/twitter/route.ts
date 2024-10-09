import { generateState } from "arctic";
import { twitter } from "@/auth/auth"; // Import your Google OAuth setup
import { cookies } from "next/headers";

export const codeVerifier = "35027cd8e5cba2ac8d09dae36dfad1c60ecb5c41b27e13aade634b7ccb6318de"; // Static code verifier, consider generating this dynamically for security

export async function GET(): Promise<Response> {
    const state = generateState(); // Generate a random state to protect against CSRF attacks

    // Create the authorization URL with specified scopes
    const url: URL = await twitter.createAuthorizationURL(state, codeVerifier, {
        scopes: ["users.read", "tweet.read"], // Include desired scopes, "openid" is always included by default
    });

    // Store the state in cookies to validate it later
    cookies().set("twitter_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production", // Ensure cookie is secure in production
        httpOnly: true, // Prevent JavaScript access to cookies
        maxAge: 60 * 10, // Cookie expiration in seconds (10 minutes)
        sameSite: "lax" // CSRF protection
    });

    // Redirect to the generated authorization URL
    return Response.redirect(url);
}
