"use client"

import { useState } from "react"
import { ReportsStats, ReportsTable, ReportsFilters } from "./_components"
import { dummyStudents, collegeStats } from "@/app/college/_components/dummy-data"

// Dummy reports data
const dummyReports = [
  {
    id: "r1",
    title: "Alice Johnson - Performance Report",
    type: "individual" as const,
    studentName: "Alice Johnson",
    studentAvatar: undefined,
    generatedDate: "2024-01-15",
    score: 92,
    status: "completed" as const
  },
  {
    id: "r2",
    title: "Bob Smith - Progress Report",
    type: "individual" as const,
    studentName: "Bob Smith",
    studentAvatar: undefined,
    generatedDate: "2024-01-14",
    score: 78,
    status: "completed" as const
  },
  {
    id: "r3",
    title: "Monthly Performance Overview",
    type: "performance" as const,
    generatedDate: "2024-01-13",
    status: "completed" as const
  },
  {
    id: "r4",
    title: "Computer Science Major Report",
    type: "group" as const,
    generatedDate: "2024-01-12",
    status: "completed" as const
  },
  {
    id: "r5",
    title: "Carol Davis - Individual Assessment",
    type: "individual" as const,
    studentName: "Carol Davis",
    studentAvatar: undefined,
    generatedDate: "2024-01-11",
    score: 95,
    status: "processing" as const
  },
  {
    id: "r6",
    title: "Progress Tracking Report",
    type: "progress" as const,
    generatedDate: "2024-01-10",
    status: "completed" as const
  },
  {
    id: "r7",
    title: "David Wilson - Skills Assessment",
    type: "individual" as const,
    studentName: "David Wilson",
    studentAvatar: undefined,
    generatedDate: "2024-01-09",
    score: 82,
    status: "failed" as const
  },
  {
    id: "r8",
    title: "Senior Year Performance",
    type: "group" as const,
    generatedDate: "2024-01-08",
    status: "completed" as const
  }
]

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredReports = dummyReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (report.studentName && report.studentName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = typeFilter === "all" || report.type === typeFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleGenerateReport = () => {
    // Simulate report generation
    console.log("Generating new report...")
  }

  const handleExportAll = () => {
    // Simulate export functionality
    console.log("Exporting all reports...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage detailed reports for students and performance analytics
          </p>
        </div>
      </div>

      {/* Stats */}
      <ReportsStats
        totalReports={dummyReports.length}
        generatedThisMonth={8}
        averageScore={collegeStats.averageScore}
        topPerformers={collegeStats.topPerformers}
      />

      {/* Filters */}
      <ReportsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onGenerateReport={handleGenerateReport}
        onExportAll={handleExportAll}
      />

      {/* Reports Table */}
      <ReportsTable reports={filteredReports} />

      {filteredReports.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No reports found matching your criteria.
        </div>
      )}
    </div>
  )
}
