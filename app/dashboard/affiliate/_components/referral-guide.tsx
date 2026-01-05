import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserPlus, Copy } from 'lucide-react'

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

interface ReferralGuideProps {
  affiliateData: AffiliateData
  onReferFriends: () => void
  onCopyLink: () => void
  showAsCard?: boolean
}

export function ReferralGuide({ affiliateData, onReferFriends, onCopyLink, showAsCard = true }: ReferralGuideProps) {
  const content = (
    <div className="space-y-4">
        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <span className="font-semibold text-primary min-w-[24px]">1.</span>
            <div>
              <h4 className="font-semibold mb-1">Share Your Link</h4>
            <p className="text-sm text-muted-foreground">
              Copy your unique referral link and share it with friends, colleagues, or on social media
            </p>
          </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-semibold text-primary min-w-[24px]">2.</span>
            <div>
              <h4 className="font-semibold mb-1">They Join & Buy</h4>
              <p className="text-sm text-muted-foreground">
                When they click your link and purchase any course within 30 days, you earn commission on every purchase they make
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-semibold text-primary min-w-[24px]">3.</span>
            <div>
              <h4 className="font-semibold mb-1">Get Paid</h4>
            <p className="text-sm text-muted-foreground">
              Earn {((affiliateData?.commissionRate || 0) * 100).toFixed(0)}% commission on every course sale
            </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button onClick={onReferFriends} size="lg" className="flex-1 cursor-pointer">
            <UserPlus className="h-4 w-4 mr-2" />
            Refer Friends Now
          </Button>
        <Button onClick={onCopyLink} variant="outline" size="lg" className="flex-1 cursor-pointer">
            <Copy className="h-4 w-4 mr-2" />
            Copy Referral Link
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2">
          💡 Pro tip: Share on LinkedIn, WhatsApp, or tech communities for best results!
        </div>
    </div>
  )

  if (showAsCard) {
    return (
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            How to Refer New Users
          </CardTitle>
          <CardDescription>
            Share your referral link and earn commissions on every course purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          {content}
      </CardContent>
    </Card>
  )
  }

  return content
}
