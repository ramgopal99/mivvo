"use client"

import React, { useState } from 'react'
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

/**
 * Test Page for Webhook-Based Payment System
 *
 * This page tests the secure webhook-based payment flow:
 * 1. Form submission → API call → Payment initiation
 * 2. For test mode: Database updated immediately, redirect to success
 * 3. For production: PhonePe processes payment, calls webhook, updates database
 *
 * No client-side SDK required - all security handled server-side!
 */

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
      // Test mode: API creates payment record, updates database immediately, redirects to success
      // Production: API initiates PhonePe payment, PhonePe calls webhook to update database
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
      } catch {
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
            Test the secure webhook-based payment system
          </CardDescription>
        </CardHeader>
        <CardContent>
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

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
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

