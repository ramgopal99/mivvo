"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface InterviewStatsProps {
  totalInterviews: number
  completionRate: number
  averageDuration: number
  mostPopularType: string
  successRate: number
}

export function InterviewStats({
  totalInterviews,
  completionRate,
  averageDuration,
  mostPopularType,
  successRate
}: InterviewStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Statistics</CardTitle>
        <CardDescription>
          Key metrics about interview performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {totalInterviews}
            </div>
            <div className="text-sm text-muted-foreground">Total Interviews</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {completionRate}%
            </div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Average Interview Duration</span>
            <span className="font-medium">{averageDuration} minutes</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Most Popular Type</span>
            <span className="font-medium">{mostPopularType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Success Rate (80%+)</span>
            <span className="font-medium">{successRate}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
