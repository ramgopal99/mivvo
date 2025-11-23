"use client"

import { useState, useEffect } from "react"
import { AdminCollegesStats, AdminCollegesTable, AdminCollegesFilters } from "./_components"
import { getAllColleges } from "../../../dashboard/settings/actions"

// College data types
interface CollegeData {
  id: string
  collegeId: string
  name: string
  description?: string | null
  location?: string | null
  website?: string | null
  phone?: string | null
  establishedYear?: number | null
  isActive: boolean
  maxStudents: number
  currentStudents: number
  monthlyRatePerUser: number
  billingCycle: string
  nextBillingDate?: Date | null
  lastBillingAmount: number
  createdAt: Date
  updatedAt: Date
  users: Array<{
    id: string
    name?: string | null
    email?: string | null
    role?: string | null
  }>
}

export default function AdminCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [colleges, setColleges] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true)
        const result = await getAllColleges()
        if (result.success && result.data) {
          setColleges(result.data)
        } else {
          setError(result.error || "Failed to load colleges")
        }
      } catch (err) {
        setError("An error occurred while loading colleges")
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [])

  // Transform database colleges to match the expected format
  const transformedColleges = colleges.map(college => {
    const adminUser = college.users.find((user: any) => user.role === "COLLEGE_ADMIN")
    const monthlyRevenue = college.currentStudents * college.monthlyRatePerUser

    return {
      id: college.id,
      name: college.name,
      logo: undefined,
      domain: college.website || `${college.collegeId.toLowerCase()}.edu`,
      status: college.isActive ? "active" : "inactive" as const,
      adminName: adminUser?.name || "No Admin Assigned",
      adminEmail: adminUser?.email || "admin@example.com",
      totalUsers: college.currentStudents,
      monthlyRevenue: Math.round(monthlyRevenue),
      createdAt: college.createdAt.toISOString(),
      lastActivity: college.updatedAt.toISOString(),
      plan: "professional" as const // Default plan for now
    }
  })

  const filteredColleges = transformedColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || college.status === statusFilter

    return matchesSearch && matchesStatus
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
  const totalColleges = colleges.length
  const activeColleges = colleges.filter(c => c.isActive).length
  const pendingColleges = 0 // For now, no pending status in database
  const suspendedColleges = colleges.filter(c => !c.isActive).length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading colleges...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

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
