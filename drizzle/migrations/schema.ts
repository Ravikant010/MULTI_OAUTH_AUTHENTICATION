import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const user = pgTable("user", {
	id: text().primaryKey().notNull(),
});

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});