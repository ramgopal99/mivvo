"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  UserPlus,
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
  const [isEnrolling, setIsEnrolling] = useState(false)

  // Enrollment form state
  const [rollNumber, setRollNumber] = useState("")
  const [enrollmentMonths, setEnrollmentMonths] = useState("1")
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")

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

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!collegeData) {
      toast.error('College data not loaded')
      return
    }

    // No capacity limits - unlimited enrollments allowed

    if (!rollNumber.trim() || !studentName.trim() || !studentEmail.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsEnrolling(true)

    try {
      const months = parseInt(enrollmentMonths)
      const amount = months * collegeData.monthlyRatePerUser

      const response = await fetch('/api/college/enroll-student', {
        method: 'POST',
        headers: {
          ...getAuthHeaders(true) // Include Content-Type for POST request
        },
        body: JSON.stringify({
          rollNumber: rollNumber.trim(),
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim(),
          enrollmentMonths: months,
          paymentAmount: amount
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success('Student enrolled successfully!')
        // Reset form
        setRollNumber("")
        setStudentName("")
        setStudentEmail("")
        setEnrollmentMonths("1")
        // Reload data
        loadCollegeData()
        loadEnrollments()
      } else {
        toast.error(data.error || 'Failed to enroll student')
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      toast.error('An error occurred while enrolling the student')
    } finally {
      setIsEnrolling(false)
    }
  }

  const handleRollNumberUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const csv = event.target?.result as string
      // Parse CSV - assuming format: rollNumber,name,email
      const lines = csv.split('\n').filter(line => line.trim())
      if (lines.length > 0) {
        // For now, just set the first roll number
        const firstLine = lines[0].split(',')[0]?.trim()
        if (firstLine) {
          setRollNumber(firstLine)
        }
      }
    }
    reader.readAsText(file)
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Student Enrollment
          </CardTitle>
          <CardDescription>
            Manage student enrollments - unlimited capacity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unlimited Enrollment</h3>
            <p className="text-muted-foreground">
              Enroll as many students as needed. Each student gets their own account with expiration dates.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Enroll New Student */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Enroll New Student
          </CardTitle>
          <CardDescription>
            Add a new student to your college with roll number and payment details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEnrollStudent} className="space-y-4">
            {/* Roll Number Upload */}
            <div className="space-y-2">
              <Label htmlFor="roll-number">Roll Number *</Label>
              <div className="flex gap-2">
                <Input
                  id="roll-number"
                  type="text"
                  placeholder="Enter roll number or upload CSV"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleRollNumberUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="roll-upload"
                  />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="roll-upload" className="cursor-pointer flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload
                    </label>
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload a CSV file with columns: rollNumber, name, email
              </p>
            </div>

            {/* Student Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Student Name *</Label>
                <Input
                  id="student-name"
                  type="text"
                  placeholder="Enter student full name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-email">Student Email *</Label>
                <Input
                  id="student-email"
                  type="email"
                  placeholder="Enter student email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Enrollment Period */}
            <div className="space-y-2">
              <Label htmlFor="enrollment-months">Enrollment Period *</Label>
              <Select value={enrollmentMonths} onValueChange={setEnrollmentMonths}>
                <SelectTrigger>
                  <SelectValue placeholder="Select enrollment period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Month - ₹{collegeData.monthlyRatePerUser}</SelectItem>
                  <SelectItem value="3">3 Months - ₹{collegeData.monthlyRatePerUser * 3}</SelectItem>
                  <SelectItem value="6">6 Months - ₹{collegeData.monthlyRatePerUser * 6}</SelectItem>
                  <SelectItem value="12">12 Months - ₹{collegeData.monthlyRatePerUser * 12}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Summary */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Payment Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Monthly Rate:</span>
                  <span>₹{collegeData.monthlyRatePerUser}</span>
                </div>
                <div className="flex justify-between">
                  <span>Enrollment Period:</span>
                  <span>{enrollmentMonths} month{enrollmentMonths !== "1" ? "s" : ""}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Total Amount:</span>
                  <span>₹{parseInt(enrollmentMonths) * collegeData.monthlyRatePerUser}</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isEnrolling}
              className="w-full"
            >
              {isEnrolling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enrolling Student...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Enroll Student & Process Payment
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

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
