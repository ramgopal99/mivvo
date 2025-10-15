"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, Lightbulb } from "lucide-react"
import { InterviewData, InterviewAttempt } from "../../_components/InterviewCard"
import { getAttemptById } from "../../data"

export default function AttemptAnalysisPage() {
  const params = useParams()
  const router = useRouter()
  const interviewId = params.result as string
  const attemptId = params.attemptId as string

  const [data, setData] = useState<{ interview: InterviewData; attempt: InterviewAttempt } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAttemptById(interviewId, attemptId)
      setData(result)
    }
    fetchData()
  }, [interviewId, attemptId])

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Not Found</h2>
          <p className="text-gray-600 mb-4">The interview attempt you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const { interview, attempt } = data

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-50 border-green-200"
    if (score >= 80) return "bg-yellow-50 border-yellow-200"
    return "bg-red-50 border-red-200"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()} className="cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{interview.title}</h1>
            <p className="text-gray-600">{interview.company}</p>
          </div>
        </div>
      </div>

      {/* Attempt Overview */}
      <Card className={getScoreBgColor(attempt.score)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Interview Attempt Analysis</CardTitle>
              <CardDescription>
                Completed on {new Date(attempt.completedAt).toLocaleDateString()} • {attempt.duration} minutes
              </CardDescription>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(attempt.score)}`}>
                {attempt.score}%
              </div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={attempt.score} className="h-3 mb-4" />
          <p className="text-gray-700 text-lg leading-relaxed">{attempt.feedback}</p>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {attempt.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <XCircle className="w-5 h-5 mr-2" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {attempt.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Lightbulb className="w-5 h-5 mr-2" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {attempt.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <Lightbulb className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => router.push(`/dashboard/custominterview/${interviewId}`)}
          className="cursor-pointer"
        >
          View All Attempts
        </Button>
        <Button
          onClick={() => router.push('/dashboard/custominterview')}
          className="cursor-pointer"
        >
          Back to Interviews
        </Button>
      </div>
    </div>
  )
}
