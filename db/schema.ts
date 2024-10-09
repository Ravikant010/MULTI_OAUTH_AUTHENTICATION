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


export type User = typeof   userTable.$inferSelect
export type Session = typeof sessionTable.$inferSelect