"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  Medal,
  Star,
  Award,
  Target,
  Calendar,
  User,
  TrendingUp
} from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  type: 'milestone' | 'improvement' | 'completion' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points: number
  unlockedBy: {
    name: string
    avatar?: string
    date: string
  }[]
  requirements: string
  totalUnlocked: number
}

interface AchievementCardProps {
  achievement: Achievement
  showRecentUnlocks?: boolean
}

export function AchievementCard({ achievement, showRecentUnlocks = false }: AchievementCardProps) {
  const getTypeIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'milestone':
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 'improvement':
        return <TrendingUp className="h-5 w-5 text-green-500" />
      case 'completion':
        return <Target className="h-5 w-5 text-blue-500" />
      case 'special':
        return <Star className="h-5 w-5 text-purple-500" />
      default:
        return <Award className="h-5 w-5 text-gray-500" />
    }
  }

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'rare':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'epic':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'legendary':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAchievementEmoji = (icon: string) => {
    // Map achievement types to emojis
    const emojiMap: Record<string, string> = {
      'first-interview': '🎯',
      'score-master': '🎪',
      'consistent-learner': '📚',
      'time-champion': '⏰',
      'team-player': '🤝',
      'perfect-score': '💎',
      'interview-streak': '🔥',
      'skill-master': '🛠️'
    }
    return emojiMap[icon] || '🏆'
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {getAchievementEmoji(achievement.icon)}
            </div>
            <div>
              <CardTitle className="text-lg">{achievement.title}</CardTitle>
              <CardDescription>{achievement.description}</CardDescription>
            </div>
          </div>
          {getTypeIcon(achievement.type)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
            {achievement.rarity}
          </Badge>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 text-yellow-500" />
            {achievement.points} points
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="mb-2"><strong>Requirements:</strong> {achievement.requirements}</p>
          <p><strong>Unlocked by:</strong> {achievement.totalUnlocked} students</p>
        </div>

        {showRecentUnlocks && achievement.unlockedBy.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Recent Unlocks:</p>
            <div className="space-y-2">
              {achievement.unlockedBy.slice(0, 3).map((unlock, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={unlock.avatar} />
                    <AvatarFallback className="text-xs">
                      {unlock.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1">{unlock.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(unlock.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
            {achievement.unlockedBy.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{achievement.unlockedBy.length - 3} more
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            {achievement.totalUnlocked} unlocked
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
