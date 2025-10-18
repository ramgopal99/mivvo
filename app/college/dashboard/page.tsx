"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Users,
  TrendingUp,
  Target,
  Clock,
  Award,
  Activity,
  ChevronRight,
  BookOpen,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface CollegeStats {
  totalStudents: number
  totalInterviews: number
  completedInterviews: number
  completionRate: number
  averageScore: number
  activeStudentsThisMonth: number
  topStudents: Array<{
    id: string
    name: string
    email: string
    rollNumber: string | null
    totalInterviews: number
    averageScore: number
  }>
  recentActivity: Array<{
    id: string
    studentName: string
    studentEmail: string
    rollNumber: string | null
    interviewTitle: string
    interviewType: string
    startedAt: Date
    status: string
  }>
  interviewTypes: Array<{
    type: string
    count: number
  }>
  monthlyTrends: Array<{
    month: string
    interviews: number
  }>
}

export default function CollegeDashboardPage() {
  const [stats, setStats] = useState<CollegeStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const token = localStorage.getItem('college_token')
      if (!token) {
        setError('Authentication required')
        return
      }

      const response = await fetch('/api/college/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setStats(data.data)
        } else {
          setError(data.error || 'Failed to load dashboard data')
        }
      } else {
        setError('Failed to fetch dashboard data')
      }
    } catch (err) {
      console.error('Dashboard load error:', err)
      setError('An error occurred while loading dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadDashboardData} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">College Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor student progress and interview performance across your institution
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadDashboardData}>
            <Activity className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Enrolled in your college
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active This Month</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudentsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Students with interviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInterviews}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Across all interviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] h-fit">
        {/* Top Performers */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performers
            </CardTitle>
            <CardDescription>
              Students with highest interview activity
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col h-full">
            <div className="space-y-2 flex-1 h-full">
              {stats.topStudents.slice(0, 5).map((student, index) => (
                <div key={student.id} className="flex items-center gap-3 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors h-20">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs font-medium">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{student.name}</p>
                      <div className="flex items-center gap-1">
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800 hover:bg-green-100">
                          {student.averageScore}/100
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {student.totalInterviews} interviews
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Roll: {student.rollNumber || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/college/dashboard/students">
                  View All Students
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest interview activities (7 days)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col h-full">
            <div className="space-y-2 flex-1 h-full">
            {stats.recentActivity.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors h-20">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="text-xs font-medium">
                      {activity.studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{activity.studentName}</p>
                      <Badge
                        variant={activity.status === 'COMPLETED' ? 'default' : 'secondary'}
                        className="text-xs ml-2"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.interviewTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.startedAt).toLocaleDateString()} • Roll: {activity.rollNumber || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/college/dashboard/progress">
                  View Progress Details
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and navigation shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/college/dashboard/students">
                <Users className="h-6 w-6" />
                <span>View All Students</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/college/dashboard/analytics">
                <TrendingUp className="h-6 w-6" />
                <span>Analytics Dashboard</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/college/dashboard/reports">
                <BookOpen className="h-6 w-6" />
                <span>Generate Reports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
