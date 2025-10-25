"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getUserDetails } from "../actions"
import { UserData } from "../types"
import { MyDetailsForm } from "./my-details-form"

export function MyDetailsTab() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check for college student data in localStorage first
        const storedUserData = localStorage.getItem('user_data')
        if (storedUserData) {
          try {
            const parsedUserData = JSON.parse(storedUserData)
            if (parsedUserData && parsedUserData.id) {
              // College student data - transform to UserData format
              const collegeUserData: UserData = {
                id: parsedUserData.id,
                name: parsedUserData.name || null,
                email: parsedUserData.email || null,
                image: null, // College students don't have images
                createdAt: new Date(), // Default to current date
                firstName: parsedUserData.firstName || null,
                lastName: parsedUserData.lastName || null,
                phone: parsedUserData.phone || null,
                dateOfBirth: null,
                jobTitle: null,
                company: null,
                location: null,
                bio: null,
                careerGoals: parsedUserData.careerGoals || null,
                linkedIn: parsedUserData.linkedIn || null,
                github: parsedUserData.github || null,
                totalTimeAllowance: parsedUserData.totalTimeAllowance || 30,
                usedTimeMinutes: parsedUserData.usedTimeMinutes || 0,
                timeAllowanceResetAt: null,
                college: parsedUserData.college || null
              }
              setUserData(collegeUserData)
              setLoading(false)
              return
            }
          } catch (parseError) {
            console.error('Error parsing college student data:', parseError)
          }
        }

        // If no college student data, use NextAuth session data
        if (status === 'authenticated' && session?.user) {
          const result = await getUserDetails()
          if (result.success && result.data) {
            setUserData(result.data as UserData)
          } else {
            setError(result.error || "Failed to load profile data")
          }
        } else if (status === 'unauthenticated') {
          setError("Please sign in to view your profile")
        } else if (status === 'loading') {
          // Wait for session to load
          return
        } else {
          setError("Unable to load profile data")
        }
      } catch {
        setError("An error occurred while loading profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [session, status])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600">{error || "Failed to load profile data. Please try again."}</p>
        </div>
      </div>
    )
  }

  return <MyDetailsForm userData={userData} />
} 