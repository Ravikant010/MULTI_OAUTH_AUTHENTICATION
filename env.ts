import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXT_AUTH_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GITHUB_ACCESSTOKEN: z.string(),
    TWITTER_API: z.string(),
    TWITTER_SECRET: z.string(),
    TWITTER_CLIENT_ID: z.string(),
    TWITTER_SECRET_TOKEN: z.string(),
    TWITTER_BEARER_TOKEN: z.string()
  },
  client: {
    // Define any client-side environment variables here if needed
  },
  runtimeEnv: {
    GITHUB_ACCESSTOKEN: process.env.GITHUB_ACCESSTOKEN,
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    TWITTER_API: process.env.TWITTER_API,
    TWITTER_SECRET: process.env.TWITTER_SECRET,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_SECRET_TOKEN: process.env.TWITTER_SECRET_TOKEN,
    TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN
  },
});
