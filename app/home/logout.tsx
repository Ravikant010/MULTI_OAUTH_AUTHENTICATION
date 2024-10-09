"use client"
import { SignOut } from './action'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function Logout() {
    async function  handleLogout(){
        await SignOut()
   }

  return (
     <Button onClick={async ()=>await handleLogout()}>Logout</Button>
  )
}