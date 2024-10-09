import dotenv from "dotenv"
dotenv.config()

import  { defineConfig } from "drizzle-kit";
import { env } from "./env";
console.log(process.env)
export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL
  },
}) 