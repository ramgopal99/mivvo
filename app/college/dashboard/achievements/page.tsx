"use client"

import { useEffect, useState } from "react"
import { LoadingCompound } from "@/components/loading-compound"
import { ScoreLeaderboard, LeaderboardEntry } from "./_components"

interface StudentData {
  id: string
  name: string
  avatar?: string
  averageScore: number
  completedInterviews: number
  totalInterviews: number
}

export default function AchievementsPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Get college admin token from localStorage
        const adminToken = localStorage.getItem('college_token')
        if (!adminToken) {
          setError('No admin authentication found')
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
          const transformedData: LeaderboardEntry[] = data.data.students
            .sort((a: StudentData, b: StudentData) => b.averageScore - a.averageScore) // Sort by average score descending
            .map((student: StudentData, index: number) => ({
              rank: index + 1,
              student: {
                id: student.id,
                name: student.name,
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

      {/* Leaderboard */}
      <ScoreLeaderboard.Container>
        <ScoreLeaderboard.Header title="Students Ranked by Average Score" />
        <ScoreLeaderboard.List>
          {leaderboardData.length === 0 ? (
            <ScoreLeaderboard.Empty />
          ) : (
            leaderboardData.map((entry) => (
              <ScoreLeaderboard.Item key={entry.student.id} entry={entry} />
            ))
          )}
        </ScoreLeaderboard.List>
      </ScoreLeaderboard.Container>
    </div>
  )
}
