"use client"

import { useState } from "react"
import { AdminCollegesStats, AdminCollegesTable, AdminCollegesFilters } from "./_components"

// Dummy admin colleges data
const dummyAdminColleges = [
  {
    id: "1",
    name: "Central University",
    logo: undefined,
    domain: "centraluniversity.edu",
    status: "active" as const,
    adminName: "Dr. Sarah Johnson",
    adminEmail: "sarah.johnson@centraluniversity.edu",
    totalUsers: 245,
    monthlyRevenue: 14700,
    createdAt: "2023-01-15T08:00:00Z",
    lastActivity: "2024-01-16T10:30:00Z",
    plan: "professional" as const
  },
  {
    id: "2",
    name: "Tech Institute",
    logo: undefined,
    domain: "techinstitute.edu",
    status: "active" as const,
    adminName: "Prof. Michael Chen",
    adminEmail: "michael.chen@techinstitute.edu",
    totalUsers: 189,
    monthlyRevenue: 11340,
    createdAt: "2023-03-20T09:15:00Z",
    lastActivity: "2024-01-15T14:20:00Z",
    plan: "professional" as const
  },
  {
    id: "3",
    name: "Global College",
    logo: undefined,
    domain: "globalcollege.edu",
    status: "active" as const,
    adminName: "Dr. Emma Wilson",
    adminEmail: "emma.wilson@globalcollege.edu",
    totalUsers: 156,
    monthlyRevenue: 9360,
    createdAt: "2023-05-10T11:30:00Z",
    lastActivity: "2024-01-14T16:45:00Z",
    plan: "basic" as const
  },
  {
    id: "4",
    name: "Metro University",
    logo: undefined,
    domain: "metrouniversity.edu",
    status: "pending" as const,
    adminName: "Dr. Robert Davis",
    adminEmail: "robert.davis@metrouniversity.edu",
    totalUsers: 0,
    monthlyRevenue: 0,
    createdAt: "2024-01-10T13:20:00Z",
    lastActivity: "2024-01-10T13:20:00Z",
    plan: "free" as const
  },
  {
    id: "5",
    name: "State College",
    logo: undefined,
    domain: "statecollege.edu",
    status: "active" as const,
    adminName: "Prof. Lisa Martinez",
    adminEmail: "lisa.martinez@statecollege.edu",
    totalUsers: 98,
    monthlyRevenue: 2940,
    createdAt: "2023-07-15T10:45:00Z",
    lastActivity: "2024-01-12T09:15:00Z",
    plan: "basic" as const
  },
  {
    id: "6",
    name: "Innovation Academy",
    logo: undefined,
    domain: "innovationacademy.edu",
    status: "suspended" as const,
    adminName: "Dr. James Brown",
    adminEmail: "james.brown@innovationacademy.edu",
    totalUsers: 67,
    monthlyRevenue: 0,
    createdAt: "2023-09-01T14:30:00Z",
    lastActivity: "2023-12-15T11:20:00Z",
    plan: "free" as const
  },
  {
    id: "7",
    name: "Digital University",
    logo: undefined,
    domain: "digitaluniversity.edu",
    status: "active" as const,
    adminName: "Prof. Anna Taylor",
    adminEmail: "anna.taylor@digitaluniversity.edu",
    totalUsers: 203,
    monthlyRevenue: 12180,
    createdAt: "2023-02-28T16:10:00Z",
    lastActivity: "2024-01-16T08:45:00Z",
    plan: "professional" as const
  },
  {
    id: "8",
    name: "Future Tech College",
    logo: undefined,
    domain: "futuretechcollege.edu",
    status: "inactive" as const,
    adminName: "Dr. David Lee",
    adminEmail: "david.lee@futuretechcollege.edu",
    totalUsers: 45,
    monthlyRevenue: 0,
    createdAt: "2023-11-20T12:15:00Z",
    lastActivity: "2023-12-01T14:30:00Z",
    plan: "free" as const
  }
]

export default function AdminCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  const filteredColleges = dummyAdminColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || college.status === statusFilter
    const matchesPlan = planFilter === "all" || college.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  const handleAddCollege = () => {
    // Simulate adding new college
    console.log("Adding new college...")
  }

  const handleExportColleges = () => {
    // Simulate exporting colleges
    console.log("Exporting colleges...")
  }

  const handleEditCollege = (collegeId: string) => {
    // Simulate editing college
    console.log("Editing college:", collegeId)
  }

  const handleDeleteCollege = (collegeId: string) => {
    // Simulate deleting college
    console.log("Deleting college:", collegeId)
  }

  const handleApproveCollege = (collegeId: string) => {
    // Simulate approving college
    console.log("Approving college:", collegeId)
  }

  const handleSuspendCollege = (collegeId: string) => {
    // Simulate suspending college
    console.log("Suspending college:", collegeId)
  }

  const handleViewCollege = (collegeId: string) => {
    // Simulate viewing college details
    console.log("Viewing college:", collegeId)
  }

  const handleViewBilling = (collegeId: string) => {
    // Simulate viewing college billing
    console.log("Viewing billing for college:", collegeId)
  }

  // Calculate stats
  const totalColleges = dummyAdminColleges.length
  const activeColleges = dummyAdminColleges.filter(c => c.status === 'active').length
  const pendingColleges = dummyAdminColleges.filter(c => c.status === 'pending').length
  const suspendedColleges = dummyAdminColleges.filter(c => c.status === 'suspended').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">College Management</h1>
          <p className="text-muted-foreground">
            Manage all registered colleges and institutions
          </p>
        </div>
      </div>

      {/* Stats */}
      <AdminCollegesStats
        totalColleges={totalColleges}
        activeColleges={activeColleges}
        pendingColleges={pendingColleges}
        suspendedColleges={suspendedColleges}
      />

      {/* Filters */}
      <AdminCollegesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        planFilter={planFilter}
        onPlanFilterChange={setPlanFilter}
        onAddCollege={handleAddCollege}
        onExportColleges={handleExportColleges}
      />

      {/* Colleges Table */}
      <AdminCollegesTable
        colleges={filteredColleges}
        onEditCollege={handleEditCollege}
        onDeleteCollege={handleDeleteCollege}
        onApproveCollege={handleApproveCollege}
        onSuspendCollege={handleSuspendCollege}
        onViewCollege={handleViewCollege}
        onViewBilling={handleViewBilling}
      />
    </div>
  )
}
