"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import { getAuthHeaders } from "@/lib/auth-utils"
import PermissionCheck from "./permissions"

// Layout for custom interview meet room pages
export default function CustomInterviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const params = useParams()
  const interviewId = params.id as string

  const [userTimeData, setUserTimeData] = useState<{ totalTimeAllowance: number; usedTimeMinutes: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(3)
  const [permissionsGranted, setPermissionsGranted] = useState(false)

  // Handle when permissions are granted
  const handlePermissionsGranted = () => {
    setPermissionsGranted(true)
  }

  // Fetch user's time data
  const fetchUserTimeData = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch('/api/user/time-data', {
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        const timeData = await response.json()
        if (timeData.success && timeData.data) {
          setUserTimeData({
            totalTimeAllowance: timeData.data.totalTimeAllowance,
            usedTimeMinutes: timeData.data.usedTimeMinutes
          })
        } else {
          setError(timeData.message || 'Unable to retrieve time data from database')
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.message || 'Failed to fetch time data')
      }
    } catch (error) {
      console.error('Error fetching time data:', error)
      setError('Network error occurred while checking time limits')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUserTimeData()
  }, [fetchUserTimeData])

  // Reset countdown when component mounts
  useEffect(() => {
    setCountdown(3)
  }, [])

  // Check if user has time allowance remaining
  const checkTimeLimit = useCallback(() => {
    if (!userTimeData) return false // Block access if no data available
    return userTimeData.usedTimeMinutes < userTimeData.totalTimeAllowance
  }, [userTimeData])

  // Check if access should be blocked
  const shouldBlockAccess = useCallback(() => {
    return error !== null || !checkTimeLimit()
  }, [error, checkTimeLimit])

  // Handle countdown if access should be blocked
  useEffect(() => {
    if (!loading && shouldBlockAccess()) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(countdownInterval)
    }
  }, [loading, shouldBlockAccess])

  // Handle redirect when countdown reaches 0
  useEffect(() => {
    if (countdown === 0 && shouldBlockAccess()) {
      router.push('/dashboard/custominterview')
    }
  }, [countdown, shouldBlockAccess, router])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show access blocked message
  if (shouldBlockAccess()) {
    const isTimeExceeded = userTimeData && !checkTimeLimit()
    const isAuthError = error !== null

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {isTimeExceeded ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Time Limit Exceeded</h2>
                <p className="text-gray-600 mb-4">
                  You have used all {userTimeData?.totalTimeAllowance} minutes of your interview time credits.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Upgrade your plan to access more time credits.
                </p>
              </>
            ) : isAuthError ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
                <p className="text-gray-600 mb-4">
                  {error}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Please try logging in again or contact support if the problem persists.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
                <p className="text-gray-600 mb-4">
                  You don&apos;t have permission to access this interview room.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Please check your account status or contact support.
                </p>
              </>
            )}

            <p className="text-xs text-gray-400">
              Redirecting to dashboard in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Render permission check or normal layout
  if (!permissionsGranted) {
    return (
      <PermissionCheck
        interviewId={interviewId}
        onPermissionsGranted={handlePermissionsGranted}
      />
    )
  }

  // Render normal layout if permissions granted and time limit not exceeded
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  )
}
