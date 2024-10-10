"use server"
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { lucia } from "./auth";
import { database } from "@/db/db";
import { userTable } from "@/db/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import crypto from "crypto"
import { hashPassword } from "@/functions";
export async function signup(formData: FormData) {
	try {
		const username = formData.get("username");
		const email  = formData.get("email")
		// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
		// keep in mind some database (e.g. mysql) are case insensitive
		if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			console.log("Invalid username")
			return {
				error: "Invalid username"
			};
		}
		const password = formData.get("password");
		if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			console.log("Invalid password")
			return {
				error: "Invalid password"
			};
		}
		// const userId = generateIdFromEntropySize(10); // 16 characters long
		const salt = generateIdFromEntropySize(10)
	const [user] = await database.insert(userTable).values({
			email: email as string,  // Ensure email is defined and passed
			username: username as string, // Use undefined if username is null
			password_hash: await hashPassword(password, salt),
			salt
		}).returning()
		console.log(user)
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return true
	} catch (error) {
		console.log(error)
		return {
			error: "An error occurred during signup"
		};
	}
}