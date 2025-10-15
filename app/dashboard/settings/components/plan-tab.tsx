"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock } from "lucide-react"
import { getUserDetails } from "../actions"
import { UserData } from "../types"

export function PlanTab() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserDetails()
        if (response.success && response.data) {
          setUserData(response.data)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Helper function to format time in minutes only
  const formatTime = (minutes: number): string => {
    return `${minutes} min`
  }

  const totalAllowance = userData?.totalTimeAllowance || 0
  const usedTime = userData?.usedTimeMinutes || 0
  const remainingTime = Math.max(0, totalAllowance - usedTime)
  const usagePercentage = totalAllowance > 0 ? (usedTime / totalAllowance) * 100 : 0

  return (
    <div className="space-y-6">


      {/* Time Allowance & Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Allowance & Usage
          </CardTitle>
          <CardDescription>
            Your interview time usage and remaining allowance
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
              {/* Time Usage Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Time Used</span>
                  <span>{formatTime(usedTime)} / {formatTime(totalAllowance)}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      usagePercentage > 90 ? 'bg-destructive' :
                      usagePercentage > 75 ? 'bg-orange-500' :
                      'bg-primary'
                    }`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{usagePercentage.toFixed(1)}% used</span>
                  <span>{formatTime(remainingTime)} remaining</span>
                </div>
              </div>

              <Separator />

              {/* Time Statistics Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{formatTime(totalAllowance)}</div>
                  <div className="text-sm text-muted-foreground">Total Allowance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{formatTime(usedTime)}</div>
                  <div className="text-sm text-muted-foreground">Time Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{formatTime(remainingTime)}</div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                </div>
              </div>

              {/* Warning for low time */}
              {usagePercentage > 90 && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive font-medium">
                    ⚠️ You&apos;re running low on interview time. Consider upgrading your plan.
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