"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { StatsOverview, RecentInterviews } from "./_components"
import { getDashboardData } from "./actions"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [dashboardData, setDashboardData] = useState<{
    stats: {
      totalInterviews: number
      totalTimeSpent: number
      averageScore: number
    }
    recentInterviews: {
      id: string
      title: string
      type: string
      status: "IN_PROGRESS" | "COMPLETED"
      score: number | undefined
      duration: number
      createdAt: Date
      companyName: string | undefined
      position: string | undefined
    }[]
  }>({
    stats: {
      totalInterviews: 0,
      totalTimeSpent: 0,
      averageScore: 0
    },
    recentInterviews: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        let userData = null

        // First priority: NextAuth session data (for Google OAuth users)
        if (status === 'authenticated' && session?.user) {
          userData = {
            id: session.user.id!,
            name: session.user.name || 'User',
            email: session.user.email!,
            college: undefined // NextAuth users don't have college data
          }
        }
        // Second priority: College student data from localStorage
        else if (status !== 'loading') {
          const storedUserData = localStorage.getItem('user_data')
          if (storedUserData) {
            try {
              const parsedUserData = JSON.parse(storedUserData)
              if (parsedUserData && parsedUserData.id) {
                userData = {
                  id: parsedUserData.id,
                  name: parsedUserData.name,
                  email: parsedUserData.email,
                  college: parsedUserData.college
                }
              }
            } catch (error) {
              console.error('Error parsing college student data:', error)
            }
          }
        }

        // Call server action with user data if available
        const data = await getDashboardData(userData || undefined)
        setDashboardData(data)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [session, status])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your mock interview progress and quick actions.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview stats={dashboardData.stats} />

      {/* Recent Interviews - Full Width */}
      <RecentInterviews interviews={dashboardData.recentInterviews} />
    </div>
  )
}
