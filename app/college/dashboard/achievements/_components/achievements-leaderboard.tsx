"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Medal, Trophy } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  student: {
    id: string
    name: string
    avatar?: string
  }
  achievements: number
  points: number
  streak: number
}

interface AchievementsLeaderboardProps {
  entries: LeaderboardEntry[]
  title: string
}

export function AchievementsLeaderboard({ entries, title }: AchievementsLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 2:
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 3:
        return 'bg-amber-100 text-amber-800 border-amber-200'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Top achievers based on points and accomplishments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.student.id}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                entry.rank <= 3 ? 'bg-muted/50' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex-shrink-0">
                  {getRankIcon(entry.rank)}
                </div>

                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.student.avatar} />
                  <AvatarFallback>
                    {entry.student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{entry.student.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-xs ${getRankBadgeColor(entry.rank)}`}>
                      Rank {entry.rank}
                    </Badge>
                    {entry.streak > 0 && (
                      <div className="flex items-center gap-1 text-xs text-orange-600">
                        <span>🔥</span>
                        <span>{entry.streak} streak</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-medium">{entry.achievements}</p>
                  <p className="text-muted-foreground text-xs">Achievements</p>
                </div>
                <div className="text-center">
                  <p className="font-medium">{entry.points}</p>
                  <p className="text-muted-foreground text-xs">Points</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No leaderboard data available.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
