"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import {
  AffiliateStatsCards,
  AffiliatesList,
  RecentReferralsList,
  RecentCommissionsList,
  PendingPayoutsList
} from "./_components"

interface AffiliateStats {
  totalAffiliates: number
  activeAffiliates: number
  totalEarnings: number
  paidEarnings: number
  pendingPayouts: number
  totalReferrals: number
  totalCommissions: number
}

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

interface CommissionData {
  id: string
  affiliate: {
    user: {
      name: string | null
      email: string
    }
  }
  amount: number
  status: string
  courseTitle: string | null
  createdAt: string
}

export default function AdminAffiliatesPage() {
  const [stats, setStats] = useState<AffiliateStats | null>(null)
  const [affiliates, setAffiliates] = useState<AffiliateData[]>([])
  const [recentReferrals, setRecentReferrals] = useState<ReferralData[]>([])
  const [recentCommissions, setRecentCommissions] = useState<CommissionData[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true)
    try {
      const response = await fetch('/api/admin/affiliate/data')
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }
      const data = await response.json()
      setStats(data.stats || null)
      setAffiliates(data.affiliates || [])
      setRecentReferrals(data.recentReferrals || [])
      setRecentCommissions(data.recentCommissions || [])
    } catch (error) {
      console.error('Error fetching affiliate data:', error)
      // Set empty arrays on error to prevent undefined
      setStats(null)
      setAffiliates([])
      setRecentReferrals([])
      setRecentCommissions([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRefresh = () => {
    fetchData(true)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading affiliate data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage the affiliate program
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button variant="outline" className="cursor-pointer">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && <AffiliateStatsCards stats={stats} />}

      {/* Main Content Tabs */}
      <Tabs defaultValue="affiliates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="affiliates" className="cursor-pointer">Affiliates</TabsTrigger>
          <TabsTrigger value="referrals" className="cursor-pointer">Recent Referrals</TabsTrigger>
          <TabsTrigger value="commissions" className="cursor-pointer">Recent Commissions</TabsTrigger>
          <TabsTrigger value="payouts" className="cursor-pointer">Pending Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="affiliates" className="space-y-4">
          <AffiliatesList affiliates={affiliates || []} />
        </TabsContent>

        <TabsContent value="referrals" className="space-y-4">
          <RecentReferralsList referrals={recentReferrals || []} />
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <RecentCommissionsList commissions={recentCommissions || []} />
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <PendingPayoutsList affiliates={affiliates || []} onPayoutProcessed={handleRefresh} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
