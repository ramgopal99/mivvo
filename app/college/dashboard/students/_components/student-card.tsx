"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, Mail, GraduationCap } from "lucide-react"

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

interface StudentCardProps {
  student: Student
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={student.avatar || ""} />
            <AvatarFallback>
              {student.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">{student.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <Mail className="h-3 w-3" />
              {student.email}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            {student.major}
          </span>
          <Badge variant="outline">{student.year}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Performance Score</span>
            <span className="font-medium">{student.averageScore}/100</span>
          </div>
          <Progress value={student.averageScore} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Interviews</p>
            <p className="font-medium">{student.completedInterviews}/{student.totalInterviews}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Roll Number</p>
            <p className="font-medium">{student.rollNumber || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Status: {student.status}
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
