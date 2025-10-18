"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Award,
  User,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface AttemptResult {
  id: string
  overallScore: number
  overallFeedback: string | null
  knowledge: number | null
  communication: number | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  notes: string | null
  createdAt: Date
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
  result: AttemptResult | null
}

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string | null
  collegeName: string | null
  major: string
  year: string
}

interface AttemptDetailsPageProps {
  params: Promise<{ studentId: string; attemptId: string }>
}

export default function AttemptDetailsPage({ params }: AttemptDetailsPageProps) {
  const [studentId, setStudentId] = useState<string>("")
  const [student, setStudent] = useState<Student | null>(null)
  const [attempt, setAttempt] = useState<InterviewAttempt | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params
      setStudentId(resolvedParams.studentId)
      loadAttemptData(resolvedParams.studentId, resolvedParams.attemptId)
    }
    fetchParams()
  }, [params])

  const loadAttemptData = async (sid: string, aid: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('college_token')
      if (!token) {
        setError('No authentication token found')
        return
      }

      const response = await fetch(`/api/college/students/${sid}/attempts/${aid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 404) {
          notFound()
        }
        throw new Error('Failed to fetch attempt data')
      }

      const result = await response.json()

      if (result.success) {
        setStudent(result.data.student)
        setAttempt(result.data.attempt)
      } else {
        setError(result.error || 'Failed to load attempt data')
      }
    } catch (err) {
      console.error('Error loading attempt data:', err)
      setError('An error occurred while loading attempt data')
    } finally {
      setIsLoading(false)
    }
  }

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

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />
    return <XCircle className="h-5 w-5 text-red-600" />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading attempt details...</span>
      </div>
    )
  }

  if (error || !student || !attempt) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || 'Failed to load attempt data'}</p>
        <Link href={`/college/dashboard/students/${studentId}`}>
          <Button variant="outline">
            Back to Student
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Link href={`/college/dashboard/students/${studentId}`}>
          <Button variant="ghost" className="cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Student
          </Button>
        </Link>
        <div className="flex flex-col text-center flex-1 mx-8">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Interview Results
          </h1>
          <p className="text-muted-foreground">
            {student.name} - {attempt.interviewTitle}
          </p>
        </div>
        <div className="w-32"></div> {/* Spacer for balance */}
      </div>

      {/* Student & Interview Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{student.name}</div>
                <div className="text-sm text-muted-foreground">{student.email}</div>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Roll Number:</span>
                <div className="font-medium">{student.rollNumber || 'N/A'}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Major:</span>
                <div className="font-medium">{student.major}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Interview Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="font-medium">{attempt.interviewTitle}</div>
              <div className="text-sm text-muted-foreground">{attempt.interviewType} Interview</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(attempt.startedAt)}</span>
              </div>
              {attempt.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{attempt.duration} min</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant={attempt.status === 'COMPLETED' ? 'default' : 'secondary'}>
                {attempt.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {attempt.result ? (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getScoreIcon(attempt.result.overallScore)}
                Overall Performance
              </CardTitle>
              <CardDescription>
                Comprehensive evaluation of the interview performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(attempt.result.overallScore)}`}>
                    {attempt.result.overallScore}
                  </div>
                  <div className="text-muted-foreground">out of 100</div>
                </div>

                <Progress value={attempt.result.overallScore} className="h-3" />

                {attempt.result.overallFeedback && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Overall Feedback</h4>
                    <p className="text-sm">{attempt.result.overallFeedback}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          {(attempt.result.knowledge || attempt.result.communication) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attempt.result.knowledge && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Score</span>
                        <span className={`font-bold ${getScoreColor(attempt.result.knowledge)}`}>
                          {attempt.result.knowledge}/100
                        </span>
                      </div>
                      <Progress value={attempt.result.knowledge} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {attempt.result.communication && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Communication Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Score</span>
                        <span className={`font-bold ${getScoreColor(attempt.result.communication)}`}>
                          {attempt.result.communication}/100
                        </span>
                      </div>
                      <Progress value={attempt.result.communication} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Strengths, Weaknesses, Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strengths */}
            {attempt.result.strengths && attempt.result.strengths.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {attempt.result.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Weaknesses */}
            {attempt.result.weaknesses && attempt.result.weaknesses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-700">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {attempt.result.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {attempt.result.recommendations && attempt.result.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {attempt.result.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Additional Notes */}
          {attempt.result.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{attempt.result.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Available</h3>
            <p className="text-gray-600 text-center">
              The results for this interview attempt are not yet available.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
