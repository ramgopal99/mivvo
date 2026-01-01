import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const body = await request.json()

    // Validate required fields based on payment method
    if (body.payoutMethod === 'BANK') {
      const { bankName, accountNumber, ifscCode, accountHolderName } = body
      if (!bankName || !accountNumber || !ifscCode || !accountHolderName) {
        return NextResponse.json(
          { error: 'All bank details are required' },
          { status: 400 }
        )
      }
    } else if (body.payoutMethod === 'UPI') {
      if (!body.upiId) {
        return NextResponse.json(
          { error: 'UPI ID is required' },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      )
    }

    // Update affiliate payment details
    const updatedAffiliate = await prisma.affiliate.update({
      where: { userId },
      data: {
        bankName: body.bankName,
        accountNumber: body.accountNumber,
        ifscCode: body.ifscCode,
        accountHolderName: body.accountHolderName,
        upiId: body.upiId,
        payoutMethod: body.payoutMethod,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Payment details updated successfully',
      affiliate: updatedAffiliate,
    })

  } catch (error) {
    console.error('Error updating payment details:', error)
    return NextResponse.json(
      { error: 'Failed to update payment details' },
      { status: 500 }
    )
  }
}
