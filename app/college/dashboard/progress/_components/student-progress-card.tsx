"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { GraduationCap, Clock, Mail } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  major: string
  year: string
  gpa: number
  status: 'active' | 'inactive' | 'graduated'
  totalInterviews: number
  completedInterviews: number
  averageScore: number
  totalTimeSpent: number
  lastActivity: string
  progress: {
    technicalSkills: number
    communication: number
    problemSolving: number
    overall: number
  }
  recentInterviews: Interview[]
  achievements: Achievement[]
}

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

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: 'milestone' | 'improvement' | 'completion'
}

interface StudentProgressCardProps {
  student: Student
}

export function StudentProgressCard({ student }: StudentProgressCardProps) {
  const getProgressColor = (value: number) => {
    if (value >= 90) return "text-green-600"
    if (value >= 80) return "text-blue-600"
    if (value >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'inactive': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'graduated': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar} />
              <AvatarFallback>
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{student.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {student.email}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(student.status)}>
            {student.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>{student.major}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{student.year}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span className={`font-medium ${getProgressColor(student.progress.overall)}`}>
                {student.progress.overall}%
              </span>
            </div>
            <Progress value={student.progress.overall} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Technical</span>
              <div className={`font-medium ${getProgressColor(student.progress.technicalSkills)}`}>
                {student.progress.technicalSkills}%
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Communication</span>
              <div className={`font-medium ${getProgressColor(student.progress.communication)}`}>
                {student.progress.communication}%
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Problem Solving</span>
              <div className={`font-medium ${getProgressColor(student.progress.problemSolving)}`}>
                {student.progress.problemSolving}%
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-lg font-bold">{student.completedInterviews}</div>
            <div className="text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold">{student.averageScore}%</div>
            <div className="text-muted-foreground">Avg Score</div>
          </div>
          <div>
            <div className="text-lg font-bold">{Math.round(student.totalTimeSpent / 60)}h</div>
            <div className="text-muted-foreground">Time Spent</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Last active: {new Date(student.lastActivity).toLocaleDateString()}
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
