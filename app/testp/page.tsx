"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CreditCard, Loader2 } from "lucide-react"
import { toast } from "sonner"

// Declare PhonePe SDK types
declare global {
  interface Window {
    PhonePe: any;
  }
}

const paymentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num > 0
  }, "Amount must be a positive number"),
  muid: z.string().optional(),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

const Pay = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sdkLoaded, setSdkLoaded] = useState(false)

  // Load PhonePe SDK
  useEffect(() => {
    const loadPhonePeSDK = async () => {
      try {
        // Load PhonePe SDK script
        const script = document.createElement('script')
        script.src = 'https://mercury.phonepe.com/web/bundle/checkout.js'
        script.async = true
        script.onload = () => {
          console.log('PhonePe SDK loaded successfully')
          setSdkLoaded(true)

          // Initialize PhonePe SDK with credentials
          if (window.PhonePe && window.PhonePe.Checkout) {
            const config = {
              clientId: process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_ID,
              clientSecret: process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_SECRET,
              clientVersion: process.env.NEXT_PUBLIC_PHONE_PAY_CLIENT_VERSION,
              environment: 'UAT', // or 'PRODUCTION'
            }

            window.PhonePe.Checkout.init(config)
          }
        }
        script.onerror = () => {
          console.error('Failed to load PhonePe SDK')
          toast.error('Failed to load payment system')
        }

        document.head.appendChild(script)
      } catch (error) {
        console.error('Error loading PhonePe SDK:', error)
        toast.error('Failed to initialize payment system')
      }
    }

    loadPhonePeSDK()
  }, [])

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: "",
      mobile: "",
      amount: "",
      muid: "MIVVO-" + Date.now(),
    },
  })

  async function onSubmit(data: PaymentFormValues) {
    setIsSubmitting(true)

    try {
      // Use API call directly (SDK approach removed for testing)
      console.log('Initiating payment with data:', data)

      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          paymentType: 'ADDON', // Default payment type
          isTestRequest: true // Bypass authentication for test page
        }),
      })

      console.log('API response status:', response.status)

      let result;
      try {
        result = await response.json();
        console.log('API response data:', result);
      } catch (e) {
        // If response is not JSON, read as text
        const responseText = await response.text();
        console.log('API response text:', responseText);
        result = { error: responseText };
      }

      if (!response.ok) {
        let errorMessage = 'Payment initiation failed';
        if (result && result.error) {
          errorMessage = result.error;
        } else if (response.statusText) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        console.error('API error:', errorMessage);
        throw new Error(errorMessage);
      }

      // Check for error in successful JSON response
      if (result && result.error) {
        console.error('API returned error in successful response:', result.error);
        throw new Error(result.error);
      }

      // Validate response structure
      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response format from server');
      }

      if (!result.success) {
        throw new Error(result.error || 'Payment initiation failed');
      }

      if (!result.redirectUrl) {
        throw new Error('No redirect URL received from server');
      }

      if (!result.transactionId) {
        throw new Error('No transaction ID received from server');
      }

      console.log('Payment initiated successfully:', result);
      toast.success("Payment initiated successfully!");
      router.push(result.redirectUrl);
    } catch (error) {
      console.error("Payment error:", error)
      toast.error(error instanceof Error ? error.message : "Payment failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-primary" />
            <CardTitle>PhonePe Payment</CardTitle>
          </div>
          <CardDescription>
            Enter your details to proceed with the payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!sdkLoaded && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700 flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Initializing PhonePe payment system...
              </p>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="muid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MUID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Auto-generated MUID"
                        {...field}
                        readOnly
                        className="bg-muted"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting || !sdkLoaded}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : !sdkLoaded ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading Payment System...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now with PhonePe
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Pay

