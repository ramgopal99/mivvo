"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, TrendingUp, TrendingDown } from "lucide-react"

interface StudentTimeData {
  id: string
  name: string
  avatar?: string
  totalHours: number // total minutes
  thisMonthHours: number // this month minutes
  lastMonthHours: number // last month minutes
  targetHours: number // total time allowance in minutes
  usedHours: number // used time in minutes
  efficiency: number
  branch?: string
  course?: string
}

interface StudentTimeBreakdownProps {
  students: StudentTimeData[]
  title: string
}

export function StudentTimeBreakdown({ students, title }: StudentTimeBreakdownProps) {
  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Student time usage in minutes against allocated allowances
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {students.map((student) => (
            <div key={student.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={student.avatar} />
                <AvatarFallback>
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium truncate">{student.name}</p>
                  {getTrendIcon(student.usedHours, student.thisMonthHours)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Time Used</span>
                    <span className="font-medium">{Math.round(student.usedHours)}min / {Math.round(student.targetHours)}min</span>
                  </div>
                  <Progress
                    value={(student.usedHours / student.targetHours) * 100}
                    className="h-2"
                  />
                </div>


                {(student.branch || student.course) && (
                  <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                    {student.branch && <span>Branch: {student.branch}</span>}
                    {student.course && <span>Course: {student.course}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No student time data available.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
