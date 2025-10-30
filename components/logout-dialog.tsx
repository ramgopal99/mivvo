"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react"

interface LogoutDialogProps {
  children: React.ReactNode
}

export function LogoutDialog({ children }: LogoutDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // Step 1: Call logout API to log server-side
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Step 2: Clear all localStorage data
      localStorage.removeItem('user_data')
      localStorage.removeItem('student_token')
      localStorage.removeItem('college_data')
      localStorage.removeItem('college_token')
      localStorage.removeItem('token')

      // Clear NextAuth session tokens
      localStorage.removeItem('next-auth.session-token')
      localStorage.removeItem('__Secure-next-auth.session-token')
      localStorage.removeItem('next-auth.callback-url')
      localStorage.removeItem('next-auth.csrf-token')
      localStorage.removeItem('__Secure-next-auth.callback-url')

      // Clear any college specific data
      localStorage.removeItem('college_student_data')

      // Step 3: Clear all sessionStorage
      sessionStorage.clear()

      // Step 4: Clear any cookies related to authentication
      // This will be handled by NextAuth signOut

      // Step 5: Sign out from NextAuth (clears server session and cookies)
      await signOut({
        redirect: false, // We'll handle redirect manually
        callbackUrl: '/auth/signin'
      })

      // Step 6: Force redirect to ensure clean state
      console.log('Logout completed successfully - redirecting to login')
      window.location.href = '/auth/signin'

    } catch (error) {
      console.error("Logout failed:", error)

      // Even if logout fails, clear everything and redirect
      try {
        localStorage.clear()
        sessionStorage.clear()
        await signOut({ redirect: false })
      } catch (signOutError) {
        console.error("Emergency logout failed:", signOutError)
      }

      window.location.href = '/auth/signin'
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Sign Out
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out of your account? You&apos;ll need to sign in again to access your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isLoading}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isLoading ? "Signing out..." : "Sign Out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
