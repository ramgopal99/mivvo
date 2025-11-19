/**
 * User Time Data API Route
 *
 * Returns the authenticated user's time allowance and usage data from the database
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CREDIT_PACKAGES, CREDITS_PER_MINUTE } from '@/lib/credit-converter'
import { CREDIT_RESET_CONFIG } from '@/config/site'
import jwt from 'jsonwebtoken'

interface DecodedToken {
  userId?: string
  email?: string
  name?: string
  role?: string
  collegeId?: string
  collegeName?: string
  type?: string
  iat?: number
  exp?: number
}

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
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as DecodedToken
      if (decoded.userId) {
        return decoded.userId
      }
    } catch (error) {
      console.error('JWT verification failed:', error)
    }
  }

  return null
}

export async function GET(request: NextRequest) {
  try {
    // Verify user authentication (NextAuth or JWT token)
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json({
        error: 'Unauthorized',
        message: 'Please log in to access time data'
      }, { status: 401 })
    }

    // Fetch user time data from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        totalTimeAllowance: true,
        usedTimeMinutes: true,
        timeAllowanceResetAt: true,
        createdAt: true,
        name: true,
        email: true
      }
    })

    if (!user) {
      return NextResponse.json({
        error: 'User not found',
        message: 'Unable to retrieve user data'
      }, { status: 404 })
    }

    // Check if credits should expire based on allocation time
    const now = new Date()
    let allocationTime: Date

    if (user.timeAllowanceResetAt) {
      allocationTime = new Date(user.timeAllowanceResetAt.toISOString())
    } else {
      allocationTime = new Date(user.createdAt!)
    }

    const timeSinceAllocation = now.getTime() - allocationTime.getTime()
    const shouldExpireCredits = timeSinceAllocation >= CREDIT_RESET_CONFIG.RESET_PERIOD_MS

    // Expire credits if more than reset period has passed since allocation
    if (shouldExpireCredits && user.totalTimeAllowance && user.totalTimeAllowance > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalTimeAllowance: 0,
          usedTimeMinutes: 0 // Also reset used time for consistency
        }
      })
      console.log(`Credits expired for user ${userId} at ${now.toISOString()} (${timeSinceAllocation}ms since allocation)`)
    }

    // Set default time allowance for users who don't have one (like college students)
    // FREE tier provides CREDIT_PACKAGES.FREE credits, convert to minutes
    const DEFAULT_FREE_TIME_MINUTES = CREDIT_PACKAGES.FREE / CREDITS_PER_MINUTE
    const totalTimeAllowance = shouldExpireCredits ? 0 : (user.totalTimeAllowance || DEFAULT_FREE_TIME_MINUTES)
    const usedTimeMinutes = shouldExpireCredits ? 0 : (user.usedTimeMinutes || 0)

    // Time since allocation is already calculated above

    // Return time data
    return NextResponse.json({
      success: true,
      data: {
        userId: user.id,
        totalTimeAllowance: totalTimeAllowance,
        usedTimeMinutes: usedTimeMinutes,
        remainingTime: Math.max(0, totalTimeAllowance - usedTimeMinutes),
        allocatedAt: allocationTime,
        timeSinceAllocationMs: timeSinceAllocation,
        creditsExpired: shouldExpireCredits,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    console.error('Error fetching user time data:', error)
    return NextResponse.json({
      error: 'Internal server error',
      message: 'Failed to retrieve time data'
    }, { status: 500 })
  }
}
