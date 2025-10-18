"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Eye,
  User,
  GraduationCap,
  Target,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string | null
  collegeName: string | null
  averageScore: number
  completedInterviews: number
  totalInterviews: number
  status: string
  major: string
  year: string
  lastActive: string
  avatar: string | null
}

interface InterviewAttempt {
  id: string
  interviewId: string
  interviewTitle: string
  interviewType: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  score: number
  resultId: string | null
}

interface StudentDetailsPageProps {
  params: Promise<{ studentId: string }>
}

export default function StudentDetailsPage({ params }: StudentDetailsPageProps) {
  const [studentId, setStudentId] = useState<string>("")
  const [student, setStudent] = useState<Student | null>(null)
  const [attempts, setAttempts] = useState<InterviewAttempt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params
      setStudentId(resolvedParams.studentId)
      loadStudentData(resolvedParams.studentId)
    }
    fetchParams()
  }, [params])

  const loadStudentData = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('college_token')
      if (!token) {
        setError('No authentication token found')
        return
      }

      const response = await fetch(`/api/college/students/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          notFound()
        }
        throw new Error('Failed to fetch student data')
      }

      const result = await response.json()

      if (result.success) {
        setStudent(result.data.student)
        setAttempts(result.data.attempts || [])
      } else {
        setError(result.error || 'Failed to load student data')
      }
    } catch (err) {
      console.error('Error loading student data:', err)
      setError('An error occurred while loading student data')
    } finally {
      setIsLoading(false)
    }
  }

  const completedAttempts = attempts.filter(a => a.status === 'COMPLETED')
  const bestScore = completedAttempts.length > 0
    ? Math.max(...completedAttempts.map(a => a.score))
    : 0
  const averageScore = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((sum, a) => sum + a.score, 0) / completedAttempts.length)
    : 0

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading student details...</span>
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || 'Failed to load student data'}</p>
        <Link href="/college/dashboard/students">
          <Button variant="outline">
            Back to Students
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Link href="/college/dashboard/students">
          <Button variant="ghost" className="cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Students
          </Button>
        </Link>
        <div className="flex flex-col text-center flex-1 mx-8">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{student.name}</h1>
          <p className="text-muted-foreground">Student Performance Analysis</p>
        </div>
        <div className="w-32"></div> {/* Spacer for balance */}
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar || ""} />
              <AvatarFallback>
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg">{student.name}</div>
              <div className="text-sm text-muted-foreground">{student.email}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Roll:</span> {student.rollNumber || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Major:</span> {student.major}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Year:</span> {student.year}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'} className="ml-1">
                  {student.status}
                </Badge>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attempts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedAttempts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(bestScore)}`}>{bestScore}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>Score progression across all completed interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedAttempts.length > 0 ? (
              completedAttempts.map((attempt, index) => (
                <div key={attempt.id} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    Attempt {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{attempt.interviewTitle}</span>
                      <span className={`font-medium ${getScoreColor(attempt.score)}`}>
                        {attempt.score}/100
                      </span>
                    </div>
                    <Progress value={attempt.score} className="h-2" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No completed interviews yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interview Attempts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Interview Attempts</h2>

        {attempts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Award className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Attempts Yet</h3>
              <p className="text-gray-600 text-center">
                This student hasn&apos;t attempted any interviews yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {attempts.map((attempt, index) => (
              <Card
                key={attempt.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-sm">
                          Attempt #{index + 1}
                        </Badge>
                        <Badge
                          variant={attempt.status === 'COMPLETED' ? 'default' : 'secondary'}
                          className={attempt.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {attempt.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      {attempt.status === 'COMPLETED' && (
                        <div className={`text-lg font-bold ${getScoreColor(attempt.score)}`}>
                          {attempt.score}/100
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">{attempt.interviewTitle}</h4>
                      <p className="text-sm text-muted-foreground">{attempt.interviewType} Interview</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(attempt.startedAt)}</span>
                      </div>
                      {attempt.completedAt && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{attempt.duration} min</span>
                        </div>
                      )}
                    </div>

                    {attempt.resultId && (
                      <div className="pt-2">
                        <Link
                          href={`/college/dashboard/students/${studentId}/attempt/${attempt.id}`}
                        >
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Results
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
