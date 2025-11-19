/**
 * Update Time Usage API Route
 *
 * Updates a user's time allowance when they complete an interview.
 * Subtracts the interview duration from their remaining time allowance.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

/**
 * Authenticate user from NextAuth session or JWT token
 * @param request - NextRequest object
 * @returns User ID if authenticated, null otherwise
 */
async function authenticateUser(request: NextRequest): Promise<string | null> {
  // First, try NextAuth session
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    return session.user.id
  }

  // If no NextAuth session, try JWT token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as { userId?: string }
      if (decoded.userId) {
        return decoded.userId
      }
    } catch (error) {
      console.error('JWT verification failed:', error)
    }
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication (NextAuth or JWT token)
    const userId = await authenticateUser(request)
    if (!userId) {
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
        createdBy: userId
      }
    })

    if (!interview) {
      return NextResponse.json({ error: 'Interview not found or access denied' }, { status: 404 })
    }

    // Get current user time allowance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalCreditAllocation: true,
        usedCredits: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const currentAllowance = user.totalCreditAllocation || 0
    const currentUsed = user.usedCredits || 0

    // Calculate new used credits (don't exceed total allowance)
    const newUsedCredits = Math.min(currentUsed + timeUsedMinutes, currentAllowance)

    // Update user's used credits
    await prisma.user.update({
      where: { id: userId },
      data: {
        usedCredits: newUsedCredits
      }
    })

    console.log(`Updated user ${userId} time usage: ${currentUsed} → ${newUsedTime} minutes (added ${timeUsedMinutes})`)

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

