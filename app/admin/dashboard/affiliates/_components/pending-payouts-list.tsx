"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "sonner"

interface AffiliateData {
  id: string
  user: {
    name: string | null
    email: string
  }
  referralCode: string
  status: string
  totalEarnings: number
  paidEarnings: number
  pendingPayoutAmount: number
  commissionRate: number
  bankName?: string
  accountNumber?: string
  ifscCode?: string
  accountHolderName?: string
  upiId?: string
  payoutMethod?: string
  createdAt: string
  _count: {
    referrals: number
    commissions: number
  }
}

interface PendingPayoutsListProps {
  affiliates: AffiliateData[]
  onPayoutProcessed?: () => void
}

export function PendingPayoutsList({ affiliates, onPayoutProcessed }: PendingPayoutsListProps & { onPayoutProcessed?: () => void }) {
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateData | null>(null)
  const [confirmPayout, setConfirmPayout] = useState<AffiliateData | null>(null)
  const [processing, setProcessing] = useState(false)

  // Filter affiliates with pending payouts
  const pendingPayouts = affiliates.filter(affiliate => affiliate.pendingPayoutAmount > 0)

  const handleProcessPayout = async () => {
    if (!confirmPayout) return

    setProcessing(true)
    try {
      const response = await fetch('/api/admin/affiliate/process-payout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          affiliateId: confirmPayout.id
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setConfirmPayout(null)
        setSelectedAffiliate(null)
        // Refresh the data
        onPayoutProcessed?.()
      } else {
        toast.error(data.error || 'Failed to process payout')
      }
    } catch (error) {
      console.error('Error processing payout:', error)
      toast.error('Failed to process payout')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Pending Payouts
        </CardTitle>
        <CardDescription>
          Affiliates awaiting payment processing ({pendingPayouts.length} pending)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pendingPayouts.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-700 mb-2">All Caught Up!</h3>
            <p className="text-muted-foreground">
              No pending payouts at this time. All affiliate earnings have been processed.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {pendingPayouts.length}
                </div>
                <div className="text-sm text-muted-foreground">Affiliates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  ₹{pendingPayouts.reduce((sum, aff) => sum + aff.pendingPayoutAmount, 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  ₹{(pendingPayouts.reduce((sum, aff) => sum + aff.pendingPayoutAmount, 0) / pendingPayouts.length).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Average</div>
              </div>
            </div>

            {/* Pending Payouts List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingPayouts.map((affiliate) => (
                <Card key={affiliate.id} className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {affiliate.user.name || 'Anonymous'}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {affiliate.referralCode}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 text-xs">
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Payout Amount */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        ₹{affiliate.pendingPayoutAmount.toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground">Pending Payout</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-2 bg-white rounded border">
                        <div className="font-semibold">{affiliate._count.referrals}</div>
                        <div className="text-muted-foreground">Referrals</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded border">
                        <div className="font-semibold">{affiliate._count.commissions}</div>
                        <div className="text-muted-foreground">Commissions</div>
                      </div>
                    </div>

                    {/* Payment Method Badge */}
                    <div className="text-center">
                      <Badge variant="secondary" className="text-xs">
                        {affiliate.payoutMethod === 'BANK' ? 'Bank Transfer' : 'UPI Payment'}
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 cursor-pointer"
                        onClick={() => setSelectedAffiliate(affiliate)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700"
                        onClick={() => setConfirmPayout(affiliate)}
                      >
                        Process
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bank Details Dialog */}
        {selectedAffiliate && (
          <Dialog open={!!selectedAffiliate} onOpenChange={() => setSelectedAffiliate(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Bank Details: {selectedAffiliate.user.name || 'Anonymous'}
                </DialogTitle>
                <DialogDescription>
                  Payment information for payout processing
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Payment Method */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Payment Method:</span>
                  <Badge variant="outline">
                    {selectedAffiliate.payoutMethod === 'BANK' ? 'Bank Transfer' : 'UPI Payment'}
                  </Badge>
                </div>

                {/* Payout Amount */}
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">
                    ₹{selectedAffiliate.pendingPayoutAmount.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Pending Payout Amount</p>
                </div>

                {/* Bank Details */}
                {selectedAffiliate.payoutMethod === 'BANK' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Account Holder Name</label>
                      <p className="text-sm font-mono bg-muted p-3 rounded border mt-1">
                        {selectedAffiliate.accountHolderName || 'Not provided'}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
                      <p className="text-sm font-mono bg-muted p-3 rounded border mt-1">
                        {selectedAffiliate.bankName || 'Not provided'}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Account Number</label>
                        <p className="text-sm font-mono bg-muted p-3 rounded border mt-1">
                            {selectedAffiliate.accountNumber || 'Not provided'}
                        </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">IFSC Code</label>
                      <p className="text-sm font-mono bg-muted p-3 rounded border mt-1">
                        {selectedAffiliate.ifscCode || 'Not provided'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">UPI ID</label>
                    <p className="text-sm font-mono bg-muted p-3 rounded border mt-1">
                      {selectedAffiliate.upiId || 'Not provided'}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAffiliate(null)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="cursor-pointer bg-green-600 hover:bg-green-700"
                    onClick={() => setConfirmPayout(selectedAffiliate)}
                  >
                    Process Payout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Confirmation Dialog for Processing Payout */}
        <AlertDialog open={!!confirmPayout} onOpenChange={() => setConfirmPayout(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                Confirm Payout Processing
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to process this payout? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {confirmPayout && (
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{confirmPayout.user.name || 'Anonymous'}</p>
                      <p className="text-sm text-muted-foreground">{confirmPayout.referralCode}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">
                        ₹{confirmPayout.pendingPayoutAmount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">Pending Payout</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-medium">What will happen when you process this payout:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>The pending amount will be moved to paid earnings</li>
                    <li>All pending commissions will be marked as &quot;PAID&quot;</li>
                    <li>The affiliate will be notified of the successful payout</li>
                    <li>This affiliate will no longer appear in pending payouts</li>
                  </ul>
                </div>
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel disabled={processing} className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleProcessPayout}
                disabled={processing}
                className="cursor-pointer bg-green-600 hover:bg-green-700"
              >
                {processing ? 'Processing...' : 'Confirm & Process Payout'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
