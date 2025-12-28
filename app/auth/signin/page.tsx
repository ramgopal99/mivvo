"use client"

import { Suspense, useEffect } from "react"
import { AuthLayout } from "../_components/auth-layout"
import { SignInForm } from "../_components/signin-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

function SignInContent() {
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
      title="Sign In To Your Account"
      subtitle="Sign in with your Google account to get started."
      showSignUp={true}
      showSignIn={false}
    >
      <SignInForm />
    </AuthLayout>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <AuthLayout
        title="Sign In To Your Account"
        subtitle="Sign in with your Google account to get started."
        showSignUp={true}
        showSignIn={false}
      >
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md"></div>
          </div>
          <div className="text-center text-sm text-gray-500">
            Loading sign in form...
          </div>
        </div>
      </AuthLayout>
    }>
      <SignInContent />
    </Suspense>
  )
}
