"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { notFound } from "next/navigation"
import { AttemptDetailsContent } from "../_components"
import { getInterviewById, getAttemptDetails } from "../../../data"

interface AttemptResult {
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

interface Conversation {
  id: string
  transcript: string
  messages: string
  duration: number
  createdAt: Date
}

interface Interview {
  id: string
  title: string | null
  companyName: string | null
  position: string | null
  jobDescription: string | null
  interviewType: string | null
  createdAt: Date
  user?: {
    name: string
    email: string
  }
}

interface AttemptData {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  interview: Interview
  results: AttemptResult[]
  conversations: Conversation[]
}

interface AttemptDetailsPageProps {
  params: {
    result: string
    id: string
  }
}

export default function AttemptDetailsPage({ params }: AttemptDetailsPageProps) {
  const { result, id } = use(params as unknown as Promise<{ result: string; id: string }>)
  const { data: session, status } = useSession()
  const [attempt, setAttempt] = useState<AttemptData | null>(null)
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

      // Load attempt data
      try {
        // First try to get detailed attempt data
        const detailedData = await getAttemptDetails(result, id)

        if (detailedData) {
          // Use the detailed API response
          const transformedData: AttemptData = {
            id: detailedData.id,
            startedAt: new Date(detailedData.startedAt || detailedData.createdAt),
            completedAt: detailedData.completedAt ? new Date(detailedData.completedAt) : null,
            duration: detailedData.duration,
            status: detailedData.status || 'completed',
            createdAt: new Date(detailedData.createdAt),
            interview: {
              id: String(detailedData.interview?.id || ''),
              title: String(detailedData.interview?.title || null),
              companyName: String(detailedData.interview?.companyName || null),
              position: String(detailedData.interview?.position || null),
              jobDescription: String(detailedData.interview?.jobDescription || null),
              interviewType: String(detailedData.interview?.interviewType || null),
              createdAt: new Date(String(detailedData.interview?.createdAt || Date.now())),
              user: detailedData.interview?.user && typeof detailedData.interview.user === 'object' && 'name' in detailedData.interview.user && 'email' in detailedData.interview.user ? {
                name: String((detailedData.interview.user as { name?: unknown; email?: unknown }).name || ''),
                email: String((detailedData.interview.user as { name?: unknown; email?: unknown }).email || '')
              } : undefined
            },
            results: (detailedData.results || []).map((result: Record<string, unknown>) => ({
              id: String(result.id || ''),
              overallScore: result.overallScore ? Number(result.overallScore) : null,
              overallFeedback: result.overallFeedback ? String(result.overallFeedback) : null,
              strengths: Array.isArray(result.strengths) ? result.strengths.map(String) : [],
              weaknesses: Array.isArray(result.weaknesses) ? result.weaknesses.map(String) : [],
              recommendations: Array.isArray(result.recommendations) ? result.recommendations.map(String) : [],
              communication: result.communication ? Number(result.communication) : null,
              knowledge: result.knowledge ? Number(result.knowledge) : null,
              feedback: result.feedback ? String(result.feedback) : null,
              duration: result.duration ? Number(result.duration) : null,
              createdAt: new Date(String(result.createdAt || Date.now())),
              vocabularyComplexity: result.vocabularyComplexity ? Number(result.vocabularyComplexity) : null,
              emotionalTone: result.emotionalTone ? String(result.emotionalTone) : null,
              wordCountAnalysis: result.wordCountAnalysis ? String(result.wordCountAnalysis) : null,
              questionAnsweringQuality: result.questionAnsweringQuality ? Number(result.questionAnsweringQuality) : null,
              followUpHandling: result.followUpHandling ? Boolean(result.followUpHandling) : null,
              answerStructure: result.answerStructure ? String(result.answerStructure) : null,
              exampleUsage: result.exampleUsage ? Boolean(result.exampleUsage) : null,
              relevantTopicAnswer: result.relevantTopicAnswer ? Boolean(result.relevantTopicAnswer) : null
            })),
            conversations: (detailedData.conversations || []).map((conv: Record<string, unknown>) => ({
              id: String(conv.id || ''),
              transcript: String(conv.transcript || ''),
              messages: String(conv.messages || '[]'),
              duration: conv.duration ? Number(conv.duration) : 0,
              createdAt: new Date(String(conv.createdAt || Date.now()))
            }))
          }
          setAttempt(transformedData)
        } else {
          // Fallback: get interview data and find the attempt
          const interviewData = await getInterviewById(result)
          if (interviewData && interviewData.attempts) {
            const attempt = interviewData.attempts.find((a) => a.id === id)
            if (attempt) {
              const transformedData: AttemptData = {
                id: attempt.id,
                startedAt: new Date(attempt.completedAt || attempt.id),
                completedAt: attempt.completedAt ? new Date(attempt.completedAt) : null,
                duration: attempt.duration,
                status: 'completed',
                createdAt: new Date(attempt.completedAt || attempt.id),
                interview: {
                  id: interviewData.id,
                  title: interviewData.title,
                  companyName: interviewData.company || null,
                  position: null,
                  jobDescription: interviewData.jd || null,
                  interviewType: null,
                  createdAt: new Date(interviewData.createdAt),
                  user: (interviewData as unknown as { user?: { name: string; email: string } }).user ? {
                    name: (interviewData as unknown as { user: { name: string; email: string } }).user!.name,
                    email: (interviewData as unknown as { user: { name: string; email: string } }).user!.email
                  } : undefined
                },
                results: [],
                conversations: []
              }
              setAttempt(transformedData)
            } else {
              notFound()
            }
          } else {
            notFound()
          }
        }
      } catch (error) {
        console.error('Error loading attempt:', error)
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
          <p className="mt-4 text-gray-600">Loading attempt details...</p>
        </div>
      </div>
    )
  }

  if (!authenticated || !attempt) {
    notFound()
  }

  return <AttemptDetailsContent attempt={attempt} resultId={result} />
}
