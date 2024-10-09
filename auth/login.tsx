"use server"
import { database } from "@/db/db"
import { lucia, validateRequest } from "./auth"
import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { hashPassword } from "@/functions"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function Login({email, password}:{
    email: string,
    password: string
}) {
    console.log(email,password)
    const {user} = await validateRequest()
    if(email && password)
    {
            const [isUser] = await database.select().from(userTable).where(eq(userTable.email,email))
            if(isUser)
      if(isUser.password_hash == await hashPassword(password, isUser.salt as string)){
        const session = await lucia.createSession(isUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            redirect("/home")
      }
      else{
        console.log("does not match")
      }
            
    }
}