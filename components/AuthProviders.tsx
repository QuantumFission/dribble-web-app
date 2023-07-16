'use client'

import React from 'react'
import Button from './Button'
import { signIn } from "next-auth/react";

export default function AuthProviders() {
  return (
    <div>
        <Button title='sign in' handleClick={() => signIn()} />
    </div>
  )
}
