"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { LoadingCompound } from "@/components/loading-compound"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Target, CheckCircle, XCircle, BarChart3, MessageCircle, Brain, TrendingUp } from "lucide-react"
import { BarChartComponent, PieChartComponent } from "./_components"

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  transcript: string
  messages: string
  duration: number
  createdAt: string
}

interface Result {
  id: string
  overallScore: number
  knowledge: number
  communication: number
  problemSolving: number
  feedback: string
  createdAt: string
}

interface Attempt {
  id: string
  startedAt: string
  completedAt: string | null
  duration: number
  status: string
  results: Result[]
  conversations: Conversation[]
}

interface Interview {
  id: string
  title: string
  difficulty: string
}

export default function AttemptResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [interview, setInterview] = useState<Interview | null>(null)
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const loadAttemptData = async () => {
      if (!params.id || !params.interviewId || !params.attemptId) return
      
      setIsLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('token') ||
                     localStorage.getItem('college_token') ||
                     localStorage.getItem('student_token')
        if (!token) {
          setError('No authentication token found. Please log in.')
          return
        }

        const response = await fetch(`/api/college/students/${params.id}/interviews/${params.interviewId}/attempts/${params.attemptId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch attempt data')
        }

        const result = await response.json()

        if (result.success) {
          setInterview(result.data.interview)
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

    loadAttemptData()
  }, [params.id, params.interviewId, params.attemptId])

  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds)) {
      return '0s'
    }
    const totalSeconds = Math.floor(seconds)
    const hours = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`
    } else if (mins > 0) {
      return `${mins}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const parseMessages = (messagesJson: string): ConversationMessage[] => {
    try {
      const parsed = JSON.parse(messagesJson)
      if (Array.isArray(parsed)) {
        return parsed
      }
      return []
    } catch {
      return []
    }
  }

  const getAllMessages = (): ConversationMessage[] => {
    if (!attempt) return []
    const allMessages: ConversationMessage[] = []
    attempt.conversations.forEach(conversation => {
      const messages = parseMessages(conversation.messages)
      allMessages.push(...messages)
    })
    return allMessages
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingCompound
          text="Loading attempt results"
          size="lg"
          variant="spinner"
          className="text-gray-600"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Button 
          onClick={() => router.back()} 
          className="mt-4"
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  if (!attempt || !interview) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Attempt not found</p>
        <Button 
          onClick={() => router.back()} 
          className="mt-4"
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Attempts
        </Button>
        <div className="flex flex-col text-center flex-1 mx-8">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{interview.title}</h1>
          <p className="text-gray-600 text-lg mt-1">Interview Attempt Results</p>
          <div className="flex items-center justify-center space-x-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>Duration: {formatDuration(attempt.duration)}</span>
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              <span>Started: {new Date(attempt.startedAt).toLocaleString()}</span>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(attempt.status)}`}>
              {attempt.status}
            </span>
          </div>
        </div>
        <div className="w-32"></div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="conversation" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Conversation</span>
          </TabsTrigger>
          <TabsTrigger value="scores" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Scores</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Feedback</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Attempt Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(attempt.status)}`}>
                    {attempt.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{formatDuration(attempt.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Results:</span>
                  <span className="font-medium">{attempt.results.length}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Overall Performance</h3>
              {attempt.results.length > 0 ? (
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {Math.round(attempt.results[0].overallScore)}%
                  </div>
                  <div className="text-sm text-gray-500">Average Score</div>
                </div>
              ) : (
                <div className="text-center text-gray-500">No scores available</div>
              )}
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Conversation</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {getAllMessages().length}
                </div>
                <div className="text-sm text-gray-500">Total Messages</div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Timeline</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Started:</span>
                  <span>{new Date(attempt.startedAt).toLocaleTimeString()}</span>
                </div>
                {attempt.completedAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span>{new Date(attempt.completedAt).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Graph Components */}
          {attempt.results.length > 0 && getAllMessages().length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChartComponent
                score={attempt.results[0].overallScore}
                communication={attempt.results[0].communication}
                knowledge={attempt.results[0].knowledge}
                problemSolving={attempt.results[0].problemSolving}
              />
              <PieChartComponent allMessages={getAllMessages()} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="conversation" className="space-y-6">
          {getAllMessages().length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No conversation data available</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Interview Conversation</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {getAllMessages().map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="scores" className="space-y-6">
          {attempt.results.length === 0 ? (
            <div className="text-center py-12">
              <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No scores available for this attempt</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {attempt.results.map((result, index) => (
                <div key={result.id} className="bg-white border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-semibold">Result #{index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-500">
                        {new Date(result.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{Math.round(result.overallScore)}%</div>
                      <div className="text-sm text-gray-500">Overall Score</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(result.knowledge)}`}>
                        {Math.round(result.knowledge)}%
                      </div>
                      <div className="text-sm text-gray-500">Knowledge</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(result.communication)}`}>
                        {Math.round(result.communication)}%
                      </div>
                      <div className="text-sm text-gray-500">Communication</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className={`text-2xl font-bold ${getScoreColor(result.problemSolving)}`}>
                        {Math.round(result.problemSolving)}%
                      </div>
                      <div className="text-sm text-gray-500">Problem Solving</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          {attempt.results.length === 0 ? (
            <div className="text-center py-12">
              <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No feedback available for this attempt</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {attempt.results.map((result, index) => (
                <div key={result.id} className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Feedback #{index + 1}</h4>
                  {result.feedback ? (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{result.feedback}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No feedback provided</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {attempt.results.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Graph */}
              <BarChartComponent
                score={attempt.results[0].overallScore}
                communication={attempt.results[0].communication}
                knowledge={attempt.results[0].knowledge}
                problemSolving={attempt.results[0].problemSolving}
              />

              {/* Performance Analysis */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Analysis</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Strengths</h4>
                    <p className="text-blue-700 text-sm">Based on the scores, this student shows strong performance in key areas.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Areas for Improvement</h4>
                    <p className="text-yellow-700 text-sm">Focus on areas with lower scores for better overall performance.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Recommendations</h4>
                    <p className="text-green-700 text-sm">Continue practicing and focus on consistent performance across all areas.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No analysis available - no results found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-6">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          Back to Attempts
        </Button>
        <Button
          onClick={() => router.push(`/college/dashboard/students/${params.id}/interviews/${params.interviewId}`)}
          className="cursor-pointer"
        >
          Back to Interview
        </Button>
      </div>
    </div>
  )
}
