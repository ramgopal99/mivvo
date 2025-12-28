"use client"

import { useEffect } from "react"
import { AuthLayout } from "../_components/auth-layout"
import { SignUpForm } from "../_components/signup-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const { data: session } = useSession()
  const router = useRouter()

  // Check authentication status and redirect if already logged in
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Check NextAuth session first
      if (session?.user) {
        router.push('/dashboard')
        return
      }

      // Check for college student token
      const studentToken = localStorage.getItem('student_token')
      if (studentToken) {
        try {
          const response = await fetch('/api/auth/session', {
            headers: {
              'Authorization': `Bearer ${studentToken}`
            }
          })
          if (response.ok) {
            router.push('/dashboard')
            return
          }
        } catch (error) {
          console.error('Error checking student auth:', error)
        }
      }

      // Check for college admin token
      const adminToken = localStorage.getItem('college_token')
      if (adminToken) {
        try {
          const response = await fetch('/api/auth/session', {
            headers: {
              'Authorization': `Bearer ${adminToken}`
            }
          })
          if (response.ok) {
            router.push('/college/dashboard')
            return
          }
        } catch (error) {
          console.error('Error checking admin auth:', error)
        }
      }
    }

    checkAuthAndRedirect()
  }, [session, router])
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Sign up with your Google account to join Mivvo."
      showSignUp={false}
      showSignIn={true}
    >
      <SignUpForm />
    </AuthLayout>
  )
}
