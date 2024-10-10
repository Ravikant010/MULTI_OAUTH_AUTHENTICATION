import { generateState } from "arctic";
import { google } from "@/auth/auth"; // Import your Google OAuth setup
import { cookies } from "next/headers";
import { codeVerifier } from "@/auth/auth";

 // Static code verifier, consider generating this dynamically for security

export async function GET(): Promise<Response> {
    const state = generateState(); // Generate a random state to protect against CSRF attacks

    // Create the authorization URL with specified scopes
    const url: URL = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"], // Include desired scopes, "openid" is always included by default
    });

    // Store the state in cookies to validate it later
    cookies().set("google_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production", // Ensure cookie is secure in production
        httpOnly: true, // Prevent JavaScript access to cookies
        maxAge: 60 * 10, // Cookie expiration in seconds (10 minutes)
        sameSite: "lax" // CSRF protection
    });

    // Redirect to the generated authorization URL
    return Response.redirect(url);
}
