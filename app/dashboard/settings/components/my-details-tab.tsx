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
              // For college students, always fetch fresh data from API to ensure userType is up to date
              try {
                const token = localStorage.getItem('token')
                if (token) {
                  const response = await fetch('/api/user/profile', {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  })

                  if (response.ok) {
                    const freshData = await response.json()
                    if (freshData.success && freshData.data) {
                      // Update localStorage with fresh data
                      const updatedUserData = { ...parsedUserData, ...freshData.data }
                      localStorage.setItem('user_data', JSON.stringify(updatedUserData))

                      // Transform to UserData format
                      const collegeUserData: UserData = {
                        id: freshData.data.id,
                        name: freshData.data.name || null,
                        email: freshData.data.email || null,
                        image: null, // College students don't have images
                        createdAt: new Date(freshData.data.createdAt), // Use actual created date
                        firstName: freshData.data.firstName || null,
                        lastName: freshData.data.lastName || null,
                        phone: freshData.data.phone || null,
                        dateOfBirth: freshData.data.dateOfBirth,
                        jobTitle: freshData.data.jobTitle || null,
                        company: freshData.data.company || null,
                        location: freshData.data.location || null,
                        bio: freshData.data.bio || null,
                        careerGoals: freshData.data.careerGoals || null,
                        linkedIn: freshData.data.linkedIn || null,
                        github: freshData.data.github || null,
                        userType: freshData.data.userType || 'FREE',
                        totalCreditAllocation: freshData.data.totalCreditAllocation || 30,
                        usedCredits: freshData.data.usedCredits || 0,
                        creditResetAt: freshData.data.creditResetAt,
                        // Academic fields
                        rollNumber: freshData.data.rollNumber || null,
                        branch: freshData.data.branch || null,
                        course: freshData.data.course || null,
                        courseDuration: freshData.data.courseDuration || null,
                        year: freshData.data.year || null,
                        college: freshData.data.college || null
                      }
                      setUserData(collegeUserData)
                      setLoading(false)
                      return
                    }
                  }
                }
              } catch (apiError) {
                console.error('Error fetching fresh college student data:', apiError)
              }

              // Fallback to localStorage data if API call fails
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
                userType: parsedUserData.userType || 'FREE',
                totalCreditAllocation: parsedUserData.totalCreditAllocation || 30,
                usedCredits: parsedUserData.usedCredits || 0,
                creditResetAt: null,
                // Academic fields
                rollNumber: parsedUserData.rollNumber || null,
                branch: parsedUserData.branch || null,
                course: parsedUserData.course || null,
                courseDuration: parsedUserData.courseDuration || null,
                year: parsedUserData.year || null,
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

  return <MyDetailsForm userData={userData} isCollegeStudent={!!userData?.college} />
} 