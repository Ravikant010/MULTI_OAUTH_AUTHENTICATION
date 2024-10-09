import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import pg from "pg";
import { integer, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";

export const userTable = pgTable("user", {
	id: serial("id").primaryKey(),
    username: text("name").unique(),
    password_hash: text("password"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
	salt: text("salt")
});

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => userTable.id,{ onDelete: 'cascade' }),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export const oauth_account = pgTable("oauth_account", {
	provider_id: text("provider_id").primaryKey(),
	username: text("username").notNull(),
	// provider_user_id: text("provider_user_id").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => userTable.id,{ onDelete: 'cascade' }),
})
export type User = typeof   userTable.$inferSelect
export type Session = typeof sessionTable.$inferSelect


// CREATE TABLE oauth_account (
//     provider_id TEXT NOT NULL,
//     provider_user_id TEXT NOT NULL,
//     user_id TEXT NOT NULL,
//     PRIMARY KEY (provider_id, provider_user_id),
//     FOREIGN KEY (user_id) REFERENCES user(id)
// );