'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home } from "lucide-react"

const SuccessPage = () => {
  const params = useParams()
  const [transactionId, setTransactionId] = useState<string>('')

  useEffect(() => {
    if (params?.id) {
      setTransactionId(params.id as string)
    }
  }, [params?.id])


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <Card className="w-full max-w-lg shadow-2xl border-green-200">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-green-800 mb-2">
            Payment Successful! 🎉
          </CardTitle>
          <CardDescription className="text-lg text-green-700">
            Your payment has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-green-800 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span className="font-mono text-xs">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-green-600 font-semibold">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Thank you for your payment! Your transaction has been completed successfully.
            </p>

            <div className="flex justify-center">
              <Link href="/" passHref>
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                  <Home className="h-4 w-4" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Need help? <Link href="/contact" className="text-green-600 hover:underline">Contact Support</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessPage
