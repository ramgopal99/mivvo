"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3 } from "lucide-react"

interface TimeData {
  day: string
  hours: number
  target: number
}

interface TimeChartProps {
  weeklyData: TimeData[]
  title: string
}

export function TimeChart({ weeklyData, title }: TimeChartProps) {
  const maxHours = Math.max(...weeklyData.map(d => Math.max(d.hours, d.target)))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Time spent vs targets for the current week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeklyData.map((data) => (
            <div key={data.day} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{data.day}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{data.hours}h</span>
                  <span className="text-xs text-muted-foreground">/</span>
                  <span className="text-muted-foreground">{data.target}h</span>
                </div>
              </div>
              <div className="space-y-1">
                <Progress
                  value={(data.hours / maxHours) * 100}
                  className="h-2"
                />
                <div className="flex justify-end">
                  <div
                    className="h-1 bg-primary/50 rounded-full"
                    style={{
                      width: `${(data.target / maxHours) * 100}%`,
                      marginTop: '-4px'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Actual Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary/50"></div>
            <span className="text-sm text-muted-foreground">Target Time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
