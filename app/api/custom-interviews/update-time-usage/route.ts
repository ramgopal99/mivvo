/**
 * Update Time Usage API Route
 *
 * Updates a user's time allowance when they complete an interview.
 * Subtracts the interview duration from their remaining time allowance.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { interviewId, timeUsedMinutes } = await request.json()

    // Validate required fields
    if (!interviewId || typeof timeUsedMinutes !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 })
    }

    if (timeUsedMinutes <= 0) {
      return NextResponse.json({ error: 'Time used must be positive' }, { status: 400 })
    }

    // Verify the interview belongs to the user
    const interview = await prisma.mockInterview.findFirst({
      where: {
        id: interviewId,
        createdBy: session.user.id
      }
    })

    if (!interview) {
      return NextResponse.json({ error: 'Interview not found or access denied' }, { status: 404 })
    }

    // Get current user time allowance
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        totalTimeAllowance: true,
        usedTimeMinutes: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const currentAllowance = user.totalTimeAllowance || 0
    const currentUsed = user.usedTimeMinutes || 0

    // Calculate new used time (don't exceed total allowance)
    const newUsedTime = Math.min(currentUsed + timeUsedMinutes, currentAllowance)

    // Update user's used time
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        usedTimeMinutes: newUsedTime
      }
    })

    console.log(`Updated user ${session.user.id} time usage: ${currentUsed} → ${newUsedTime} minutes (added ${timeUsedMinutes})`)

    return NextResponse.json({
      success: true,
      message: 'Time usage updated successfully',
      data: {
        previousUsed: currentUsed,
        newUsed: newUsedTime,
        timeAdded: timeUsedMinutes,
        totalAllowance: currentAllowance,
        remainingTime: Math.max(0, currentAllowance - newUsedTime)
      }
    })

  } catch (error) {
    console.error('Error updating time usage:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

