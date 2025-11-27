"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Loader2
} from "lucide-react"
import { toast } from "sonner"
import { getAuthHeaders } from "@/lib/auth-utils"

interface StudentEnrollment {
  id: string
  rollNumber: string
  enrollmentMonths: number
  enrollmentDate: string
  expirationDate: string
  paymentAmount: number
  paymentStatus: string
  isActive: boolean
  user: {
    id: string
    name: string
    email: string
    status: string
  }
}

interface CollegeData {
  id: string
  collegeId: string
  name: string
  monthlyRatePerUser: number
}

export function StudentSettings() {
  const [collegeData, setCollegeData] = useState<CollegeData | null>(null)
  const [enrollments, setEnrollments] = useState<StudentEnrollment[]>([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    let retryCount = 0
    const maxRetries = 10
    const retryInterval = 1000 // 1 second

    const attemptLoad = async () => {
      if (retryCount >= maxRetries) {
        console.log('Max retries reached, giving up')
        setIsLoading(false)
        toast.error('Failed to load data after multiple attempts. Please refresh the page.')
        return
      }

      retryCount++
      console.log(`Attempting to load data (attempt ${retryCount}/${maxRetries})`)

      const [collegeSuccess, enrollmentSuccess] = await Promise.all([
        loadCollegeData(),
        loadEnrollments()
      ])

      if (collegeSuccess && enrollmentSuccess) {
        console.log('Data loaded successfully')
        setIsLoading(false)
        return // Success, stop retrying
      }

      console.log('Data load failed, will retry...')
    }

    // Try immediately first
    attemptLoad()

    // Set up retry mechanism for failed loads
    const retryTimer = setInterval(async () => {
      const headers = getAuthHeaders(false)
      if (!headers.Authorization && retryCount < maxRetries) {
        console.log('Still no auth headers, waiting...')
        return
      }

      if (retryCount >= maxRetries) {
        console.log('Max retries reached')
        clearInterval(retryTimer)
        setIsLoading(false)
        return
      }

      await attemptLoad()
    }, retryInterval)

    return () => clearInterval(retryTimer)
  }, [])

  const loadCollegeData = async () => {
    try {
      const headers = getAuthHeaders(false) // Get auth headers without Content-Type
      if (!headers.Authorization) {
        console.log('No authorization header found, will retry later')
        return false // Indicate failure so retry can continue
      }

      const response = await fetch('/api/college/profile', {
        headers
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setCollegeData(data.data)
          return true // Success
        }
      } else {
        console.error('College profile API error:', response.status)
      }
      return false // Indicate failure
    } catch (error) {
      console.error('Error loading college data:', error)
      return false // Indicate failure
    }
  }

  const loadEnrollments = async () => {
    try {
      const headers = getAuthHeaders(false) // Get auth headers without Content-Type
      if (!headers.Authorization) {
        console.log('No authorization header found, will retry later')
        return false // Indicate failure so retry can continue
      }

      const response = await fetch('/api/college/students', {
        headers
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setEnrollments(data.enrollments || [])
          return true // Success
        }
      } else {
        console.error('Students API error:', response.status)
      }
      return false // Indicate failure
    } catch (error) {
      console.error('Error loading enrollments:', error)
      return false // Indicate failure
    }
  }





  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading student settings...</span>
        </CardContent>
      </Card>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'FAILED':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (!collegeData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Users className="h-6 w-6 text-muted-foreground mr-2" />
          <span>Unable to load college data</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enrollment Stats */}


      {/* Current Enrollments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Enrollments
          </CardTitle>
          <CardDescription>
            View all enrolled students and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {enrollments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No students enrolled yet. Start by enrolling your first student above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{enrollment.user.name}</p>
                        <p className="text-sm text-muted-foreground">{enrollment.user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{enrollment.rollNumber}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{enrollment.enrollmentMonths} month{enrollment.enrollmentMonths !== 1 ? "s" : ""}</p>
                        <p className="text-muted-foreground">
                          {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(enrollment.expirationDate) > new Date() ? (
                          <span className="text-green-600">
                            {new Date(enrollment.expirationDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            Expired {new Date(enrollment.expirationDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>₹{enrollment.paymentAmount}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(enrollment.paymentStatus)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
