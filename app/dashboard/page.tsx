"use client"

import { useEffect, useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import { StatsOverview, RecentInterviews } from "./_components"
import { getDashboardData } from "./actions"
import type {
  UserData,
  SessionData,
  DashboardData
} from "./types"
import {
  calculateCreditUsage,
  minutesToCredits,
  CreditUsageInfo
} from "@/lib/credit-converter"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get authentication headers for API requests
 */
const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Check for NextAuth session token
  const nextAuthToken = localStorage.getItem('next-auth.session-token') ||
                        localStorage.getItem('__Secure-next-auth.session-token')
  if (nextAuthToken) {
    headers['Authorization'] = `Bearer ${nextAuthToken}`
  }

  // Check for JWT tokens (college students/admins) - updated token names
  const jwtToken = localStorage.getItem('token') ||
                   localStorage.getItem('student_token') ||
                   localStorage.getItem('college_token')
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`
  }

  return headers
}

/**
 * Parse user data from localStorage for college students
 */
const getUserDataFromStorage = (): UserData | null => {
  try {
    const storedUserData = localStorage.getItem('user_data')
    if (!storedUserData) return null

    const parsedUserData = JSON.parse(storedUserData)
    if (parsedUserData && parsedUserData.id) {
      return {
        id: parsedUserData.id,
        name: parsedUserData.name,
        email: parsedUserData.email,
        role: parsedUserData.role,
        college: parsedUserData.college ? {
          id: parsedUserData.college.id || parsedUserData.college,
          name: parsedUserData.college.name || parsedUserData.college,
          collegeId: parsedUserData.college.collegeId || parsedUserData.college.id || parsedUserData.college
        } : undefined
      }
    }
  } catch (error) {
    console.error('Error parsing college student data:', error)
  }
  return null
}

/**
 * Get user data based on authentication method
 */
const getUserData = (session: SessionData | null, status: string): UserData | null => {
  // First priority: NextAuth session data (for Google OAuth users)
  if (status === 'authenticated' && session?.user) {
    return {
      id: session.user.id!,
      name: session.user.name || 'User',
      email: session.user.email!,
      college: undefined // NextAuth users don't have college data
    }
  }

  // Second priority: College student data from localStorage
  if (status !== 'loading') {
    return getUserDataFromStorage()
  }

  return null
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Loading spinner component
 */
const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading dashboard...</p>
    </div>
  </div>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function Dashboard() {
  // =============================================================================
  // STATE
  // =============================================================================

  const { data: session, status } = useSession()
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      totalInterviews: 0,
      totalTimeSpent: 0,
      averageScore: 0
    },
    recentInterviews: []
  })
  const [loading, setLoading] = useState(true)
  const [creditUsage, setCreditUsage] = useState<CreditUsageInfo | null>(null)

  // =============================================================================
  // API FUNCTIONS
  // =============================================================================

  /**
   * Fetch user's time data from the API and convert to credit usage
   */
  const fetchUserCreditData = async (): Promise<void> => {
    try {
      const response = await fetch('/api/user/time-data', {
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        const timeData = await response.json()
        if (timeData.success && timeData.data) {
          // Convert time data to credits (12 credits = 1 minute)
          const totalCredits = minutesToCredits(timeData.data.totalTimeAllowance || 0)
          const usedCredits = minutesToCredits(timeData.data.usedTimeMinutes || 0)
          const creditUsageInfo = calculateCreditUsage(totalCredits, usedCredits)
          setCreditUsage(creditUsageInfo)
        }
      }
    } catch (error) {
      console.error('Failed to fetch user credit data:', error)
    }
  }

  /**
   * Load all dashboard data
   */
  const loadDashboardData = useCallback(async (): Promise<void> => {
    try {
      // Get user data based on authentication method
      const userData = getUserData(session, status)

      // Fetch credit data for authenticated users
      if (userData) {
        await fetchUserCreditData()
      }

      // Fetch dashboard stats and interviews
      const data = await getDashboardData(userData || undefined)
      setDashboardData(data)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }, [session, status])

  // =============================================================================
  // EFFECTS
  // =============================================================================

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  // =============================================================================
  // RENDER
  // =============================================================================

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <DashboardHeader />

      {/* Stats Overview */}
      <StatsOverview stats={dashboardData.stats} creditUsage={creditUsage} />

      {/* Recent Interviews */}
      <RecentInterviews interviews={dashboardData.recentInterviews} />
    </div>
  )
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Dashboard header component
 */
const DashboardHeader = () => (
  <div className="space-y-2">
    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
    <p className="text-muted-foreground">
      Welcome back! Here&apos;s your mock interview progress and quick actions.
    </p>
  </div>
)
