'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, RefreshCw, Home, CheckCircle } from "lucide-react"

const PendingPage = () => {
  const params = useParams()
  const [transactionId, setTransactionId] = useState<string>('')
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    if (params?.id) {
      setTransactionId(params.id as string)
    }
  }, [params?.id])

  const handleCheckStatus = async () => {
    setIsChecking(true)
    try {
      const response = await fetch('/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: transactionId })
      })

      if (!response.ok) {
        throw new Error('Status check failed')
      }

      const result = await response.text()

      if (result === "PAYMENT_SUCCESS") {
        window.location.href = `/success/${transactionId}`
      } else if (result === "PAYMENT_FAILED") {
        window.location.href = `/failed/${transactionId}`
      } else {
        // Still pending, show message
        setIsChecking(false)
      }
    } catch (error) {
      console.error("Status check error:", error)
      setIsChecking(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <Card className="w-full max-w-lg shadow-2xl border-yellow-200">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-yellow-100 p-4">
              <Clock className="h-16 w-16 text-yellow-600 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-yellow-800 mb-2">
            Payment Processing
          </CardTitle>
          <CardDescription className="text-lg text-yellow-700">
            Your payment is being processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="text-sm text-yellow-800 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span className="font-mono text-xs">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-yellow-600 font-semibold">Processing</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-medium text-blue-800 mb-1">What happens next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Your payment is being verified by our payment gateway</li>
                    <li>• This usually takes 1-2 minutes</li>
                    <li>• You will be automatically redirected once processed</li>
                    <li>• You can manually check the status below</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleCheckStatus}
                disabled={isChecking}
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700"
              >
                <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
                {isChecking ? 'Checking...' : 'Check Status'}
              </Button>

              <Link href="/" passHref>
                <Button variant="outline" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Need help? <Link href="/contact" className="text-yellow-600 hover:underline">Contact Support</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PendingPage
