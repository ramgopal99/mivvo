/**
 * User Time Data API Route
 *
 * Returns the authenticated user's time allowance and usage data from the database
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
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
        email: true,
        role: true,
        // Include college enrollment data for COLLEGE_STUDENT role
        studentEnrollment: {
          select: {
            enrollmentDate: true,
            expirationDate: true,
            isActive: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({
        error: 'User not found',
        message: 'Unable to retrieve user data'
      }, { status: 404 })
    }

    // Check if credits should expire based on allocation time or enrollment
    const now = new Date()
    let shouldExpireCredits = false
    let allocationTime: Date
    let timeSinceAllocation: number

    // Special handling for college students - check enrollment expiration instead of 30-day period
    if (user.role === 'COLLEGE_STUDENT' && user.studentEnrollment && user.studentEnrollment.isActive) {
      allocationTime = new Date(user.studentEnrollment.enrollmentDate)
      timeSinceAllocation = now.getTime() - allocationTime.getTime()
      shouldExpireCredits = now > new Date(user.studentEnrollment.expirationDate)
      console.log(`College student ${userId} - Enrollment expires: ${user.studentEnrollment.expirationDate}, Current time: ${now.toISOString()}, Should expire: ${shouldExpireCredits}`)
    } else {
      // Regular users - check 30-day reset period
      if (user.creditResetAt) {
        allocationTime = new Date(user.creditResetAt.toISOString())
      } else {
        allocationTime = new Date(user.createdAt!)
      }

      timeSinceAllocation = now.getTime() - allocationTime.getTime()
      shouldExpireCredits = timeSinceAllocation >= CREDIT_RESET_CONFIG.RESET_PERIOD_MS
      console.log(`Regular user ${userId} - Time since allocation: ${timeSinceAllocation}ms, Reset period: ${CREDIT_RESET_CONFIG.RESET_PERIOD_MS}ms, Should expire: ${shouldExpireCredits}`)
    }

    // Expire credits if they should expire and user has credits
    if (shouldExpireCredits && user.totalCreditAllocation && user.totalCreditAllocation > 0) {
      // Don't downgrade college students to FREE - they remain PRO until enrollment expires
      const shouldDowngradeToFree = user.role !== 'COLLEGE_STUDENT'

      await prisma.user.update({
        where: { id: userId },
        data: {
          totalCreditAllocation: 0,
          usedCredits: 0, // Also reset used credits for consistency
          ...(shouldDowngradeToFree && { userType: 'FREE' }) // Only downgrade non-college students
        }
      })

      const action = shouldDowngradeToFree ? 'downgraded to FREE' : 'credits expired (PRO status maintained)'
      console.log(`Credits expired for user ${userId} at ${now.toISOString()} - ${action}`)
    }

    // Additional check for college students: downgrade to FREE if enrollment has expired
    if (user.role === 'COLLEGE_STUDENT' && user.studentEnrollment && !user.studentEnrollment.isActive) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          userType: 'FREE' // Downgrade college students when enrollment expires
        }
      })
      console.log(`College student ${userId} enrollment expired - downgraded to FREE`)
    }

    // Use actual credit allocation, or 0 if not set
    const totalCreditAllocation = shouldExpireCredits ? 0 : (user.totalCreditAllocation ?? 0)
    const usedCredits = shouldExpireCredits ? 0 : (user.usedCredits || 0)

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
