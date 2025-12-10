'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, RefreshCw, Home, HelpCircle } from "lucide-react"

const FailedPage = () => {
  const params = useParams()
  const [transactionId, setTransactionId] = useState<string>('')

  useEffect(() => {
    if (params?.id) {
      setTransactionId(params.id as string)
    }
  }, [params?.id])

  const handleRetryPayment = () => {
    // Redirect back to dashboard settings for retry
    window.location.href = '/dashboard/settings'
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50">
      <Card className="w-full max-w-lg shadow-2xl border-red-200">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-4">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-red-800 mb-2">
            Payment Failed
          </CardTitle>
          <CardDescription className="text-lg text-red-700">
            Unfortunately, your payment could not be processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="text-sm text-red-800 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span className="font-mono text-xs">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-red-600 font-semibold">Failed</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-medium text-yellow-800 mb-1">Possible reasons for failure:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Insufficient funds</li>
                    <li>• Invalid card details</li>
                    <li>• Network connectivity issues</li>
                    <li>• Payment gateway timeout</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleRetryPayment}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>

              <Link href="/dashboard" passHref>
                <Button variant="outline" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Still having issues? <Link href="/contact" className="text-red-600 hover:underline">Contact Support</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FailedPage




