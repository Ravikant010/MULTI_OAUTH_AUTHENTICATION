import {createEnv} from "@t3-oss/env-nextjs"
import {z} from "zod"

export const env  = createEnv({

    server: {
        DATABASE_URL : z.string().url(),
        NODE_ENV: z.string().min(1),
        GOOGLE_CLIENT_ID: z.string(),
        GOOGLE_CLIENT_SECRET: z.string(),
        NEXT_AUTH_SECRET: z.string()
            },
            client: {
        
            },
            runtimeEnv: {
        NODE_ENV:   process.env.NODE_ENV,
        DATABASE_URL : process.env.DATABASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
        ,NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET!,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
        
            }
})