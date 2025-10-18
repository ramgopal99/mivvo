"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, TrendingUp, Users, Target } from "lucide-react"

interface TimeStatsProps {
  totalTimeSpent: number
  averageDailyTime: number
  mostActiveStudents: number
  timeEfficiency: number
}

export function TimeStats({
  totalTimeSpent,
  averageDailyTime,
  mostActiveStudents,
  timeEfficiency
}: TimeStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Time Spent</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTimeSpent}h</div>
          <p className="text-xs text-muted-foreground">
            This month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageDailyTime}h</div>
          <p className="text-xs text-muted-foreground">
            Per student
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mostActiveStudents}</div>
          <p className="text-xs text-muted-foreground">
            5+ hours this week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Time Efficiency</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{timeEfficiency}%</div>
          <p className="text-xs text-muted-foreground">
            Goal achievement rate
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
