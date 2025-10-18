"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EngagementStatsProps {
  activeStudents: number
  recentActivity: number
  averageTimeSpent: number
}

export function EngagementStats({
  activeStudents,
  recentActivity,
  averageTimeSpent
}: EngagementStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Levels</CardTitle>
        <CardDescription>
          Student engagement metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {activeStudents}
          </div>
          <div className="text-sm text-muted-foreground">Active Students</div>
        </div>
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {recentActivity}
          </div>
          <div className="text-sm text-muted-foreground">Recent Activity</div>
        </div>
        <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {averageTimeSpent}m
          </div>
          <div className="text-sm text-muted-foreground">Avg. Time Spent</div>
        </div>
      </CardContent>
    </Card>
  )
}
