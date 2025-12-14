"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, Calendar, Clock, Target, TrendingUp, FileQuestion } from "lucide-react"

interface McqAttemptSummary {
  id: string
  sessionId: string
  sessionTitle: string
  startedAt: Date
  completedAt: Date | null
  duration: number | null
  status: string
  overallScore: number | null
  totalQuestions: number | null
  correctAnswers: number | null
  accuracyPercentage: number | null
  cefrLevel: string
  sessionType: string
  createdAt: Date
}

export default function McqHistoryPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [attempts, setAttempts] = useState<McqAttemptSummary[]>([])
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
                router.push('/auth/signin')
                return
              }
            } else {
              router.push('/auth/signin')
              return
            }
          } else if (status !== 'loading') {
            router.push('/auth/signin')
            return
          } else {
            return // Still loading
          }
        }

        setAuthenticated(isAuthenticated)

        // Load user's MCQ attempts
        if (isAuthenticated) {
          // First, get user's preferred language
          let userLanguage: string | null = null;
          try {
            const langResponse = await fetch('/api/foreign-language/user/preferences/language');
            if (langResponse.ok) {
              const langResult = await langResponse.json();
              if (langResult.success && langResult.data.preferredLanguage) {
                userLanguage = langResult.data.preferredLanguage;
              }
            }
          } catch (error) {
            console.error('Error loading user language:', error);
          }

          // Only proceed if we have a valid language
          if (userLanguage) {
            // Load attempts with the user's preferred language
          try {
            const response = await fetch(`/api/foreign-language/mcq/user-attempts?language=${userLanguage}`)

            if (response.ok) {
              const result = await response.json()
              if (result.success) {
                setAttempts(result.data)
              }
            }
          } catch (error) {
            console.error('Error loading MCQ attempts:', error)
          } finally {
            setLoading(false)
            }
          } else {
            console.warn('No user language preference found, skipping attempts load');
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error in checkAuthAndLoadData:', error)
        router.push('/auth/signin')
      }
    }

    checkAuthAndLoadData()
  }, [session, status, router])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-gray-500'
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }


  const getSessionTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'GRAMMAR': 'Grammar',
      'VOCABULARY': 'Vocabulary',
      'ERROR_DETECTION': 'Error Detection',
      'SYNONYMS_ANTONYMS': 'Synonyms & Antonyms',
      'SENTENCE_COMPLETION': 'Sentence Completion',
      'WORD_REPLACEMENT': 'Word Replacement',
      'MIXED': 'Mixed Practice'
    }
    return typeMap[type] || type
  }


  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading MCQ history...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <Button variant="ghost" onClick={() => router.push('/dashboard/foreign-lang')} className="cursor-pointer">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Practice
        </Button>
        <div className="flex flex-col text-center flex-1 mx-8">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">MCQ Practice History</h1>
          <p className="text-gray-600 text-lg mt-1">
            Review your multiple choice question progress and detailed analysis
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      {attempts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Attempts</CardTitle>
              <FileQuestion className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attempts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attempts.length > 0
                  ? Math.round(attempts.reduce((sum, a) => sum + (a.overallScore || 0), 0) / attempts.length)
                  : 0}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attempts.length > 0 ? Math.max(...attempts.map(a => a.overallScore || 0)) : 0}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {attempts[0]?.cefrLevel || 'A1'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attempts.filter(a => a.status === 'COMPLETED').length}
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Attempts List */}
      <div className="space-y-4">
        {attempts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileQuestion className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No MCQ Attempts Yet</h3>
              <p className="text-gray-500 text-center mb-4">
                Start your first MCQ practice session to see your progress and detailed analysis here.
              </p>
              <Button onClick={() => router.push('/dashboard/foreign-lang')}>
                Start Practicing
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your MCQ Attempts</h2>
            {attempts.map((attempt) => (
              <Card key={attempt.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{attempt.sessionTitle}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(attempt.startedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {attempt.duration ? `${Math.round(attempt.duration / 60)} min` : 'N/A'}
                        </span>
                        <Badge variant={attempt.status === 'COMPLETED' ? 'default' : 'secondary'}>
                          {attempt.status}
                        </Badge>
                        <Badge variant="outline">
                          {getSessionTypeLabel(attempt.sessionType)}
                        </Badge>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(attempt.overallScore)}`}>
                        {attempt.overallScore !== null ? `${attempt.overallScore}%` : 'N/A'}
                      </div>
                      <div className="text-sm text-muted-foreground">Score</div>
                      {attempt.accuracyPercentage !== null && (
                        <div className="text-sm text-muted-foreground">
                          {attempt.correctAnswers}/{attempt.totalQuestions} correct
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{attempt.cefrLevel} Level</Badge>
                      {attempt.accuracyPercentage !== null && (
                        <span className="text-sm text-muted-foreground">
                          {attempt.accuracyPercentage}% accuracy
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/dashboard/foreign-lang/mcq/${attempt.sessionId}/attempt/${attempt.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
