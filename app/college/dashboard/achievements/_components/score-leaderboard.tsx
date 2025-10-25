import React from 'react'

interface LeaderboardEntry {
  rank: number
  student: {
    id: string
    name: string
    avatar: string | null
  }
  averageScore: number
  completedInterviews: number
  totalInterviews: number
}

interface ScoreLeaderboardProps {
  children: React.ReactNode
}

interface LeaderboardHeaderProps {
  title: string
}

interface LeaderboardListProps {
  children: React.ReactNode
}

interface LeaderboardItemProps {
  entry: LeaderboardEntry
}

interface LeaderboardEmptyProps {
  message?: string
}

function LeaderboardHeader({ title }: LeaderboardHeaderProps) {
  return <h3 className="text-lg font-semibold mb-4">{title}</h3>
}

function LeaderboardList({ children }: LeaderboardListProps) {
  return <div className="space-y-4">{children}</div>
}

function LeaderboardItem({ entry }: LeaderboardItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold text-sm">
          {entry.rank}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium">
              {entry.student.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="font-medium">{entry.student.name}</div>
            <div className="text-sm text-muted-foreground">
              {entry.completedInterviews}/{entry.totalInterviews} interviews completed
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-primary">
          {entry.averageScore}%
        </div>
        <div className="text-sm text-muted-foreground">Average Score</div>
      </div>
    </div>
  )
}

function LeaderboardEmpty({ message = "No student data available" }: LeaderboardEmptyProps) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      {message}
    </div>
  )
}

function LeaderboardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6">{children}</div>
    </div>
  )
}

// Compound component pattern
function ScoreLeaderboard({ children }: ScoreLeaderboardProps) {
  return <>{children}</>
}

ScoreLeaderboard.Container = LeaderboardContainer
ScoreLeaderboard.Header = LeaderboardHeader
ScoreLeaderboard.List = LeaderboardList
ScoreLeaderboard.Item = LeaderboardItem
ScoreLeaderboard.Empty = LeaderboardEmpty

export { ScoreLeaderboard }
export type { LeaderboardEntry }
