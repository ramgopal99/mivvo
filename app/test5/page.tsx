'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PaymentForm } from './components/payment-form'
import { OrderStatus } from './components/order-status'
import { RefundForm } from './components/refund-form'
import { RefundStatus } from './components/refund-status'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { InfoIcon, CreditCard } from 'lucide-react'

export default function PhonePeTestPage() {
  const [lastTransactionId, setLastTransactionId] = useState<string>('')

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <CreditCard className="h-8 w-8" />
          PhonePe Payment Gateway Integration
        </h1>
        <p className="text-muted-foreground">
          Test and integrate PhonePe Standard Checkout API
        </p>
      </div>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Setup Required</AlertTitle>
        <AlertDescription>
          Make sure to configure your PhonePe credentials in environment variables:
          PHONEPE_CLIENT_ID, PHONEPE_CLIENT_SECRET, PHONEPE_MERCHANT_ID, PHONEPE_SALT_KEY, PHONEPE_SALT_INDEX
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="payment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="payment">Create Payment</TabsTrigger>
          <TabsTrigger value="status">Order Status</TabsTrigger>
          <TabsTrigger value="refund">Refund</TabsTrigger>
          <TabsTrigger value="refund-status">Refund Status</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-4">
          <PaymentForm
            onPaymentInitiated={(paymentUrl, transactionId) => {
              setLastTransactionId(transactionId)
              // Optionally open in new window or redirect
              window.open(paymentUrl, '_blank')
            }}
          />
          {lastTransactionId && (
            <Card>
              <CardHeader>
                <CardTitle>Last Transaction</CardTitle>
                <CardDescription>Use this ID to check order status</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {lastTransactionId}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="status">
          <OrderStatus />
        </TabsContent>

        <TabsContent value="refund">
          <RefundForm />
        </TabsContent>

        <TabsContent value="refund-status">
          <RefundStatus />
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>Available API routes for PhonePe integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-mono">
            <div>
              <span className="text-muted-foreground">POST</span>{' '}
              <span>/api/phonepe/auth</span> - Get authorization token
            </div>
            <div>
              <span className="text-muted-foreground">POST</span>{' '}
              <span>/api/phonepe/payment</span> - Create payment
            </div>
            <div>
              <span className="text-muted-foreground">GET</span>{' '}
              <span>/api/phonepe/status/[orderId]</span> - Check order status
            </div>
            <div>
              <span className="text-muted-foreground">POST</span>{' '}
              <span>/api/phonepe/refund</span> - Process refund
            </div>
            <div>
              <span className="text-muted-foreground">GET</span>{' '}
              <span>/api/phonepe/refund-status/[refundId]</span> - Check refund status
            </div>
            <div>
              <span className="text-muted-foreground">POST/GET</span>{' '}
              <span>/api/phonepe/callback</span> - Payment callback handler
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

