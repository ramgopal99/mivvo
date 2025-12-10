"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import CreateInterviewDialog from "./_components/CreateInterviewDialog"
import { InterviewStats, InterviewList } from "./_components"
import { InterviewData } from "./_components/InterviewCard"
import { getAllInterviews, deleteInterview } from "./data"
import { calculateCreditUsage, minutesToCredits, CreditUsageInfo } from "@/lib/credit-converter"
import { getAuthHeaders } from "@/lib/auth-utils"

export default function CustomInterviewPage() {
  const { data: session, status } = useSession()
  const [interviews, setInterviews] = useState<InterviewData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewFormat, setViewFormat] = useState<"box" | "list">("box")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [creditUsage, setCreditUsage] = useState<CreditUsageInfo | null>(null)
  const [userCvData, setUserCvData] = useState<string | null>(null)
  const [isCreatingInterview, setIsCreatingInterview] = useState(false)
  const [deletingInterviewId, setDeletingInterviewId] = useState<string | null>(null)
  const createDialogRef = useRef<{ reset: () => void } | null>(null)

  // Fetch user's time data and convert to credit usage
  const fetchUserCreditData = async () => {
    try {
      const response = await fetch('/api/user/time-data', {
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        const timeData = await response.json()
        if (timeData.success && timeData.data) {
          // Convert time data to credits
          const totalCredits = minutesToCredits(timeData.data.totalCreditAllocation || 0)
          const usedCredits = minutesToCredits(timeData.data.usedCredits || 0)
          const creditUsageInfo = calculateCreditUsage(totalCredits, usedCredits)
          setCreditUsage(creditUsageInfo)
        }
      }
    } catch (error) {
      console.error('Failed to fetch user credit data:', error)
    }
  }

  // Fetch user's CV data
  const fetchUserCvData = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        const profileData = await response.json()
        if (profileData.success && profileData.data) {
          setUserCvData(profileData.data.cv || null)
        }
      }
    } catch (error) {
      console.error('Failed to fetch user CV data:', error)
    }
  }

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for NextAuth session first
        if (status === 'authenticated' && session?.user) {
          setIsAuthenticated(true)
          // Fetch time data and CV data when authenticated
          await fetchUserCreditData()
          await fetchUserCvData()
          setLoading(false)
          return
        }

        // Check session API for JWT-authenticated users (college students/admins)
        const token = localStorage.getItem('token') ||
                     localStorage.getItem('student_token') ||
                     localStorage.getItem('college_token')
        if (token) {
          const response = await fetch('/api/auth/session', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (response.ok) {
            const sessionData = await response.json()
            if (sessionData.authenticated && sessionData.user) {
              setIsAuthenticated(true)
              // Fetch credit data for JWT-authenticated users (college students)
              await fetchUserCreditData()
              // Fetch CV data for JWT-authenticated users
              await fetchUserCvData()
              setLoading(false)
              return
            }
          }
        }

        // If NextAuth is still loading, wait
        if (status === 'loading') {
          return
        }

        // Not authenticated
        setIsAuthenticated(false)
      } catch (error) {
        console.error('Error checking authentication:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [status, session])

  // Load interviews from database
  useEffect(() => {
    const loadInterviews = async () => {
      if (isAuthenticated) {
        try {
          const data = await getAllInterviews()
          setInterviews(data)
        } catch (error) {
          console.error('Error loading interviews:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    if (isAuthenticated) {
      loadInterviews()
    }
  }, [isAuthenticated])

  const handleInterviewCreated = async (data: { jdDetails: string; interviewType: string; screenShare?: boolean; company?: string; customPrompt?: string; generalSubType?: string; hrSubType?: string; foreignLanguageSubType?: string; role?: string; experienceLevel?: string; cvText?: string }) => {
    // Handle new interview creation via API
    console.log("Creating interview with:", data)

    setIsCreatingInterview(true)
    try {
      const response = await fetch('/api/custom-interviews', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          jdDetails: data.jdDetails,
          interviewType: data.interviewType,
          screenShare: data.screenShare,
          company: data.company,
          customPrompt: data.customPrompt,
          generalSubType: data.generalSubType,
          hrSubType: data.hrSubType,
          foreignLanguageSubType: data.foreignLanguageSubType,
          role: data.role,
          experienceLevel: data.experienceLevel,
          cvText: data.cvText,
        }),
      })

      if (response.status === 401) {
        import('sonner').then(({ toast }) => {
          toast.error('Please sign in to create interviews')
        })
        return
      }

      // Handle time limit exceeded error (403)
      if (response.status === 403) {
        const errorData = await response.json()
        if (errorData.timeLimitExceeded) {
          import('sonner').then(({ toast }) => {
            toast.error(errorData.message || 'Time limit exceeded')
          })
          return
        }
        if (errorData.insufficientCredits) {
          import('sonner').then(({ toast }) => {
            toast.error(errorData.message || 'Insufficient credits')
          })
          return
        }
      }

      // Handle duplicate interview error (409)
      if (response.status === 409) {
        const errorData = await response.json()
        if (errorData.duplicateFound) {
          import('sonner').then(({ toast }) => {
            toast.error(errorData.error || 'This interview already exists')
          })
          return
        }
      }

      // Handle rate limit exceeded error (429)
      if (response.status === 429) {
        const errorData = await response.json()
        if (errorData.rateLimitExceeded) {
          import('sonner').then(({ toast }) => {
            toast.error(errorData.message || 'Rate limit exceeded')
          })
          return
        }
      }

      if (!response.ok) {
        throw new Error('Failed to create interview')
      }

      // Refresh the interviews list
      const updatedInterviews = await getAllInterviews()
      setInterviews(updatedInterviews)

      import('sonner').then(({ toast }) => {
        toast.success('Interview created successfully!')
      })

      // Reset the form and close the dialog after successful creation
      createDialogRef.current?.reset()
    } catch (error) {
      console.error('Error creating interview:', error)
      import('sonner').then(({ toast }) => {
        toast.error('Failed to create interview')
      })
    } finally {
      setIsCreatingInterview(false)
    }
  }

  const handleViewDetails = (interview: InterviewData) => {
    console.log("View details for:", interview)
    // Implement view details functionality
  }

  const handleStartInterview = (interview: InterviewData) => {
    console.log("Start interview for:", interview)
    console.log("Interview ID:", interview.id, "Type:", typeof interview.id)

    if (!interview.id || interview.id === 'null' || interview.id === 'undefined') {
      console.error("Invalid interview ID, cannot start interview")
      import('sonner').then(({ toast }) => {
        toast.error('Invalid interview data')
      })
      return
    }

    // Navigate to the dedicated meet room route
    window.location.href = `/dashboard/custominterview/meet/${interview.id}`
  }

  const handleDeleteInterview = async (interview: InterviewData) => {
    console.log("Deleting interview:", interview)

    setDeletingInterviewId(interview.id)
    try {
      const success = await deleteInterview(interview.id)

      if (success) {
        // Refresh the interviews list
        const updatedInterviews = await getAllInterviews()
        setInterviews(updatedInterviews)

        import('sonner').then(({ toast }) => {
          toast.success('Interview deleted successfully!')
        })
      } else {
        import('sonner').then(({ toast }) => {
          toast.error('Failed to delete interview')
        })
      }
    } finally {
      setDeletingInterviewId(null)
    }
  }

  // Filter interviews based on search query
  const filteredInterviews = interviews.filter((interview) =>
    interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interview.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interview.jd.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (status === 'loading') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please sign in to view your custom interviews.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading interviews...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Custom Interviews</h1>
            <p className="text-gray-600 mt-1">Create personalized interview experiences tailored to your specific job requirements</p>
          </div>

          <div className="flex items-center gap-3">
            <CreateInterviewDialog
              ref={createDialogRef}
              onInterviewCreated={handleInterviewCreated}
              creditUsage={creditUsage}
              userCvData={userCvData}
              isCreating={isCreatingInterview}
            />
          </div>
        </div>

      </div>

      {/* Stats Overview */}
      <InterviewStats
        totalInterviews={interviews.length}
        completedInterviews={interviews.filter(interview => interview.status === "completed").length}
        creditUsage={creditUsage}
      />

      {/* Interview List */}
      <InterviewList
        interviews={filteredInterviews}
        viewFormat={viewFormat}
        onViewFormatChange={setViewFormat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onViewDetails={handleViewDetails}
        onStartInterview={handleStartInterview}
        onDeleteInterview={handleDeleteInterview}
        deletingInterviewId={deletingInterviewId}
      />
    </div>
  )
}
