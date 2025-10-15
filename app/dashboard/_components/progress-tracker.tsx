"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, TrendingUp } from "lucide-react"

interface ProgressTrackerProps {
  progress: {
    interviewsCompleted: number
    targetInterviews: number
    timeSpent: number // in minutes
    targetTime: number // in minutes
    currentStreak: number
    bestStreak: number
    averageScore: number
    improvementRate: number // percentage improvement over time
  }
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
  const interviewProgress = (progress.interviewsCompleted / progress.targetInterviews) * 100
  const timeProgress = (progress.timeSpent / progress.targetTime) * 100

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Your Progress
        </CardTitle>
        <CardDescription>
          Track your mock interview journey and goals
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-start space-y-6 pb-6 h-full">
        {/* Interview Goals */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Interview Goal</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {progress.interviewsCompleted}/{progress.targetInterviews}
            </span>
          </div>
          <Progress value={interviewProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Complete {progress.targetInterviews - progress.interviewsCompleted} more interviews to reach your goal
          </p>
        </div>

        {/* Time Goals */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Practice Time</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {Math.floor(progress.timeSpent / 60)}h / {Math.floor(progress.targetTime / 60)}h
            </span>
          </div>
          <Progress value={timeProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {Math.floor((progress.targetTime - progress.timeSpent) / 60)} hours remaining
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{progress.averageScore}%</div>
            <div className="text-xs text-muted-foreground">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">+{progress.improvementRate}%</div>
            <div className="text-xs text-muted-foreground">Improvement</div>
          </div>
        </div>

        {/* Streaks */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <div>
              <div className="text-sm font-medium">Current Streak</div>
              <div className="text-xs text-muted-foreground">
                {progress.currentStreak} interviews
              </div>
            </div>
          </div>
          <Badge variant={progress.currentStreak > 0 ? "default" : "secondary"}>
            {progress.currentStreak > 0 ? `🔥 ${progress.currentStreak}` : "Start a streak!"}
          </Badge>
        </div>

        {/* Next Goals */}
        <div className="pt-4 border-t space-y-3">
          <div className="text-sm font-medium text-muted-foreground">Next Goals</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>🎯 Reach 90% average score</span>
              <span className="text-xs text-muted-foreground">
                {90 - progress.averageScore}% to go
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>⏰ Complete 5-hour practice</span>
              <span className="text-xs text-muted-foreground">
                {Math.floor((progress.targetTime - progress.timeSpent) / 60)}h left
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>🔥 7-day streak</span>
              <span className="text-xs text-muted-foreground">
                {7 - progress.currentStreak} more days
              </span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="pt-4 border-t space-y-2">
          <div className="text-sm font-medium text-muted-foreground">💡 Quick Tip</div>
          <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg">
            {progress.averageScore < 70
              ? "Focus on STAR method (Situation, Task, Action, Result) for behavioral questions."
              : progress.currentStreak < 3
              ? "Consistency is key! Try to practice daily to build strong interview habits."
              : "Great progress! Consider practicing with different interview types to broaden your skills."
            }
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
