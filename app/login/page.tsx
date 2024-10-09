import React from 'react'
import LoginForm from './form'
import { validateRequest } from '@/auth/auth'
import { redirect } from 'next/navigation'
type Props = {}

export default async   function page({}: Props) {
  const {user} = await validateRequest()
  if(user)
    redirect("/home")
  return (
    <div><LoginForm/></div>
  )
}