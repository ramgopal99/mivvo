"use client"

import { Button } from "@/components/ui/button"
import { Users, Loader2 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  StudentsFilters
} from "./_components"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string | null
  collegeName: string | null
  averageScore: number
  completedInterviews: number
  totalInterviews: number
  status: string
  major: string
  year: string
  lastActive: string
  avatar: string | null
}

interface StudentsData {
  students: Student[]
  stats: {
    totalStudents: number
    activeStudents: number
    averageScore: number
    totalInterviews: number
  }
  filters: {
    majors: string[]
    years: string[]
  }
  pagination: {
    page: number
    limit: number
    totalStudents: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export default function StudentsPage() {
  const [data, setData] = useState<StudentsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [majorFilter, setMajorFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)

  const loadStudentsData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('college_token')
      if (!token) {
        setError('No authentication token found')
        return
      }

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString()
      })

      const response = await fetch(`/api/college/students?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch students data')
      }

      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error || 'Failed to load students data')
      }
    } catch (err) {
      console.error('Error loading students data:', err)
      setError('An error occurred while loading students data')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, pageSize])

  useEffect(() => {
    loadStudentsData()
  }, [loadStudentsData])

  useEffect(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1)
  }, [searchTerm, majorFilter, yearFilter])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading students...</span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || 'Failed to load students data'}</p>
        <Button onClick={loadStudentsData} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  const filteredStudents = data.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesMajor = majorFilter === "all" || student.major === majorFilter
    const matchesYear = yearFilter === "all" || student.year === yearFilter

    return matchesSearch && matchesMajor && matchesYear
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            View all students and their interview performance
          </p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <StudentsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        majorFilter={majorFilter}
        onMajorFilterChange={setMajorFilter}
        yearFilter={yearFilter}
        onYearFilterChange={setYearFilter}
        majors={data.filters.majors}
        years={data.filters.years}
      />

      {/* Students Table */}
      <div className="border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Student</th>
                <th className="text-left p-4 font-medium">Roll Number</th>
                <th className="text-left p-4 font-medium">Interviews</th>
                <th className="text-left p-4 font-medium">Performance</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    {student.rollNumber || 'N/A'}
                  </td>
                  <td className="p-4 text-sm">
                    {student.completedInterviews}/{student.totalInterviews}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{student.averageScore}/100</div>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${student.averageScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link href={`/college/dashboard/students/${student.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No students found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {data && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="border rounded px-2 py-1 text-sm"
                aria-label="Number of students per page"
              >
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, data.pagination.totalStudents)} of {data.pagination.totalStudents} students
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!data.pagination.hasPrevPage}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(data.pagination.totalPages - 4, currentPage - 2)) + i
                if (pageNum > data.pagination.totalPages) return null

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(data.pagination.totalPages, prev + 1))}
              disabled={!data.pagination.hasNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
