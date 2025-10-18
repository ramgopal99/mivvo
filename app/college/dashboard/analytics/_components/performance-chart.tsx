"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceData {
  month: string
  averageScore: number
  interviews: number
}

interface PerformanceChartProps {
  data: PerformanceData[]
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const maxScore = Math.max(...data.map(d => d.averageScore))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score Trends (6 Months)</CardTitle>
        <CardDescription>
          Average interview scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-64 flex items-end justify-between gap-2">
            {data.map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1 w-full">
                  <div
                    className="bg-primary rounded-t w-full transition-all hover:bg-primary/80"
                    style={{ height: `${(item.averageScore / maxScore) * 200}px` }}
                  />
                  <span className="text-xs font-medium">{item.averageScore}%</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
