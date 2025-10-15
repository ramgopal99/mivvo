"use client"

import { useEffect, useState } from "react"
import { getUserDetails } from "../actions"
import { UserData } from "../types"
import { MyDetailsForm } from "./my-details-form"

export function MyDetailsTab() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getUserDetails()
        if (result.success && result.data) {
          setUserData(result.data as UserData)
        } else {
          setError(result.error || "Failed to load profile data")
        }
      } catch {
        setError("An error occurred while loading profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

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