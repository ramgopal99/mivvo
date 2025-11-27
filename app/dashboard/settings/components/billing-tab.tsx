"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Calendar, CreditCard, Receipt } from "lucide-react"
import { useSession } from "next-auth/react"
import { CREDIT_PACKAGES } from "@/lib/credit-converter"
import { CREDIT_RESET_CONFIG, PRICING_CONFIG } from "@/config/site"
import { getAuthHeaders } from "@/lib/auth-utils"

interface Payment {
  id: string
  amount: number
  currency: string
  paymentCategory: string
  status: string
  paymentDate: string
  description?: string
  value?: number
  createdAt: string
}

export function BillingTab() {
  const { data: session, status } = useSession()
  const [addonValue, setAddonValue] = useState<string>(PRICING_CONFIG.ADDON_CREDITS.AVAILABLE_PACKAGES[0].minutes.toString())
  const [isCreatingPayment, setIsCreatingPayment] = useState(false)
  const [payments, setPayments] = useState<Payment[]>([])
  const [loadingPayments, setLoadingPayments] = useState(true)
  const [userType, setUserType] = useState<'FREE' | 'PRO'>('FREE')
  const [isPlanExpired, setIsPlanExpired] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userDataLoaded, setUserDataLoaded] = useState(false)
  const [enrollmentData, setEnrollmentData] = useState<{
    enrollmentDate: string | null;
    expirationDate: string | null;
  }>({ enrollmentDate: null, expirationDate: null })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogDescription, setDialogDescription] = useState('')

  // Fetch user payments
  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments?limit=10', {
        headers: getAuthHeaders()
      })
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments || [])
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoadingPayments(false)
    }
  }

  // Fetch user type and check plan status
  const fetchUserData = useCallback(async () => {
    try {
      // Get JWT token for college students
      const jwtToken = typeof window !== 'undefined' ? (
        localStorage.getItem('token') ||
        localStorage.getItem('student_token') ||
        localStorage.getItem('college_token')
      ) : null

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`
      }

      const response = await fetch('/api/user/profile', {
        headers
      })
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setUserType(data.data.userType || 'FREE')
          const role = data.data.role || null
          setUserRole(role)
          setUserDataLoaded(true)

          // Fetch payments for all users
          fetchPayments()

          // Special handling for college students - check if they have college data
          if (data.data.role === 'COLLEGE_STUDENT' && data.data.college) {
            // For college students, use enrollment data from user profile
            if (data.data.enrollment) {
              console.log('College student enrollment data:', data.data.enrollment)
              setEnrollmentData({
                enrollmentDate: data.data.enrollment.enrollmentDate,
                expirationDate: data.data.enrollment.expirationDate
              })
              const now = new Date()
              const expirationDate = new Date(data.data.enrollment.expirationDate)
              const expired = expirationDate < now
              console.log('Date comparison:', {
                expirationDateString: data.data.enrollment.expirationDate,
                expirationDateParsed: expirationDate.toISOString(),
                now: now.toISOString(),
                expired,
                timeDiff: expirationDate.getTime() - now.getTime()
              })
              setIsPlanExpired(expired)
              // College students with active enrollment should be treated as PRO users
              setUserType(expired ? 'FREE' : 'PRO')
              console.log('Set isPlanExpired to:', expired, 'and userType to:', expired ? 'FREE' : 'PRO')
            } else {
              console.log('No enrollment data found for college student')
              setIsPlanExpired(true)
              setUserType('FREE')
            }
          } else {
            // Regular users - check 30-day reset period
            if (data.data.creditResetAt) {
              const resetDate = new Date(data.data.creditResetAt)
              const now = new Date()
              const timeSinceReset = now.getTime() - resetDate.getTime()
              setIsPlanExpired(timeSinceReset >= CREDIT_RESET_CONFIG.RESET_PERIOD_MS)
            } else {
              // If no creditResetAt, assume plan is not expired for new PRO users
              setIsPlanExpired(false)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUserDataLoaded(true) // Set loaded even on error to prevent infinite loading
    }
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUserData()
    }
  }, [status, fetchUserData])

  const showDialog = (title: string, description: string) => {
    setDialogTitle(title)
    setDialogDescription(description)
    setDialogOpen(true)
  }

  const createDummyPayment = async (category: 'MONTHLY' | 'ADDON') => {
    // Check if user is authenticated (either NextAuth or JWT)
    if (!session?.user?.id && !localStorage.getItem('token') && !localStorage.getItem('student_token') && !localStorage.getItem('college_token')) {
      console.error('No authentication found')
      return
    }

    setIsCreatingPayment(true)
    try {
      const paymentData = {
        userId: session?.user?.id, // This will be null for college students, but the API will handle JWT auth
        paymentCategory: category,
        status: 'COMPLETED',
        paymentDate: new Date().toISOString(),
        ...(category === 'MONTHLY' && {
          amount: PRICING_CONFIG.MONTHLY_PRO.PRICE_INR,
          currency: 'INR',
          description: `${PRICING_CONFIG.MONTHLY_PRO.DESCRIPTION} - Monthly Subscription`,
        }),
        ...(category === 'ADDON' && {
          amount: PRICING_CONFIG.ADDON_CREDITS.AVAILABLE_PACKAGES.find(pkg => pkg.minutes === parseFloat(addonValue))?.rupees || 0,
          currency: 'INR',
          value: parseFloat(addonValue), // Store minutes as credits in database
          description: `${Math.floor(parseFloat(addonValue) * 12)} Extra Credits Purchase (₹${PRICING_CONFIG.ADDON_CREDITS.AVAILABLE_PACKAGES.find(pkg => pkg.minutes === parseFloat(addonValue))?.rupees || 0})`,
        })
      }

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(paymentData)
      })

      if (response.ok) {
        const message = category === 'MONTHLY'
          ? `Credits reset to ${PRICING_CONFIG.MONTHLY_PRO.CREDITS * 12} and expiry date updated.`
          : `${Math.floor(parseFloat(addonValue) * 12)} credits added to your account for ₹${PRICING_CONFIG.ADDON_CREDITS.AVAILABLE_PACKAGES.find(pkg => pkg.minutes === parseFloat(addonValue))?.rupees || 0} (expiry date unchanged).`
        showDialog(
          category === 'MONTHLY' ? 'Monthly Payment Created' : 'Addon Payment Created',
          message
        )
        // Refresh payments list and credit data
        fetchPayments()
        // Trigger credit data refresh by dispatching a custom event
        window.dispatchEvent(new CustomEvent('refreshCreditData'))
      } else {
        try {
          const errorData = await response.json()
          showDialog('Payment Failed', errorData.error || 'Failed to create payment. Please try again.')
        } catch {
          showDialog('Payment Failed', 'Failed to create payment. Please try again.')
        }
      }
    } catch (error) {
      console.error('Error creating payment:', error)
      showDialog('Payment Error', 'An error occurred while creating the payment. Please try again.')
    } finally {
      setIsCreatingPayment(false)
    }
  }

  const getExpiryDate = () => {
    const now = new Date()
    const expiryDate = new Date(now)
    expiryDate.setMonth(now.getMonth() + 1)
    return expiryDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* College Student Enrollment Info */}
      {userRole === 'COLLEGE_STUDENT' && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <Calendar className="h-5 w-5" />
              <span>College Enrollment</span>
            </CardTitle>
            <CardDescription>
              Your current enrollment details and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-700">Enrollment Date</Label>
                <div className="p-3 bg-white rounded-md border border-green-200">
                  <p className="text-sm">
                    {enrollmentData.enrollmentDate
                      ? new Date(enrollmentData.enrollmentDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      : 'Not available'
                    }
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-700">Expiration Date</Label>
                <div className="p-3 bg-white rounded-md border border-green-200">
                  <p className="text-sm">
                    {enrollmentData.expirationDate
                      ? new Date(enrollmentData.expirationDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      : 'Not available'
                    }
                  </p>
                  {enrollmentData.expirationDate && new Date(enrollmentData.expirationDate) < new Date() && (
                    <p className="text-xs text-red-600 mt-1">Enrollment has expired</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> College students receive PRO credits for their enrollment period.
                You can purchase additional credits below if needed.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>{userRole === 'COLLEGE_STUDENT' ? 'Purchase Additional Credits' : 'Test Payments'}</span>
          </CardTitle>
          <CardDescription>
            {userRole === 'COLLEGE_STUDENT'
              ? 'Purchase additional credits for your college enrollment'
              : 'Create dummy payments for testing purposes'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monthly Payment - Hidden for college students */}
          {userRole !== 'COLLEGE_STUDENT' && (
            <div className={`border rounded-lg p-4 ${userType === 'PRO' ? 'border-gray-300 bg-gray-50' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className={`h-5 w-5 ${userType === 'PRO' ? 'text-gray-400' : 'text-blue-500'}`} />
                  <div>
                    <h3 className={`font-medium ${userType === 'PRO' ? 'text-gray-500' : 'text-gray-900'}`}>Monthly Subscription</h3>
                    <p className={`text-sm ${userType === 'PRO' ? 'text-gray-400' : 'text-gray-600'}`}>
                      ₹{PRICING_CONFIG.MONTHLY_PRO.PRICE_INR} - {PRICING_CONFIG.MONTHLY_PRO.DESCRIPTION} ({CREDIT_PACKAGES.PRO * 12} credits)
                    </p>
                    {userType === 'PRO' && (
                      <p className="text-xs text-orange-600 mt-1">You already have an active PRO subscription</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${userType === 'PRO' ? 'text-gray-400' : 'text-gray-500'}`}>Expires: {getExpiryDate()}</p>
                  <Button
                    onClick={() => createDummyPayment('MONTHLY')}
                    disabled={isCreatingPayment || userType === 'PRO'}
                    size="sm"
                    className="mt-1"
                    variant={userType === 'PRO' ? 'secondary' : 'default'}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    {isCreatingPayment ? 'Creating...' : userType === 'PRO' ? 'Already PRO' : 'Create Payment'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Addon Payment */}
          <div className={`border rounded-lg p-4 ${
            userRole === 'COLLEGE_STUDENT'
              ? (userType === 'PRO' && !isPlanExpired ? 'border-green-200 bg-green-50' : 'border-gray-300 bg-gray-50')
              : (userType === 'FREE' || (userType === 'PRO' && isPlanExpired) ? 'border-gray-300 bg-gray-50' : 'border-gray-200')
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Plus className={`h-5 w-5 ${
                  userRole === 'COLLEGE_STUDENT'
                    ? (userType === 'PRO' && !isPlanExpired ? 'text-green-500' : 'text-gray-400')
                    : (userType === 'FREE' || (userType === 'PRO' && isPlanExpired) ? 'text-gray-400' : 'text-green-500')
                }`} />
                <div>
                  <h3 className={`font-medium ${
                    userRole === 'COLLEGE_STUDENT'
                      ? (userType === 'PRO' && !isPlanExpired ? 'text-gray-900' : 'text-gray-500')
                      : (userType === 'FREE' || (userType === 'PRO' && isPlanExpired) ? 'text-gray-500' : 'text-gray-900')
                  }`}>Addon Credits</h3>
                  <p className={`text-sm ${
                    userRole === 'COLLEGE_STUDENT'
                      ? 'text-gray-600'
                      : (userType === 'FREE' || (userType === 'PRO' && isPlanExpired) ? 'text-gray-400' : 'text-gray-600')
                  }`}>
                    {userRole === 'COLLEGE_STUDENT'
                      ? 'Purchase additional credits anytime'
                      : (userType === 'PRO' && !isPlanExpired
                          ? 'Purchase extra credits for your active plan'
                          : userType === 'PRO' && isPlanExpired
                          ? 'Your plan has expired - renew to purchase addon credits'
                          : 'Available for PRO plan users with active subscriptions')
                    }
                  </p>
                  {userRole !== 'COLLEGE_STUDENT' && userType === 'FREE' && (
                    <p className="text-xs text-orange-600 mt-1">Upgrade to PRO to purchase addon credits</p>
                  )}
                  {userRole !== 'COLLEGE_STUDENT' && userType === 'PRO' && isPlanExpired && (
                    <p className="text-xs text-red-600 mt-1">Your subscription has expired</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Select
                  value={addonValue}
                  onValueChange={setAddonValue}
                  disabled={
                    userRole === 'COLLEGE_STUDENT'
                      ? false  // College students can always select addon packages
                      : userType === 'FREE' || (userType === 'PRO' && isPlanExpired)
                  }
                >
                  <SelectTrigger className="w-32 cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRICING_CONFIG.ADDON_CREDITS.AVAILABLE_PACKAGES.map((pkg) => (
                      <SelectItem key={pkg.rupees} value={pkg.minutes.toString()}>
                        {pkg.display}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => {
                    console.log('Addon button clicked - current state:', {
                      userRole,
                      userType,
                      isPlanExpired,
                      isCreatingPayment,
                      enrollmentData
                    })
                    createDummyPayment('ADDON')
                  }}
                  disabled={
                    isCreatingPayment ||
                    (userRole === 'COLLEGE_STUDENT'
                      ? false  // College students can always purchase addon credits
                      : userType === 'FREE' || (userType === 'PRO' && isPlanExpired))
                  }
                  size="sm"
                  variant={
                    (userRole === 'COLLEGE_STUDENT') ||
                    (userRole !== 'COLLEGE_STUDENT' && userType === 'PRO' && !isPlanExpired)
                      ? 'outline'
                      : 'secondary'
                  }
                  className="cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {isCreatingPayment ? 'Creating...' :
                   userRole === 'COLLEGE_STUDENT'
                     ? 'Buy Credits'
                     : (userType === 'FREE' ? 'Upgrade PRO' :
                        (userType === 'PRO' && isPlanExpired) ? 'Renew Plan' :
                        'Buy Credits')}
                </Button>
              </div>
            </div>
            {(userRole === 'COLLEGE_STUDENT' || (userType === 'PRO' && !isPlanExpired)) && (
              <div className="text-sm text-gray-600">
                Price: ₹{PRICING_CONFIG.ADDON_CREDITS.AVAILABLE_PACKAGES.find(pkg => pkg.minutes === parseFloat(addonValue))?.rupees || 0} ({Math.floor(parseFloat(addonValue) * 12)} credits)
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      {userDataLoaded && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="h-5 w-5" />
              <span>{userRole === 'COLLEGE_STUDENT' ? 'Credit History' : 'Payment History'}</span>
            </CardTitle>
            <CardDescription>
              {userRole === 'COLLEGE_STUDENT' ? 'Your credit purchase history' : 'Your recent payment transactions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingPayments ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Loading payments...</p>
              </div>
            ) : payments.filter((payment) => userRole === 'COLLEGE_STUDENT' ? payment.paymentCategory === 'ADDON' : true).length === 0 ? (
              <div className="text-center py-8">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {userRole === 'COLLEGE_STUDENT' ? 'No credit purchases found' : 'No payments found'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {userRole === 'COLLEGE_STUDENT'
                    ? 'Purchase addon credits above to see them here'
                    : 'Create dummy payments above to see them here'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {payments
                  .filter((payment) => userRole === 'COLLEGE_STUDENT' ? payment.paymentCategory === 'ADDON' : true)
                  .map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        payment.paymentCategory === 'MONTHLY' ? 'bg-blue-100' :
                        payment.paymentCategory === 'ADDON' ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {payment.paymentCategory === 'MONTHLY' ? (
                          <Calendar className={`h-4 w-4 ${
                            payment.paymentCategory === 'MONTHLY' ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        ) : (
                          <Plus className={`h-4 w-4 ${
                            payment.paymentCategory === 'ADDON' ? 'text-green-600' : 'text-gray-600'
                          }`} />
                        )}
                </div>
                <div>
                        <p className="font-medium text-gray-900">
                          {payment.description || `${payment.paymentCategory} Payment`}
                          {payment.value && payment.paymentCategory === 'ADDON' && ` (${Math.floor(payment.value * 12)} credits)`}
                          {payment.value && payment.paymentCategory === 'MONTHLY' && ` (${payment.value * 12} credits)`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(payment.paymentDate).toLocaleDateString('en-IN')} • {payment.currency} {payment.amount}
                        </p>
                </div>
              </div>
                    <Badge
                      variant={payment.status === 'COMPLETED' ? 'default' : 'secondary'}
                      className={
                        payment.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {payment.status}
              </Badge>
            </div>
                ))}
            </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Success/Error Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setDialogOpen(false)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
