"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle } from "lucide-react"

interface Interview {
  id: string
  title: string
  type: 'technical' | 'behavioral' | 'system design' | 'mock'
  score: number
  date: string
  duration: number
  feedback: string
  skills: string[]
}

interface InterviewHistoryProps {
  interviews: Interview[]
}

export function InterviewHistory({ interviews }: InterviewHistoryProps) {
  const getInterviewTypeColor = (type: string) => {
    switch (type) {
      case 'technical': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'behavioral': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'system design': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'mock': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-3">
      {interviews.map((interview) => (
        <Card key={interview.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{interview.title}</h4>
                <Badge className={getInterviewTypeColor(interview.type)}>
                  {interview.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${getScoreColor(interview.score)}`}>
                  {interview.score}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {interview.duration}min
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{interview.feedback}</p>
            <div className="flex flex-wrap gap-1">
              {interview.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
              <Calendar className="h-3 w-3" />
              {new Date(interview.date).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
