/**
 * User Time Data API Route
 *
 * Returns the authenticated user's time allowance and usage data from the database
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
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

    // Return time data
    return NextResponse.json({
      success: true,
      data: {
        userId: user.id,
        totalTimeAllowance: user.totalTimeAllowance || 0,
        usedTimeMinutes: user.usedTimeMinutes || 0,
        remainingTime: Math.max(0, (user.totalTimeAllowance || 0) - (user.usedTimeMinutes || 0)),
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
