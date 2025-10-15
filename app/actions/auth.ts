"use client"

import { signIn, signOut } from "next-auth/react"

export async function signInWithGoogle() {
  try {
    await signIn("google", { callbackUrl: "/dashboard" })
  } catch (error) {
    console.error("Google sign-in error:", error)
    throw error
  }
}

export async function signOutAction() {
  try {
    await signOut({ callbackUrl: "/" })
  } catch (error) {
    console.error("Sign-out error:", error)
    throw error
  }
}
