/**
 * User Time Data API Route
 *
 * Returns the authenticated user's time allowance and usage data from the database
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CREDIT_PACKAGES } from '@/lib/credit-converter'
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
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true,
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

    if (user.creditResetAt) {
      allocationTime = new Date(user.creditResetAt.toISOString())
    } else {
      allocationTime = new Date(user.createdAt!)
    }

    const timeSinceAllocation = now.getTime() - allocationTime.getTime()
    const shouldExpireCredits = timeSinceAllocation >= CREDIT_RESET_CONFIG.RESET_PERIOD_MS

    // Expire credits if more than reset period has passed since allocation
    if (shouldExpireCredits && user.totalCreditAllocation && user.totalCreditAllocation > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalCreditAllocation: 0,
          usedCredits: 0, // Also reset used credits for consistency
          userType: 'FREE' // Downgrade PRO users to FREE when credits expire
        }
      })
      console.log(`Credits expired for user ${userId} at ${now.toISOString()} (${timeSinceAllocation}ms since allocation) - User downgraded to FREE`)
    }

    // Set default credit allocation for users who don't have one (like college students)
    // FREE tier provides CREDIT_PACKAGES.FREE credits
    const DEFAULT_FREE_CREDITS = CREDIT_PACKAGES.FREE
    const totalCreditAllocation = shouldExpireCredits ? 0 : (user.totalCreditAllocation || DEFAULT_FREE_CREDITS)
    const usedCredits = shouldExpireCredits ? 0 : (user.usedCredits || 0)

    // Time since allocation is already calculated above

    // Return time data
    return NextResponse.json({
      success: true,
      data: {
        userId: user.id,
        totalCreditAllocation: totalCreditAllocation,
        usedCredits: usedCredits,
        remainingTime: Math.max(0, totalCreditAllocation - usedCredits),
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
