/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { notFound } from "next/navigation"
import { ReadingAttemptDetailsContent } from "../_components/ReadingAttemptDetailsContent"

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

interface AttemptDetailsPageProps {
  params: {
    result: string
    id: string
  }
}

export default function ReadingAttemptDetailsPage({ params }: AttemptDetailsPageProps) {
  const { result, id } = use(params as unknown as Promise<{ result: string; id: string }>)
  const { data: session, status } = useSession()
  const [attempt, setAttempt] = useState<ReadingAttempt | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [userLanguage, setUserLanguage] = useState<string>('english')

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

      // Load user's preferred language and attempt data
      try {
        // First, get user's preferred language
        let preferredLanguage: string | null = null;
        try {
          const langResponse = await fetch('/api/foreign-language/user/preferences/language');
          if (langResponse.ok) {
            const langResult = await langResponse.json();
            if (langResult.success && langResult.data.preferredLanguage) {
              preferredLanguage = langResult.data.preferredLanguage;
              if (preferredLanguage) {
                setUserLanguage(preferredLanguage.toLowerCase());
              }
            }
          }
        } catch (langError) {
          console.error('Error loading user language:', langError);
        }

        // Only proceed if we have a valid language
        if (!preferredLanguage) {
          console.error('No user language preference found');
          notFound();
          return;
        }

        // Fetch actual attempt data from API with language filter
        const response = await fetch(`/api/foreign-language/reading/attempts/${id}?language=${preferredLanguage}`)

        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            if (result.data) {
              setAttempt(result.data)
            } else {
              // No data available, but show the page with a message
              setAttempt(null)
            }
            // Show message if no data available
            if (result.message) {
              console.info('No analysis data:', result.message)
            }
          } else {
            console.error('API returned error:', result.error)
            notFound()
          }
        } else {
          console.error('Failed to fetch attempt data:', response.status)
          notFound()
        }
      } catch (error) {
        console.error('Error loading reading attempt:', error)
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
          <p className="mt-4 text-gray-600">Loading reading attempt details...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    notFound()
  }

  return <ReadingAttemptDetailsContent attempt={attempt} />
}