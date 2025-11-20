import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CREDIT_PACKAGES } from '@/lib/credit-converter'
import { CREDIT_RESET_CONFIG } from '@/config/site'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      userId,
      amount,
      currency = 'INR',
      paymentCategory,
      status = 'PENDING',
      paymentDate,
      transactionId,
      description,
      value,
      metadata
    } = body

    // Verify the user is creating payment for themselves
    if (userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Cannot create payment for another user' },
        { status: 403 }
      )
    }

    // For addon payments, check if user has active plan (not expired)
    if (paymentCategory === 'ADDON') {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          userType: true,
          creditResetAt: true,
          totalCreditAllocation: true,
          createdAt: true
        }
      })

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      // Prevent PRO users from purchasing monthly subscriptions
      if (paymentCategory === 'MONTHLY' && user.userType === 'PRO') {
        return NextResponse.json(
          { error: 'You already have an active PRO subscription. Monthly subscriptions are only available for FREE users.' },
          { status: 400 }
        )
      }

      // Check if credits are expired
      const now = new Date()
      const creditResetAt = user.creditResetAt ? new Date(user.creditResetAt) : new Date(user.createdAt!)
      const timeSinceReset = now.getTime() - creditResetAt.getTime()
      const isExpired = timeSinceReset >= CREDIT_RESET_CONFIG.RESET_PERIOD_MS

      if (isExpired) {
        return NextResponse.json(
          { error: 'Cannot purchase addon credits. Your current plan has expired. Please renew your subscription first.' },
          { status: 400 }
        )
      }
    }

    // Create the payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: parseFloat(amount),
        currency,
        paymentCategory,
        status,
        paymentDate: new Date(paymentDate),
        transactionId,
        description,
        value: value ? parseInt(value) : null,
        metadata
      }
    })

    // Update user credits based on payment type
    if (status === 'COMPLETED') {
      if (paymentCategory === 'ADDON' && value) {
        // Add purchased credits to existing allocation (don't reset credit date)
        await prisma.user.update({
          where: { id: userId },
          data: {
            totalCreditAllocation: {
              increment: parseInt(value)
            }
            // Note: creditResetAt is NOT reset for addon payments
          }
        })
      } else if (paymentCategory === 'MONTHLY') {
        // Set fresh credit allocation for monthly subscription and upgrade user to PRO
        await prisma.user.update({
          where: { id: userId },
          data: {
            totalCreditAllocation: CREDIT_PACKAGES.PRO, // Use PRO package credits from site.ts
            usedCredits: 0, // Reset used credits for fresh month
            creditResetAt: new Date(), // Reset the credit timer to now (30 days from now)
            userType: 'PRO' // Upgrade user to PRO plan (will auto-downgrade to FREE when credits expire)
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      payment
    })

  } catch (error) {
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get user's payments
    const payments = await prisma.payment.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip: offset
    })

    const totalCount = await prisma.payment.count({
      where: {
        userId: session.user.id
      }
    })

    return NextResponse.json({
      success: true,
      payments,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount
      }
    })

  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}
