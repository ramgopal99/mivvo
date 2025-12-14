"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { notFound } from "next/navigation"
import { WritingAttemptDetailsContent } from "../_components/WritingAttemptDetailsContent"
import { writingAnalysisData } from "../../../index"

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

interface AttemptDetailsPageProps {
  params: {
    result: string
    id: string
  }
}

export default function WritingAttemptDetailsPage({ params }: AttemptDetailsPageProps) {
  const { result, id } = use(params as unknown as Promise<{ result: string; id: string }>)
  const { data: session, status } = useSession()
  const [attempt, setAttempt] = useState<WritingAttempt | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      // Check authentication
      const isAuthenticated = status === 'authenticated' && session?.user
      const hasJwtToken = typeof window !== 'undefined' && (
        localStorage.getItem('token') ||
        localStorage.getItem('student_token') ||
        localStorage.getItem('college_token')
      )

      if (!isAuthenticated && !hasJwtToken) {
        if (status !== 'loading') {
          notFound()
        }
        return
      }

      setAuthenticated(true)

      // Load attempt data from data file
      try {
        // Determine language from session ID
        const language = result.includes('french') ? 'french' : 'english'

        // Find the session and attempt from the appropriate language data
        const sessionAnalysis = writingAnalysisData[language]?.find(session => session.id === result)
        const attemptData = sessionAnalysis?.attempts.find(attempt => attempt.id === id)

        if (sessionAnalysis && attemptData) {
          const attemptWithSession: WritingAttempt = {
            ...attemptData,
            session: {
              id: result,
              title: sessionAnalysis.title,
              language: sessionAnalysis.language,
              createdAt: sessionAnalysis.createdAt
            }
          }
          setAttempt(attemptWithSession)
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Error loading writing attempt:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndLoadData()
  }, [result, id, session, status])

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading writing attempt details...</p>
        </div>
      </div>
    )
  }

  if (!authenticated || !attempt) {
    notFound()
  }

  return <WritingAttemptDetailsContent attempt={attempt} resultId={result} />
}