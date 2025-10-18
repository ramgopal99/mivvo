"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  User,
  Play,
  Pause,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface Interview {
  id: string
  title: string
  type: 'technical' | 'behavioral' | 'system design' | 'mock'
  studentName: string
  studentAvatar?: string
  scheduledDate: string
  duration: number
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  score?: number
  description: string
}

interface InterviewCardProps {
  interview: Interview
  onStartInterview?: (id: string) => void
  onViewResults?: (id: string) => void
}

export function InterviewCard({
  interview,
  onStartInterview,
  onViewResults
}: InterviewCardProps) {
  const getStatusBadge = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="text-blue-600 border-blue-200">Scheduled</Badge>
      case 'in-progress':
        return <Badge variant="default" className="bg-yellow-500">In Progress</Badge>
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeColor = (type: Interview['type']) => {
    switch (type) {
      case 'technical':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'behavioral':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'system design':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'mock':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getActionButton = () => {
    switch (interview.status) {
      case 'scheduled':
        return (
          <Button
            onClick={() => onStartInterview?.(interview.id)}
            className="w-full"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Interview
          </Button>
        )
      case 'in-progress':
        return (
          <Button
            variant="outline"
            onClick={() => onStartInterview?.(interview.id)}
            className="w-full"
          >
            <Pause className="mr-2 h-4 w-4" />
            Resume
          </Button>
        )
      case 'completed':
        return (
          <Button
            variant="outline"
            onClick={() => onViewResults?.(interview.id)}
            className="w-full"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            View Results
          </Button>
        )
      case 'cancelled':
        return (
          <Button
            variant="outline"
            disabled
            className="w-full"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Cancelled
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={interview.studentAvatar} />
              <AvatarFallback>
                {interview.studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base truncate">{interview.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-sm">
                <User className="h-3 w-3" />
                {interview.studentName}
              </CardDescription>
            </div>
          </div>
          {getStatusBadge(interview.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <Badge variant="outline" className={getTypeColor(interview.type)}>
            {interview.type}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {interview.duration} min
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {interview.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(interview.scheduledDate).toLocaleDateString()}
          </div>
          {interview.score && (
            <div className="text-right">
              <p className="font-medium">{interview.score}%</p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
          )}
        </div>

        {interview.status === 'in-progress' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        )}

        {getActionButton()}
      </CardContent>
    </Card>
  )
}
