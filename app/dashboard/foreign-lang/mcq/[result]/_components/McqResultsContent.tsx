"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, TrendingUp, Award, Eye, HelpCircle, Target } from "lucide-react"
import { useRouter } from "next/navigation"

interface McqSessionResult {
  id: string
  duration: number | null
  feedback: string | null
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  totalQuestions: number | null
  correctAnswers: number | null
  accuracyPercentage: number | null
  createdAt: Date
}

interface McqSessionAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: McqSessionResult[]
}

interface McqSessionData {
  id: string
  title: string | null
  language: string | null
  createdAt: Date
  attempts: McqSessionAttempt[]
}

interface McqResultsContentProps {
  session: McqSessionData
}

export function McqResultsContent({ session }: McqResultsContentProps) {
  const router = useRouter()

  const attempts = session.attempts || []

  // Get scores from results
  const getAttemptScore = (attempt: McqSessionAttempt) => {
    const result = attempt.results?.[0] // Get first result (overall analysis)
    return result?.overallScore || 0
  }

  // Get analysis data from results
  const getAttemptAnalysis = (attempt: McqSessionAttempt) => {
    return attempt.results?.[0] // Get first result (overall analysis)
  }

  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => getAttemptScore(a))) : 0
  const averageScore = attempts.length > 0 ? Math.round(attempts.reduce((sum, a) => sum + getAttemptScore(a), 0) / attempts.length) : 0
  const averageAccuracy = attempts.length > 0 ? Math.round(attempts.reduce((sum, a) => sum + (getAttemptAnalysis(a)?.accuracyPercentage || 0), 0) / attempts.length) : 0

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getLanguageLabel = (language: string | null) => {
    const labels: Record<string, string> = {
      english: "English",
      french: "French",
      german: "German",
      spanish: "Spanish",
      japanese: "Japanese"
    }
    return labels[language || ''] || "English"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.push('/dashboard/foreign-lang')} className="cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col text-center flex-1 mx-8">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{session.title || 'Untitled MCQ Session'}</h1>
          <p className="text-gray-600 text-lg mt-1">
            Multiple Choice Questions Practice in {getLanguageLabel(session.language)}
          </p>
        </div>
        <div className="w-32"></div> {/* Spacer for balance */}
      </div>

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
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{bestScore}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageAccuracy}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {attempts.reduce((sum, a) => sum + (getAttemptAnalysis(a)?.totalQuestions || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attempts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">MCQ Session Attempts</h2>

        {attempts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Attempts Yet</h3>
              <p className="text-gray-600 text-center">
                You haven&apos;t completed any MCQ practice attempts yet.
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
                          Attempt #{attempts.length - index}
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
                            <span>{Math.round(attempt.duration / 60)}min</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {(() => {
                      const analysis = getAttemptAnalysis(attempt)
                      const hasScore = analysis?.overallScore !== undefined && analysis?.overallScore !== null && analysis.overallScore >= 0
                      const hasFeedback = analysis?.overallFeedback && analysis.overallFeedback.trim().length > 0
                      const hasAnyData = hasScore || hasFeedback

                      if (hasAnyData) {
                        return (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/foreign-lang/mcq/${session.id}/attempt/${attempt.id}`)}
                            className="cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        )
                      }
                      return null
                    })()}
                  </div>
                </CardHeader>

                {(() => {
                  const analysis = getAttemptAnalysis(attempt)
                  const hasScore = analysis?.overallScore !== undefined && analysis?.overallScore !== null && analysis.overallScore >= 0
                  const hasFeedback = analysis?.overallFeedback && analysis.overallFeedback.trim().length > 0
                  const hasAnyData = hasScore || hasFeedback

                  if (hasAnyData) {
                    return (
                      <CardContent>
                        <div className="flex items-center justify-between">
                          {/* Scores Section */}
                          {hasScore && (
                            <div className="flex space-x-4">
                              <div className="text-center">
                                <div className="text-xl font-bold text-blue-600">{Math.round(analysis.overallScore!)}</div>
                                <div className="text-xs text-gray-600">Overall</div>
                              </div>
                              {analysis.accuracyPercentage && (
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-green-600">{Math.round(analysis.accuracyPercentage)}%</div>
                                  <div className="text-xs text-gray-600">Accuracy</div>
                                </div>
                              )}
                              {analysis.correctAnswers !== undefined && analysis.totalQuestions && (
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-purple-600">{analysis.correctAnswers}/{analysis.totalQuestions}</div>
                                  <div className="text-xs text-gray-600">Correct</div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Feedback Section */}
                          {hasFeedback && (
                            <div className="flex-1 ml-6">
                              <h4 className="text-sm font-medium text-purple-800 mb-1">Feedback</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{analysis.overallFeedback}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )
                  } else if (attempt.status === 'completed') {
                    // Show message for completed attempts with no analysis
                    return (
                      <CardContent>
                        <div className="text-center py-4">
                          <div className="text-sm text-gray-500">
                            MCQ session completed but no detailed analysis available.
                          </div>
                        </div>
                      </CardContent>
                    )
                  } else {
                    // Show message for incomplete attempts
                    return (
                      <CardContent>
                        <div className="text-center py-4">
                          <div className="text-sm text-gray-500">
                            MCQ session not completed.
                          </div>
                        </div>
                      </CardContent>
                    )
                  }
                })()}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}