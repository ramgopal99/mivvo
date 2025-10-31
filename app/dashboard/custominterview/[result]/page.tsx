"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useParams, notFound } from "next/navigation"
import { InterviewResultsContent } from "./_components"
import { getInterviewById } from "../data"

interface InterviewResult {
  id: string
  duration: number | null
  feedback: string | null
  knowledge: number | null
  overallScore: number | null
  overallFeedback: string | null
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  communication: number | null
  notes: string | null
  createdAt: Date
}

interface InterviewAttempt {
  id: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  createdAt: Date
  results: InterviewResult[]
}

interface InterviewData {
  id: string
  title: string | null
  companyName: string | null
  position: string | null
  createdAt: Date
  attempts: InterviewAttempt[]
}

export default function InterviewResultPage() {
  const params = useParams()
  const { data: session, status } = useSession()
  const [interview, setInterview] = useState<InterviewData | null>(null)
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

        // Load interview data
        if (params.result && isAuthenticated) {
          try {
            const interviewId = Array.isArray(params.result) ? params.result[0] : params.result
            const data = await getInterviewById(interviewId)

            if (data) {
              // Transform API data to match component expectations
              const transformedData = {
                id: data.id,
                title: data.title,
                companyName: data.company || null,
                position: null, // API doesn't provide position
                createdAt: new Date(data.createdAt),
                attempts: data.attempts?.map(attempt => ({
                  id: attempt.id,
                  startedAt: new Date(attempt.completedAt || attempt.id),
                  completedAt: attempt.completedAt ? new Date(attempt.completedAt) : null,
                  duration: attempt.duration,
                  status: 'completed', // Default to completed
                  createdAt: new Date(attempt.completedAt || attempt.id),
                  results: attempt.score || attempt.feedback || attempt.strengths?.length ? [{
                    id: `result-${attempt.id}`,
                    overallScore: attempt.score || 0,
                    overallFeedback: attempt.feedback || "",
                    strengths: attempt.strengths || [],
                    weaknesses: attempt.weaknesses || [],
                    recommendations: attempt.recommendations || [],
                    communication: null,
                    knowledge: null,
                    feedback: attempt.feedback || "",
                    notes: attempt.feedback || "", // Map feedback to notes field for interface compatibility
                    duration: attempt.duration,
                    createdAt: new Date(attempt.completedAt || attempt.id),
                    vocabularyComplexity: null,
                    emotionalTone: null,
                    wordCountAnalysis: null,
                    questionAnsweringQuality: null,
                    followUpHandling: null,
                    answerStructure: null,
                    exampleUsage: null,
                    relevantTopicAnswer: null
                  }] : []
                })) || []
              }
              setInterview(transformedData)
            } else {
              notFound()
            }
          } catch (error) {
            console.error('Error loading interview:', error)
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
          <p className="mt-4 text-gray-600">Loading interview results...</p>
        </div>
      </div>
    )
  }

  if (!authenticated || !interview) {
    notFound()
  }

  return <InterviewResultsContent interview={interview} />
}
