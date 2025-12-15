"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { notFound } from "next/navigation"
import { McqAttemptDetailsContent } from "../_components/McqAttemptDetailsContent"

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
  sessionId: string
  sessionTitle: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  cefrLevel: string
  sessionType: string
  createdAt: Date
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
  overallResult: {
    id: string
    overallScore: number | null
    totalQuestions: number | null
    correctAnswers: number | null
    accuracyPercentage: number | null
    feedback: string | null
    overallFeedback: string | null
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
    timeSpent: number
  } | null
}

interface AttemptDetailsPageProps {
  params: {
    result: string
    id: string
  }
}

export default function McqAttemptDetailsPage({ params }: AttemptDetailsPageProps) {
  const { result, id } = use(params as unknown as Promise<{ result: string; id: string }>)
  const { data: session, status } = useSession()
  const [attempt, setAttempt] = useState<McqAttempt | null>(null)
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

      // Load attempt data from API
      try {
        const response = await fetch(`/api/foreign-language/mcq/attempts/${id}`)

        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            setAttempt(result.data)
          } else {
            notFound()
          }
        } else {
          notFound()
        }
      } catch (error) {
        console.error('Error loading MCQ attempt:', error)
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
          <p className="mt-4 text-gray-600">Loading MCQ attempt details...</p>
        </div>
      </div>
    )
  }

  if (!authenticated || !attempt) {
    notFound()
  }

  return <McqAttemptDetailsContent attempt={attempt} />
}