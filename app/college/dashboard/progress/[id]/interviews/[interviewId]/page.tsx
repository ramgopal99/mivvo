"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { LoadingCompound } from "@/components/loading-compound"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Eye } from "lucide-react"

interface Attempt {
  id: string
  startedAt: string
  completedAt: string | null
  duration: number
  status: string
  score: number
  results: {
    overallScore: number
    knowledge: number
    communication: number
    problemSolving: number
  }[]
}

interface Interview {
  id: string
  title: string
  description: string
  difficulty: string
  createdAt: string
}

export default function InterviewAttemptsPage() {
  const params = useParams()
  const router = useRouter()
  const [interview, setInterview] = useState<Interview | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleViewResults = (attemptId: string) => {
    // Navigate to attempt results page
    router.push(`/college/dashboard/progress/${params.id}/interviews/${params.interviewId}/attempts/${attemptId}`)
  }

  useEffect(() => {
    const loadInterviewData = async () => {
      if (!params.id || !params.interviewId) return
      
      setIsLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('token') ||
                     localStorage.getItem('college_token') ||
                     localStorage.getItem('student_token')
        if (!token) {
          setError('No authentication token found. Please log in.')
          return
        }

        const response = await fetch(`/api/college/students/${params.id}/interviews/${params.interviewId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch interview data')
        }

        const result = await response.json()

        if (result.success) {
          setInterview(result.data.interview)
          setAttempts(result.data.attempts)
        } else {
          setError(result.error || 'Failed to load interview data')
        }
      } catch (err) {
        console.error('Error loading interview data:', err)
        setError('An error occurred while loading interview data')
      } finally {
        setIsLoading(false)
      }
    }

    loadInterviewData()
  }, [params.id, params.interviewId])

  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds)) {
      return '0s'
    }
    const totalSeconds = Math.floor(seconds)
    const hours = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`
    } else if (mins > 0) {
      return `${mins}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingCompound
          text="Loading interview attempts"
          size="lg"
          variant="spinner"
          className="text-gray-600"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Button 
          onClick={() => router.back()} 
          className="mt-4"
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  if (!interview) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Interview not found</p>
        <Button 
          onClick={() => router.back()} 
          className="mt-4"
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interview Attempts</h1>
            <p className="text-muted-foreground">
              All attempts for: {interview.title}
            </p>
          </div>
        </div>
      </div>

      {/* Interview Info */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{interview.title}</h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-500">
                Difficulty: {interview.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                Created: {new Date(interview.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Attempts Table */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Attempt History</h3>
          <p className="text-muted-foreground">
            {attempts.length} attempt{attempts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="border rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Attempt #</th>
                  <th className="text-left p-4 font-medium">Started</th>
                  <th className="text-left p-4 font-medium">Duration</th>
                  <th className="text-left p-4 font-medium">Score</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attempts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      No attempts found
                    </td>
                  </tr>
                ) : (
                  attempts.map((attempt, index) => (
                    <tr key={attempt.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="font-medium">#{index + 1}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          {new Date(attempt.startedAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {formatDuration(attempt.duration)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-center">
                          <div className="font-medium">{Math.round(attempt.score)}%</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(attempt.status)}`}>
                          {attempt.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewResults(attempt.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
