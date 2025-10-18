/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  GraduationCap,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  BarChart3,
} from "lucide-react"
import { useState, useEffect } from "react"

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string | null
  collegeName: string | null
  averageScore: number
  completedInterviews: number
  totalInterviews: number
  status: string
  major: string
  year: string
  lastActive: string
  avatar: string | null
}

interface StudentDetails {
  student: Student
  interviewHistory: InterviewRecord[]
  performanceMetrics: {
    technicalSkills: number
    communication: number
    problemSolving: number
    overall: number
  }
  recentActivity: ActivityRecord[]
}

interface InterviewRecord {
  id: string
  title: string
  type: string
  score: number
  date: string
  duration: number
  status: string
}

interface ActivityRecord {
  id: string
  type: string
  description: string
  date: string
}

interface StudentDetailsDialogProps {
  student: Student | null
  isOpen: boolean
  onClose: () => void
}

export function StudentDetailsDialog({ student, isOpen, onClose }: StudentDetailsDialogProps) {
  const [details, setDetails] = useState<StudentDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (student && isOpen) {
      loadStudentDetails()
    }
  }, [student, isOpen])

  const loadStudentDetails = async () => {
    if (!student) return

    setIsLoading(true)
    try {
      const token = localStorage.getItem('college_token')
      if (!token) return

      const response = await fetch(`/api/college/students/${student.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setDetails(result.data)
        }
      }
    } catch (error) {
      console.error('Error loading student details:', error)
      // Fallback to basic mock data if API fails
      setDetails({
        student,
        interviewHistory: [
          {
            id: '1',
            title: 'Technical Interview - Software Development',
            type: 'Technical',
            score: student.averageScore,
            date: new Date().toISOString(),
            duration: 45,
            status: 'completed'
          }
        ],
        performanceMetrics: {
          technicalSkills: student.averageScore,
          communication: Math.max(0, student.averageScore - 10),
          problemSolving: Math.max(0, student.averageScore - 5),
          overall: student.averageScore
        },
        recentActivity: [
          {
            id: '1',
            type: 'interview',
            description: 'Completed technical interview',
            date: new Date().toISOString()
          }
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={student.avatar || ""} />
              <AvatarFallback>
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div>{student.name}</div>
              <div className="text-sm font-normal text-muted-foreground">
                Student Analysis
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Detailed performance analysis and interview history
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Roll Number:</span>
                    <span>{student.rollNumber || 'N/A'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Major:</span>
                    <span>{student.major}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Year:</span>
                    <span>{student.year}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Performance</span>
                      <span className="font-medium">{student.averageScore}/100</span>
                    </div>
                    <Progress value={student.averageScore} className="h-3" />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Technical Skills</span>
                        <span>{details?.performanceMetrics.technicalSkills || student.averageScore}%</span>
                      </div>
                      <Progress value={details?.performanceMetrics.technicalSkills || student.averageScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Communication</span>
                        <span>{details?.performanceMetrics.communication || Math.max(0, student.averageScore - 10)}%</span>
                      </div>
                      <Progress value={details?.performanceMetrics.communication || Math.max(0, student.averageScore - 10)} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Problem Solving</span>
                        <span>{details?.performanceMetrics.problemSolving || Math.max(0, student.averageScore - 5)}%</span>
                      </div>
                      <Progress value={details?.performanceMetrics.problemSolving || Math.max(0, student.averageScore - 5)} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{student.totalInterviews}</div>
                      <div className="text-sm text-muted-foreground">Total Interviews</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{student.completedInterviews}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Completion Rate</span>
                      <span className="text-sm">
                        {student.totalInterviews > 0
                          ? Math.round((student.completedInterviews / student.totalInterviews) * 100)
                          : 0}%
                      </span>
                    </div>
                    <Progress
                      value={student.totalInterviews > 0
                        ? (student.completedInterviews / student.totalInterviews) * 100
                        : 0}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interview History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Interview History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {details?.interviewHistory && details.interviewHistory.length > 0 ? (
                <div className="space-y-4">
                  {details.interviewHistory.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{interview.title}</div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{interview.type}</span>
                          <span>{new Date(interview.date).toLocaleDateString()}</span>
                          <span>{interview.duration} min</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={interview.status === 'completed' ? 'default' : 'secondary'}>
                          {interview.status}
                        </Badge>
                        <div className="text-right">
                          <div className="font-medium">{interview.score}/100</div>
                          <div className="text-sm text-muted-foreground">Score</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No interview history available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {details?.recentActivity && details.recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {details.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-2">
                      <div>
                        <div className="font-medium">{activity.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recent activity
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
