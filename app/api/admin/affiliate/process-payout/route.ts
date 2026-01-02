import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
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

    const { affiliateId } = await request.json()

    if (!affiliateId) {
      return NextResponse.json({ error: 'Affiliate ID is required' }, { status: 400 })
    }

    // Get the affiliate with pending payout
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: affiliateId },
      select: {
        id: true,
        pendingPayoutAmount: true,
        paidEarnings: true,
        totalEarnings: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 })
    }

    if (affiliate.pendingPayoutAmount <= 0) {
      return NextResponse.json({ error: 'No pending payout for this affiliate' }, { status: 400 })
    }

    // Use a transaction to update everything atomically
    await prisma.$transaction(async (tx) => {
      // Update affiliate: move pending to paid and reset pending
      await tx.affiliate.update({
        where: { id: affiliateId },
        data: {
          paidEarnings: affiliate.paidEarnings + affiliate.pendingPayoutAmount,
          pendingPayoutAmount: 0,
          lastPayoutRequest: null, // Clear the request date
        }
      })

      // Update all PENDING commissions to PAID
      await tx.affiliateCommission.updateMany({
        where: {
          affiliateId: affiliateId,
          status: 'PENDING'
        },
        data: {
          status: 'PAID'
        }
      })
    })

    return NextResponse.json({
      success: true,
      message: `Payout of ₹${affiliate.pendingPayoutAmount.toFixed(2)} processed successfully for ${affiliate.user.name || affiliate.user.email}`,
      amount: affiliate.pendingPayoutAmount
    })

  } catch (error) {
    console.error('Error processing payout:', error)
    return NextResponse.json(
      { error: 'Failed to process payout' },
      { status: 500 }
    )
  }
}
