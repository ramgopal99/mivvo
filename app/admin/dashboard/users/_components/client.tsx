"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AdminUsersStats, AdminUsersTable, AdminUsersFilters } from "./"
import { getFilteredAdminUsers, suspendUser, getAdminUsersStats, updateUser, deleteUser } from "@/app/actions/user"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ADMIN_CONFIG } from "@/config/site"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Minimize2 } from "lucide-react"

interface AdminUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'college_admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended'
  userType: 'FREE' | 'PRO'
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
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>(initialUsers as AdminUser[])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showSuspendDialog, setShowSuspendDialog] = useState(false)
  const [showEditUserDialog, setShowEditUserDialog] = useState(false)
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false)
  const [suspendUserId, setSuspendUserId] = useState<string | null>(null)
  const [suspendReason, setSuspendReason] = useState("")
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
  const [deleteConfirmationCode, setDeleteConfirmationCode] = useState("")

  // Required code for user deletion (from site config)
  const DELETION_CODE = ADMIN_CONFIG.USER_DELETION_CODE
  const [editUserData, setEditUserData] = useState<{
    id: string
    name: string
    email: string
    role: string
    firstName: string
    lastName: string
    collegeName?: string
    collegeAdminId?: string
  } | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [userStats, setUserStats] = useState<{
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
    suspendedUsers: number
    superAdmins: number
  } | null>(null)

  // Fetch user stats
  const fetchUserStats = async () => {
    try {
      const result = await getAdminUsersStats()
      if (result.success && result.stats) {
        setUserStats(result.stats)
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  // Debounced search function
  const fetchUsers = useCallback(async (filters: {
    searchTerm: string
    role: string
    status: string
    page: number
  }) => {
    setLoading(true)
    try {
      // Use different limit based on expanded state
      const limit = isExpanded ? 50 : 5 // Show 50 users per page when expanded, 5 when collapsed
      const result = await getFilteredAdminUsers({ ...filters, limit })
      if (result.success) {
        setUsers((result.users || []) as AdminUser[])
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
  }, [isExpanded])

  // Effect to fetch users when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUsers({
        searchTerm,
        role: roleFilter,
        status: statusFilter,
        page: currentPage
      })
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchTerm, roleFilter, statusFilter, currentPage, fetchUsers])

  // Effect to fetch user stats on component mount
  useEffect(() => {
    fetchUserStats()
  }, [])

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }



  const handleEditUser = (userId: string) => {
    // Find the user data to edit
    const user = users.find(u => u.id === userId)
    if (user) {
      setEditUserData({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        collegeName: user.collegeName || '',
        collegeAdminId: user.collegeAdminId || ''
      })
      setSelectedRole(user.role)
      setShowEditUserDialog(true)
    }
  }

  const handleEditUserSubmit = async (formData: FormData) => {
    try {
      if (!editUserData) return

      // Convert form role to proper enum format
      const formRole = formData.get('role') as string
      let role: 'USER' | 'COLLEGE_ADMIN' | 'SUPERADMIN' | undefined
      switch (formRole) {
        case 'user':
          role = 'USER'
          break
        case 'college_admin':
          role = 'COLLEGE_ADMIN'
          break
        case 'super_admin':
          role = 'SUPERADMIN'
          break
        default:
          role = undefined
      }

      const updateData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        role,
        collegeName: formData.get('collegeName') as string || undefined,
        collegeAdminId: formData.get('collegeAdminId') as string || undefined
      }

      const result = await updateUser(editUserData.id, updateData)

      if (result.success) {
        toast.success("User updated successfully")
        // Refresh the user list
        fetchUsers({
          searchTerm,
          role: roleFilter,
          status: statusFilter,
          page: currentPage
        })
        setShowEditUserDialog(false)
        setEditUserData(null)
        setSelectedRole('')
      } else {
        toast.error(`Failed to update user: ${result.error}`)
      }
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("An error occurred while updating the user")
    }
  }

  const handleDeleteUser = (userId: string) => {
    setDeleteUserId(userId)
    setDeleteConfirmationCode("")
    setShowDeleteUserDialog(true)
  }

  const handleViewUserDetails = (userId: string) => {
    router.push(`/admin/dashboard/users/${userId}`)
  }

  const handleConfirmDelete = async () => {
    if (!deleteUserId) return

    // Check if the entered code matches the required deletion code
    if (deleteConfirmationCode !== DELETION_CODE) {
      toast.error("Invalid deletion code. Please enter the correct code to proceed.")
      return
    }

    try {
      const result = await deleteUser(deleteUserId)

      if (result.success) {
        toast.success(result.message || "User deleted successfully")
        // Refresh the user list after deletion
        fetchUsers({
          searchTerm,
          role: roleFilter,
          status: statusFilter,
          page: currentPage
        })
        setShowDeleteUserDialog(false)
        setDeleteUserId(null)
        setDeleteConfirmationCode("")
      } else {
        toast.error(`Failed to delete user: ${result.error}`)
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("An error occurred while deleting the user")
    }
  }

  const handleConfirmSuspend = async () => {
    if (!suspendUserId) return

    try {
      const result = await suspendUser(suspendUserId, suspendReason.trim() || "Suspended by admin")
      if (result.success) {
        toast.success("User suspended successfully")
        // Refresh the user list
        fetchUsers({
          searchTerm,
          role: roleFilter,
          status: statusFilter,
          page: currentPage
        })
        setShowSuspendDialog(false)
        setSuspendUserId(null)
        setSuspendReason("")
      } else {
        toast.error(`Failed to suspend user: ${result.error}`)
      }
    } catch (error) {
      console.error("Error suspending user:", error)
      toast.error("An error occurred while suspending the user")
    }
  }

  // Use accurate stats from database
  const totalUsers = userStats?.totalUsers || pagination?.totalCount || users.length
  const activeUsers = userStats?.activeUsers || users.filter(u => u.status === 'active').length
  const inactiveUsers = userStats?.inactiveUsers || users.filter(u => u.status === 'inactive').length
   
  const adminUsers = userStats?.superAdmins || users.filter(u => u.role === 'super_admin').length

  if (isExpanded) {
    return (
      <div className="space-y-6">
        {/* Minimize Button at Top */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="cursor-pointer"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Minimize
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage all platform users, roles, and permissions
            </p>
          </div>
        </div>

        {/* Users Table - Full Width */}
        <div className="w-full">
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
              onViewUserDetails={handleViewUserDetails}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
            />
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage || loading}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage || loading}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

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
        {pagination && !isExpanded && (
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
              onViewUserDetails={handleViewUserDetails}
              isExpanded={isExpanded}
              onToggleExpand={() => setIsExpanded(!isExpanded)}
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
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNextPage || loading}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}


      {/* Suspend User Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription>
              This user will lose access to the platform. Please provide a reason for suspension.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="suspend-reason">Suspension Reason (Optional)</Label>
              <Textarea
                id="suspend-reason"
                placeholder="Enter the reason for suspending this user..."
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowSuspendDialog(false)
                setSuspendUserId(null)
                setSuspendReason("")
              }}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmSuspend}
              className="cursor-pointer"
            >
              Suspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and settings.
            </DialogDescription>
          </DialogHeader>
          {editUserData && (
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleEditUserSubmit(formData)
            }}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-firstName">First Name</Label>
                    <Input
                      id="edit-firstName"
                      name="firstName"
                      type="text"
                      defaultValue={editUserData.firstName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-lastName">Last Name</Label>
                    <Input
                      id="edit-lastName"
                      name="lastName"
                      type="text"
                      defaultValue={editUserData.lastName}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    defaultValue={editUserData.email}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select name="role" defaultValue={editUserData.role} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="college_admin">College Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedRole === 'college_admin' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="edit-collegeName">College Name</Label>
                      <Input
                        id="edit-collegeName"
                        name="collegeName"
                        type="text"
                        defaultValue={editUserData.collegeName || ''}
                        placeholder="Enter college name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-collegeAdminId">College Admin ID</Label>
                      <Input
                        id="edit-collegeAdminId"
                        name="collegeAdminId"
                        type="text"
                        defaultValue={editUserData.collegeAdminId || ''}
                        placeholder="Enter college admin ID"
                      />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowEditUserDialog(false)
                    setEditUserData(null)
                    setSelectedRole('')
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                >
                  Update User
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={showDeleteUserDialog} onOpenChange={setShowDeleteUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete User</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the user account and all associated data.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delete-code" className="text-sm font-medium">
                Enter Deletion Code
              </Label>
              <Input
                id="delete-code"
                type="text"
                placeholder="Enter the required deletion code"
                value={deleteConfirmationCode}
                onChange={(e) => setDeleteConfirmationCode(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                For security purposes, you must enter the exact deletion code to proceed.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800 font-medium">
                ⚠️ Warning: This action is irreversible and will permanently remove the user from the system.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteUserDialog(false)
                setDeleteUserId(null)
                setDeleteConfirmationCode("")
              }}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteConfirmationCode !== DELETION_CODE}
              className="cursor-pointer"
            >
              Delete User Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}
