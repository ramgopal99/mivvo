import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"

interface ReferralData {
  id: string
  affiliate: {
    user: {
      name: string | null
      email: string
    }
  }
  referralCode: string
  sourceUrl: string | null
  createdAt: string
  convertedAt: string | null
}

interface RecentReferralsListProps {
  referrals: ReferralData[]
}

export function RecentReferralsList({ referrals }: RecentReferralsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Referrals</CardTitle>
        <CardDescription>
          Latest referral link clicks (last 10)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {referrals.map((referral) => (
            <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">
                  {referral.affiliate.user.name || 'Anonymous'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {referral.referralCode} • {referral.sourceUrl || 'Direct link'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(referral.createdAt).toLocaleDateString()}
                  {referral.convertedAt && (
                    <span className="ml-2 text-green-600">
                      • Converted: {new Date(referral.convertedAt).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {referral.convertedAt ? (
                  <Badge variant="default" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Converted
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
            </div>
          ))}

          {referrals.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No recent referrals
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
