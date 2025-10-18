"use client"

import { TimeStats, TimeChart, StudentTimeBreakdown } from "./_components"
import { dummyStudents } from "@/app/college/_components/dummy-data"

// Generate weekly time data
const weeklyTimeData = [
  { day: "Mon", hours: 8.5, target: 8 },
  { day: "Tue", hours: 7.2, target: 8 },
  { day: "Wed", hours: 9.1, target: 8 },
  { day: "Thu", hours: 6.8, target: 8 },
  { day: "Fri", hours: 8.9, target: 8 },
  { day: "Sat", hours: 4.2, target: 6 },
  { day: "Sun", hours: 3.1, target: 4 }
]

// Generate student time data from dummy students
const studentTimeData = dummyStudents.map(student => ({
  id: student.id,
  name: student.name,
  avatar: student.avatar,
  totalHours: student.totalTimeSpent / 60, // Convert minutes to hours
  thisWeekHours: Math.round((student.totalTimeSpent / 60) * 0.15 * 10) / 10, // Estimate this week
  lastWeekHours: Math.round((student.totalTimeSpent / 60) * 0.12 * 10) / 10, // Estimate last week
  targetHours: 8, // 8 hours per week target
  efficiency: Math.round((student.averageScore / 100) * student.progress.overall)
})).sort((a, b) => b.thisWeekHours - a.thisWeekHours).slice(0, 5) // Top 5 students

export default function TimePage() {
  // Calculate stats from data
  const totalTimeSpent = Math.round(weeklyTimeData.reduce((acc, day) => acc + day.hours, 0))
  const averageDailyTime = Math.round((weeklyTimeData.reduce((acc, day) => acc + day.hours, 0) / 7) * 10) / 10
  const mostActiveStudents = studentTimeData.filter(s => s.thisWeekHours >= 5).length
  const timeEfficiency = Math.round(
    studentTimeData.reduce((acc, s) => acc + s.efficiency, 0) / studentTimeData.length
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Time Analytics</h1>
          <p className="text-muted-foreground">
            Monitor student time spent and efficiency across different activities
          </p>
        </div>
      </div>

      {/* Stats */}
      <TimeStats
        totalTimeSpent={totalTimeSpent}
        averageDailyTime={averageDailyTime}
        mostActiveStudents={mostActiveStudents}
        timeEfficiency={timeEfficiency}
      />

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TimeChart
          weeklyData={weeklyTimeData}
          title="Weekly Time Overview"
        />

        <StudentTimeBreakdown
          students={studentTimeData}
          title="Top Students by Time"
        />
      </div>

      {/* Additional Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Activity Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Interview Practice</span>
              </div>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Study Sessions</span>
              </div>
              <span className="font-medium">30%</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Review & Feedback</span>
              </div>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Other Activities</span>
              </div>
              <span className="font-medium">10%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Time Goals</h3>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Weekly Target</span>
                <span className="text-sm text-muted-foreground">48h</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {totalTimeSpent}h achieved
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                94% of weekly goal
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Daily Average</span>
                <span className="text-sm text-muted-foreground">7h</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {averageDailyTime}h actual
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {averageDailyTime >= 7 ? 'Goal exceeded' : 'Below target'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
