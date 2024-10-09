"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {isAuth: boolean}

export default function Redirect({isAuth}: Props) {
    const router = useRouter()

    useEffect(() => {
      if (!isAuth) {
        router.push('/login')
      }
    }, [isAuth, router])
  
    if (!isAuth) 
  return (
    <div>redirect</div>
  )
}