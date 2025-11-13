'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CallbackContent() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    // Extract payment data from URL parameters
    const data: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      data[key] = value
    })
    setPaymentData(data)
  }, [searchParams])

  const getStatusIcon = (code: string) => {
    if (code === 'PAYMENT_SUCCESS' || code === 'SUCCESS') {
      return <CheckCircle2 className="h-8 w-8 text-green-500" />
    } else if (code === 'PAYMENT_ERROR' || code === 'FAILED') {
      return <XCircle className="h-8 w-8 text-red-500" />
    } else if (code === 'PAYMENT_PENDING') {
      return <Clock className="h-8 w-8 text-yellow-500" />
    }
    return <AlertCircle className="h-8 w-8 text-gray-500" />
  }

  const getStatusBadge = (code: string) => {
    if (code === 'PAYMENT_SUCCESS' || code === 'SUCCESS') {
      return <Badge className="bg-green-500">Success</Badge>
    } else if (code === 'PAYMENT_ERROR' || code === 'FAILED') {
      return <Badge className="bg-red-500">Failed</Badge>
    } else if (code === 'PAYMENT_PENDING') {
      return <Badge className="bg-yellow-500">Pending</Badge>
    }
    return <Badge>Unknown</Badge>
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Payment Callback</CardTitle>
          <CardDescription>
            Payment processing result from PhonePe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentData && Object.keys(paymentData).length > 0 ? (
            <>
              <div className="flex items-center justify-center py-4">
                {getStatusIcon(paymentData.code || paymentData.status || '')}
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">
                  {paymentData.code === 'PAYMENT_SUCCESS' || paymentData.status === 'SUCCESS'
                    ? 'Payment Successful!'
                    : paymentData.code === 'PAYMENT_ERROR' || paymentData.status === 'FAILED'
                    ? 'Payment Failed'
                    : 'Payment Pending'}
                </h2>
                {getStatusBadge(paymentData.code || paymentData.status || '')}
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="font-semibold">Payment Details:</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(paymentData).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-mono text-right">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {paymentData.merchantTransactionId && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Transaction ID (use this to check order status):
                  </p>
                  <p className="font-mono text-sm">{paymentData.merchantTransactionId}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No payment data received. This page is typically accessed after a payment redirect.
              </p>
            </div>
          )}

          <div className="flex gap-2 mt-6">
            <Button asChild className="flex-1">
              <Link href="/test5">Back to Payment Test</Link>
            </Button>
            {paymentData?.merchantTransactionId && (
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/test5?tab=status&orderId=${paymentData.merchantTransactionId}`}>
                  Check Status
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
