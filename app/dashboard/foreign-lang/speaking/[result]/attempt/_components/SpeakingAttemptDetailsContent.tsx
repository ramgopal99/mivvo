"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, Volume2, TrendingUp, Clock, Target, Zap, Mic } from "lucide-react"
import { useRouter } from "next/navigation"

interface SpeakingQuestionResult {
  id: string
  question: string
  category: string
  userAnswer: string | null
  wordCount: number
  timeSpent: number
  audioDuration: number | null
  confidence: number | null
}

interface SpeakingSessionResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  speakingScore: number | null
  listeningScore: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
  pronunciationScore: number | null
  fluencyScore: number | null
  vocabularyScore: number | null
  grammarScore: number | null
  comprehensionScore: number | null
  listeningAccuracy: number | null
  responseTime: number | null
  totalWords: number | null
}

interface SpeakingAttempt {
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
  questions: SpeakingQuestionResult[]
  overallResult: SpeakingSessionResult | null
}

interface SpeakingAttemptDetailsContentProps {
  attempt: SpeakingAttempt
}

export function SpeakingAttemptDetailsContent({ attempt }: SpeakingAttemptDetailsContentProps) {
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


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.push('/dashboard/foreign-lang/speaking')} className="cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Speaking History
        </Button>
      </div>

      {/* Speaking Session Title Section */}
      <div className="flex flex-col text-center flex-1 mx-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{attempt.session.title || 'Untitled Speaking Session'}</h1>
        <p className="text-gray-600 text-lg mt-1">
          Speaking & Listening Practice in {getLanguageLabel(attempt.session.language)}
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="responses" className="flex items-center space-x-2">
            <Mic className="w-4 h-4" />
            <span>Responses</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
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
function OverviewSection({ attempt, overallScore }: { attempt: SpeakingAttempt; overallScore: number }) {
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
            <span className="text-sm text-gray-600">Fluency</span>
            <span className="text-sm font-medium text-green-600">{result?.fluencyScore || 0}/100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pronunciation</span>
            <span className="text-sm font-medium text-purple-600">{result?.pronunciationScore || 0}/100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Vocabulary</span>
            <span className="text-sm font-medium text-orange-600">{result?.vocabularyScore || 0}/100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Grammar</span>
            <span className="text-sm font-medium text-red-600">{result?.grammarScore || 0}/100</span>
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
            <span className="text-sm text-gray-600">Questions Completed</span>
            <span className="text-sm font-medium">{attempt.questions.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Words</span>
            <span className="text-sm font-medium">{result?.totalWords || 0}</span>
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
function AnalysisSection({ result }: { result: SpeakingSessionResult | null }) {
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
            <Volume2 className="w-5 h-5 text-blue-600 mr-2" />
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
function ResponsesSection({ attempt }: { attempt: SpeakingAttempt }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Speaking Responses</h3>
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
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      {question.question}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>{question.wordCount} words</div>
                    <div>{question.timeSpent}s</div>
                  </div>
                </div>

                {question.userAnswer ? (
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      &ldquo;{question.userAnswer}&rdquo;
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <p className="text-sm text-yellow-800">
                      No response recorded for this question.
                    </p>
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

// Metrics Section Component
function MetricsSection({ result }: { result: SpeakingSessionResult | null }) {
  const metrics = [
    {
      label: "Fluency",
      value: result?.fluencyScore ? `${result.fluencyScore}%` : "N/A",
      description: "Smoothness and flow of speech",
      color: "text-blue-600",
      icon: Zap
    },
    {
      label: "Pronunciation",
      value: result?.pronunciationScore ? `${result.pronunciationScore}%` : "N/A",
      description: "Clarity and accuracy of spoken sounds",
      color: "text-green-600",
      icon: Mic
    },
    {
      label: "Vocabulary",
      value: result?.vocabularyScore ? `${result.vocabularyScore}%` : "N/A",
      description: "Appropriate word choice and variety",
      color: "text-purple-600",
      icon: Target
    },
    {
      label: "Grammar",
      value: result?.grammarScore ? `${result.grammarScore}%` : "N/A",
      description: "Accuracy of grammatical structures",
      color: "text-orange-600",
      icon: Volume2
    },
    {
      label: "Overall Score",
      value: result?.overallScore ? `${result.overallScore}%` : "N/A",
      description: "Combined performance across all areas",
      color: "text-indigo-600",
      icon: TrendingUp
    },
    {
      label: "Words Spoken",
      value: result?.totalWords ? `${result.totalWords}` : "N/A",
      description: "Total number of words in responses",
      color: "text-gray-600",
      icon: BarChart3
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