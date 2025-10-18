"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dummyStudents, Student } from "@/app/college/_components/dummy-data"
import { useState } from "react"
import {
  ProgressStats,
  StudentProgressCard,
  ProgressFilters,
  StudentDetails
} from "./_components"

export default function ProgressPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [sortBy, setSortBy] = useState("overall")
  const [filterBy, setFilterBy] = useState("all")

  const filteredStudents = dummyStudents.filter(student => {
    if (filterBy === "all") return true
    return student.status === filterBy
  })

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "overall":
        return b.progress.overall - a.progress.overall
      case "score":
        return b.averageScore - a.averageScore
      case "interviews":
        return b.completedInterviews - a.completedInterviews
      case "activity":
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      default:
        return 0
    }
  })

  // Calculate stats
  const totalStudents = filteredStudents.length
  const avgProgress = Math.round(filteredStudents.reduce((acc, s) => acc + s.progress.overall, 0) / filteredStudents.length)
  const topPerformer = Math.max(...filteredStudents.map(s => s.averageScore))
  const activeToday = filteredStudents.filter(s => {
    const today = new Date().toDateString()
    return new Date(s.lastActivity).toDateString() === today
  }).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Progress Tracking</h1>
          <p className="text-muted-foreground">
            Monitor individual student development and performance trends
          </p>
        </div>
        <ProgressFilters
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
        />
      </div>

      {/* Summary Stats */}
      <ProgressStats
        totalStudents={totalStudents}
        avgProgress={avgProgress}
        topPerformer={topPerformer}
        activeToday={activeToday}
      />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Overview</CardTitle>
              <CardDescription>
                Individual student performance and development tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {sortedStudents.map((student) => (
                  <StudentProgressCard
                    key={student.id}
                    student={student}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed View */}
        <StudentDetails student={selectedStudent} />
      </div>
    </div>
  )
}
