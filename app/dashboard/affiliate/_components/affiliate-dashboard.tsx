'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { RotateCcw, Ban, CheckCircle, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AffiliateStats } from './affiliate-stats'
import { ReferralGuide } from './referral-guide'
import { ReferralLinkCard } from './referral-link-card'
import { ReferralsList } from './referrals-list'
import { CommissionsList } from './commissions-list'
import { AffiliateLanding } from './affiliate-landing'
import { PaymentSettings } from './payment-settings'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface AffiliateData {
  id: string
  referralCode: string
  status: string
  commissionRate: number
  totalEarnings: number
  paidEarnings: number
  bankName?: string
  accountNumber?: string
  ifscCode?: string
  accountHolderName?: string
  upiId?: string
  payoutMethod?: string
  pendingPayoutAmount: number
  lastPayoutRequest?: string
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

interface AffiliateDashboardProps {
  initialAffiliateData?: AffiliateData | null
  initialReferrals?: ReferralData[]
}

export function AffiliateDashboard({
  initialAffiliateData = null,
  initialReferrals = []
}: AffiliateDashboardProps) {
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(initialAffiliateData)
  const [referrals, setReferrals] = useState<ReferralData[]>(initialReferrals)
  const [loading, setLoading] = useState(!initialAffiliateData)
  const [refreshing, setRefreshing] = useState(false)
  const [deactivating, setDeactivating] = useState(false)
  const [activating, setActivating] = useState(false)
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false)
  const [showReferralGuideDialog, setShowReferralGuideDialog] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  useEffect(() => {
    if (!initialAffiliateData) {
      loadAffiliateData()
    }
  }, [initialAffiliateData])

  const loadAffiliateData = async () => {
    setRefreshing(true)
    try {
      const [affiliateResponse, referralsResponse] = await Promise.all([
        fetch('/api/affiliate'),
        fetch('/api/affiliate/referrals')
      ])

      if (affiliateResponse.ok) {
        const affiliate = await affiliateResponse.json()
        setAffiliateData(affiliate.affiliate)
      }

      if (referralsResponse.ok) {
        const referralsData = await referralsResponse.json()
        setReferrals(referralsData.referrals)
      }
    } catch (error) {
      console.error('Error loading affiliate data:', error)
      toast.error('Failed to refresh affiliate data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleDeactivateAffiliate = async () => {
    setDeactivating(true)
    try {
      const response = await fetch('/api/affiliate/deactivate', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        setAffiliateData(prev => prev ? { ...prev, status: 'INACTIVE' } : null)
        toast.success('Affiliate account deactivated successfully')
        setShowDeactivateDialog(false)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to deactivate affiliate account')
      }
    } catch (error) {
      console.error('Error deactivating affiliate:', error)
      toast.error('Failed to deactivate affiliate account')
    } finally {
      setDeactivating(false)
    }
  }

  const handleActivateAffiliate = async () => {
    if (!affiliateData) return

    setActivating(true)
    try {
      const response = await fetch('/api/affiliate/activate', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        setAffiliateData(prev => prev ? { ...prev, status: 'ACTIVE' } : null)
        toast.success('Affiliate account reactivated successfully')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to reactivate affiliate account')
      }
    } catch (error) {
      console.error('Error reactivating affiliate:', error)
      toast.error('Failed to reactivate affiliate account')
    } finally {
      setActivating(false)
    }
  }

  const copyReferralLink = async () => {
    if (!affiliateData) return

    const referralLink = `${baseUrl}?ref=${affiliateData.referralCode}`
    try {
      await navigator.clipboard.writeText(referralLink)
      toast.success('Referral link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const shareReferralLink = async () => {
    if (!affiliateData) return

    const referralLink = `${baseUrl}?ref=${affiliateData.referralCode}`
    const shareText = `Join Mivvo and get started with amazing courses! Use my referral link: ${referralLink}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Mivvo',
          text: shareText,
          url: referralLink,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to copying
      copyReferralLink()
    }
  }

  const handleReferFriends = () => {
    if (!affiliateData) return

    const referralLink = `${baseUrl}?ref=${affiliateData.referralCode}`

    // Create a modal or dialog to show referral information
    const shareText = `🎓 Join Mivvo - Master Technical Interviews!\n\nI've been using Mivvo to prepare for interviews and it's amazing! Use my referral link to get started:\n\n${referralLink}\n\n💰 I earn commissions when you purchase courses, and you get access to premium interview preparation tools!`

    // Try native sharing first
    if (navigator.share) {
      navigator.share({
        title: 'Join Mivvo with my referral',
        text: shareText,
        url: referralLink,
      }).catch(() => {
        // Fallback to copying
        navigator.clipboard.writeText(shareText).then(() => {
          toast.success('Referral message copied! Share it with your friends.')
        })
      })
    } else {
      // Copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        toast.success('Referral message copied! Share it with your friends.')
      }).catch(() => {
        toast.error('Failed to copy referral message')
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!affiliateData) {
    return <AffiliateLanding onAffiliateCreated={loadAffiliateData} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
          <p className="text-muted-foreground">
            Track your referrals and earnings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={loadAffiliateData} disabled={refreshing} className="flex items-center gap-2 cursor-pointer">
            <RotateCcw className="h-4 w-4" />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Dialog open={showReferralGuideDialog} onOpenChange={setShowReferralGuideDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>How to Refer New Users</DialogTitle>
                <DialogDescription>
                  Share your referral link and earn commissions on every course purchase
                </DialogDescription>
              </DialogHeader>
              <ReferralGuide
                affiliateData={affiliateData}
                onReferFriends={handleReferFriends}
                onCopyLink={copyReferralLink}
                showAsCard={false}
              />
            </DialogContent>
          </Dialog>
          <Badge variant={affiliateData.status === 'ACTIVE' ? 'default' : 'secondary'}>
            {affiliateData.status}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <AffiliateStats
        affiliateData={affiliateData}
        referrals={referrals}
      />

      {/* Referral Link */}
      <ReferralLinkCard
        affiliateData={affiliateData}
        onCopyLink={copyReferralLink}
        onShareLink={shareReferralLink}
        onDeactivate={handleDeactivateAffiliate}
        onActivate={handleActivateAffiliate}
        deactivating={deactivating}
        activating={activating}
        showDeactivateDialog={showDeactivateDialog}
        onDeactivateDialogChange={setShowDeactivateDialog}
      />

      {/* Referrals, Commissions, and Payment Tabs */}
      <Tabs defaultValue="referrals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="referrals" className="cursor-pointer">Referral History</TabsTrigger>
          <TabsTrigger value="commissions" className="cursor-pointer">Commission History</TabsTrigger>
          <TabsTrigger value="payments" className="cursor-pointer">Payment Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="referrals" className="mt-6">
          <ReferralsList referrals={referrals} />
        </TabsContent>
        <TabsContent value="commissions" className="mt-6">
          <CommissionsList referrals={referrals} />
        </TabsContent>
        <TabsContent value="payments" className="mt-6">
          <PaymentSettings
        affiliateData={affiliateData}
            onPaymentDetailsUpdate={loadAffiliateData}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
