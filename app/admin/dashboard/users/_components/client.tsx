"use client"

import { useState, useEffect, useCallback } from "react"
import { AdminUsersStats, AdminUsersTable, AdminUsersFilters, AddUserDialog } from "./"
import { getFilteredAdminUsers, exportUsersToCSV } from "@/app/actions/user"
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

interface AdminUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'college_admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended'
  collegeName?: string
  collegeAdminId?: string // For college admins
  lastLogin: string
  createdAt: string
  totalLogins: number
}

interface AdminUsersClientProps {
  initialUsers: AdminUser[]
}

interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export function AdminUsersClient({ initialUsers }: AdminUsersClientProps) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [collegeFilter, setCollegeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)

  // Debounced search function
  const fetchUsers = useCallback(async (filters: {
    searchTerm: string
    role: string
    status: string
    college: string
    page: number
  }) => {
    setLoading(true)
    try {
      const result = await getFilteredAdminUsers(filters)
      if (result.success) {
        setUsers(result.users || [])
        setPagination(result.pagination || null)
      } else {
        console.error('Failed to fetch users:', result.error)
        setUsers([])
        setPagination(null)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Effect to fetch users when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUsers({
        searchTerm,
        role: roleFilter,
        status: statusFilter,
        college: collegeFilter,
        page: currentPage
      })
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchTerm, roleFilter, statusFilter, collegeFilter, currentPage, fetchUsers])

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAddUser = () => {
    setShowAddUserDialog(true)
  }

  const handleUserCreated = () => {
    // Refresh the user list after creating a new user
    fetchUsers({
      searchTerm,
      role: roleFilter,
      status: statusFilter,
      college: collegeFilter,
      page: currentPage
    })
  }

  const performExport = async () => {
    try {
      const result = await exportUsersToCSV({
        searchTerm,
        role: roleFilter,
        status: statusFilter,
        college: collegeFilter
      })

      if (result.success && result.data) {
        // Convert to CSV format
        const csvHeaders = Object.keys(result.data[0]).join(',')
        const csvRows = result.data.map(row =>
          Object.values(row).map(value =>
            typeof value === 'string' && value.includes(',') ? `"${value}"` : value
          ).join(',')
        )
        const csvContent = [csvHeaders, ...csvRows].join('\n')

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        console.error('Failed to export users:', result.error)
        alert('Failed to export users. Please try again.')
      }
    } catch (error) {
      console.error('Error exporting users:', error)
      alert('An error occurred while exporting users.')
    } finally {
      setShowExportDialog(false)
    }
  }

  const handleExportUsers = () => {
    setShowExportDialog(true)
  }

  const handleEditUser = (userId: string) => {
    // TODO: Implement editing user
    console.log("Editing user:", userId)
  }

  const handleDeleteUser = (userId: string) => {
    // TODO: Implement deleting user
    console.log("Deleting user:", userId)
  }

  const handleSuspendUser = (userId: string) => {
    // TODO: Implement suspending user
    console.log("Suspending user:", userId)
  }

  const handleActivateUser = (userId: string) => {
    // TODO: Implement activating user
    console.log("Activating user:", userId)
  }

  const handleSendEmail = (userId: string) => {
    // TODO: Implement sending email
    console.log("Sending email to user:", userId)
  }

  // Calculate stats from current users (may be filtered)
  const totalUsers = pagination?.totalCount || users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const inactiveUsers = users.filter(u => u.status === 'inactive').length
  const adminUsers = users.filter(u => u.role === 'super_admin').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage all platform users, roles, and permissions
          </p>
        </div>
        {pagination && (
          <div className="text-sm text-muted-foreground">
            Showing {users.length} of {pagination.totalCount} users
          </div>
        )}
      </div>

      {/* Stats */}
      <AdminUsersStats
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
        adminUsers={adminUsers}
      />

      {/* Filters */}
      <AdminUsersFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        collegeFilter={collegeFilter}
        onCollegeFilterChange={setCollegeFilter}
        onAddUser={handleAddUser}
        onExportUsers={handleExportUsers}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading users...</p>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <AdminUsersTable
          users={users}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onSuspendUser={handleSuspendUser}
          onActivateUser={handleActivateUser}
          onSendEmail={handleSendEmail}
        />
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrevPage || loading}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNextPage || loading}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Export Confirmation Dialog */}
      <AlertDialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Export Users to CSV</AlertDialogTitle>
            <AlertDialogDescription>
              This will export all filtered users to a CSV file. The file will include user details such as name, email, role, status, and college information.
              <br />
              <br />
              <strong>Current filters applied:</strong>
              <br />
              • Role: {roleFilter === "all" ? "All Roles" : roleFilter.replace("_", " ").toUpperCase()}
              <br />
              • Status: {statusFilter === "all" ? "All Statuses" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              <br />
              • College: {collegeFilter === "all" ? "All Colleges" : collegeFilter.replace("-", " ").toUpperCase()}
              {searchTerm && (
                <>
                  <br />
                  • Search: &quot;{searchTerm}&quot;
                </>
              )}
              <br />
              <br />
              Do you want to proceed with the export?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={performExport}>
              Export CSV
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add User Dialog */}
      <AddUserDialog
        open={showAddUserDialog}
        onOpenChange={setShowAddUserDialog}
        onUserCreated={handleUserCreated}
      />
    </div>
  )
}
