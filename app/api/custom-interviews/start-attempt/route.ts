/**
 * Start Interview Attempt API Route
 *
 * Creates a new interview attempt record when a user starts an interview session.
 * This is used to track individual interview sessions and link conversation data.
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

    const { interviewId } = await request.json()

    // Validate required fields
    if (!interviewId) {
      return NextResponse.json({ error: 'Missing interviewId' }, { status: 400 })
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

    // Create a new interview attempt and update interview status to IN_PROGRESS
    const result = await prisma.$transaction([
      // Create the attempt
      prisma.interviewAttempt.create({
        data: {
          interviewId: interviewId,
          startedAt: new Date()
        }
      }),
      // Update interview status to IN_PROGRESS
      prisma.mockInterview.update({
        where: { id: interviewId },
        data: { status: 'IN_PROGRESS' }
      })
    ])

    console.log('Interview attempt created and status updated to IN_PROGRESS')

    return NextResponse.json({
      success: true,
      attemptId: result[0].id,
      message: 'Interview attempt started successfully'
    })

  } catch (error) {
    console.error('Error starting interview attempt:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
