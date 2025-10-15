"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, TrendingUp, Award } from "lucide-react"
import { InterviewData } from "../_components/InterviewCard"
import { getInterviewById } from "../data"

export default function InterviewResultPage() {
  const params = useParams()
  const router = useRouter()
  const interviewId = params.result as string
  const [interview, setInterview] = useState<InterviewData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const interviewData = await getInterviewById(interviewId)
      setInterview(interviewData)
    }
    fetchData()
  }, [interviewId])

  if (!interview) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Not Found</h2>
          <p className="text-gray-600 mb-4">The interview you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const attempts = interview.attempts || []
  const bestScore = Math.max(...attempts.map(a => a.score))
  const averageScore = attempts.length > 0 ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()} className="cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Interviews
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{interview.title}</h1>
            <p className="text-gray-600">{interview.company}</p>
          </div>
        </div>
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
            <div className="text-2xl font-bold text-green-600">{bestScore}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageScore}%</div>
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
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/dashboard/custominterview/${interviewId}/${attempt.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-sm">
                          Attempt #{index + 1}
                        </Badge>
                        <Badge
                          variant={attempt.score >= 90 ? "default" : attempt.score >= 80 ? "secondary" : "destructive"}
                          className="text-sm"
                        >
                          {attempt.score}%
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{attempt.duration}min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-700 line-clamp-2">{attempt.feedback}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
