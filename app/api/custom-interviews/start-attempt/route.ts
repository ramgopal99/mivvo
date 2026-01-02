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
    console.log('Start attempt API called')

    // Verify user authentication (NextAuth or JWT token)
    const userId = await authenticateUser(request)
    console.log('Authenticated user ID:', userId)

    if (!userId) {
      console.log('No user ID found, returning 401')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    console.log('Request body:', body)
    const { interviewId } = body

    // Validate required fields
    if (!interviewId) {
      console.log('No interviewId provided')
      return NextResponse.json({ error: 'Missing interviewId' }, { status: 400 })
    }

    // Verify the interview belongs to the user
    console.log('Checking interview ownership:', { interviewId, userId })
    const interview = await prisma.mockInterview.findFirst({
      where: {
        id: interviewId,
        createdBy: userId
      }
    })

    console.log('Interview found:', !!interview)
    if (!interview) {
      console.log('Interview not found or access denied')
      return NextResponse.json({ error: 'Interview not found or access denied' }, { status: 404 })
    }

    // Create a new interview attempt and update interview status to IN_PROGRESS
    // Note: MongoDB doesn't support transactions like SQL databases, so we handle operations separately
    console.log('Creating interview attempt...')

    // First, create the interview attempt
    const attemptResult = await prisma.interviewAttempt.create({
      data: {
        interviewId: interviewId,
        startedAt: new Date()
      }
    })

    console.log('Interview attempt created:', attemptResult.id)

    // Then, update the interview status to IN_PROGRESS
    console.log('Updating interview status to IN_PROGRESS...')
    const interviewResult = await prisma.mockInterview.update({
      where: { id: interviewId },
      data: { status: 'IN_PROGRESS' }
    })

    console.log('Interview status updated to IN_PROGRESS for interview:', interviewResult.id)

    return NextResponse.json({
      success: true,
      attemptId: attemptResult.id,
      message: 'Interview attempt started successfully'
    })

  } catch (error) {
    // Enhanced error logging
    console.error('Error starting interview attempt:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.constructor.name : typeof error
    })

    // Check if it's a Prisma error
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: unknown }
      console.error('Prisma error code:', prismaError.code)
      console.error('Prisma error meta:', prismaError.meta)
    }

    return NextResponse.json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: error && typeof error === 'object' && 'code' in error ? (error as { code: string }).code : undefined
      } : undefined
    }, { status: 500 })
  }
}
