import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get affiliate data with pending commissions sum
    const affiliate = await prisma.affiliate.findUnique({
      where: { userId },
      include: {
        _count: {
          select: {
            referrals: true,
            commissions: true,
          },
        },
        commissions: {
          where: {
            status: 'PENDING'
          },
          select: {
            amount: true
          }
        }
      },
    })

    // Calculate pending commissions total
    const pendingCommissionsTotal = affiliate?.commissions.reduce((sum, commission) => sum + commission.amount, 0) || 0

    console.log('API Debug - Affiliate data:', {
      affiliateId: affiliate?.id,
      totalCommissions: affiliate?._count.commissions,
      pendingCommissions: affiliate?.commissions.length,
      pendingCommissionsTotal,
      commissions: affiliate?.commissions.map(c => ({ amount: c.amount, status: 'PENDING' }))
    })

    if (!affiliate) {
      return NextResponse.json(
        { error: 'User is not an affiliate' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      affiliate: {
        ...affiliate,
        pendingCommissionsTotal
      },
    })

  } catch (error) {
    console.error('Error fetching affiliate data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch affiliate data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Check if user is already an affiliate
    const existingAffiliate = await prisma.affiliate.findUnique({
      where: { userId },
    })

    if (existingAffiliate) {
      return NextResponse.json(
        { error: 'User is already an affiliate' },
        { status: 400 }
      )
    }

    // Generate unique referral code
    let referralCode: string
    let codeExists = true
    let attempts = 0

    do {
      referralCode = 'AFF' + randomBytes(4).toString('hex').toUpperCase()
      const existingCode = await prisma.affiliate.findUnique({
        where: { referralCode },
      })
      codeExists = !!existingCode
      attempts++
      if (attempts > 10) {
        return NextResponse.json(
          { error: 'Failed to generate unique referral code' },
          { status: 500 }
        )
      }
    } while (codeExists)

    // Create affiliate
    const affiliate = await prisma.affiliate.create({
      data: {
        userId,
        referralCode,
        status: 'ACTIVE',
        commissionRate: 0.20, // 20% commission
      },
      include: {
        _count: {
          select: {
            referrals: true,
            commissions: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      affiliate,
      message: 'Successfully became an affiliate',
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating affiliate:', error)
    return NextResponse.json(
      { error: 'Failed to become affiliate' },
      { status: 500 }
    )
  }
}
