import { env } from "@/env";
import * as schema from "./schema"

import {PostgresJsDatabase, drizzle} from "drizzle-orm/postgres-js"
import postgres from "postgres";

let database:PostgresJsDatabase<typeof schema>;
let pg:ReturnType<typeof postgres>;

export const initialDatabase = ()=>{
    if(!pg)
    {
        pg = postgres(env.DATABASE_URL);
        database = drizzle(pg, {schema});
    }
    return database;
}
export const getDatabase  = ()=>{
        if(!database)
        {
            throw new Error("Database not initialized")
        }
        return database;
    }
    initialDatabase()
    getDatabase()
export {database, pg}

// import { env } from "@/env";
// import * as schema from "./schema";
// import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// declare global {
//   // eslint-disable-next-line no-var -- only var works here
//   var database: PostgresJsDatabase<typeof schema> | undefined;
// }
// let database: PostgresJsDatabase<typeof schema>;
// let pg: ReturnType<typeof postgres>;

// if (env.NODE_ENV === "production") {
//   pg = postgres(env.DATABASE_URL);
//   database = drizzle(pg, { schema });
// } else {
//   if (!global.database) {
//     pg = postgres(env.DATABASE_URL, {max: 1});
//     global.database = drizzle(pg, { schema });
//   }
//   database = global.database;
// }

// export {database,pg};