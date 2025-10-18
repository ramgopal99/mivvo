"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, MessageCircle, Brain, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { OverviewSection } from "./sections/OverviewSection"
import { ConversationSection } from "./sections/ConversationSection"
import { AnalysisSection } from "./sections/AnalysisSection"
import { MetricsSection } from "./sections/MetricsSection"

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface InterviewConversation {
  id: string
  transcript: string
  messages: string
  duration: number
  createdAt: Date
}

interface InterviewResult {
  id: string
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  communication: number | null
  knowledge: number | null
  feedback: string | null
  duration: number | null
  createdAt: Date
  vocabularyComplexity: number | null
  emotionalTone: string | null
  wordCountAnalysis: string | null
  questionAnsweringQuality: number | null
  followUpHandling: boolean | null
  answerStructure: string | null
  exampleUsage: boolean | null
  relevantTopicAnswer: boolean | null
}

interface InterviewAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  interview: {
    id: string
    title: string | null
    companyName: string | null
    position: string | null
    jobDescription: string | null
    interviewType: string | null
    createdAt: Date
  }
  results: InterviewResult[]
  conversations: InterviewConversation[]
}

interface AttemptDetailsContentProps {
  attempt: InterviewAttempt
}

export function AttemptDetailsContent({ attempt }: AttemptDetailsContentProps) {
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

  const allMessages: ConversationMessage[] = []
  attempt.conversations.forEach(conversation => {
    const messages = parseMessages(conversation.messages)
    allMessages.push(...messages)
  })

  const result = attempt.results[0] // Get the latest result
  const overallScore = result?.overallScore || 0
  const totalMessages = allMessages.length
  const totalSessions = attempt.conversations.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.push(`/dashboard/custominterview/result/${attempt.interview.id}`)} className="cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>
        <div className="flex flex-col text-center flex-1 mx-8">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{attempt.interview.title || 'Untitled Interview'}</h1>
          <p className="text-gray-600 text-lg mt-1">
            {attempt.interview.companyName && attempt.interview.position
              ? `${attempt.interview.position} at ${attempt.interview.companyName}`
              : attempt.interview.companyName || attempt.interview.position || 'No company specified'
            }
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
        <div className="w-32"></div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="conversation" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Conversation</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
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
            totalMessages={totalMessages}
            totalSessions={totalSessions}
            overallScore={overallScore}
          />
        </TabsContent>

        <TabsContent value="conversation" className="space-y-6">
          <ConversationSection messages={allMessages} formatDate={formatDate} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <AnalysisSection result={result} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <MetricsSection result={result} allMessages={allMessages} />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 pt-6">
        <Button
          variant="outline"
          onClick={() => router.push(`/dashboard/custominterview/result/${attempt.interview.id}`)}
          className="cursor-pointer"
        >
          Back to Results
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
