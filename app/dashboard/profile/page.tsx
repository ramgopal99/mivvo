"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ProfileHeader, ProfileDetails } from "./_components"
import { UserRole } from "@prisma/client"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<{
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: UserRole
    college?: {
      id: string
      name: string
      collegeId: string
    }
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Always check session API first for comprehensive session validation
        const token = localStorage.getItem('student_token')
        if (token) {
          try {
            const response = await fetch('/api/auth/session', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })

            if (response.ok) {
              const sessionData = await response.json()
              if (sessionData.authenticated && sessionData.user) {
                // College student session is valid
                const collegeUser = {
                  id: sessionData.user.id,
                  name: sessionData.user.name,
                  email: sessionData.user.email,
                  image: null, // College students don't have images
                  role: UserRole.COLLEGE_STUDENT,
                  college: sessionData.user.collegeId ? {
                    id: sessionData.user.collegeId,
                    name: sessionData.user.collegeName,
                    collegeId: sessionData.user.collegeId
                  } : undefined
                }
                setUserData(collegeUser)
                setLoading(false)
                return
              }
            }
          } catch (error) {
            console.error('Error checking college student session:', error)
          }
        }

        // If no college student session, check NextAuth session
        if (status === 'authenticated' && session?.user) {
          // Use NextAuth session data
          setUserData({
            id: session.user.id || 'unknown',
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            role: UserRole.USER
          })
          setLoading(false)
          return
        }

        // Fallback to localStorage for backward compatibility
        if (status !== 'loading') {
          const storedUserData = localStorage.getItem('user_data')
          if (storedUserData) {
            try {
              const parsedUserData = JSON.parse(storedUserData)
              if (parsedUserData && parsedUserData.id) {
                // College student data (fallback)
                const collegeUser = {
                  id: parsedUserData.id,
                  name: parsedUserData.name,
                  email: parsedUserData.email,
                  image: null,
                  role: UserRole.COLLEGE_STUDENT,
                  college: parsedUserData.college
                }
                setUserData(collegeUser)
                setLoading(false)
                return
              }
            } catch (error) {
              console.error('Error parsing stored college student data:', error)
            }
          }

          // If no stored data and unauthenticated, show guest
          if (status === 'unauthenticated') {
            setUserData({
              id: "guest",
              name: "Guest User",
              email: null,
              image: null,
              role: UserRole.USER
            })
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        setUserData(null)
      }

      setLoading(false)
    }

    loadUserData()
  }, [session, status])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto space-y-8 py-8 px-4">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Profile
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View and manage your account information and preferences.
          </p>
        </div>

        {/* Profile Header Component */}
        <ProfileHeader user={userData} />

        {/* Profile Details Component */}
        <ProfileDetails user={userData} />
      </div>
    </div>
  )
}
