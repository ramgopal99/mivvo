"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Coins, Clock, RotateCcw } from "lucide-react"
import {
  calculateCreditUsage,
  formatCredits,
  formatRemainingCredits,
  minutesToCredits,
  CreditUsageInfo
} from "@/lib/credit-converter"
import { getAuthHeaders, getUserData } from "@/lib/auth-utils"
import { CREDIT_RESET_CONFIG } from "@/config/site"

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function PlanTab() {
  // =============================================================================
  // STATE
  // =============================================================================

  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [creditUsage, setCreditUsage] = useState<CreditUsageInfo | null>(null)
  const [creditsExpired, setCreditsExpired] = useState(false)
  const [allocatedAt, setAllocatedAt] = useState<Date | null>(null)

  // =============================================================================
  // API FUNCTIONS
  // =============================================================================

  /**
   * Fetch user's time data from the API and convert to credit usage
   */
  const fetchUserCreditData = async (): Promise<void> => {
    try {
      const response = await fetch('/api/user/time-data', {
        headers: getAuthHeaders(),
      })

      if (response.ok) {
        const timeData = await response.json()
        if (timeData.success && timeData.data) {
          // Convert time data to credits (12 credits = 1 minute)
          const totalCredits = minutesToCredits(timeData.data.totalCreditAllocation || 0)
          const usedCredits = minutesToCredits(timeData.data.usedCredits || 0)
          const creditUsageInfo = calculateCreditUsage(totalCredits, usedCredits)
          setCreditUsage(creditUsageInfo)

          // Set credits expired status
          setCreditsExpired(timeData.data.creditsExpired || false)
          setAllocatedAt(timeData.data.allocatedAt ? new Date(timeData.data.allocatedAt) : null)
        }
      }
    } catch (error) {
      console.error('Failed to fetch user credit data:', error)
    }
  }

  /**
   * Refresh credit data manually
   */
  const refreshCreditData = async (): Promise<void> => {
    setRefreshing(true)
    try {
      await fetchUserCreditData()
    } finally {
      setRefreshing(false)
    }
  }

  // =============================================================================
  // EFFECTS
  // =============================================================================

  useEffect(() => {
    const loadCreditData = async (): Promise<void> => {
      try {
        // Get user data based on authentication method
        const userData = getUserData(session, status)

        // Fetch credit data for authenticated users
        if (userData) {
          await fetchUserCreditData()
        }
      } catch (error) {
        console.error('Error loading credit data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCreditData()
  }, [session, status])

  // Auto-refresh mechanism - check for credit expiration every 30 seconds
  useEffect(() => {
    const autoRefreshInterval = setInterval(async () => {
      try {
        const userData = getUserData(session, status)
        if (userData && !refreshing) {
          await fetchUserCreditData()
        }
      } catch (error) {
        console.error('Auto-refresh error:', error)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(autoRefreshInterval)
  }, [session, status, refreshing])



  // Helper function to format date as "15 Dec 2025"
  const formatDate = (date: Date): string => {
    const day = date.getDate()
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  // Helper function to format allocation date
  const formatAllocationDate = (date: Date): string => {
    return formatDate(date)
  }

  // Helper function to format expiration date
  const formatExpirationDate = (allocationDate: Date): string => {
    const expirationTime = new Date(allocationDate.getTime() + CREDIT_RESET_CONFIG.RESET_PERIOD_MS)
    return formatDate(expirationTime)
  }

  // Get credit usage information
  const creditInfo = creditUsage ? formatRemainingCredits(creditUsage) : null

  return (
    <div className="space-y-6">


      {/* Credit Allowance & Usage */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Credit Allowance & Usage
              </CardTitle>
              <CardDescription>
                Your interview credit usage and remaining allowance
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshCreditData}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RotateCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading usage data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Credit Usage Progress - Full bar that decreases when used */}
              {creditUsage && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credit Progress</span>
                    <span>{formatCredits(creditUsage.remainingCredits)} / {formatCredits(creditUsage.totalCredits)} remaining</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        creditUsage.remainingCredits === 0 ? 'bg-red-500' :
                        creditUsage.usagePercentage > 90 ? 'bg-orange-500' :
                        creditUsage.usagePercentage > 75 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.max(0, 100 - creditUsage.usagePercentage)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Credits available</span>
                    <span>{creditUsage.usagePercentage.toFixed(1)}% used</span>
                  </div>
                </div>
              )}

              <Separator />

              {/* Credit Statistics Grid */}
              {creditUsage && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{formatCredits(creditUsage.totalCredits)}</div>
                    <div className="text-sm text-muted-foreground">Total Credits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{formatCredits(creditUsage.usedCredits)}</div>
                    <div className="text-sm text-muted-foreground">Credits Used</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      creditInfo?.statusColor === 'danger' ? 'text-red-600' :
                      creditInfo?.statusColor === 'warning' ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {creditInfo?.text || formatCredits(creditUsage.remainingCredits)}
                    </div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                  </div>
                </div>
              )}

              {/* Credit Allocation Info */}
              <div className={`border rounded-lg p-4 ${creditsExpired ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    {allocatedAt && (
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-blue-700">
                          Allocated on {formatAllocationDate(allocatedAt)}
                        </span>
                        <span className="text-sm text-blue-700">
                          Credits expire on {formatExpirationDate(allocatedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Warning for expired credits */}
              {creditsExpired && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700 font-medium">
                    ⏰ Your credits have expired. You need to upgrade your plan to get more credits.
                  </p>
                </div>
              )}

              {/* Warning for low credits */}
              {creditUsage && creditUsage.usagePercentage > 90 && !creditsExpired && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive font-medium">
                    ⚠️ You&apos;re running low on interview credits. Consider upgrading your plan.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 