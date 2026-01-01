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

    // Find the affiliate account
    const affiliate = await prisma.affiliate.findUnique({
      where: { userId },
    })

    if (!affiliate) {
      return NextResponse.json(
        { error: 'Affiliate account not found' },
        { status: 404 }
      )
    }

    if (affiliate.status === 'INACTIVE') {
      return NextResponse.json(
        { error: 'Affiliate account is already inactive' },
        { status: 400 }
      )
    }

    // Deactivate the affiliate account
    const updatedAffiliate = await prisma.affiliate.update({
      where: { userId },
      data: {
        status: 'INACTIVE',
        updatedAt: new Date(),
      },
    })

    console.log(`Affiliate account deactivated for user: ${userId}`)

    return NextResponse.json({
      success: true,
      message: 'Affiliate account deactivated successfully',
      affiliate: updatedAffiliate,
    })

  } catch (error) {
    console.error('Error deactivating affiliate:', error)
    return NextResponse.json(
      { error: 'Failed to deactivate affiliate account' },
      { status: 500 }
    )
  }
}
