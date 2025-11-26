"use client"

import { useEffect, useState } from "react"
import { LoadingCompound } from "@/components/loading-compound"
import { StudentTimeBreakdown } from "./_components"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface StudentTimeData {
  id: string
  name: string
  avatar: string | undefined
  totalHours: number // total minutes
  thisMonthHours: number // this month minutes
  lastMonthHours: number // last month minutes
  targetHours: number // total time allowance in minutes
  usedHours: number // used time in minutes
  efficiency: number
  branch?: string
  course?: string
}

interface ApiStudentData {
  id: string
  name: string
  avatar?: string
  totalTimeSpent?: number
  thisMonthTimeSpent?: number
  lastMonthTimeSpent?: number
  averageScore?: number
  totalCreditAllocation?: number
  usedCredits?: number
  branch?: string
  course?: string
}

export default function TimePage() {
  const [studentTimeData, setStudentTimeData] = useState<StudentTimeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState("")
  const [branchFilter, setBranchFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")

  // Filter data based on search and filters
  const filteredStudents = studentTimeData.filter(student => {
    const matchesSearch = searchTerm === "" ||
      student.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBranch = branchFilter === "all" || (student.branch && student.branch === branchFilter)
    const matchesCourse = courseFilter === "all" || (student.course && student.course === courseFilter)

    return matchesSearch && matchesBranch && matchesCourse
  })

  // Get unique values for filter dropdowns
  const uniqueBranches = Array.from(new Set(
    studentTimeData
      .map(s => s.branch)
      .filter((branch): branch is string => branch !== null && branch !== undefined && branch.trim() !== '')
  ))
  const uniqueCourses = Array.from(new Set(
    studentTimeData
      .map(s => s.course)
      .filter((course): course is string => course !== null && course !== undefined && course.trim() !== '')
  ))

  useEffect(() => {
    const fetchStudentTimeData = async () => {
      try {
        // Get authentication token (supports multiple token types)
        const adminToken = localStorage.getItem('token') ||
                          localStorage.getItem('college_token') ||
                          localStorage.getItem('student_token')
        if (!adminToken) {
          setError('No authentication token found. Please log in.')
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
            totalHours: Math.round(student.totalTimeSpent || 0), // Keep in minutes as integer
            thisMonthHours: Math.round(student.thisMonthTimeSpent || 0), // Keep in minutes as integer
            lastMonthHours: Math.round(student.lastMonthTimeSpent || 0), // Keep in minutes as integer
            targetHours: Math.round(student.totalCreditAllocation || 30), // Keep totalCreditAllocation in credits as integer (default 30 credits)
            usedHours: Math.round(student.usedCredits || 0), // Keep usedCredits in credits as integer
            efficiency: Math.round(student.averageScore || 0), // Use average score as efficiency
            branch: student.branch,
            course: student.course
          })).sort((a: StudentTimeData, b: StudentTimeData) => b.thisMonthHours - a.thisMonthHours) // Sort by this month minutes

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
            <h1 className="text-3xl font-bold tracking-tight">Student Monthly Time Analysis</h1>
            <p className="text-muted-foreground">
              View student monthly time spent on interview practice
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
          <h1 className="text-3xl font-bold tracking-tight">Student Credit Allocation Analysis</h1>
          <p className="text-muted-foreground">
            View student credit usage against their allocated allowances
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-gray-50 rounded-lg border">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="all">All Branches</SelectItem>
              {uniqueBranches.map(branch => (
                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="all">All Courses</SelectItem>
              {uniqueCourses.map(course => (
                <SelectItem key={course} value={course}>{course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Student Time Breakdown */}
      <StudentTimeBreakdown
        students={filteredStudents}
        title={`Students by Time Usage (${filteredStudents.length})`}
      />
    </div>
  )
}
