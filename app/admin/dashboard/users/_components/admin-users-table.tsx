"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Ban,
  CheckCircle,
  Mail
} from "lucide-react"

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

interface AdminUsersTableProps {
  users: AdminUser[]
  onEditUser: (userId: string) => void
  onDeleteUser: (userId: string) => void
  onSuspendUser: (userId: string) => void
  onActivateUser: (userId: string) => void
  onSendEmail: (userId: string) => void
}

export function AdminUsersTable({
  users,
  onEditUser,
  onDeleteUser,
  onSuspendUser,
  onActivateUser,
  onSendEmail
}: AdminUsersTableProps) {
  const getRoleBadge = (role: AdminUser['role']) => {
    switch (role) {
      case 'super_admin':
        return <Badge className="bg-red-100 text-red-800">Super Admin</Badge>
      case 'college_admin':
        return <Badge className="bg-blue-100 text-blue-800">College Admin</Badge>
      case 'user':
        return <Badge variant="outline">User</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: AdminUser['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'inactive':
        return <Badge className="bg-yellow-100 text-yellow-800">Inactive</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View and manage all platform users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
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
                  <span className="text-sm">{user.collegeName || 'N/A'}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEditUser(user.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSendEmail(user.id)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === 'active' ? (
                        <DropdownMenuItem onClick={() => onSuspendUser(user.id)}>
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onActivateUser(user.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Activate User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDeleteUser(user.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No users found.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
