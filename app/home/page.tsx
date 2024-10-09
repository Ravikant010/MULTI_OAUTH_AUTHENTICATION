'use server'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Logout from './logout'
import { validateRequest } from '@/auth/auth'
import Redirect from './redirect'
import { getUser } from '@/functions'

export default async function HomePage() {
  const { user } = await validateRequest()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>You need to be logged in to view this page.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-center text-sm text-gray-500">Redirecting to the login page...</p>
            <Redirect isAuth={false} />
          </CardContent>
        </Card>
      </div>
    )
  }


  const userData = await getUser(user.id)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome {userData.username}!</CardTitle>
          <CardDescription>Here's your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-lg">{userData.email}</span>
          </div>
          <div className="pt-4">
            <Logout />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}