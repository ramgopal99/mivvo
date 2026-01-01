'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { CreditCard, IndianRupee, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface PaymentSettingsProps {
  affiliateData: {
    id: string
    totalEarnings: number
    paidEarnings: number
    bankName?: string
    accountNumber?: string
    ifscCode?: string
    accountHolderName?: string
    upiId?: string
    payoutMethod?: string
    pendingPayoutAmount: number
  }
  onPaymentDetailsUpdate: () => void
}

export function PaymentSettings({ affiliateData, onPaymentDetailsUpdate }: PaymentSettingsProps) {
  const [paymentMethod, setPaymentMethod] = useState(affiliateData.payoutMethod || 'BANK')
  const [bankDetails, setBankDetails] = useState({
    bankName: affiliateData.bankName || '',
    accountNumber: affiliateData.accountNumber || '',
    ifscCode: affiliateData.ifscCode || '',
    accountHolderName: affiliateData.accountHolderName || '',
  })
  const [upiId, setUpiId] = useState(affiliateData.upiId || '')
  const [isSaving, setIsSaving] = useState(false)
  const [isRequestingPayout, setIsRequestingPayout] = useState(false)

  const availableBalance = affiliateData.totalEarnings - affiliateData.paidEarnings - affiliateData.pendingPayoutAmount
  const minimumPayout = 500

  const handleSavePaymentDetails = async () => {
    setIsSaving(true)
    try {
      const paymentData = paymentMethod === 'BANK' ? {
        payoutMethod: 'BANK',
        ...bankDetails,
        upiId: null,
      } : {
        payoutMethod: 'UPI',
        upiId,
        bankName: null,
        accountNumber: null,
        ifscCode: null,
        accountHolderName: null,
      }

      const response = await fetch('/api/affiliate/payment-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })

      if (response.ok) {
        toast.success('Payment details saved successfully!')
        onPaymentDetailsUpdate()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save payment details')
      }
    } catch (error) {
      console.error('Error saving payment details:', error)
      toast.error('Failed to save payment details')
    } finally {
      setIsSaving(false)
    }
  }

  const handleRequestPayout = async () => {
    if (availableBalance < minimumPayout) {
      toast.error(`Minimum payout amount is ₹${minimumPayout}`)
      return
    }

    setIsRequestingPayout(true)
    try {
      const response = await fetch('/api/affiliate/request-payout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        toast.success('Payout request submitted successfully!')
        onPaymentDetailsUpdate()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to request payout')
      }
    } catch (error) {
      console.error('Error requesting payout:', error)
      toast.error('Failed to request payout')
    } finally {
      setIsRequestingPayout(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Earnings Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            Earnings Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">₹{affiliateData.totalEarnings.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Earnings</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹{affiliateData.paidEarnings.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Paid</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₹{availableBalance.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </div>

          {affiliateData.pendingPayoutAmount > 0 && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                You have a pending payout request for ₹{affiliateData.pendingPayoutAmount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleRequestPayout}
              disabled={availableBalance < minimumPayout || isRequestingPayout}
              className="flex-1 cursor-pointer"
              size="lg"
            >
              {isRequestingPayout ? 'Requesting...' : `Request Payout (Min: ₹${minimumPayout})`}
            </Button>
            {availableBalance < minimumPayout && (
              <Badge variant="secondary" className="px-3 py-1">
                Need ₹{(minimumPayout - availableBalance).toFixed(2)} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>
            Choose how you want to receive your commission payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="BANK" id="bank" />
              <Label htmlFor="bank" className="cursor-pointer">Bank Transfer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="UPI" id="upi" />
              <Label htmlFor="upi" className="cursor-pointer">UPI Payment</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Details Form */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            {paymentMethod === 'BANK'
              ? 'Enter your bank account details for commission payouts'
              : 'Enter your UPI ID for commission payouts'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethod === 'BANK' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountHolderName">Account Holder Name</Label>
                  <Input
                    id="accountHolderName"
                    value={bankDetails.accountHolderName}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountHolderName: e.target.value }))}
                    placeholder="Enter account holder name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                    placeholder="Enter bank name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                    placeholder="Enter account number"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={bankDetails.ifscCode}
                    onChange={(e) => setBankDetails(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID (e.g., user@paytm)"
              />
            </div>
          )}

          <Button
            onClick={handleSavePaymentDetails}
            disabled={isSaving}
            className="w-full cursor-pointer"
          >
            {isSaving ? 'Saving...' : 'Save Payment Details'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
