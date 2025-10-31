"use client"

import { useEffect, useState } from "react"
import { LoadingCompound } from "@/components/loading-compound"
import { ScoreLeaderboard, LeaderboardEntry } from "./_components"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Users } from "lucide-react"

interface ApiStudentResponse {
  id: string
  name: string
  email: string | null
  rollNumber: string | null
  avatar: string | null
  averageScore: number
  completedInterviews: number
  totalInterviews: number
}

export default function AchievementsPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState("50")
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
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

        // Fetch students data from API and sort by average score
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
          // Transform API data to leaderboard format, sorted by average score
          const transformedData: LeaderboardEntry[] = (data.data.students as ApiStudentResponse[])
            .sort((a: ApiStudentResponse, b: ApiStudentResponse) => b.averageScore - a.averageScore) // Sort by average score descending
            .map((student: ApiStudentResponse, index: number) => ({
              rank: index + 1,
              student: {
                id: student.id,
                name: student.name,
                email: student.email || '',
                rollNumber: student.rollNumber || '',
                avatar: student.avatar
              },
              averageScore: student.averageScore,
              completedInterviews: student.completedInterviews || 0,
              totalInterviews: student.totalInterviews || 0
            }))

          setLeaderboardData(transformedData)
        } else {
          throw new Error('Invalid API response')
        }
      } catch (err) {
        console.error('Error fetching leaderboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])

  // Get paginated data based on itemsPerPage setting
  const getPaginatedData = () => {
    if (itemsPerPage === "all") {
      return leaderboardData
    }
    const limit = parseInt(itemsPerPage)
    return leaderboardData.slice(0, limit)
  }

  // CSV download function
  const downloadCSV = () => {
    setDownloading(true)

    try {
      // Get full leaderboard data to include email and roll number
      const csvContent = [
        ['Rank', 'Student Name', 'Email', 'Roll Number', 'Average Score (%)', 'Completed Interviews', 'Total Interviews'],
        ...leaderboardData.map(entry => [
          entry.rank,
          entry.student.name,
          entry.student.email || 'N/A',
          entry.student.rollNumber || 'N/A',
          entry.averageScore,
          entry.completedInterviews,
          entry.totalInterviews
        ])
      ]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `student-achievements-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error generating CSV:', error)
    } finally {
      setDownloading(false)
    }
  }

  const paginatedData = getPaginatedData()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingCompound 
          text="Loading leaderboard" 
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
            <h1 className="text-3xl font-bold tracking-tight">Score Leaderboard</h1>
            <p className="text-muted-foreground">
              Ranking students by their average interview performance
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
          <h1 className="text-3xl font-bold tracking-tight">Score Leaderboard</h1>
          <p className="text-muted-foreground">
            Ranking students by their average interview performance
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Show:</span>
          </div>
          <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of {leaderboardData.length} students
          </span>
        </div>

        <Button
          onClick={downloadCSV}
          disabled={downloading || leaderboardData.length === 0}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {downloading ? "Downloading..." : "Download CSV"}
        </Button>
      </div>

      {/* Leaderboard */}
      <ScoreLeaderboard.Container>
        <ScoreLeaderboard.Header title={`Students Ranked by Average Score (${paginatedData.length})`} />
        <ScoreLeaderboard.List>
          {paginatedData.length === 0 ? (
            <ScoreLeaderboard.Empty />
          ) : (
            paginatedData.map((entry) => (
              <ScoreLeaderboard.Item key={entry.student.id} entry={entry} />
            ))
          )}
        </ScoreLeaderboard.List>
      </ScoreLeaderboard.Container>
    </div>
  )
}
