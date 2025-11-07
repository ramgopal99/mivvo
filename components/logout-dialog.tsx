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

      // Step 2: Clear all localStorage data comprehensively
      // College student/admin data
      localStorage.removeItem('user_data')
      localStorage.removeItem('student_token')
      localStorage.removeItem('college_data')
      localStorage.removeItem('college_token')
      localStorage.removeItem('token')
      localStorage.removeItem('college_student_data')

      // NextAuth session tokens
      localStorage.removeItem('next-auth.session-token')
      localStorage.removeItem('__Secure-next-auth.session-token')
      localStorage.removeItem('next-auth.callback-url')
      localStorage.removeItem('next-auth.csrf-token')
      localStorage.removeItem('__Secure-next-auth.callback-url')

      // Clear any potential leftover keys
      const keysToRemove = [
        'sidebar_state',
        'interviewTranscript',
        'interviewMessages',
        'temp_data',
        'cache_data'
      ]
      keysToRemove.forEach(key => localStorage.removeItem(key))

      // Step 3: Clear all sessionStorage
      sessionStorage.clear()

      // Step 4: Clear sidebar cookie
      document.cookie = 'sidebar_state=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

      // Step 5: Clear any IndexedDB databases (for college data)
      try {
        if (window.indexedDB) {
          // Clear any college-related IndexedDB databases
          const dbNames = ['college-cache', 'student-data', 'interview-cache']
          for (const dbName of dbNames) {
            const deleteRequest = window.indexedDB.deleteDatabase(dbName)
            deleteRequest.onsuccess = () => console.log(`Cleared IndexedDB: ${dbName}`)
            deleteRequest.onerror = () => console.log(`Failed to clear IndexedDB: ${dbName}`)
          }
        }
      } catch (error) {
        console.log('IndexedDB cleanup skipped:', error)
      }

      // Step 6: Clear service worker caches
      try {
        if ('caches' in window) {
          const cacheNames = await caches.keys()
          await Promise.all(
            cacheNames.map(cacheName => {
              if (cacheName.includes('college') || cacheName.includes('interview')) {
                console.log(`Clearing cache: ${cacheName}`)
                return caches.delete(cacheName)
              }
              return Promise.resolve()
            })
          )
        }
      } catch (error) {
        console.log('Cache cleanup skipped:', error)
      }

      // Step 7: Sign out from NextAuth (clears server session and cookies)
      await signOut({
        redirect: false, // We'll handle redirect manually
        callbackUrl: '/auth/signin'
      })

      // Step 8: Force redirect to ensure clean state
      console.log('Logout completed successfully - all storage cleared')
      window.location.href = '/auth/signin'

    } catch (error) {
      console.error("Logout failed:", error)

      // Emergency cleanup: clear everything we can
      try {
        localStorage.clear()
        sessionStorage.clear()
        document.cookie = 'sidebar_state=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

        // Clear NextAuth cookies
        const nextAuthCookies = [
          'next-auth.session-token',
          '__Secure-next-auth.session-token',
          'next-auth.csrf-token'
        ]
        nextAuthCookies.forEach(cookieName => {
          document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
        })

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
