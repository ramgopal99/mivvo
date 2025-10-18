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
  CheckCircle,
  XCircle,
  Eye,
  DollarSign
} from "lucide-react"

interface AdminCollege {
  id: string
  name: string
  logo?: string
  domain: string
  status: 'active' | 'pending' | 'suspended' | 'inactive'
  adminName: string
  adminEmail: string
  totalUsers: number
  monthlyRevenue: number
  createdAt: string
  lastActivity: string
  plan: 'free' | 'basic' | 'professional' | 'enterprise'
}

interface AdminCollegesTableProps {
  colleges: AdminCollege[]
  onEditCollege: (collegeId: string) => void
  onDeleteCollege: (collegeId: string) => void
  onApproveCollege: (collegeId: string) => void
  onSuspendCollege: (collegeId: string) => void
  onViewCollege: (collegeId: string) => void
  onViewBilling: (collegeId: string) => void
}

export function AdminCollegesTable({
  colleges,
  onEditCollege,
  onDeleteCollege,
  onApproveCollege,
  onSuspendCollege,
  onViewCollege,
  onViewBilling
}: AdminCollegesTableProps) {
  const getStatusBadge = (status: AdminCollege['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPlanBadge = (plan: AdminCollege['plan']) => {
    switch (plan) {
      case 'free':
        return <Badge variant="outline">Free</Badge>
      case 'basic':
        return <Badge className="bg-blue-100 text-blue-800">Basic</Badge>
      case 'professional':
        return <Badge className="bg-purple-100 text-purple-800">Professional</Badge>
      case 'enterprise':
        return <Badge className="bg-gold-100 text-gold-800">Enterprise</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>College Management</CardTitle>
        <CardDescription>
          View and manage all registered colleges and institutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>College</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colleges.map((college) => (
              <TableRow key={college.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={college.logo} />
                      <AvatarFallback>
                        {college.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{college.name}</p>
                      <p className="text-sm text-muted-foreground">{college.domain}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(college.status)}
                </TableCell>
                <TableCell>
                  {getPlanBadge(college.plan)}
                </TableCell>
                <TableCell>
                  <span className="font-medium">{college.totalUsers}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">${college.monthlyRevenue}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {new Date(college.lastActivity).toLocaleDateString()}
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
                      <DropdownMenuItem onClick={() => onViewCollege(college.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditCollege(college.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit College
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewBilling(college.id)}>
                        <DollarSign className="mr-2 h-4 w-4" />
                        View Billing
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {college.status === 'pending' && (
                        <DropdownMenuItem onClick={() => onApproveCollege(college.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve College
                        </DropdownMenuItem>
                      )}
                      {college.status === 'active' && (
                        <DropdownMenuItem onClick={() => onSuspendCollege(college.id)}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Suspend College
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDeleteCollege(college.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete College
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {colleges.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No colleges found.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
