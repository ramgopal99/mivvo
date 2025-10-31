"use client"

import { useState } from "react"
import { AdminUsersStats, AdminUsersTable, AdminUsersFilters } from "./"

interface AdminUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'college_admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended'
  collegeName?: string
  lastLogin: string
  createdAt: string
  totalLogins: number
}

interface AdminUsersClientProps {
  initialUsers: AdminUser[]
}

export function AdminUsersClient({ initialUsers }: AdminUsersClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [collegeFilter, setCollegeFilter] = useState("all")

  const filteredUsers = initialUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesCollege = collegeFilter === "all" ||
                          (user.collegeName && user.collegeName.toLowerCase().replace(/\s+/g, '-').includes(collegeFilter))

    return matchesSearch && matchesRole && matchesStatus && matchesCollege
  })

  const handleAddUser = () => {
    // TODO: Implement adding new user
    console.log("Adding new user...")
  }

  const handleExportUsers = () => {
    // TODO: Implement exporting users
    console.log("Exporting users...")
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

  // Calculate stats
  const totalUsers = initialUsers.length
  const activeUsers = initialUsers.filter(u => u.status === 'active').length
  const inactiveUsers = initialUsers.filter(u => u.status === 'inactive').length
  const adminUsers = initialUsers.filter(u => u.role === 'super_admin').length

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

      {/* Users Table */}
      <AdminUsersTable
        users={filteredUsers}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onSuspendUser={handleSuspendUser}
        onActivateUser={handleActivateUser}
        onSendEmail={handleSendEmail}
      />
    </div>
  )
}
