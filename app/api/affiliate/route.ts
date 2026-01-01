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

    // Get affiliate data
    const affiliate = await prisma.affiliate.findUnique({
      where: { userId },
      include: {
        _count: {
          select: {
            referrals: true,
            commissions: true,
          },
        },
      },
    })

    if (!affiliate) {
      return NextResponse.json(
        { error: 'User is not an affiliate' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      affiliate,
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
