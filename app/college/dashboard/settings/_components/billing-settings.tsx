"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Receipt,
  Users,
  UserPlus,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react"
import { toast } from "sonner"
import { getAuthHeaders } from "@/lib/auth-utils"

interface CollegeBillingSettings {
  id: string
  collegeId: string
  name: string
  totalAssociatedStudents: number
  monthlyRatePerUser: number
  billingCycle: string
  nextBillingDate?: Date
  lastBillingAmount: number
}

interface EnterprisePayment {
  id: string
  amount: number
  paymentDate: string
  billingPeriod: string
  studentCount: number
  ratePerStudent: number
  description: string
  invoiceNumber: string
  status: string
  paidAt?: string
}

interface BillingSettingsProps {
  collegeData?: CollegeBillingSettings
}

export function BillingSettings({
  collegeData: initialCollegeData
}: BillingSettingsProps) {
  const [collegeData, setCollegeData] = useState<CollegeBillingSettings | null>(initialCollegeData || null)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [billingHistory, setBillingHistory] = useState<EnterprisePayment[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  // Student enrollment form state
  const [rollNumber, setRollNumber] = useState("")
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const [enrollmentMonths, setEnrollmentMonths] = useState("1")

  useEffect(() => {
    if (!initialCollegeData) {
      loadCollegeData()
    }
    loadBillingHistory()
  }, [initialCollegeData])

  const loadCollegeData = async () => {
    try {
      // First try to load from localStorage for immediate display
      const collegeData = localStorage.getItem('college_data')
      if (collegeData) {
        const college = JSON.parse(collegeData)
        setCollegeData(college)
      }

      // Then fetch fresh data from API
      const token = localStorage.getItem('token') ||
                   localStorage.getItem('college_token') ||
                   localStorage.getItem('student_token')
      if (token) {
        const response = await fetch('/api/college/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setCollegeData(data.data)
            // Update localStorage with fresh data
            localStorage.setItem('college_data', JSON.stringify(data.data))
          }
        }
      }
    } catch (error) {
      console.error('Error loading college data:', error)
    }
  }



  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!collegeData) {
      toast.error('College data not loaded')
      return
    }

    // No capacity limits - unlimited enrollments allowed

    if (!rollNumber.trim() || !studentName.trim() || !studentEmail.trim() || !studentPassword.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    if (studentPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
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
          studentPassword: studentPassword.trim(),
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
        setStudentPassword("")
        setEnrollmentMonths("1")
        // Reload data
        loadCollegeData()
        loadBillingHistory()
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

  const loadBillingHistory = async () => {
    setIsLoadingHistory(true)
    try {
      const token = localStorage.getItem('token') ||
                   localStorage.getItem('college_token') ||
                   localStorage.getItem('student_token')
      if (token) {
        const response = await fetch('/api/college/enterprise-payment', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setBillingHistory(data.data || [])
          }
        }
      }
    } catch (error) {
      console.error('Error loading billing history:', error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  if (!collegeData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading billing settings...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">

      {/* Student Cost Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Student Cost Settings
          </CardTitle>
          <CardDescription>
            Set the monthly cost per student for your college
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <h4 className="font-medium">Current Monthly Rate</h4>
                <p className="text-sm text-muted-foreground">
                  Cost charged per student per month
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary">
                  ₹{collegeData.monthlyRatePerUser}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">1 Month</p>
                <p className="text-lg font-bold text-green-700">₹{collegeData.monthlyRatePerUser}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">3 Months</p>
                <p className="text-lg font-bold text-blue-700">₹{collegeData.monthlyRatePerUser * 3}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">6 Months</p>
                <p className="text-lg font-bold text-purple-700">₹{collegeData.monthlyRatePerUser * 6}</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-600 font-medium">12 Months</p>
                <p className="text-lg font-bold text-orange-700">₹{collegeData.monthlyRatePerUser * 12}</p>
              </div>
            </div>
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
            {/* Roll Number */}
            <div className="space-y-2">
              <Label htmlFor="roll-number">Roll Number *</Label>
              <Input
                id="roll-number"
                type="text"
                placeholder="Enter roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
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

              <div className="space-y-2">
                <Label htmlFor="student-password">Student Password *</Label>
                <div className="relative">
                  <Input
                    id="student-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter student password"
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    className="pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Enrollment Period */}
            <div className="space-y-2">
              <Label htmlFor="enrollment-months">Enrollment Period *</Label>
              <Select value={enrollmentMonths} onValueChange={setEnrollmentMonths}>
                <SelectTrigger className="cursor-pointer">
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
              className="w-full cursor-pointer"
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

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            View and download your past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingHistory ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading billing history...</p>
            </div>
          ) : billingHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p>No billing history found</p>
              <p className="text-sm mt-1">Create test payments or enroll students to see billing history</p>
            </div>
          ) : (
            <div className="space-y-4">
              {billingHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Receipt className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {payment.description || `Invoice ${payment.invoiceNumber}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(payment.paymentDate).toLocaleDateString('en-IN')} • {payment.studentCount} students • {payment.billingPeriod}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{payment.amount.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500">{payment.invoiceNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
