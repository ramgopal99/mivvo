"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, Users, Coins, BookOpen } from "lucide-react"
import { CreditUsageInfo, formatCredits, formatRemainingCredits } from "@/lib/credit-converter"

interface StatsOverviewProps {
  stats: {
    totalInterviews: number
    totalTimeSpent: number // in minutes
    averageScore: number
    enrolledCourses: number
  }
  creditUsage?: CreditUsageInfo | null
}

export function StatsOverview({ stats, creditUsage }: StatsOverviewProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  // Get credit usage information
  const creditInfo = creditUsage ? formatRemainingCredits(creditUsage) : null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Interviews */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalInterviews}</div>
          <p className="text-xs text-muted-foreground">
            Custom interviews created
          </p>
        </CardContent>
      </Card>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.enrolledCourses}</div>
          <p className="text-xs text-muted-foreground">
            Active course enrollments
          </p>
        </CardContent>
      </Card>

      {/* Credit Usage */}
      {creditUsage && creditInfo && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Usage</CardTitle>
            <Coins className={`h-4 w-4 ${
              creditInfo.statusColor === 'danger' ? 'text-red-500' :
              creditInfo.statusColor === 'warning' ? 'text-orange-500' :
              'text-muted-foreground'
            }`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              creditInfo.statusColor === 'danger' ? 'text-red-600' :
              creditInfo.statusColor === 'warning' ? 'text-orange-600' :
              ''
            }`}>
              {creditInfo.text}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCredits(creditUsage.usedCredits)} used of {formatCredits(creditUsage.totalCredits)}
            </p>
            {creditInfo.isNearLimit && (
              <p className={`text-xs mt-1 ${
                creditInfo.statusColor === 'danger' ? 'text-red-600' : 'text-orange-600'
              }`}>
                {creditInfo.statusColor === 'danger' ? 'Critical: Credits almost depleted' : 'Low credits remaining'}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
