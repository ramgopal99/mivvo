"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  CreditCard,
  Receipt,
  Save,
  Loader2,
  Users,
  TestTube
} from "lucide-react"
import { AlertDialog, AlertDialogTitle, AlertDialogHeader, AlertDialogContent } from "@/components/ui/alert-dialog"

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

interface BillingSettingsProps {
  collegeData?: CollegeBillingSettings
}

export function BillingSettings({
  collegeData: initialCollegeData
}: BillingSettingsProps) {
  const [collegeData, setCollegeData] = useState<CollegeBillingSettings | null>(initialCollegeData || null)
  const [isSaving, setIsSaving] = useState(false)
  const [isCreatingTestPayment, setIsCreatingTestPayment] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (!initialCollegeData) {
      loadCollegeData()
    }
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
      setMessage({ type: 'error', text: 'Failed to load college billing data' })
    }
  }


  const handleSave = async () => {
    if (!collegeData) return

    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/college/billing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('college_token')}`
        },
        body: JSON.stringify({
          // No settings to update - billing is handled via individual enrollments
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Update localStorage with new data
        localStorage.setItem('college_data', JSON.stringify(data.data))
        setCollegeData(data.data)
        setHasChanges(false)
        setMessage({ type: 'success', text: 'Billing settings updated successfully!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update billing settings' })
      }
    } catch (error) {
      console.error('Save error:', error)
      setMessage({ type: 'error', text: 'An error occurred while saving' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestPayment = async () => {
    if (!collegeData) return

    setIsCreatingTestPayment(true)
    setMessage(null)

    try {
      const studentCount = collegeData.totalAssociatedStudents || 0
      const amount = studentCount * collegeData.monthlyRatePerUser

      const response = await fetch('/api/college/enterprise-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('college_token')}`
        },
        body: JSON.stringify({
          amount,
          studentCount,
          ratePerStudent: collegeData.monthlyRatePerUser,
          description: `Enterprise billing for ${studentCount} associated students at ₹${collegeData.monthlyRatePerUser} per student`
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage({
          type: 'success',
          text: `Test payment created successfully! Amount: ₹${amount} for ${studentCount} students`
        })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create test payment' })
      }
    } catch (error) {
      console.error('Test payment error:', error)
      setMessage({ type: 'error', text: 'An error occurred while creating test payment' })
    } finally {
      setIsCreatingTestPayment(false)
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
      {/* Billing Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing Preferences
          </CardTitle>
          <CardDescription>
            Configure your college billing settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <AlertDialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{message.text}</AlertDialogTitle>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          )}


          {/* Student Statistics Display */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <Label className="text-base font-medium flex items-center gap-2 text-primary">
              <Users className="h-4 w-4" />
              Associated Students
            </Label>
            <div className="mt-3">
              <p className="text-sm text-primary/80">Total Users</p>
              <p className="text-2xl font-bold text-primary">{collegeData.totalAssociatedStudents || 0}</p>
            </div>
            <p className="text-xs text-primary/60 mt-2">
              Number of users associated with this college
            </p>
          </div>


          {/* Billing Information Display */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Current Billing Configuration</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span>Monthly Rate per User:</span>
                <span className="font-medium">₹{collegeData.monthlyRatePerUser}</span>
              </div>
              <div className="flex justify-between">
                <span>Billing Cycle:</span>
                <span className="font-medium capitalize">{collegeData.billingCycle}</span>
              </div>
              <div className="flex justify-between">
                <span>Next Billing Date:</span>
                <span className="font-medium">
                  {collegeData.nextBillingDate
                    ? new Date(collegeData.nextBillingDate).toLocaleDateString('en-IN')
                    : 'Not set'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last Billing Amount:</span>
                <span className="font-medium">₹{collegeData.lastBillingAmount}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleTestPayment}
              disabled={isCreatingTestPayment}
              variant="outline"
              className="flex-1"
            >
              {isCreatingTestPayment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Test Payment...
                </>
              ) : (
                <>
                  <TestTube className="mr-2 h-4 w-4" />
                  Create Test Payment
                </>
              )}
            </Button>

            {hasChanges && (
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>


      {/* Billing History Placeholder */}
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
          <div className="text-center py-8 text-muted-foreground">
            Billing history will be available once you have active subscriptions.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
