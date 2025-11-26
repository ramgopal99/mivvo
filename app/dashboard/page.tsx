"use client"

import { useEffect, useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import { StatsOverview, RecentInterviews } from "./_components"
import { getDashboardData } from "./actions"
import type {
  DashboardData
} from "./types"
import {
  calculateCreditUsage,
  minutesToCredits,
  CreditUsageInfo
} from "@/lib/credit-converter"
import { getAuthHeaders, getUserData } from "@/lib/auth-utils"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

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
          // Convert time data to credits
          const totalCredits = minutesToCredits(timeData.data.totalCreditAllocation || 0)
          const usedCredits = minutesToCredits(timeData.data.usedCredits || 0)
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
