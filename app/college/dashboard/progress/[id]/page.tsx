"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { LoadingCompound } from "@/components/loading-compound"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { StudentStatsCards } from "./_components/student-stats-cards"
import { StudentInterviewsTable } from "./_components/student-interviews-table"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string | null
  collegeName: string | null
  status: string
  avatar: string | null
  createdAt: string
}

interface Stats {
  totalInterviewsCreated: number
  totalAttempts: number
  completedAttempts: number
  averageScore: number
  totalTimeUsage: {
    hours: number
    minutes: number
    seconds: number
  }
  timeUsageString: string
}

interface Interview {
  id: string
  title: string
  description: string
  difficulty: string
  duration: number
  createdAt: string
  totalAttempts: number
  averageScore: number
}

export default function StudentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleViewAttempts = (interviewId: string) => {
    // Navigate to interview attempts page
    router.push(`/college/dashboard/progress/${params.id}/interviews/${interviewId}`)
  }

  useEffect(() => {
    const loadStudentData = async () => {
      if (!params.id) return
      
      setIsLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('college_token')
        if (!token) {
          setError('No authentication token found')
          return
        }

        const response = await fetch(`/api/college/students/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch student data')
        }

        const result = await response.json()

        if (result.success) {
          setStudent(result.data.student)
          setStats(result.data.stats)
          setInterviews(result.data.interviews)
        } else {
          setError(result.error || 'Failed to load student data')
        }
      } catch (err) {
        console.error('Error loading student data:', err)
        setError('An error occurred while loading student data')
      } finally {
        setIsLoading(false)
      }
    }

    loadStudentData()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingCompound
          text="Loading student details"
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

  if (!student || !stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Student not found</p>
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
            <h1 className="text-3xl font-bold tracking-tight">Student Details</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of {student.name}&apos;s performance and activity
            </p>
          </div>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold text-xl">
              {student.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-500">
                Roll Number: {student.rollNumber || 'N/A'}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                student.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {student.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <StudentStatsCards stats={stats} />

      {/* Interviews Table */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Interviews Created</h3>
          <p className="text-muted-foreground">
            All interviews created by this student
          </p>
        </div>
        <StudentInterviewsTable interviews={interviews} onViewAttempts={handleViewAttempts} />
      </div>
    </div>
  )
}
