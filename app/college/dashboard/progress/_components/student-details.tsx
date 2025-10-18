"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { User } from "lucide-react"
import { InterviewHistory } from "./interview-history"

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

interface StudentDetailsProps {
  student: Student | null
}

export function StudentDetails({ student }: StudentDetailsProps) {
  if (!student) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
          <CardDescription>
            Select a student to view detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a student to view detailed information</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Details</CardTitle>
        <CardDescription>
          Detailed progress and interview history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="text-lg">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.email}</p>
              <p className="text-sm text-muted-foreground">
                {student.major} • {student.year}
              </p>
            </div>
          </div>

          <Tabs defaultValue="progress" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
            </TabsList>

            <TabsContent value="progress" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Technical Skills</span>
                    <span className="font-medium">{student.progress.technicalSkills}%</span>
                  </div>
                  <Progress value={student.progress.technicalSkills} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Communication</span>
                    <span className="font-medium">{student.progress.communication}%</span>
                  </div>
                  <Progress value={student.progress.communication} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Problem Solving</span>
                    <span className="font-medium">{student.progress.problemSolving}%</span>
                  </div>
                  <Progress value={student.progress.problemSolving} className="h-2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
                <div>
                  <span className="text-muted-foreground">GPA</span>
                  <div className="font-medium">{student.gpa}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Achievements</span>
                  <div className="font-medium">{student.achievements.length}</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interviews" className="mt-4">
              <InterviewHistory interviews={student.recentInterviews} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
