"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { CreateInterviewDialog, InterviewStats, InterviewList } from "./_components"
import { InterviewData } from "./_components/InterviewCard"
import { getAllInterviews, deleteInterview } from "./data"

export default function CustomInterviewPage() {
  const { data: session, status } = useSession()
  const [interviews, setInterviews] = useState<InterviewData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewFormat, setViewFormat] = useState<"box" | "list">("box")

  // Load interviews from database
  useEffect(() => {
    const loadInterviews = async () => {
      // Only load if user is authenticated
      if (status === 'authenticated' && session?.user) {
        try {
          const data = await getAllInterviews()
          setInterviews(data)
        } catch (error) {
          console.error('Error loading interviews:', error)
        } finally {
          setLoading(false)
        }
      } else if (status === 'unauthenticated') {
        setLoading(false)
      }
    }

    loadInterviews()
  }, [status, session])

  const handleInterviewCreated = async (data: { jdDetails: string; interviewType: string; screenShare?: boolean; company?: string }) => {
    // Handle new interview creation via API
    console.log("Creating interview with:", data)

    try {
      const response = await fetch('/api/custom-interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jdDetails: data.jdDetails,
          interviewType: data.interviewType,
          screenShare: data.screenShare,
          company: data.company
        }),
      })

      if (response.status === 401) {
        import('sonner').then(({ toast }) => {
          toast.error('Please sign in to create interviews')
        })
        return
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
    } catch (error) {
      console.error('Error creating interview:', error)
      import('sonner').then(({ toast }) => {
        toast.error('Failed to create interview')
      })
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

  if (status === 'unauthenticated') {
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
            <CreateInterviewDialog onInterviewCreated={handleInterviewCreated} />
          </div>
        </div>

      </div>

      {/* Stats Overview */}
      <InterviewStats
        totalInterviews={interviews.length}
        completedInterviews={interviews.filter(interview => interview.status === "completed").length}
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
      />
    </div>
  )
}
