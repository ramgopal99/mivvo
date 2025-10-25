"use client"

import { useEffect, useState } from "react"
import { LoadingCompound } from "@/components/loading-compound"
import { StudentTimeBreakdown } from "./_components"

interface StudentTimeData {
  id: string
  name: string
  avatar: string | undefined
  totalHours: number
  thisWeekHours: number
  lastWeekHours: number
  targetHours: number
  efficiency: number
}

interface ApiStudentData {
  id: string
  name: string
  avatar?: string
  totalTimeSpent?: number
  thisWeekTimeSpent?: number
  lastWeekTimeSpent?: number
  averageScore?: number
}

export default function TimePage() {
  const [studentTimeData, setStudentTimeData] = useState<StudentTimeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudentTimeData = async () => {
      try {
        // Get college admin token from localStorage
        const adminToken = localStorage.getItem('college_token')
        if (!adminToken) {
          setError('No admin authentication found')
          setLoading(false)
          return
        }

        // Fetch students data from API
        const response = await fetch('/api/college/students?limit=1000', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch students: ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.data.students) {
          // Transform API data to match component expectations
          const transformedData: StudentTimeData[] = data.data.students.map((student: ApiStudentData) => ({
            id: student.id,
            name: student.name,
            avatar: student.avatar,
            totalHours: Math.round((student.totalTimeSpent || 0) / 60 * 10) / 10, // Convert minutes to hours
            thisWeekHours: Math.round((student.thisWeekTimeSpent || 0) / 60 * 10) / 10, // Convert minutes to hours
            lastWeekHours: Math.round((student.lastWeekTimeSpent || 0) / 60 * 10) / 10, // Convert minutes to hours
            targetHours: 8, // 8 hours per week target
            efficiency: student.averageScore || 0 // Use average score as efficiency
          })).sort((a: StudentTimeData, b: StudentTimeData) => b.thisWeekHours - a.thisWeekHours) // Sort by this week hours

          setStudentTimeData(transformedData)
        } else {
          throw new Error('Invalid API response')
        }
      } catch (err) {
        console.error('Error fetching student time data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchStudentTimeData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingCompound 
          text="Loading student data" 
          size="lg" 
          variant="spinner"
          className="text-gray-600"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Time Details</h1>
            <p className="text-muted-foreground">
              View student time spent on interview practice
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Time Details</h1>
          <p className="text-muted-foreground">
            View student time spent on interview practice
          </p>
        </div>
      </div>

      {/* Student Time Breakdown */}
      <StudentTimeBreakdown
        students={studentTimeData}
        title="All Students by Time"
      />
    </div>
  )
}
