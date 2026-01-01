import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
      select: { id: true },
    })

    if (!affiliate) {
      return NextResponse.json(
        { error: 'User is not an affiliate' },
        { status: 404 }
      )
    }

    // Get referrals with commission data
    const referrals = await prisma.affiliateReferral.findMany({
      where: { affiliateId: affiliate.id },
      include: {
        commissions: {
          select: {
            id: true,
            amount: true,
            status: true,
            courseTitle: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({
      success: true,
      referrals,
    })

  } catch (error) {
    console.error('Error fetching referrals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referrals' },
      { status: 500 }
    )
  }
}
