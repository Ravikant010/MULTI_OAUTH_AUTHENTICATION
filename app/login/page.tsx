'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'; // Import useForm
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Login } from '@/auth/login'

// Define the Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

// Infer the type from the schema
type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Use zodResolver for validation
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    console.log(getValues())
    try {
      await Login(getValues());
      console.log('Login attempt with:', formData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                {...register("email")} // Register the input
                type="email" 
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                {...register("password")} // Register the input
                type="password" 
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit">Log in</Button>
        </CardFooter>
      </form>
    </Card>
  )
}