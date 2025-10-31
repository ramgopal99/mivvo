"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { LoadingCompound } from "@/components/loading-compound"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, X, Download, FileText } from "lucide-react"
import { ProgressTable, Student } from "./_components"

export default function ProgressPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState<string>("all")
  const [selectedCourse, setSelectedCourse] = useState<string>("all")

  const handleViewDetails = (student: Student) => {
    // Navigate to student details page
    router.push(`/college/dashboard/progress/${student.id}`)
  }

  // Create filter options from unique values
  const filterOptions = useMemo(() => {
    const branches = [...new Set(students.map(s => s.branch).filter((b): b is string => b !== null && b !== undefined && b.trim() !== ''))]
    const courses = [...new Set(students.map(s => s.course).filter((c): c is string => c !== null && c !== undefined && c.trim() !== ''))]

    return {
      branches: branches.sort(),
      courses: courses.sort()
    }
  }, [students])

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = !searchTerm ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.rollNumber && student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesBranch = selectedBranch === "" || selectedBranch === "all" || student.branch === selectedBranch
      const matchesCourse = selectedCourse === "" || selectedCourse === "all" || student.course === selectedCourse

      return matchesSearch && matchesBranch && matchesCourse
    })
  }, [students, searchTerm, selectedBranch, selectedCourse])

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedBranch("all")
    setSelectedCourse("all")
  }

  // CSV export functions
  const convertToCSV = (data: Student[], includeAllFields = false) => {
    const headers = [
      'Name',
      'Email',
      'Roll Number',
      'College Name',
      'Branch',
      'Course',
      'Course Duration',
      'Year',
      'Average Score',
      'Completed Interviews',
      'Total Interviews',
      'Total Time Spent (minutes)',
      'This Week Time Spent (minutes)',
      'Last Week Time Spent (minutes)',
      'Status'
    ]

    if (!includeAllFields) {
      // Basic fields for quick reports
      const basicHeaders = ['Name', 'Email', 'Roll Number', 'Branch', 'Course', 'Average Score', 'Total Interviews']
      const csvContent = [
        basicHeaders.join(','),
        ...data.map(student => [
          `"${student.name}"`,
          `"${student.email}"`,
          `"${student.rollNumber || ''}"`,
          `"${student.branch || ''}"`,
          `"${student.course || ''}"`,
          student.averageScore,
          student.totalInterviews
        ].join(','))
      ].join('\n')
      return csvContent
    }

    // Detailed report with all fields
    const csvContent = [
      headers.join(','),
      ...data.map(student => [
        `"${student.name}"`,
        `"${student.email}"`,
        `"${student.rollNumber || ''}"`,
        `"${student.collegeName || ''}"`,
        `"${student.branch || ''}"`,
        `"${student.course || ''}"`,
        `"${student.courseDuration || ''}"`,
        `"${student.year || ''}"`,
        student.averageScore,
        student.completedInterviews,
        student.totalInterviews,
        student.totalTimeSpent,
        student.thisWeekTimeSpent,
        student.lastWeekTimeSpent,
        `"${student.status}"`
      ].join(','))
    ].join('\n')

    return csvContent
  }

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportAllStudents = () => {
    const csvContent = convertToCSV(students, true)
    const timestamp = new Date().toISOString().split('T')[0]
    downloadCSV(csvContent, `all_students_progress_${timestamp}.csv`)
  }

  const handleExportFilteredStudents = () => {
    const csvContent = convertToCSV(filteredStudents, true)
    const timestamp = new Date().toISOString().split('T')[0]
    const filters = []
    if (searchTerm) filters.push('search')
    if (selectedBranch !== 'all') filters.push('branch')
    if (selectedCourse !== 'all') filters.push('course')
    const filterSuffix = filters.length > 0 ? `_${filters.join('_')}` : ''
    downloadCSV(csvContent, `filtered_students_progress${filterSuffix}_${timestamp}.csv`)
  }

  const handleExportBasicReport = () => {
    const csvContent = convertToCSV(filteredStudents, false)
    const timestamp = new Date().toISOString().split('T')[0]
    downloadCSV(csvContent, `students_basic_report_${timestamp}.csv`)
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

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-2">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {filterOptions.branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {filterOptions.courses.map((course) => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters Button */}
            {(searchTerm || (selectedBranch && selectedBranch !== "all") || (selectedCourse && selectedCourse !== "all")) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}

            {/* Download Reports Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportBasicReport}>
                  <FileText className="mr-2 h-4 w-4" />
                  Basic Report (Current View)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportFilteredStudents}>
                  <FileText className="mr-2 h-4 w-4" />
                  Detailed Report (Filtered)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportAllStudents}>
                  <FileText className="mr-2 h-4 w-4" />
                  All Students Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filter Summary */}
        {(searchTerm || (selectedBranch && selectedBranch !== "all") || (selectedCourse && selectedCourse !== "all")) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>
              Showing {filteredStudents.length} of {students.length} students
              {(searchTerm || (selectedBranch && selectedBranch !== "all") || (selectedCourse && selectedCourse !== "all")) && (
                <span className="ml-2">
                  {searchTerm && ` • Search: "${searchTerm}"`}
                  {selectedBranch && selectedBranch !== "all" && ` • Branch: ${selectedBranch}`}
                  {selectedCourse && selectedCourse !== "all" && ` • Course: ${selectedCourse}`}
                </span>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Students Table */}
      <ProgressTable.Container>
        <ProgressTable.Header>
          <ProgressTable.HeaderCell>Student</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Roll Number</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Branch</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Course</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Interviews</ProgressTable.HeaderCell>
          <ProgressTable.HeaderCell>Actions</ProgressTable.HeaderCell>
        </ProgressTable.Header>
        <ProgressTable.Body>
          {filteredStudents.length === 0 ? (
            <ProgressTable.Empty
              message={
                students.length === 0
                  ? "No students found"
                  : "No students match the current filters"
              }
            />
          ) : (
            filteredStudents.map((student) => (
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
