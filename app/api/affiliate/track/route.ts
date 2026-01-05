import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const { referralCode, sourceUrl, userAgent } = body

    // Get IP address from request headers
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     request.headers.get('x-real-ip') ||
                     request.headers.get('x-client-ip') ||
                     'unknown'

    if (!referralCode) {
      return NextResponse.json(
        { error: 'Referral code is required' },
        { status: 400 }
      )
    }

    // Find affiliate by referral code
    const affiliate = await prisma.affiliate.findUnique({
      where: { referralCode },
      select: { id: true, status: true, userId: true },
    })

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      )
    }

    if (affiliate.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Affiliate is not active' },
        { status: 400 }
      )
    }

    // Check for self-referral - don't create referral record if user is referring themselves
    if (session?.user?.id && affiliate.userId === session.user.id) {
      console.log(`[AFFILIATE-TRACK-API] Self-referral blocked: User ${session.user.id} tried to refer themselves`)
      return NextResponse.json({
        success: true,
        referralId: null,
        message: 'Self-referral - no tracking needed',
      })
    }

    // Allow each click to create a new referral record (no duplicate prevention)
    // The cookie system handles "latest referral wins" logic

    console.log(`[AFFILIATE-TRACK-API] Creating referral for affiliate ${affiliate.id} with code ${referralCode}`)

    // Create new referral tracking
    const referral = await prisma.affiliateReferral.create({
      data: {
        affiliateId: affiliate.id,
        referralCode,
        sourceUrl,
        ipAddress,
        userAgent,
      },
    })

    console.log(`[AFFILIATE-TRACK-API] Created referral with ID: ${referral.id}`)

    return NextResponse.json({
      success: true,
      referralId: referral.id,
      message: 'Referral tracked successfully',
    })

  } catch (error) {
    console.error('Error tracking referral:', error)
    return NextResponse.json(
      { error: 'Failed to track referral' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const referralCode = searchParams.get('code')

    if (!referralCode) {
      return NextResponse.json(
        { error: 'Referral code is required' },
        { status: 400 }
      )
    }

    // Find affiliate by referral code
    const affiliate = await prisma.affiliate.findUnique({
      where: { referralCode },
      select: {
        id: true,
        status: true,
        commissionRate: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!affiliate || affiliate.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Invalid or inactive referral code' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      affiliate: {
        id: affiliate.id,
        commissionRate: affiliate.commissionRate,
        referrerName: affiliate.user.name,
      },
    })

  } catch (error) {
    console.error('Error validating referral code:', error)
    return NextResponse.json(
      { error: 'Failed to validate referral code' },
      { status: 500 }
    )
  }
}
