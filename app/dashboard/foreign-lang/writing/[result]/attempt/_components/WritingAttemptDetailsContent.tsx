"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, PenTool, TrendingUp, Download, Clock, Target, Zap, MessageCircle, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface WritingSessionResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  topicWritingScore: number | null
  aiConversationScore: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
  creativityScore: number | null
  grammarAccuracy: number | null
  vocabularyUsage: number | null
  conversationFlow: number | null
  topicCoverage: number | null
  responseLength: number | null
}

interface WritingAttempt {
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
  results: WritingSessionResult[]
}

interface WritingAttemptDetailsContentProps {
  attempt: WritingAttempt
  resultId: string
}

export function WritingAttemptDetailsContent({ attempt, resultId }: WritingAttemptDetailsContentProps) {
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

  const result = attempt.results[0] // Get the latest result
  const overallScore = result?.overallScore || 0

  const handleDownloadData = async () => {
    // Mock PDF download - in real app this would generate actual PDF
    alert('PDF report download would be implemented here')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.push(`/dashboard/foreign-lang/writing/${resultId}`)} className="cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Result
        </Button>
        <Button
          onClick={handleDownloadData}
          variant="outline"
          className="cursor-pointer flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF Report
        </Button>
      </div>

      {/* Writing Session Title Section */}
      <div className="flex flex-col text-center flex-1 mx-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{attempt.session.title || 'Untitled Writing Session'}</h1>
        <p className="text-gray-600 text-lg mt-1">
          Writing Practice in {getLanguageLabel(attempt.session.language)}
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <PenTool className="w-4 h-4" />
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

        <TabsContent value="analysis" className="space-y-6">
          <AnalysisSection result={result} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <MetricsSection result={result} />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-6">
        <Button
          variant="outline"
          onClick={() => router.push(`/dashboard/foreign-lang/writing/${resultId}`)}
          className="cursor-pointer"
        >
          Back to Result
        </Button>
        <Button
          onClick={() => router.push('/dashboard/foreign-lang')}
          className="cursor-pointer"
        >
          Back to Writing
        </Button>
      </div>
    </div>
  )
}

// Overview Section Component
function OverviewSection({ attempt, overallScore }: { attempt: WritingAttempt; overallScore: number }) {
  const result = attempt.results[0]

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
            <span className="text-sm text-gray-600">Topic-Based Writing</span>
            <span className="text-sm font-medium text-green-600">{result?.topicWritingScore || 0}/100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">AI Conversation</span>
            <span className="text-sm font-medium text-purple-600">{result?.aiConversationScore || 0}/100</span>
          </div>
        </div>
      </div>

      {/* Time Breakdown Card */}
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
            <span className="text-sm text-gray-600">Topics Written</span>
            <span className="text-sm font-medium">2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Conversations</span>
            <span className="text-sm font-medium">1</span>
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
function AnalysisSection({ result }: { result: WritingSessionResult }) {
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
            <PenTool className="w-5 h-5 text-blue-600 mr-2" />
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

// Metrics Section Component
function MetricsSection({ result }: { result: WritingSessionResult }) {
  const metrics = [
    {
      label: "Creativity Score",
      value: result?.creativityScore ? `${result.creativityScore}%` : "N/A",
      description: "Originality and engagement in writing",
      color: "text-pink-600",
      icon: Sparkles
    },
    {
      label: "Grammar Accuracy",
      value: result?.grammarAccuracy ? `${result.grammarAccuracy}%` : "N/A",
      description: "Correctness of grammar usage",
      color: "text-green-600",
      icon: Target
    },
    {
      label: "Vocabulary Usage",
      value: result?.vocabularyUsage ? `${result.vocabularyUsage}%` : "N/A",
      description: "Diversity and appropriateness of words",
      color: "text-purple-600",
      icon: Zap
    },
    {
      label: "Conversation Flow",
      value: result?.conversationFlow ? `${result.conversationFlow}%` : "N/A",
      description: "Naturalness of dialogue",
      color: "text-blue-600",
      icon: MessageCircle
    },
    {
      label: "Topic Coverage",
      value: result?.topicCoverage ? `${result.topicCoverage}%` : "N/A",
      description: "Completeness of topic exploration",
      color: "text-orange-600",
      icon: PenTool
    },
    {
      label: "Response Length",
      value: result?.responseLength ? `${result.responseLength}%` : "N/A",
      description: "Appropriate response detail",
      color: "text-indigo-600",
      icon: TrendingUp
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

      {/* Writing Samples Placeholder */}
      <div className="bg-gray-50 rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Writing Samples</h3>
        <div className="text-center py-8">
          <PenTool className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Writing samples and conversation transcripts would be displayed here</p>
          <p className="text-sm text-gray-500 mt-2">Review your actual writing and conversation content</p>
        </div>
      </div>
    </div>
  )
}