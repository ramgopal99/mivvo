"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoadingCompound } from "@/components/loading-compound"
import { ProgressTable, Student } from "./_components"

export default function ProgressPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleViewDetails = (student: Student) => {
    // Navigate to student details page
    router.push(`/college/dashboard/progress/${student.id}`)
  }

  useEffect(() => {
    const loadStudentsData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem('college_token')
        if (!token) {
          setError('No authentication token found')
          return
        }

        const response = await fetch('/api/college/students?limit=1000', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch students data')
        }

        const result = await response.json()

        if (result.success) {
          setStudents(result.data.students)
        } else {
          setError(result.error || 'Failed to load students data')
        }
      } catch (err) {
        console.error('Error loading students data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setIsLoading(false)
      }
    }

    loadStudentsData()
  }, [])


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingCompound 
          text="Loading students" 
          size="lg" 
          variant="spinner"
          className="text-gray-600"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Progress</h1>
          <p className="text-muted-foreground">
            View student progress and performance data
          </p>
        </div>
      </div>

      {/* Students Table */}
      <ProgressTable.Container>
        <ProgressTable.Header>
          <ProgressTable.HeaderCell>Student</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Roll Number</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Interviews</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Performance</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Status</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Actions</ProgressTable.HeaderCell>
        </ProgressTable.Header>
        <ProgressTable.Body>
          {students.length === 0 ? (
            <ProgressTable.Empty />
          ) : (
            students.map((student) => (
              <ProgressTable.Row
                key={student.id}
                student={student}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </ProgressTable.Body>
      </ProgressTable.Container>
    </div>
  )
}
