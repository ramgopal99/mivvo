"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Maximize2,
  Minimize2
} from "lucide-react"

interface CollegeUser {
  id: string
  name?: string | null
  email?: string | null
  role?: string | null
  status?: string | null
  emailVerified?: Date | null
  createdAt?: Date
}

interface CollegeUsersTableProps {
  users: CollegeUser[]
  isExpanded: boolean
  onToggleExpand: () => void
  totalUsers: number
  collegeName: string
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function CollegeUsersTable({
  users,
  isExpanded,
  onToggleExpand,
  totalUsers,
  collegeName,
  currentPage,
  totalPages,
  onPageChange
}: CollegeUsersTableProps) {
  const getRoleBadge = (role?: string | null) => {
    switch (role) {
      case 'COLLEGE_ADMIN':
        return <Badge className="bg-blue-100 text-blue-800">College Admin</Badge>
      case 'COLLEGE_STUDENT':
        return <Badge className="bg-green-100 text-green-800">College Student</Badge>
      case 'SUPERADMIN':
        return <Badge className="bg-red-100 text-red-800">Super Admin</Badge>
      case 'USER':
        return <Badge variant="outline">User</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status?: string | null) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'INACTIVE':
        return <Badge className="bg-yellow-100 text-yellow-800">Inactive</Badge>
      case 'SUSPENDED':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (isExpanded) {
    return (
      <div className="space-y-6">
        {/* Minimize Button at Top */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleExpand}
            className="cursor-pointer"
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Minimize
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">College Users - {collegeName}</h1>
            <p className="text-muted-foreground">
              Complete list of all users associated with {collegeName} ({totalUsers} total users)
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Users Table - Full Width */}
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email Verified</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className={user.role === 'COLLEGE_ADMIN' ? 'bg-blue-50' : ''}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.name?.split(' ').map(n => n[0]).join('') || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {user.name || 'No name'}
                          {user.role === 'COLLEGE_ADMIN' && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              Admin
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell>
                    {user.emailVerified ? (
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    ) : (
                      <Badge variant="outline">Unverified</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found for this college.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} ({totalUsers} total users)
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Collapsed view - show in a Card
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Users ({totalUsers})</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleExpand}
          className="cursor-pointer"
        >
          <Maximize2 className="h-4 w-4 mr-2" />
          Expand
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Email Verified</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className={user.role === 'COLLEGE_ADMIN' ? 'bg-blue-50' : ''}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name?.split(' ').map(n => n[0]).join('') || user.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {user.name || 'No name'}
                      {user.role === 'COLLEGE_ADMIN' && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Admin
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {getRoleBadge(user.role)}
              </TableCell>
              <TableCell>
                {getStatusBadge(user.status)}
              </TableCell>
              <TableCell>
                {user.emailVerified ? (
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                ) : (
                  <Badge variant="outline">Unverified</Badge>
                )}
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {users.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No users found for this college.
        </div>
      )}
    </div>
  )
}
