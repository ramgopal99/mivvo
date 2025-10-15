"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, CheckCircle, TrendingUp, Users, Target } from "lucide-react"

interface StatsOverviewProps {
  stats: {
    totalInterviews: number
    completedInterviews: number
    inProgressInterviews: number
    totalTimeSpent: number // in minutes
    averageScore: number
    timeRemaining: number // in minutes
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Interviews */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalInterviews}</div>
          <p className="text-xs text-muted-foreground">
            {stats.completedInterviews} completed
          </p>
        </CardContent>
      </Card>

      {/* Time Spent */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatTime(stats.totalTimeSpent)}</div>
          <p className="text-xs text-muted-foreground">
            {formatTime(stats.timeRemaining)} remaining
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
            <Badge variant={stats.averageScore >= 70 ? "default" : "secondary"}>
              {stats.averageScore >= 70 ? "Good" : "Improving"}
            </Badge>
          </p>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Status</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.inProgressInterviews > 0 ? (
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5 text-blue-500" />
                In Progress
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Ready
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.inProgressInterviews > 0
              ? `${stats.inProgressInterviews} interview${stats.inProgressInterviews > 1 ? 's' : ''} active`
              : "No active interviews"
            }
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
