"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { notFound } from "next/navigation"
import { SpeakingAttemptDetailsContent } from "../_components/SpeakingAttemptDetailsContent"

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

interface SpeakingOverallResult {
  id: string
  fluencyScore: number
  pronunciationScore: number
  vocabularyScore: number
  grammarScore: number
  overallScore: number
  feedback: string
  overallFeedback: string
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  totalWords: number
  averageAudioDuration: number
  timeSpent: number
}

interface SpeakingAttempt {
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
  session: {
    id: string
    title: string
    cefrLevel: string
    sessionType: string
    language: string
  }
  questions: SpeakingQuestionResult[]
  overallResult: SpeakingOverallResult | null
}

interface AttemptDetailsPageProps {
  params: {
    result: string
    id: string
  }
}

export default function SpeakingAttemptDetailsPage({ params }: AttemptDetailsPageProps) {
  const { result, id } = use(params as unknown as Promise<{ result: string; id: string }>)
  const { data: session, status } = useSession()
  const [attempt, setAttempt] = useState<SpeakingAttempt | null>(null)
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
        // Prepare headers with JWT token if using JWT authentication
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        // Check for JWT tokens in localStorage
        const token = typeof window !== 'undefined' ? (
          localStorage.getItem('token') ||
          localStorage.getItem('student_token') ||
          localStorage.getItem('college_token')
        ) : null;

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`/api/foreign-language/speaking/attempts/${id}`, {
          headers
        });

        const result = await response.json();

        if (result.success) {
          setAttempt(result.data);
        } else {
          console.error('Failed to load speaking attempt:', result.error);
          notFound();
        }
      } catch (error) {
        console.error('Error loading speaking attempt:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndLoadData()
  }, [result, id, session, status])

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading speaking attempt details...</p>
        </div>
      </div>
    )
  }

  if (!authenticated || !attempt) {
    notFound()
  }

  return <SpeakingAttemptDetailsContent attempt={attempt} resultId={result} />
}