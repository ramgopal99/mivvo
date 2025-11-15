"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Coins } from "lucide-react"
import {
  calculateCreditUsage,
  formatCredits,
  formatRemainingCredits,
  minutesToCredits,
  CreditUsageInfo
} from "@/lib/credit-converter"
import { getAuthHeaders, getUserData } from "@/lib/auth-utils"

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function PlanTab() {
  // =============================================================================
  // STATE
  // =============================================================================

  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [creditUsage, setCreditUsage] = useState<CreditUsageInfo | null>(null)

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
          const totalCredits = minutesToCredits(timeData.data.totalTimeAllowance || 0)
          const usedCredits = minutesToCredits(timeData.data.usedTimeMinutes || 0)
          const creditUsageInfo = calculateCreditUsage(totalCredits, usedCredits)
          setCreditUsage(creditUsageInfo)
        }
      }
    } catch (error) {
      console.error('Failed to fetch user credit data:', error)
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

  // Get credit usage information
  const creditInfo = creditUsage ? formatRemainingCredits(creditUsage) : null

  return (
    <div className="space-y-6">


      {/* Credit Allowance & Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Credit Allowance & Usage
          </CardTitle>
          <CardDescription>
            Your interview credit usage and remaining allowance
          </CardDescription>
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
              {/* Credit Usage Progress */}
              {creditUsage && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Credits Used</span>
                    <span>{formatCredits(creditUsage.usedCredits)} / {formatCredits(creditUsage.totalCredits)}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        creditUsage.usagePercentage > 90 ? 'bg-destructive' :
                        creditUsage.usagePercentage > 75 ? 'bg-orange-500' :
                        'bg-primary'
                      }`}
                      style={{ width: `${Math.min(creditUsage.usagePercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{creditUsage.usagePercentage.toFixed(1)}% used</span>
                    <span>{creditInfo?.text || formatCredits(creditUsage.remainingCredits)} remaining</span>
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

              {/* Warning for low credits */}
              {creditUsage && creditUsage.usagePercentage > 90 && (
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