import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Share2, Ban, CheckCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface AffiliateData {
  id: string
  referralCode: string
  status: string
  commissionRate: number
  totalEarnings: number
  paidEarnings: number
  createdAt: string
  _count: {
    referrals: number
    commissions: number
  }
}

interface ReferralLinkCardProps {
  affiliateData: AffiliateData
  onCopyLink: () => void
  onShareLink: () => void
  onDeactivate?: () => void
  onActivate?: () => void
  deactivating?: boolean
  activating?: boolean
  showDeactivateDialog?: boolean
  onDeactivateDialogChange?: (open: boolean) => void
}

export function ReferralLinkCard({
  affiliateData,
  onCopyLink,
  onShareLink,
  onDeactivate,
  onActivate,
  deactivating = false,
  activating = false,
  showDeactivateDialog = false,
  onDeactivateDialogChange
}: ReferralLinkCardProps) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>
              Share this link to start earning commissions
            </CardDescription>
          </div>
          <div className="flex-shrink-0">
            {affiliateData.status === 'ACTIVE' ? (
              <AlertDialog open={showDeactivateDialog} onOpenChange={onDeactivateDialogChange}>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={deactivating}
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Ban className="h-4 w-4" />
                    {deactivating ? 'Deactivating...' : 'Deactivate'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deactivate Affiliate Account</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to deactivate your affiliate account? This will:
                      <br /><br />
                      • Stop generating new commissions<br />
                      • Make your referral link inactive<br />
                      • Preserve all your earnings data<br />
                      • Allow reactivation anytime<br />
                      <br />
                      You can reactivate your account later if you change your mind.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={deactivating} className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onDeactivate}
                      disabled={deactivating}
                      className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
                    >
                      {deactivating ? 'Deactivating...' : 'Deactivate Account'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                onClick={onActivate}
                disabled={activating}
                variant="default"
                size="sm"
                className="flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle className="h-4 w-4" />
                {activating ? 'Activating...' : 'Reactivate'}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={`${baseUrl}?ref=${affiliateData.referralCode}`}
            readOnly
            className="flex-1"
          />
          <Button variant="outline" size="icon" onClick={onCopyLink} className="cursor-pointer">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onShareLink} className="cursor-pointer">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Commission Rate: {(affiliateData.commissionRate * 100).toFixed(0)}% on each course purchase within 30 days
        </p>
      </CardContent>
    </Card>
  )
}
