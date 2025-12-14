"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useParams, notFound } from "next/navigation"
import { ReadingResultsContent } from "./_components/ReadingResultsContent"

interface ReadingSessionResult {
  id: string
  duration: number | null
  feedback: string | null
  comprehensionScore: number | null
  rearrangingScore: number | null
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  createdAt: Date
}

interface ReadingSessionAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: ReadingSessionResult[]
}

interface ReadingSessionData {
  id: string
  title: string | null
  language: string | null
  createdAt: Date
  attempts: ReadingSessionAttempt[]
}

export default function ReadingResultPage() {
  const params = useParams()
  const { data: session, status } = useSession()
  const [sessionData, setSessionData] = useState<ReadingSessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [userLanguage, setUserLanguage] = useState<string>('english')

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

        // Load user's preferred language and reading session data
        if (params.result && isAuthenticated) {
          try {
            // First, get user's preferred language
            let preferredLanguage: string | null = null;
            try {
              const langResponse = await fetch('/api/foreign-language/user/preferences/language');
              if (langResponse.ok) {
                const langResult = await langResponse.json();
                if (langResult.success && langResult.data.preferredLanguage) {
                  preferredLanguage = langResult.data.preferredLanguage;
                  setUserLanguage(preferredLanguage.toLowerCase());
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

            const sessionId = Array.isArray(params.result) ? params.result[0] : params.result

            // Fetch actual session results from API with language filter
            const response = await fetch(`/api/foreign-language/reading/sessions/${sessionId}/results?language=${preferredLanguage}`)

            if (response.ok) {
              const result = await response.json()
              if (result.success) {
                setSessionData(result.data)
                // Show message if no data available
                if (result.message) {
                  console.info('No analysis data:', result.message)
                }
              } else {
                console.error('API returned error:', result.error)
                notFound()
              }
            } else {
              console.error('Failed to fetch session results:', response.status)
              notFound()
            }
          } catch (error) {
            console.error('Error loading reading session:', error)
            notFound()
          } finally {
            setLoading(false)
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
          <p className="mt-4 text-gray-600">Loading reading results...</p>
        </div>
      </div>
    )
  }

  if (!authenticated || !sessionData) {
    notFound()
  }

  return <ReadingResultsContent session={sessionData} />
}