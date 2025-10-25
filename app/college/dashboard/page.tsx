'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LoadingCompound } from '@/components/loading-compound'
import { Users, TrendingUp, Target, Award, AlertCircle, LogIn } from 'lucide-react'

interface DashboardStats {
  college: {
    id: string
    name: string
    collegeId: string
    maxStudents: number
    currentStudents: number
    isActive: boolean
    createdAt: string
  }
  students: {
    total: number
    highPerformers: number
    averagePerformers: number
    lowPerformers: number
    noAttempts: number
  }
  interviews: {
    total: number
    completed: number
    completionRate: number
    averageScore: number
    recentActivity: number
  }
  timeUsage: {
    totalUsed: number
    totalAllowed: number
    usagePercentage: number
  }
  studentsList: Array<{
    id: string
    name: string
    email: string
    rollNumber: string
    createdAt: string
    totalTimeAllowance: number
    usedTimeMinutes: number
    interviewCount: number
    averageScore: number
  }>
}

export default function CollegeDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Check for college admin token first, then fallback to other tokens
        const token = localStorage.getItem('college_token') || 
                     localStorage.getItem('token') ||
                     localStorage.getItem('student_token')
        
        if (!token) {
          setError('No authentication token found. Please log in as a college administrator.')
          return
        }

        const response = await fetch('/api/college/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Failed to fetch dashboard stats (${response.status})`)
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingCompound 
          text="Loading dashboard" 
          size="lg" 
          variant="spinner"
          className="text-gray-600"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button 
            onClick={() => router.push('/auth/college-admin')}
            className="w-full"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Go to College Admin Login
          </Button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg">No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 pt-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
    <div>
          <h1 className="text-3xl font-bold text-gray-900">{stats.college.name}</h1>
          <p className="text-gray-600">College ID: {stats.college.collegeId}</p>
          <Badge variant={stats.college.isActive ? "default" : "destructive"} className="mt-2">
            {stats.college.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Students</p>
          <p className="text-2xl font-bold">
            {stats.students.total} / {stats.college.maxStudents}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.students.total}</div>
            <p className="text-xs text-muted-foreground">
              Current enrollment
            </p>
          </CardContent>
        </Card>

        {/* Total Interviews */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Created</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviews.total}</div>
            <p className="text-xs text-muted-foreground">
              By college students
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
            <div className="text-2xl font-bold">{stats.interviews.averageScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all interviews
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 gap-6">
        {/* Student Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Student Performance</CardTitle>
            <CardDescription>Performance breakdown of students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-green-500" />
                <span className="text-sm">High Performers (80%+)</span>
              </div>
              <span className="font-bold text-green-600">{stats.students.highPerformers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Average Performers (60-79%)</span>
              </div>
              <span className="font-bold text-yellow-600">{stats.students.averagePerformers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Low Performers (&lt;60%)</span>
              </div>
              <span className="font-bold text-red-600">{stats.students.lowPerformers}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">No Attempts</span>
              </div>
              <span className="font-bold text-gray-600">{stats.students.noAttempts}</span>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  )
}