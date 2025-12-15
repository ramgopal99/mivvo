"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useParams, notFound } from "next/navigation"
import { SpeakingResultsContent } from "./_components/SpeakingResultsContent"

interface SpeakingSessionResult {
  id: string
  duration: number | null
  feedback: string | null
  fluencyScore: number | null
  pronunciationScore: number | null
  vocabularyScore: number | null
  grammarScore: number | null
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  totalWords: number | null
  averageAudioDuration: number | null
  createdAt: Date
}

interface SpeakingSessionAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: SpeakingSessionResult[]
}

interface SpeakingSessionData {
  id: string
  title: string
  language: string
  createdAt: Date
  attempts: SpeakingSessionAttempt[]
}

export default function SpeakingResultPage() {
  const params = useParams()
  const { data: session, status } = useSession()
  const [sessionData, setSessionData] = useState<SpeakingSessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        let isAuthenticated = false

        // Check NextAuth session first
        if (status === 'authenticated' && session?.user) {
          isAuthenticated = true
        } else {
          // Check session API for JWT-authenticated users (college students/admins)
          const token = typeof window !== 'undefined' ? (
            localStorage.getItem('token') ||
            localStorage.getItem('student_token') ||
            localStorage.getItem('college_token')
          ) : null
          if (token) {
            const response = await fetch('/api/auth/session', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })

            if (response.ok) {
              const sessionData = await response.json()
              if (sessionData.authenticated && sessionData.user) {
                isAuthenticated = true
              } else {
                notFound()
                return
              }
            } else {
              notFound()
              return
            }
          } else if (status !== 'loading') {
            notFound()
            return
          } else {
            return // Still loading
          }
        }

        setAuthenticated(isAuthenticated)

        // Load speaking session data from API
        if (params.result && isAuthenticated) {
          try {
            const sessionId = Array.isArray(params.result) ? params.result[0] : params.result

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

            const response = await fetch(`/api/foreign-language/speaking/sessions/${sessionId}/results`, {
              headers
            });

            const result = await response.json();

            if (result.success) {
              setSessionData(result.data);
            } else {
              console.error('Failed to load speaking session:', result.error);
              notFound();
            }
          } catch (error) {
            console.error('Error loading speaking session:', error);
            notFound();
          } finally {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error in checkAuthAndLoadData:', error)
        notFound()
      }
    }

    checkAuthAndLoadData()
  }, [params.result, session, status])

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading speaking results...</p>
        </div>
      </div>
    )
  }

  if (!authenticated || !sessionData) {
    notFound()
  }

  return <SpeakingResultsContent session={sessionData} />
}