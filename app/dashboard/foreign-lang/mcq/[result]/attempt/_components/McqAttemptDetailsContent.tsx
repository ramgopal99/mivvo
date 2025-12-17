"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, HelpCircle, TrendingUp, Clock, Target, CheckCircle, XCircle, PieChart } from "lucide-react"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts'

interface McqSessionResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  totalQuestions: number | null
  correctAnswers: number | null
  accuracyPercentage: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
}

interface McqAttempt {
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
  }
  questions: Array<{
    id: string
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
    category: string
    userAnswer: number | null
    isCorrect: boolean
    timeSpent: number
  }>
  overallResult: McqSessionResult | null
}

interface McqAttemptDetailsContentProps {
  attempt: McqAttempt
}

export function McqAttemptDetailsContent({ attempt }: McqAttemptDetailsContentProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

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

  const result = attempt.overallResult // Get the overall result
  const overallScore = result?.overallScore || 0


  // Check if there's no analysis data
  if (!result) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <Button variant="ghost" onClick={() => router.push('/dashboard/foreign-lang/mcq')} className="cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to MCQ History
          </Button>
          <div className="flex flex-col text-center flex-1 mx-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">MCQ Attempt Details</h1>
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
              <HelpCircle className="h-8 w-8 text-gray-400" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.push('/dashboard/foreign-lang/mcq')} className="cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to MCQ History
        </Button>
      </div>

      {/* MCQ Session Title Section */}
      <div className="flex flex-col text-center flex-1 mx-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{attempt.session.title || 'Untitled MCQ Session'}</h1>
        <p className="text-gray-600 text-lg mt-1">
          Multiple Choice Questions Practice in {getLanguageLabel(attempt.session.language)}
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
            <HelpCircle className="w-4 h-4" />
            <span>Responses</span>
          </TabsTrigger>
          <TabsTrigger value="graphs" className="flex items-center space-x-2">
            <PieChart className="w-4 h-4" />
            <span>Graphs</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
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
          <ResponsesSection attempt={attempt} />
        </TabsContent>

        <TabsContent value="graphs" className="space-y-6">
          <GraphsSection attempt={attempt} />
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
function OverviewSection({ attempt, overallScore }: { attempt: McqAttempt; overallScore: number }) {
  const result = attempt.overallResult

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overall Performance</h3>
          <div className="text-3xl font-bold text-blue-600">{Math.round(overallScore)}</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Accuracy Rate</span>
            <span className="text-sm font-medium text-green-600">{result?.accuracyPercentage || 0}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Questions Answered</span>
            <span className="text-sm font-medium text-purple-600">{result?.correctAnswers || 0}/{result?.totalQuestions || 0}</span>
          </div>
        </div>
      </div>

      {/* Session Details Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Session Details</h3>
          <Clock className="w-6 h-6 text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Time</span>
            <span className="text-sm font-medium">{Math.round((attempt.duration || 0) / 60)}min</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Avg Time per Question</span>
            <span className="text-sm font-medium">{result?.totalQuestions ? Math.round((attempt.duration || 0) / (result.totalQuestions * 1000)) : 0}s</span>
          </div>
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
function AnalysisSection({ result }: { result: McqSessionResult }) {
  return (
    <div className="space-y-6">
      {/* Strengths */}
      {result?.strengths && result.strengths.length > 0 && (
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
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
            <XCircle className="w-5 h-5 text-yellow-600 mr-2" />
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
            <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
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
function ResponsesSection({ attempt }: { attempt: McqAttempt }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your MCQ Responses</h3>
          <div className="space-y-4">
            {attempt.questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        Question {index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {question.category}
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

                {/* Options */}
                <div className="space-y-2 mb-3">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-2 rounded text-sm ${
                        optionIndex === question.correctAnswer
                          ? 'bg-green-100 border border-green-300 text-green-800'
                          : optionIndex === question.userAnswer && optionIndex !== question.correctAnswer
                          ? 'bg-red-100 border border-red-300 text-red-800'
                          : optionIndex === question.userAnswer && optionIndex === question.correctAnswer
                          ? 'bg-green-100 border border-green-300 text-green-800'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        <span>{option}</span>
                        {optionIndex === question.correctAnswer && (
                          <span className="ml-auto text-green-600 font-medium">✓ Correct Answer</span>
                        )}
                        {optionIndex === question.userAnswer && optionIndex !== question.correctAnswer && (
                          <span className="ml-auto text-red-600 font-medium">✗ Your Answer</span>
                        )}
                        {optionIndex === question.userAnswer && optionIndex === question.correctAnswer && (
                          <span className="ml-auto text-green-600 font-medium">✓ Your Correct Answer</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                {question.explanation && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <h4 className="text-sm font-medium text-blue-800 mb-1">Explanation</h4>
                    <p className="text-sm text-blue-700">{question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Graphs Section Component
function GraphsSection({ attempt }: { attempt: McqAttempt }) {
  // Prepare data for graphs
  const questions = attempt.questions || []

  // Graph 1: Performance by Category (Bar Chart)
  const categoryData = questions.reduce((acc, question) => {
    const category = question.category || 'General'
    if (!acc[category]) {
      acc[category] = { category, correct: 0, incorrect: 0, total: 0 }
    }
    acc[category].total++
    if (question.isCorrect) {
      acc[category].correct++
    } else {
      acc[category].incorrect++
    }
    return acc
  }, {} as Record<string, { category: string; correct: number; incorrect: number; total: number }>)

  const categoryChartData = Object.values(categoryData)

  // Graph 2: Time Distribution (Pie Chart)
  const correctQuestions = questions.filter(q => q.isCorrect)
  const incorrectQuestions = questions.filter(q => !q.isCorrect)

  const totalCorrectTime = correctQuestions.reduce((sum, q) => sum + (q.timeSpent || 0), 0)
  const totalIncorrectTime = incorrectQuestions.reduce((sum, q) => sum + (q.timeSpent || 0), 0)

  const timeDistributionData = [
    { name: 'Correct Answers', value: totalCorrectTime, color: '#10B981' },
    { name: 'Incorrect Answers', value: totalIncorrectTime, color: '#EF4444' }
  ]

  // Graph 3: Question Difficulty Analysis (Bar Chart)
  // Group questions by time spent (assuming faster = easier, slower = harder)
  const timeBuckets = [
    { range: '0-10s', min: 0, max: 10 },
    { range: '11-30s', min: 11, max: 30 },
    { range: '31-60s', min: 31, max: 60 },
    { range: '60s+', min: 61, max: Infinity }
  ]

  const difficultyData = timeBuckets.map(bucket => {
    const questionsInBucket = questions.filter(q => {
      const time = q.timeSpent || 0
      return time >= bucket.min && time <= bucket.max
    })

    const correctInBucket = questionsInBucket.filter(q => q.isCorrect).length
    const totalInBucket = questionsInBucket.length

    return {
      timeRange: bucket.range,
      correct: correctInBucket,
      incorrect: totalInBucket - correctInBucket,
      accuracy: totalInBucket > 0 ? Math.round((correctInBucket / totalInBucket) * 100) : 0
    }
  })

  // Graph 4: Performance Trend (Line Chart)
  const trendData = questions.map((question, index) => ({
    question: index + 1,
    score: question.isCorrect ? 1 : 0,
    timeSpent: question.timeSpent || 0
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Performance by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="correct" stackId="a" fill="#10B981" name="Correct" />
                <Bar dataKey="incorrect" stackId="a" fill="#EF4444" name="Incorrect" />
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
                <Tooltip formatter={(value) => [`${Math.round(Number(value) / 1000)}s`, 'Time Spent']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graph 3: Question Difficulty */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance by Time Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeRange" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="correct" fill="#10B981" name="Correct" />
                <Bar dataKey="incorrect" fill="#EF4444" name="Incorrect" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graph 4: Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis domain={[0, 1]} />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'score' ? (value === 1 ? 'Correct' : 'Incorrect') : `${value}s`,
                    name === 'score' ? 'Result' : 'Time Spent'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  name="score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Metrics Section Component
function MetricsSection({ result }: { result: McqSessionResult }) {
  const metrics = [
    {
      label: "Overall Accuracy",
      value: result?.accuracyPercentage ? `${result.accuracyPercentage}%` : "N/A",
      description: "Percentage of correct answers",
      color: "text-green-600",
      icon: CheckCircle
    },
    {
      label: "Questions Completed",
      value: result?.correctAnswers && result?.totalQuestions ? `${result.correctAnswers}/${result.totalQuestions}` : "N/A",
      description: "Correct answers out of total questions",
      color: "text-blue-600",
      icon: Target
    },
    {
      label: "Time Efficiency",
      value: result?.totalQuestions && result?.duration ? `${Math.round(result.duration / (result.totalQuestions * 60))}s avg` : "N/A",
      description: "Average time per question",
      color: "text-purple-600",
      icon: Clock
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon
          return (
            <div key={index} className="bg-white rounded-lg p-6 border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-600">{metric.label}</h4>
                <IconComponent className="w-4 h-4 text-gray-400" />
              </div>
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                {metric.value}
              </div>
              <p className="text-xs text-gray-500">{metric.description}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}