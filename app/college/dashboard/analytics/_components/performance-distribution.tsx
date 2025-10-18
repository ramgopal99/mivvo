"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PerformanceDistributionProps {
  excellent: number
  good: number
  average: number
  needsImprovement: number
}

export function PerformanceDistribution({
  excellent,
  good,
  average,
  needsImprovement
}: PerformanceDistributionProps) {
  const total = excellent + good + average + needsImprovement

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Distribution</CardTitle>
        <CardDescription>
          Student score ranges
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>90-100% (Excellent)</span>
            <span>{excellent}</span>
          </div>
          <Progress value={(excellent / total) * 100} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>80-89% (Good)</span>
            <span>{good}</span>
          </div>
          <Progress value={(good / total) * 100} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>70-79% (Average)</span>
            <span>{average}</span>
          </div>
          <Progress value={(average / total) * 100} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Below 70% (Needs Improvement)</span>
            <span>{needsImprovement}</span>
          </div>
          <Progress value={(needsImprovement / total) * 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
