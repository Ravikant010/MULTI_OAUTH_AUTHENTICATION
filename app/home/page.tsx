"use server"
import { validateRequest } from '@/auth/auth'

import { Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import React from 'react'
import Logout from './logout'

type Props = {}



export default async function page({}: Props) {
    const {user} = await validateRequest()

    if(!user)
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Authentication Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You are not authenticated. Redirecting to the login page.</p>
                    <p>Click below to go home.</p>
                    <Link href={"/"}><Button>Home</Button></Link>
                </CardContent>
            </Card>
        )
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome to HomePage</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Welcome to the home page.</p>
            <Logout />
            </CardContent>
        </Card>
    )
}