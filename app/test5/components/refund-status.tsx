'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Loader2, Search } from 'lucide-react'

export function RefundStatus() {
  const [refundId, setRefundId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [refundData, setRefundData] = useState<any>(null)

  const handleCheckStatus = async () => {
    if (!refundId.trim()) {
      toast.error('Please enter a refund ID')
      return
    }

    setIsLoading(true)
    setRefundData(null)

    try {
      const response = await fetch(`/api/phonepe/refund-status/${refundId}`)
      const data = await response.json()

      if (!data.success) {
        toast.error(data.error || 'Failed to fetch refund status')
        return
      }

      setRefundData(data.data)
      toast.success('Refund status fetched successfully')
    } catch (error) {
      console.error('Refund status check error:', error)
      toast.error('An error occurred while checking refund status')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check Refund Status</CardTitle>
        <CardDescription>
          Enter your merchant refund ID to check refund status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="refundId">Merchant Refund ID</Label>
            <Input
              id="refundId"
              value={refundId}
              onChange={(e) => setRefundId(e.target.value)}
              placeholder="REF1234567890"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleCheckStatus} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {refundData && (
          <div className="mt-4 p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Refund Status</h3>
              <Badge
                className={
                  refundData.state === 'COMPLETED'
                    ? 'bg-green-500'
                    : refundData.state === 'FAILED'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                }
              >
                {refundData.state}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Refund ID:</span>
                <p className="font-mono">{refundData.merchantRefundId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Transaction ID:</span>
                <p className="font-mono">{refundData.transactionId || 'N/A'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <p className="font-semibold">₹{(refundData.amount / 100).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Response Code:</span>
                <p className="font-mono">{refundData.responseCode}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

