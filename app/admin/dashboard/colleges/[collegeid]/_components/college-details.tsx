/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  ArrowLeft,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Globe,
  Phone,
  Building
} from "lucide-react"
import { getCollegeById } from "@/app/actions/college"

interface CollegeDetailsProps {
  collegeId: string
  onBack: () => void
}

interface CollegeUser {
  id: string
  name?: string | null
  email?: string | null
  role?: string | null
  status?: string | null
  emailVerified?: Date | null
  createdAt?: Date
}

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
  users: CollegeUser[]
}

export function CollegeDetails({ collegeId, onBack }: CollegeDetailsProps) {
  const [college, setCollege] = useState<CollegeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      setLoading(true)
      try {
        const result = await getCollegeById(collegeId)
        if (result.success && result.data) {
          setCollege(result.data as CollegeData)
        } else {
          setError(result.error || "Failed to load college details")
        }
      } catch (_) {
        setError("An error occurred while loading college details")
      } finally {
        setLoading(false)
      }
    }

    fetchCollegeDetails()
  }, [collegeId])

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading college details...</p>
        </div>
      </div>
    )
  }

  if (error || !college) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600">{error || "College not found"}</p>
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Colleges
          </Button>
        </div>
      </div>
    )
  }

  const collegeAdmins = college.users.filter(user => user.role === 'COLLEGE_ADMIN')
  const collegeStudents = college.users.filter(user => user.role === 'COLLEGE_STUDENT')
  const totalUsers = college.users.length
  const monthlyRevenue = college.currentStudents * college.monthlyRatePerUser


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Colleges
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{college.name}</h1>
          <p className="text-muted-foreground">
            College ID: {college.collegeId}
          </p>
        </div>
      </div>

      {/* College Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {collegeAdmins.length} admins, {collegeStudents.length} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{college.currentStudents}</div>
            <p className="text-xs text-muted-foreground">
              of {college.maxStudents} max capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{monthlyRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ₹{college.monthlyRatePerUser} per user
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-slate-800">College Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Current Status</span>
                <div className="text-right">
                  {college.isActive ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 text-sm font-semibold">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 text-sm font-semibold">
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-sm font-medium text-slate-600">Date Created</span>
                <span className="text-sm font-semibold text-slate-800">
                  {new Date(college.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* College Information */}
      <Card>
        <CardHeader>
          <CardTitle>College Information</CardTitle>
          <CardDescription>
            Detailed information about {college.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Information */}
            <div className="space-y-6">
              {college.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{college.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{college.location || "Not specified"}</p>
                  </div>
                </div>

                {college.website && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Globe className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Website</p>
                      <a
                        href={college.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {college.website}
                      </a>
                    </div>
                  </div>
                )}

                {college.phone && (
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{college.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Additional Information */}
            <div className="space-y-6">
              {college.establishedYear && (
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Established</p>
                    <p className="text-sm text-muted-foreground">{college.establishedYear}</p>
                  </div>
                </div>
              )}

              {/* Enhanced Billing Information */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Billing Information</h4>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-sm text-green-700">Billing Cycle</span>
                    <span className="text-sm font-semibold text-green-800 capitalize bg-green-100 px-2 py-1 rounded">
                      {college.billingCycle}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="text-sm text-green-700">Next Billing</span>
                    <span className="text-sm font-medium text-green-800">
                      {college.nextBillingDate
                        ? new Date(college.nextBillingDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Not scheduled'
                      }
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-green-700">Last Amount</span>
                    <span className="text-lg font-bold text-green-600">
                      ₹{college.lastBillingAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* College Users */}
      <Card>
        <CardHeader>
          <CardTitle>All Associated Users</CardTitle>
          <CardDescription>
            Complete list of all users associated with {college.name} ({totalUsers} total users)
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {college.users.map((user) => (
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

          {college.users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found for this college.
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}
