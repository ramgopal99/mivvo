import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin (you might want to add an admin role check)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || user.role !== 'SUPERADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Fetch all data in parallel
    const [
      totalAffiliates,
      activeAffiliates,
      earnings,
      referrals,
      commissions,
      affiliates,
      recentReferrals,
      recentCommissions
    ] = await Promise.all([
      prisma.affiliate.count(),
      prisma.affiliate.count({ where: { status: 'ACTIVE' } }),
      prisma.affiliate.aggregate({
        _sum: { totalEarnings: true, paidEarnings: true, pendingPayoutAmount: true }
      }),
      prisma.affiliateReferral.count(),
      prisma.affiliateCommission.count(),
      prisma.affiliate.findMany({
        select: {
          id: true,
          referralCode: true,
          status: true,
          totalEarnings: true,
          paidEarnings: true,
          pendingPayoutAmount: true,
          commissionRate: true,
          bankName: true,
          accountNumber: true,
          ifscCode: true,
          accountHolderName: true,
          upiId: true,
          payoutMethod: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              referrals: true,
              commissions: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.affiliateReferral.findMany({
        take: 10,
        include: {
          affiliate: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.affiliateCommission.findMany({
        take: 10,
        include: {
          affiliate: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    ])

    const stats = {
      totalAffiliates,
      activeAffiliates,
      totalEarnings: earnings._sum.totalEarnings || 0,
      paidEarnings: earnings._sum.paidEarnings || 0,
      pendingPayouts: earnings._sum.pendingPayoutAmount || 0,
      totalReferrals: referrals,
      totalCommissions: commissions
    }

    return NextResponse.json({
      stats,
      affiliates,
      recentReferrals,
      recentCommissions
    })

  } catch (error) {
    console.error('Error fetching affiliate data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch affiliate data' },
      { status: 500 }
    )
  }
}
