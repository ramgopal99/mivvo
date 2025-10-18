"use client"

import { useState } from "react"
import { InterviewsStats, InterviewCard, InterviewsFilters } from "./_components"
import { dummyStudents } from "@/app/college/_components/dummy-data"

// Generate dummy interviews from student data
const dummyInterviews = [
  {
    id: "i1",
    title: "Frontend Developer Interview",
    type: "technical" as const,
    studentName: "Alice Johnson",
    studentAvatar: undefined,
    scheduledDate: "2024-01-16",
    duration: 45,
    status: "scheduled" as const,
    score: undefined,
    description: "Technical interview focusing on React, JavaScript, and frontend development best practices."
  },
  {
    id: "i2",
    title: "Behavioral Interview",
    type: "behavioral" as const,
    studentName: "Alice Johnson",
    studentAvatar: undefined,
    scheduledDate: "2024-01-15",
    duration: 30,
    status: "completed" as const,
    score: 88,
    description: "Behavioral questions assessing communication skills and team collaboration."
  },
  {
    id: "i3",
    title: "System Design Interview",
    type: "system design" as const,
    studentName: "Bob Smith",
    studentAvatar: undefined,
    scheduledDate: "2024-01-16",
    duration: 60,
    status: "in-progress" as const,
    score: undefined,
    description: "System design questions covering scalability, architecture, and design patterns."
  },
  {
    id: "i4",
    title: "Full Stack Developer Mock",
    type: "mock" as const,
    studentName: "Carol Davis",
    studentAvatar: undefined,
    scheduledDate: "2024-01-17",
    duration: 90,
    status: "scheduled" as const,
    score: undefined,
    description: "Comprehensive mock interview covering both frontend and backend technologies."
  },
  {
    id: "i5",
    title: "Data Analyst Technical",
    type: "technical" as const,
    studentName: "David Wilson",
    studentAvatar: undefined,
    scheduledDate: "2024-01-14",
    duration: 40,
    status: "completed" as const,
    score: 85,
    description: "Technical assessment focusing on SQL, Python, and data analysis skills."
  },
  {
    id: "i6",
    title: "Cybersecurity Interview",
    type: "technical" as const,
    studentName: "Eva Martinez",
    studentAvatar: undefined,
    scheduledDate: "2024-01-13",
    duration: 50,
    status: "completed" as const,
    score: 78,
    description: "Security-focused interview covering networking, encryption, and best practices."
  }
]

export default function InterviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredInterviews = dummyInterviews.filter(interview => {
    const matchesSearch = interview.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || interview.type === typeFilter
    const matchesStatus = statusFilter === "all" || interview.status === statusFilter

    let matchesDate = true
    if (dateFilter !== "all") {
      const interviewDate = new Date(interview.scheduledDate)
      const today = new Date()
      const weekFromNow = new Date()
      weekFromNow.setDate(today.getDate() + 7)
      const monthFromNow = new Date()
      monthFromNow.setMonth(today.getMonth() + 1)

      switch (dateFilter) {
        case "today":
          matchesDate = interviewDate.toDateString() === today.toDateString()
          break
        case "week":
          matchesDate = interviewDate >= today && interviewDate <= weekFromNow
          break
        case "month":
          matchesDate = interviewDate >= today && interviewDate <= monthFromNow
          break
      }
    }

    return matchesSearch && matchesType && matchesStatus && matchesDate
  })

  const handleScheduleInterview = () => {
    // Simulate scheduling new interview
    console.log("Scheduling new interview...")
  }

  const handleStartInterview = (id: string) => {
    // Simulate starting interview
    console.log("Starting interview:", id)
  }

  const handleViewResults = (id: string) => {
    // Simulate viewing results
    console.log("Viewing results for interview:", id)
  }

  // Calculate stats
  const scheduledToday = filteredInterviews.filter(i =>
    i.scheduledDate === new Date().toISOString().split('T')[0] && i.status === 'scheduled'
  ).length

  const averageDuration = Math.round(
    filteredInterviews.reduce((acc, i) => acc + i.duration, 0) / filteredInterviews.length
  )

  const completionRate = Math.round(
    (filteredInterviews.filter(i => i.status === 'completed').length / filteredInterviews.length) * 100
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview Prep</h1>
          <p className="text-muted-foreground">
            Schedule and manage mock interviews for students
          </p>
        </div>
      </div>

      {/* Stats */}
      <InterviewsStats
        totalInterviews={dummyInterviews.length}
        scheduledToday={scheduledToday}
        averageDuration={averageDuration}
        completionRate={completionRate}
      />

      {/* Filters */}
      <InterviewsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        onScheduleInterview={handleScheduleInterview}
      />

      {/* Interviews Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredInterviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            interview={interview}
            onStartInterview={handleStartInterview}
            onViewResults={handleViewResults}
          />
        ))}
      </div>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No interviews found matching your criteria.
        </div>
      )}
    </div>
  )
}
