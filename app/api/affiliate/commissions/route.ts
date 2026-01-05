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

    // Check if user is admin or affiliate
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    })

    if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'COLLEGE_ADMIN')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = (searchParams.get('status') || 'PENDING') as 'PENDING' | 'PAID' | 'CANCELLED'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get commissions
    const commissions = await prisma.affiliateCommission.findMany({
      where: {
        status: status,
      },
      include: {
        affiliate: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        referral: {
          select: {
            referralCode: true,
            convertedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    const totalCount = await prisma.affiliateCommission.count({
      where: {
        status: status,
      },
    })

    return NextResponse.json({
      success: true,
      commissions,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
    })

  } catch (error) {
    console.error('Error fetching commissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch commissions' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    })

    if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'COLLEGE_ADMIN')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { commissionIds, status, paymentId } = body

    if (!commissionIds || !Array.isArray(commissionIds) || commissionIds.length === 0) {
      return NextResponse.json(
        { error: 'Commission IDs are required' },
        { status: 400 }
      )
    }

    if (!['PAID', 'CANCELLED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be PAID or CANCELLED' },
        { status: 400 }
      )
    }

    // Update commissions
    const updateData: {
      status: 'PAID' | 'CANCELLED'
      updatedAt: Date
      paidAt?: Date
      paymentId?: string
    } = {
      status,
      updatedAt: new Date(),
    }

    if (status === 'PAID') {
      updateData.paidAt = new Date()
      if (paymentId) {
        updateData.paymentId = paymentId
      }
    }

    const updatedCommissions = await prisma.affiliateCommission.updateMany({
      where: {
        id: {
          in: commissionIds,
        },
        status: 'PENDING', // Only update pending commissions
      },
      data: updateData,
    })

    // If marking as paid, update affiliate paid earnings
    if (status === 'PAID') {
      const commissions = await prisma.affiliateCommission.findMany({
        where: {
          id: {
            in: commissionIds,
          },
        },
        select: {
          affiliateId: true,
          amount: true,
        },
      })

      // Group by affiliate and update paid earnings
      const affiliateUpdates = commissions.reduce((acc, commission) => {
        if (!acc[commission.affiliateId]) {
          acc[commission.affiliateId] = 0
        }
        acc[commission.affiliateId] += commission.amount
        return acc
      }, {} as Record<string, number>)

      for (const [affiliateId, amount] of Object.entries(affiliateUpdates)) {
        await prisma.affiliate.update({
          where: { id: affiliateId },
          data: {
            paidEarnings: {
              increment: amount,
            },
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      updatedCount: updatedCommissions.count,
      message: `Successfully ${status.toLowerCase()} ${updatedCommissions.count} commission${updatedCommissions.count !== 1 ? 's' : ''}`,
    })

  } catch (error) {
    console.error('Error updating commissions:', error)
    return NextResponse.json(
      { error: 'Failed to update commissions' },
      { status: 500 }
    )
  }
}
