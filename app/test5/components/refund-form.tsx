'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, RefreshCcw } from 'lucide-react'

export function RefundForm() {
  const [originalTransactionId, setOriginalTransactionId] = useState<string>('')
  const [merchantUserId, setMerchantUserId] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [refundData, setRefundData] = useState<any>(null)

  const handleRefund = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setRefundData(null)

    try {
      const merchantRefundId = `REF${Date.now()}${Math.random().toString(36).substr(2, 9)}`

      const response = await fetch('/api/phonepe/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalTransactionId,
          merchantUserId: merchantUserId || `USER${Date.now()}`,
          merchantRefundId,
          amount: parseFloat(amount),
        }),
      })

      const data = await response.json()

      if (!data.success) {
        toast.error(data.error || 'Failed to process refund')
        return
      }

      setRefundData(data.data)
      toast.success('Refund initiated successfully!')
    } catch (error) {
      console.error('Refund error:', error)
      toast.error('An error occurred while processing refund')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Refund</CardTitle>
        <CardDescription>
          Initiate a refund for a completed transaction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRefund} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="originalTransactionId">Original Transaction ID *</Label>
            <Input
              id="originalTransactionId"
              value={originalTransactionId}
              onChange={(e) => setOriginalTransactionId(e.target.value)}
              placeholder="PhonePe Transaction ID"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="merchantUserId">Merchant User ID</Label>
            <Input
              id="merchantUserId"
              value={merchantUserId}
              onChange={(e) => setMerchantUserId(e.target.value)}
              placeholder="Optional - Auto-generated if empty"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="refundAmount">Refund Amount (₹) *</Label>
            <Input
              id="refundAmount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100.00"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Refund...
              </>
            ) : (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Initiate Refund
              </>
            )}
          </Button>
        </form>

        {refundData && (
          <div className="mt-4 p-4 border rounded-lg space-y-2">
            <h3 className="font-semibold">Refund Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Refund ID:</span>
                <p className="font-mono">{refundData.merchantRefundId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="font-semibold">{refundData.state}</p>
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

