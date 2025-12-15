"use client"

import { useEffect, useState, use } from "react"
import { useSession } from "next-auth/react"
import { notFound } from "next/navigation"
import { WritingAttemptDetailsContent } from "../_components/WritingAttemptDetailsContent"

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
  timeSpent?: { topics: number; chat: number } | null
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
    cefrLevel: string
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
      try {
        let isAuthenticated = false
        let userInfo: { id?: string; name?: string | null; email?: string | null; role?: string; collegeId?: string } | null = null

        // Check NextAuth session first
        if (status === 'authenticated' && session?.user) {
          isAuthenticated = true
          userInfo = session.user
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
                userInfo = sessionData.user
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

        // Load user's preferred language and attempt data
        // First, get user's preferred language (optional)
        let preferredLanguage: string | null = null;
        try {
          const langResponse = await fetch('/api/foreign-language/user/preferences/language');
          if (langResponse.ok) {
            const langResult = await langResponse.json();
            if (langResult.success && langResult.data.preferredLanguage) {
              const lang = langResult.data.preferredLanguage;
              preferredLanguage = lang;
            }
          }
        } catch (langError) {
          console.warn('Could not load user language preference, proceeding without it:', langError);
        }

        // Fetch actual attempt data from API (language filter is optional)
        const url = preferredLanguage
          ? `/api/foreign-language/writing/attempts/${id}?language=${preferredLanguage}`
          : `/api/foreign-language/writing/attempts/${id}`;

        // Prepare headers with JWT token if using JWT authentication
        const headers: Record<string, string> = {};
        if (userInfo?.collegeId || (typeof window !== 'undefined' && (
          localStorage.getItem('token') ||
          localStorage.getItem('student_token') ||
          localStorage.getItem('college_token')
        ))) {
          const token = typeof window !== 'undefined' ? (
            localStorage.getItem('token') ||
            localStorage.getItem('student_token') ||
            localStorage.getItem('college_token')
          ) : null;
          if (token) {
            headers['Authorization'] = `Bearer ${token}`;
          }
        }

        const response = await fetch(url, {
          headers: Object.keys(headers).length > 0 ? headers : undefined
        });

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
          console.error('Failed to fetch attempt data:', response.status, response.statusText)
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

  if (!authenticated) {
    notFound()
  }


  return <WritingAttemptDetailsContent attempt={attempt!} />
}