"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface EngagementTrendsProps {
  dailyActiveUsers: number
  weeklyParticipation: number
  interviewCompletion: number
}

export function EngagementTrends({
  dailyActiveUsers,
  weeklyParticipation,
  interviewCompletion
}: EngagementTrendsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Trends</CardTitle>
        <CardDescription>
          Activity patterns over time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Active Users</span>
            <span className="font-medium">{dailyActiveUsers}%</span>
          </div>
          <Progress value={dailyActiveUsers} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Weekly Participation</span>
            <span className="font-medium">{weeklyParticipation}%</span>
          </div>
          <Progress value={weeklyParticipation} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Interview Completion</span>
            <span className="font-medium">{interviewCompletion}%</span>
          </div>
          <Progress value={interviewCompletion} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
