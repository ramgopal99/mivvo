"use client"

import { useState, useEffect } from "react"
import { AdminCollegesStats, AdminCollegesTable, AdminCollegesFilters, EditCollegeDialog } from "./_components"
import { getAllColleges, deleteCollege } from "@/app/actions/college"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
    status?: string | null
    emailVerified?: Date | null
    createdAt?: Date | null
    studentEnrollment?: {
      isActive: boolean
      expirationDate: Date
      enrollmentMonths: number
      paymentStatus: string
    } | null
  }>
}

export default function AdminCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [colleges, setColleges] = useState<CollegeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddCollegeDialog, setShowAddCollegeDialog] = useState(false)
  const [showEditCollegeDialog, setShowEditCollegeDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingCollegeId, setEditingCollegeId] = useState<string | null>(null)
  const [deletingCollegeId, setDeletingCollegeId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

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
      } catch (error) {
        console.error("Error loading colleges:", error)
        setError("An error occurred while loading colleges")
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [])

  // Transform database colleges to match the expected format
  const transformedColleges = colleges.map(college => {
    const adminUser = college.users.find((user) => user.role === "COLLEGE_ADMIN")
    // Calculate monthly revenue based on active enrollments
    const monthlyRevenue = college.users.filter(user =>
      user.role === 'COLLEGE_STUDENT' &&
      user.studentEnrollment &&
      user.studentEnrollment.isActive &&
      new Date(user.studentEnrollment.expirationDate) > new Date()
    ).length * college.monthlyRatePerUser

    return {
      id: college.id,
      name: college.name,
      logo: undefined,
      domain: college.website || `${college.collegeId.toLowerCase()}.edu`,
      status: college.isActive ? ("active" as const) : ("inactive" as const),
      adminName: adminUser?.name || "No Admin Assigned",
      adminEmail: adminUser?.email || "admin@example.com",
      totalUsers: college.users.filter(user =>
        user.role === 'COLLEGE_STUDENT' &&
        user.studentEnrollment &&
        user.studentEnrollment.isActive &&
        new Date(user.studentEnrollment.expirationDate) > new Date()
      ).length,
      monthlyRevenue: Math.round(monthlyRevenue),
      createdAt: college.createdAt.toISOString(),
      lastActivity: college.updatedAt.toISOString(),
      plan: "professional" as const // Default plan for now
    } as const
  })

  const filteredColleges = transformedColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || college.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const refreshColleges = async () => {
    // Refresh the colleges list
    try {
      const result = await getAllColleges()
      if (result.success && result.data) {
        setColleges(result.data)
      }
    } catch (error) {
      console.error("Error refreshing colleges:", error)
    }
  }

  const handleCollegeCreated = () => refreshColleges()
  const handleCollegeUpdated = () => refreshColleges()


  const handleEditCollege = (collegeId: string) => {
    setEditingCollegeId(collegeId)
    setShowEditCollegeDialog(true)
  }

  const handleDeleteCollege = (collegeId: string) => {
    setDeletingCollegeId(collegeId)
    setShowDeleteDialog(true)
  }

  const handleConfirmDeleteCollege = async () => {
    if (!deletingCollegeId) return

    setDeleting(true)
    try {
      const result = await deleteCollege(deletingCollegeId)
      if (result.success) {
        toast.success("College deleted successfully")
        await refreshColleges()
        setShowDeleteDialog(false)
        setDeletingCollegeId(null)
      } else {
        toast.error(result.error || "Failed to delete college")
      }
    } catch (error) {
      console.error("Error deleting college:", error)
      toast.error("An error occurred while deleting the college")
    } finally {
      setDeleting(false)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleApproveCollege = (_collegeId: string) => {
    // TODO: Implement college approval logic
    toast.info("College approval feature coming soon")
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSuspendCollege = (_collegeId: string) => {
    // TODO: Implement college suspension logic
    toast.info("College suspension feature coming soon")
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleViewCollege = (_collegeId: string) => {
    // This is now handled by the table's direct navigation
    // Navigation is handled directly in the table component
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleViewBilling = (_collegeId: string) => {
    // TODO: Implement billing view logic
    toast.info("Billing view feature coming soon")
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
        onAddCollege={() => setShowAddCollegeDialog(true)}
        showAddCollegeDialog={showAddCollegeDialog}
        onAddCollegeDialogChange={setShowAddCollegeDialog}
        onCollegeCreated={handleCollegeCreated}
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

      {/* Edit College Dialog */}
      <EditCollegeDialog
        open={showEditCollegeDialog}
        onOpenChange={setShowEditCollegeDialog}
        collegeId={editingCollegeId}
        onCollegeUpdated={handleCollegeUpdated}
      />

      {/* Delete College Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete College</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this college? This action cannot be undone.
              All associated users will be permanently deleted along with the college.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} onClick={() => {
              setShowDeleteDialog(false)
              setDeletingCollegeId(null)
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteCollege}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete College"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}