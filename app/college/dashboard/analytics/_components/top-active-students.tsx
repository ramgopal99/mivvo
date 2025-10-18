"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ActiveStudent {
  id: string
  name: string
  timeSpent: number
  interviews: number
}

interface TopActiveStudentsProps {
  students: ActiveStudent[]
}

export function TopActiveStudents({ students }: TopActiveStudentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Active Students</CardTitle>
        <CardDescription>
          Most engaged students this month
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {students.map((student, index) => (
          <div key={student.id} className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{student.name}</p>
              <p className="text-xs text-muted-foreground">
                {student.timeSpent} minutes • {student.interviews} interviews
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
