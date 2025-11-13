'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, CreditCard, Smartphone } from 'lucide-react'

interface PaymentFormProps {
  onPaymentInitiated?: (paymentUrl: string, transactionId: string) => void
}

export function PaymentForm({ onPaymentInitiated }: PaymentFormProps) {
  const [amount, setAmount] = useState<string>('100')
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<'PAY_PAGE' | 'UPI' | 'CARD' | 'NET_BANKING'>('PAY_PAGE')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Generate unique transaction ID
      const merchantTransactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`
      const merchantUserId = `USER${Date.now()}`

      const response = await fetch('/api/phonepe/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchantTransactionId,
          merchantUserId,
          amount: parseFloat(amount),
          mobileNumber: mobileNumber || undefined,
          paymentInstrument: {
            type: paymentMethod,
          },
        }),
      })

      const data = await response.json()

      if (!data.success) {
        toast.error(data.error || 'Failed to create payment')
        return
      }

      // Get redirect URL from response
      const redirectUrl = data.data?.instrumentResponse?.redirectInfo?.url

      if (redirectUrl) {
        toast.success('Payment initiated successfully!')
        if (onPaymentInitiated) {
          onPaymentInitiated(redirectUrl, merchantTransactionId)
        } else {
          // Redirect to PhonePe payment page
          window.location.href = redirectUrl
        }
      } else {
        toast.error('Payment URL not received')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('An error occurred while processing payment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PhonePe Payment Gateway</CardTitle>
        <CardDescription>
          Test PhonePe Standard Checkout API integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number (Optional)</Label>
            <Input
              id="mobile"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="9876543210"
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as typeof paymentMethod)}
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAY_PAGE">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Page (All Methods)
                  </div>
                </SelectItem>
                <SelectItem value="UPI">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    UPI
                  </div>
                </SelectItem>
                <SelectItem value="CARD">Credit/Debit Card</SelectItem>
                <SelectItem value="NET_BANKING">Net Banking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

