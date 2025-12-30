"use client"

/**
 * Reusable Payment Dialog Component
 *
 * Usage Example:
 *
 * const [dialogOpen, setDialogOpen] = useState(false)
 * const [isProcessing, setIsProcessing] = useState(false)
 *
 * const handlePayment = async (data: { name: string; mobile: string; amount: string }) => {
 *   setIsProcessing(true)
 *   try {
 *     // Your payment logic here
 *     const response = await fetch('/api/payment', {
 *       method: 'POST',
 *       body: JSON.stringify(data)
 *     })
 *     // Handle success
 *     setDialogOpen(false)
 *   } catch (error) {
 *     // Handle error
 *   } finally {
 *     setIsProcessing(false)
 *   }
 * }
 *
 * return (
 *   <PaymentDialog
 *     open={dialogOpen}
 *     onOpenChange={setDialogOpen}
 *     amount="100.00"
 *     userName="John Doe"
 *     onPaymentInitiate={handlePayment}
 *     isProcessing={isProcessing}
 *     title="Custom Payment Title" // optional
 *     description="Custom description" // optional
 *   />
 * )
 */

import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { Smartphone } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Payment form schema
const paymentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val)
    return !isNaN(num) && num > 0
  }, "Amount must be a positive number"),
})

type PaymentValues = z.infer<typeof paymentSchema>

export interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  amount: string
  userName?: string
  onPaymentInitiate: (data: PaymentValues) => Promise<void>
  isProcessing?: boolean
}

export function PaymentDialog({
  open,
  onOpenChange,
  title = "PhonePe Payment",
  description = "Enter your details to proceed with PhonePe payment",
  amount,
  userName = "",
  onPaymentInitiate,
  isProcessing = false
}: PaymentDialogProps) {
  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: userName,
      mobile: "",
      amount: amount,
    },
  })

  // Update form when props change
  React.useEffect(() => {
    form.setValue('amount', amount)
    form.setValue('name', userName)
  }, [amount, userName, form])

  const handleSubmit = async (data: PaymentValues) => {
    try {
      await onPaymentInitiate(data)
      form.reset()
    } catch {
      // Error handling is done in the parent component
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-orange-500" />
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                      placeholder="Fixed amount"
                      {...field}
                      readOnly
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
