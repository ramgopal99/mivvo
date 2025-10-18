"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, TrendingUp, Award, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface InterviewResult {
  id: string
  duration: number | null
  feedback: string | null
  knowledge: number | null
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  communication: number | null
  notes: string | null
  createdAt: Date
}

interface InterviewAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: InterviewResult[]
}

interface InterviewData {
  id: string
  title: string | null
  companyName: string | null
  position: string | null
  createdAt: Date
  attempts: InterviewAttempt[]
}

interface InterviewResultsContentProps {
  interview: InterviewData
}

export function InterviewResultsContent({ interview }: InterviewResultsContentProps) {
  const router = useRouter()

  const attempts = interview.attempts || []

  // Get scores from results
  const getAttemptScore = (attempt: InterviewAttempt) => {
    const result = attempt.results?.[0] // Get first result (overall analysis)
    return result?.overallScore || 0
  }

  // Get analysis data from results
  const getAttemptAnalysis = (attempt: InterviewAttempt) => {
    return attempt.results?.[0] // Get first result (overall analysis)
  }

  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => getAttemptScore(a))) : 0
  const averageScore = attempts.length > 0 ? Math.round(attempts.reduce((sum, a) => sum + getAttemptScore(a), 0) / attempts.length) : 0

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex items-start justify-between">
          <Button variant="ghost" onClick={() => router.push('/dashboard/custominterview')} className="cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex flex-col text-center flex-1 mx-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{interview.title || 'Untitled Interview'}</h1>
          </div>
          <div className="w-32"></div> {/* Spacer for balance */}
        </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{bestScore}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageScore}</div>
          </CardContent>
        </Card>
      </div>

      {/* Attempts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Interview Attempts</h2>

        {attempts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Award className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Attempts Yet</h3>
              <p className="text-gray-600 text-center">
                You haven&apos;t completed any attempts for this interview yet.
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
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        {attempt.completedAt && (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(attempt.completedAt)}</span>
                          </div>
                        )}
                        {attempt.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{attempt.duration}min</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/custominterview/${interview.id}/attempt/${attempt.id}`)}
                      className="cursor-pointer"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>

                {(() => {
                  const analysis = getAttemptAnalysis(attempt)
                  return (analysis?.overallScore !== undefined && analysis?.overallScore !== null) || analysis?.notes ? (
                    <CardContent>
                      <div className="flex items-center justify-between">
                        {/* Score Section */}
                        {analysis?.overallScore !== undefined && analysis?.overallScore !== null && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{Math.round(analysis.overallScore)}</div>
                            <div className="text-xs text-gray-600">Score</div>
                          </div>
                        )}

                        {/* Notes Section */}
                        {analysis?.notes && (
                          <div className="flex-1 ml-6">
                            <h4 className="text-sm font-medium text-purple-800 mb-1">Notes</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">{analysis.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  ) : null
                })()}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
