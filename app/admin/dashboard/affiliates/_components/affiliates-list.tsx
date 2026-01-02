"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

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

interface AffiliatesListProps {
  affiliates: AffiliateData[]
}

export function AffiliatesList({ affiliates }: AffiliatesListProps) {
  const [selectedAffiliate, setSelectedAffiliate] = useState<AffiliateData | null>(null)
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Affiliates</CardTitle>
        <CardDescription>
          Complete list of all registered affiliates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {affiliates.map((affiliate) => (
            <div key={affiliate.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">
                    {affiliate.user.name || 'Anonymous'}
                  </div>
                  <Badge variant={affiliate.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {affiliate.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {affiliate.user.email} • {affiliate.referralCode}
                </p>
                <p className="text-xs text-muted-foreground">
                  Joined: {new Date(affiliate.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right space-y-1">
                  <div className="text-sm font-medium">
                    ₹{affiliate.totalEarnings.toFixed(2)} earned
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {affiliate._count.referrals} referrals • {affiliate._count.commissions} commissions
                  </div>
                  {affiliate.pendingPayoutAmount > 0 && (
                    <Badge variant="outline" className="text-xs">
                      ₹{affiliate.pendingPayoutAmount.toFixed(2)} pending
                    </Badge>
                  )}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAffiliate(affiliate)}
                      className="cursor-pointer"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Payment Details</DialogTitle>
                      <DialogDescription>
                        {affiliate.user.name || 'Anonymous'} - {affiliate.referralCode}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {affiliate.payoutMethod ? (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Payment Method:</span>
                            <Badge variant="outline">
                              {affiliate.payoutMethod === 'BANK' ? 'Bank Transfer' : 'UPI'}
                            </Badge>
                          </div>

                          {affiliate.payoutMethod === 'BANK' ? (
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Account Holder</label>
                                <p className="text-sm font-mono bg-muted p-2 rounded">
                                  {affiliate.accountHolderName || 'Not provided'}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Bank Name</label>
                                <p className="text-sm font-mono bg-muted p-2 rounded">
                                  {affiliate.bankName || 'Not provided'}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Account Number</label>
                                <p className="text-sm font-mono bg-muted p-2 rounded">
                                  {affiliate.accountNumber || 'Not provided'}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">IFSC Code</label>
                                <p className="text-sm font-mono bg-muted p-2 rounded">
                                  {affiliate.ifscCode || 'Not provided'}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">UPI ID</label>
                              <p className="text-sm font-mono bg-muted p-2 rounded">
                                {affiliate.upiId || 'Not provided'}
                              </p>
                            </div>
                          )}

                          <div className="pt-4 border-t">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-muted-foreground">Total Earned:</span>
                                <p className="font-semibold text-green-600">₹{affiliate.totalEarnings.toFixed(2)}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">Paid:</span>
                                <p className="font-semibold text-blue-600">₹{affiliate.paidEarnings.toFixed(2)}</p>
                              </div>
                            </div>
                            {affiliate.pendingPayoutAmount > 0 && (
                              <div className="mt-2">
                                <span className="font-medium text-muted-foreground">Pending Payout:</span>
                                <p className="font-semibold text-orange-600">₹{affiliate.pendingPayoutAmount.toFixed(2)}</p>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No payment details configured yet</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Affiliate hasn&apos;t set up payment information
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}

          {affiliates.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No affiliates registered yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
