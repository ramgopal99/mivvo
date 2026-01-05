import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, DollarSign, CheckCircle } from 'lucide-react'

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

interface ReferralData {
  id: string
  referralCode: string
  sourceUrl: string
  convertedAt: string | null
  createdAt: string
  commissions: {
    id: string
    amount: number
    status: string
    courseTitle: string
    createdAt: string
  }[]
}

interface AffiliateStatsProps {
  affiliateData: AffiliateData
  referrals: ReferralData[]
}

export function AffiliateStats({ affiliateData, referrals }: AffiliateStatsProps) {
  const totalReferrals = referrals.length
  const convertedReferrals = referrals.filter(r => r.commissions.length > 0).length
  const totalCoursesSold = referrals.reduce((sum, r) => sum + r.commissions.length, 0)
  const pendingCommissions = referrals.reduce((sum, r) =>
    sum + r.commissions.filter(c => c.status === 'PENDING').reduce((cSum, c) => cSum + c.amount, 0), 0
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReferrals}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Courses Sold</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCoursesSold}</div>
          <p className="text-xs text-muted-foreground">
            From {convertedReferrals} converted referrals
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{affiliateData.totalEarnings.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            ₹{affiliateData.paidEarnings.toFixed(2)} paid
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Commission</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{pendingCommissions.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  )
}
