"use client"

import { useState, useEffect } from "react"
import { LoadingCompound } from "@/components/loading-compound"
import { StudentsTable, StudentDetailsDialog, Student } from "./_components"

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  useEffect(() => {
    const loadStudentsData = async () => {
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
        setError('An error occurred while loading students data')
      } finally {
        setIsLoading(false)
      }
    }

    loadStudentsData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingCompound 
          text="Loading students" 
          size="md" 
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
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            View all registered students
          </p>
        </div>
      </div>

      {/* Students Table */}
      <StudentsTable.Container>
        <StudentsTable.Header>
          <StudentsTable.HeaderCell>Name</StudentsTable.HeaderCell>
          <StudentsTable.HeaderCell>Email</StudentsTable.HeaderCell>
          <StudentsTable.HeaderCell>Roll Number</StudentsTable.HeaderCell>
          <StudentsTable.HeaderCell>Actions</StudentsTable.HeaderCell>
        </StudentsTable.Header>
        <StudentsTable.Body>
          {students.length === 0 ? (
            <StudentsTable.Empty />
          ) : (
            students.map((student) => (
              <StudentsTable.Row
                key={student.id}
                student={student}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </StudentsTable.Body>
      </StudentsTable.Container>

      {/* Student Details Dialog */}
      <StudentDetailsDialog
        student={selectedStudent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
