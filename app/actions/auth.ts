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
    // Clear college student data from localStorage on logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_data')
      localStorage.removeItem('student_token')
    }

    await signOut({ callbackUrl: "/" })
  } catch (error) {
    console.error("Sign-out error:", error)
    throw error
  }
}
