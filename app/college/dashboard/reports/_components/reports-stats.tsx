"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, FileText, TrendingUp, Users } from "lucide-react"

interface ReportsStatsProps {
  totalReports: number
  generatedThisMonth: number
  averageScore: number
  topPerformers: number
}

export function ReportsStats({
  totalReports,
  generatedThisMonth,
  averageScore,
  topPerformers
}: ReportsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReports}</div>
          <p className="text-xs text-muted-foreground">
            +12% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{generatedThisMonth}</div>
          <p className="text-xs text-muted-foreground">
            +8% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore}%</div>
          <p className="text-xs text-muted-foreground">
            +2.5% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topPerformers}</div>
          <p className="text-xs text-muted-foreground">
            Students with 90%+ scores
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
