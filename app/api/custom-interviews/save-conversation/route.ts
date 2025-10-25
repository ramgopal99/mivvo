/**
 * Save Conversation API Route
 *
 * Saves interview conversation data (transcript, messages, etc.) to the database
 * for later analysis and review.
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

    const { interviewId, transcript, messages, duration, createdAt } = await request.json()

    // Validate required fields
    if (!interviewId || !transcript || !messages) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get the latest attempt for this interview
    const latestAttempt = await prisma.interviewAttempt.findFirst({
      where: {
        interviewId,
        interview: {
          createdBy: userId
        }
      },
      orderBy: {
        startedAt: 'desc'
      }
    })

    if (!latestAttempt) {
      return NextResponse.json({ error: 'No attempt found for this interview' }, { status: 404 })
    }

    // Save conversation data and update interview status to COMPLETED
    const result = await prisma.$transaction([
      // Save conversation data
      prisma.interviewConversation.create({
        data: {
          attemptId: latestAttempt.id,
          transcript: JSON.stringify(transcript),
          messages: JSON.stringify(messages),
          duration: duration || 0,
          createdAt: createdAt ? new Date(createdAt) : new Date()
        }
      }),
      // Update the attempt with completion time
      prisma.interviewAttempt.update({
        where: { id: latestAttempt.id },
        data: {
          completedAt: new Date(),
          duration: duration || 0
        }
      }),
      // Update interview status to COMPLETED
      prisma.mockInterview.update({
        where: { id: interviewId },
        data: { status: 'COMPLETED' }
      })
    ])

    console.log('Conversation saved and interview status updated to COMPLETED')

    return NextResponse.json({
      success: true,
      conversationId: result[0].id,
      message: 'Conversation data saved successfully'
    })

  } catch (error) {
    console.error('Error saving conversation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
