"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useParams, notFound } from "next/navigation"
import { ReadingResultsContent } from "./_components/ReadingResultsContent"
import { readingAnalysisData } from "../../data/reading-practice-data"

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

        // Load reading session data (mock data for now)
        if (params.result && isAuthenticated) {
          try {
            const sessionId = Array.isArray(params.result) ? params.result[0] : params.result

            // Determine language from session ID
            const language = sessionId.includes('french') ? 'french' : 'english'

            // Find the analysis data for this session from the appropriate language data
            const sessionAnalysis = readingAnalysisData[language]?.find(session => session.id === sessionId)

            if (sessionAnalysis) {
              setSessionData(sessionAnalysis)
            } else {
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