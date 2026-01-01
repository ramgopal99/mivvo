import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    // Get affiliate data
    const affiliate = await prisma.affiliate.findUnique({
      where: { userId },
      select: {
        id: true,
        totalEarnings: true,
        paidEarnings: true,
        pendingPayoutAmount: true,
        payoutMethod: true,
        bankName: true,
        accountNumber: true,
        upiId: true,
      },
    })

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affiliate not found' },
        { status: 404 }
      )
    }

    // Check if payment details are complete
    if (!affiliate.payoutMethod) {
      return NextResponse.json(
        { error: 'Please set up your payment details first' },
        { status: 400 }
      )
    }

    if (affiliate.payoutMethod === 'BANK' && (!affiliate.bankName || !affiliate.accountNumber)) {
      return NextResponse.json(
        { error: 'Please complete your bank details first' },
        { status: 400 }
      )
    }

    if (affiliate.payoutMethod === 'UPI' && !affiliate.upiId) {
      return NextResponse.json(
        { error: 'Please set up your UPI ID first' },
        { status: 400 }
      )
    }

    // Calculate available balance
    const availableBalance = affiliate.totalEarnings - affiliate.paidEarnings - affiliate.pendingPayoutAmount
    const minimumPayout = 500

    if (availableBalance < minimumPayout) {
      return NextResponse.json(
        { error: `Minimum payout amount is ₹${minimumPayout}. Available: ₹${availableBalance.toFixed(2)}` },
        { status: 400 }
      )
    }

    // Check if there's already a pending payout
    if (affiliate.pendingPayoutAmount > 0) {
      return NextResponse.json(
        { error: 'You already have a pending payout request' },
        { status: 400 }
      )
    }

    // Create payout request by updating pending amount
    const updatedAffiliate = await prisma.affiliate.update({
      where: { userId },
      data: {
        pendingPayoutAmount: availableBalance,
        lastPayoutRequest: new Date(),
      },
    })

    // TODO: In a real application, you would also create a payout record
    // and notify administrators for processing

    console.log(`Payout request created for affiliate ${affiliate.id}: ₹${availableBalance.toFixed(2)}`)

    return NextResponse.json({
      success: true,
      message: `Payout request submitted for ₹${availableBalance.toFixed(2)}`,
      affiliate: updatedAffiliate,
    })

  } catch (error) {
    console.error('Error requesting payout:', error)
    return NextResponse.json(
      { error: 'Failed to request payout' },
      { status: 500 }
    )
  }
}
