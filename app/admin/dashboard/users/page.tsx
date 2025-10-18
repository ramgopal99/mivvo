"use client"

import { useState } from "react"
import { AdminUsersStats, AdminUsersTable, AdminUsersFilters } from "./_components"

// Dummy admin users data
const dummyAdminUsers = [
  {
    id: "1",
    name: "John Admin",
    email: "john.admin@mivvo.com",
    avatar: undefined,
    role: "super_admin" as const,
    status: "active" as const,
    lastLogin: "2024-01-16T10:30:00Z",
    createdAt: "2023-01-15T08:00:00Z",
    totalLogins: 245
  },
  {
    id: "2",
    name: "Sarah College",
    email: "sarah@centraluniversity.edu",
    avatar: undefined,
    role: "college_admin" as const,
    status: "active" as const,
    collegeName: "Central University",
    lastLogin: "2024-01-15T14:20:00Z",
    createdAt: "2023-08-20T09:15:00Z",
    totalLogins: 89
  },
  {
    id: "3",
    name: "Mike Student",
    email: "mike.student@centraluniversity.edu",
    avatar: undefined,
    role: "user" as const,
    status: "active" as const,
    collegeName: "Central University",
    lastLogin: "2024-01-14T16:45:00Z",
    createdAt: "2023-09-01T10:30:00Z",
    totalLogins: 67
  },
  {
    id: "4",
    name: "Emma Tech",
    email: "emma@techinstitute.edu",
    avatar: undefined,
    role: "college_admin" as const,
    status: "active" as const,
    collegeName: "Tech Institute",
    lastLogin: "2024-01-16T09:10:00Z",
    createdAt: "2023-06-15T11:20:00Z",
    totalLogins: 156
  },
  {
    id: "5",
    name: "David User",
    email: "david.user@globalcollege.edu",
    avatar: undefined,
    role: "user" as const,
    status: "inactive" as const,
    collegeName: "Global College",
    lastLogin: "2023-12-20T13:15:00Z",
    createdAt: "2023-07-10T14:45:00Z",
    totalLogins: 23
  },
  {
    id: "6",
    name: "Lisa Suspended",
    email: "lisa.suspended@spam.com",
    avatar: undefined,
    role: "user" as const,
    status: "suspended" as const,
    lastLogin: "2023-11-15T12:30:00Z",
    createdAt: "2023-10-01T16:20:00Z",
    totalLogins: 5
  },
  {
    id: "7",
    name: "Tom Metro",
    email: "tom@metrouniversity.edu",
    avatar: undefined,
    role: "college_admin" as const,
    status: "active" as const,
    collegeName: "Metro University",
    lastLogin: "2024-01-13T11:25:00Z",
    createdAt: "2023-05-20T08:45:00Z",
    totalLogins: 134
  },
  {
    id: "8",
    name: "Anna State",
    email: "anna@statecollege.edu",
    avatar: undefined,
    role: "user" as const,
    status: "active" as const,
    collegeName: "State College",
    lastLogin: "2024-01-12T15:40:00Z",
    createdAt: "2023-08-30T13:10:00Z",
    totalLogins: 78
  }
]

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [collegeFilter, setCollegeFilter] = useState("all")

  const filteredUsers = dummyAdminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesCollege = collegeFilter === "all" ||
                          (user.collegeName && user.collegeName.toLowerCase().replace(/\s+/g, '-').includes(collegeFilter))

    return matchesSearch && matchesRole && matchesStatus && matchesCollege
  })

  const handleAddUser = () => {
    // Simulate adding new user
    console.log("Adding new user...")
  }

  const handleExportUsers = () => {
    // Simulate exporting users
    console.log("Exporting users...")
  }

  const handleEditUser = (userId: string) => {
    // Simulate editing user
    console.log("Editing user:", userId)
  }

  const handleDeleteUser = (userId: string) => {
    // Simulate deleting user
    console.log("Deleting user:", userId)
  }

  const handleSuspendUser = (userId: string) => {
    // Simulate suspending user
    console.log("Suspending user:", userId)
  }

  const handleActivateUser = (userId: string) => {
    // Simulate activating user
    console.log("Activating user:", userId)
  }

  const handleSendEmail = (userId: string) => {
    // Simulate sending email
    console.log("Sending email to user:", userId)
  }

  // Calculate stats
  const totalUsers = dummyAdminUsers.length
  const activeUsers = dummyAdminUsers.filter(u => u.status === 'active').length
  const inactiveUsers = dummyAdminUsers.filter(u => u.status === 'inactive').length
  const adminUsers = dummyAdminUsers.filter(u => u.role === 'super_admin').length

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
