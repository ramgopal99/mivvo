"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, BookOpen, TrendingUp, Clock, Target, Zap, PieChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Area, AreaChart } from 'recharts'

interface ReadingSessionResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  comprehensionScore: number | null
  rearrangingScore: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
  timeSpent: { comprehension: number; rearranging: number } | null
}

interface ReadingAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  session: {
    id: string
    title: string | null
    language: string | null
    createdAt: Date
  }
  results: ReadingSessionResult[]
  questions?: Array<{
    id: string
    type: 'comprehension' | 'rearranging'
    question: string
    userAnswer: string | null
    correctAnswer: string | null
    explanation: string | null
    isCorrect: boolean
    timeSpent: number
  }>
}

interface ReadingAttemptDetailsContentProps {
  attempt: ReadingAttempt | null
}

export function ReadingAttemptDetailsContent({ attempt }: ReadingAttemptDetailsContentProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Check if there's no analysis data
  if (!attempt) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex flex-col text-center flex-1 mx-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">Reading Attempt Details</h1>
            <p className="text-gray-600 text-lg mt-1">
              Attempt Analysis
            </p>
          </div>
          <div className="w-32"></div> {/* Spacer for balance */}
        </div>

        {/* No Data Message */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">No Analysis Data Available</h3>
              <p className="text-gray-500 mt-1">
                Detailed analysis data for this attempt is not available.
              </p>
            </div>
            <Button
              onClick={() => router.push('/dashboard/foreign-lang')}
              className="mt-4"
            >
              Back to Practice
            </Button>
          </div>
        </div>
      </div>
    )
  }

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

  const results = attempt.results || []
  const result = results[0] // Get the latest result
  const overallScore = result?.overallScore

  // Check if there's no analysis data
  if (!result) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <Button variant="ghost" onClick={() => router.push('/dashboard/foreign-lang/reading')} className="cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reading History
          </Button>
        </div>

        {/* Session Title Section */}
        <div className="flex flex-col text-center flex-1 mx-8">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{attempt.session.title || 'Untitled Reading Session'}</h1>
          <p className="text-gray-600 text-lg mt-1">
            Reading Practice in {getLanguageLabel(attempt.session.language)}
          </p>
        </div>

        {/* No Data Message */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">No Analysis Data Available</h3>
              <p className="text-gray-500 mt-1">
                Detailed analysis data for this reading attempt is not available.
              </p>
            </div>
            <Button
              onClick={() => router.push('/dashboard/foreign-lang')}
              className="mt-4"
            >
              Back to Practice
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.push('/dashboard/foreign-lang/reading')} className="cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reading History
        </Button>
      </div>

      {/* Reading Session Title Section */}
      <div className="flex flex-col text-center flex-1 mx-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{attempt.session.title || 'Untitled Reading Session'}</h1>
        <p className="text-gray-600 text-lg mt-1">
          Reading Practice in {getLanguageLabel(attempt.session.language)}
        </p>
        <div className="flex items-center justify-center space-x-4 mt-3 text-sm text-gray-500">
          <div className="flex items-center">
            <span>Started: {formatDate(attempt.startedAt)}</span>
          </div>
          {attempt.duration && (
            <div className="flex items-center">
              <span>Duration: {Math.round(attempt.duration / 60)}min</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="responses" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Responses</span>
          </TabsTrigger>
          <TabsTrigger value="graphs" className="flex items-center space-x-2">
            <PieChart className="w-4 h-4" />
            <span>Graphs</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Metrics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewSection
            attempt={attempt}
            overallScore={overallScore}
          />
        </TabsContent>

        <TabsContent value="responses" className="space-y-6">
          <ResponsesSection attempt={attempt!} />
        </TabsContent>

        <TabsContent value="graphs" className="space-y-6">
          <GraphsSection result={result} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <AnalysisSection result={result} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <MetricsSection result={result} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Overview Section Component
function OverviewSection({ attempt, overallScore }: { attempt: ReadingAttempt; overallScore: number | null }) {
  const results = attempt.results || []
  const result = results[0]

  if (!result) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No analysis data available for this attempt.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overall Performance</h3>
          <div className="text-3xl font-bold text-blue-600">{overallScore ? Math.round(overallScore) : 'N/A'}</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Reading Comprehension</span>
            <span className="text-sm font-medium text-green-600">{result?.comprehensionScore}/100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Sentence Rearranging</span>
            <span className="text-sm font-medium text-purple-600">{result?.rearrangingScore}/100</span>
          </div>
        </div>
      </div>

      {/* Time Breakdown Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Time Breakdown</h3>
          <Clock className="w-6 h-6 text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Time</span>
            <span className="text-sm font-medium">{attempt.duration ? Math.round(attempt.duration / 60) : 'N/A'}min</span>
          </div>
          {result?.timeSpent && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Reading Comprehension</span>
                <span className="text-sm font-medium">{Math.round(result.timeSpent.comprehension / 60)}min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sentence Rearranging</span>
                <span className="text-sm font-medium">{Math.round(result.timeSpent.rearranging / 60)}min</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Feedback Card */}
      {result?.overallFeedback && (
        <div className="md:col-span-2 bg-white rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Feedback</h3>
          <p className="text-gray-700 leading-relaxed">{result.overallFeedback}</p>
        </div>
      )}
    </div>
  )
}

// Analysis Section Component
function AnalysisSection({ result }: { result: ReadingSessionResult }) {
  return (
    <div className="space-y-6">
      {/* Strengths */}
      {result?.strengths && result.strengths.length > 0 && (
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <Target className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-green-800">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Areas for Improvement */}
      {result?.weaknesses && result.weaknesses.length > 0 && (
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Areas for Improvement</h3>
          </div>
          <ul className="space-y-2">
            {result.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-yellow-800">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {result?.recommendations && result.recommendations.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center mb-4">
            <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">💡</span>
                <span className="text-blue-800">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Responses Section Component
function ResponsesSection({ attempt }: { attempt: ReadingAttempt }) {
  const results = attempt.results || []
  const result = results[0]
  const questions = attempt.questions || []

  if (!result && questions.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reading Assessment Results</h3>
            <div className="text-center py-8">
              <p className="text-gray-500">No assessment results available for this reading attempt.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reading Responses</h3>
          <div className="space-y-4">
            {/* Show questions if available */}
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          Question {index + 1}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">
                          {question.type}
                        </span>
                        {question.isCorrect ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                            ✓ Correct
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                            ✗ Incorrect
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-3">
                        {question.question}
                      </p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div>{Math.round((question.timeSpent || 0) / 1000)}s</div>
                    </div>
                  </div>

                  {/* User Answer */}
                  <div className="mb-3">
                    <div className="text-xs font-medium text-gray-700 mb-1">Your Answer:</div>
                    {question.userAnswer ? (
                      <div className={`p-3 rounded text-sm ${
                        question.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}>
                        <p className="text-gray-800">{question.userAnswer}</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <p className="text-sm text-yellow-800">No answer provided</p>
                      </div>
                    )}
                  </div>

                  {/* Correct Answer */}
                  {question.correctAnswer && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-gray-700 mb-1">Correct Answer:</div>
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-green-800 text-sm">{question.correctAnswer}</p>
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  {question.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">Explanation</h4>
                      <p className="text-sm text-blue-700">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>
                {/* Show section scores if no individual questions */}
                {result && (
                  <>
                    {/* Comprehension Section */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          Reading Comprehension
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Reading comprehension evaluation
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">{result.comprehensionScore || 0}%</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                    </div>

                    {/* Rearranging Section */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          Sentence Rearranging
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Sentence rearrangement task
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">{result.rearrangingScore || 0}%</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="text-center py-4 text-gray-500 text-sm">
                  Detailed question-by-question responses are not available for this reading assessment.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Graphs Section Component
function GraphsSection({ result }: { result: ReadingSessionResult }) {
  // Prepare data for graphs
  const comprehensionScore = result?.comprehensionScore || 0
  const rearrangingScore = result?.rearrangingScore || 0

  // Graph 1: Score Comparison (Bar Chart)
  const scoreData = [
    {
      category: 'Comprehension',
      score: comprehensionScore,
      color: '#10B981'
    },
    {
      category: 'Rearranging',
      score: rearrangingScore,
      color: '#3B82F6'
    }
  ]

  // Graph 2: Time Distribution (Pie Chart)
  const timeSpent = result?.timeSpent
  const comprehensionTime = timeSpent?.comprehension || 0
  const rearrangingTime = timeSpent?.rearranging || 0

  const timeDistributionData = [
    { name: 'Comprehension', value: comprehensionTime, color: '#10B981' },
    { name: 'Rearranging', value: rearrangingTime, color: '#3B82F6' }
  ]

  // Graph 3: Performance Analysis (Bar Chart)
  const performanceData = [
    {
      metric: 'Comprehension',
      score: comprehensionScore,
      timeSpent: Math.round(comprehensionTime / 60), // convert to minutes
      efficiency: comprehensionTime > 0 ? Math.round((comprehensionScore / comprehensionTime) * 100) : 0
    },
    {
      metric: 'Rearranging',
      score: rearrangingScore,
      timeSpent: Math.round(rearrangingTime / 60), // convert to minutes
      efficiency: rearrangingTime > 0 ? Math.round((rearrangingScore / rearrangingTime) * 100) : 0
    }
  ]

  // Graph 4: Overall Score Breakdown (Pie Chart)
  const overallScore = result?.overallScore || 0
  const remainingScore = 100 - overallScore

  const scoreBreakdownData = [
    { name: 'Achieved Score', value: overallScore, color: '#10B981' },
    { name: 'Remaining', value: remainingScore, color: '#E5E7EB' }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Score Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Score Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                <Bar dataKey="score" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graph 2: Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={timeDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {timeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${Math.round(Number(value) / 60)}min`, 'Time Spent']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graph 3: Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#10B981" name="Score (%)" />
                <Bar dataKey="timeSpent" fill="#3B82F6" name="Time (min)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graph 4: Overall Score Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Overall Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={scoreBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Metrics Section Component
function MetricsSection({ result }: { result: ReadingSessionResult }) {
  const metrics = [
    {
      label: "Comprehension Accuracy",
      value: result?.comprehensionScore ? `${result.comprehensionScore}%` : result?.comprehensionScore,
      description: "Correct answers on reading comprehension",
      color: "text-green-600"
    },
    {
      label: "Rearrangement Success",
      value: result?.rearrangingScore ? `${result.rearrangingScore}%` : result?.rearrangingScore,
      description: "Success rate on sentence rearrangement",
      color: "text-blue-600"
    },
    {
      label: "Completion Rate",
      value: result?.overallScore ? "100%" : result?.overallScore,
      description: "Session completion status",
      color: "text-purple-600"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600">{metric.label}</h4>
              <Zap className="w-4 h-4 text-gray-400" />
            </div>
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {metric.value}
            </div>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}