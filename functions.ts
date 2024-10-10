"use server"
import crypto from "crypto"
import { database } from "./db/db"
import { userTable } from "./db/schema"
import { eq } from "drizzle-orm"
const ITERATIONS = 10000
export const hashPassword = (plainTextPassword: string, salt: string) => {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(
            plainTextPassword,
            salt,
            ITERATIONS,
            64,
            "sha512",
            (err, derivedKey) => {
                if (err)
                    reject(err)
                resolve(derivedKey.toString('hex'))
            }
        )
    })
}



export  const getUser = async (id:number)=>{
    const [user] =await database.select().from(userTable).where(eq(userTable.id, id))
    return user
}

