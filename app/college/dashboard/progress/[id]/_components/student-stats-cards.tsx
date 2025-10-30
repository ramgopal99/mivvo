import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, Clock, Target } from "lucide-react"

interface Stats {
  totalInterviewsCreated: number
  totalAttempts: number
  completedAttempts: number
  averageScore: number
  totalTimeUsage: {
    hours: number
    minutes: number
    seconds: number
  }
  timeUsageString: string
}

interface StudentStatsCardsProps {
  stats: Stats
}

export function StudentStatsCards({ stats }: StudentStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Interviews Created */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interviews Created</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalInterviewsCreated}</div>
          <p className="text-xs text-muted-foreground">
            Total interviews created by student
          </p>
        </CardContent>
      </Card>

      {/* Total Attempts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interview Attempts</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAttempts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.completedAttempts} completed
          </p>
        </CardContent>
      </Card>

      {/* Average Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageScore}%</div>
          <p className="text-xs text-muted-foreground">
            Overall performance score
          </p>
        </CardContent>
      </Card>

      {/* Total Time Usage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time Usage</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.timeUsageString}</div>
          <p className="text-xs text-muted-foreground">
            Total time spent on interviews
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
