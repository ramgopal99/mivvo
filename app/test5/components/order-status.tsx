'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Loader2, Search, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react'
import type { OrderStatusResponse } from '../types/phonepe'

type OrderData = NonNullable<OrderStatusResponse['data']>

export function OrderStatus() {
  const [orderId, setOrderId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  const handleCheckStatus = async () => {
    if (!orderId.trim()) {
      toast.error('Please enter an order ID')
      return
    }

    setIsLoading(true)
    setOrderData(null)

    try {
      const response = await fetch(`/api/phonepe/status/${orderId}`)
      const data = await response.json()

      if (!data.success) {
        toast.error(data.error || 'Failed to fetch order status')
        return
      }

      setOrderData(data.data)
      toast.success('Order status fetched successfully')
    } catch (error) {
      console.error('Status check error:', error)
      toast.error('An error occurred while checking status')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (state: string) => {
    switch (state) {
      case 'COMPLETED':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'FAILED':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'COMPLETED':
        return 'bg-green-500'
      case 'FAILED':
        return 'bg-red-500'
      case 'PENDING':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check Order Status</CardTitle>
        <CardDescription>
          Enter your merchant transaction ID to check payment status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="orderId">Merchant Transaction ID</Label>
            <Input
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="TXN1234567890"
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

        {orderData && (
          <div className="mt-4 p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Order Status</h3>
              <Badge className={getStatusColor(orderData.state)}>
                <div className="flex items-center gap-2">
                  {getStatusIcon(orderData.state)}
                  {orderData.state}
                </div>
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Merchant ID:</span>
                <p className="font-mono">{orderData.merchantId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Transaction ID:</span>
                <p className="font-mono">{orderData.transactionId || 'N/A'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <p className="font-semibold">₹{((orderData.amount || 0) / 100).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Response Code:</span>
                <p className="font-mono">{orderData.responseCode}</p>
              </div>
            </div>

            {orderData.paymentInstrument && (
              <div className="pt-2 border-t">
                <span className="text-muted-foreground text-sm">Payment Method:</span>
                <p className="font-semibold">{orderData.paymentInstrument.type || 'N/A'}</p>
                {orderData.paymentInstrument.utr && (
                  <p className="text-xs text-muted-foreground mt-1">
                    UTR: {orderData.paymentInstrument.utr}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

