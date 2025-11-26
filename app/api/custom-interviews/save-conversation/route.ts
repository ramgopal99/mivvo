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

    // Retry logic for transaction conflicts
    const maxRetries = 3
    let lastError: Error | null = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Save conversation data and update interview status to COMPLETED
        const result = await prisma.$transaction(
          async (tx) => {
            // Check if conversation already exists for this attempt
            const existingConversation = await tx.interviewConversation.findFirst({
              where: {
                attemptId: latestAttempt.id
              }
            })

            let conversation
            if (existingConversation) {
              // Update existing conversation
              console.log('Updating existing conversation for attempt:', latestAttempt.id)
              conversation = await tx.interviewConversation.update({
                where: {
                  id: existingConversation.id
                },
                data: {
                  transcript: JSON.stringify(transcript),
                  messages: JSON.stringify(messages),
                  duration: duration || 0,
                  createdAt: createdAt ? new Date(createdAt) : new Date()
                }
              })
            } else {
              // Create new conversation
              console.log('Creating new conversation for attempt:', latestAttempt.id)
              conversation = await tx.interviewConversation.create({
                data: {
                  attemptId: latestAttempt.id,
                  transcript: JSON.stringify(transcript),
                  messages: JSON.stringify(messages),
                  duration: duration || 0,
                  createdAt: createdAt ? new Date(createdAt) : new Date()
                }
              })
            }

            // Update the attempt with completion time and duration
            // Note: We update regardless of current completion status to handle
            // multiple save attempts or race conditions when ending interviews
            await tx.interviewAttempt.update({
              where: {
                id: latestAttempt.id
              },
              data: {
                completedAt: new Date(),
                duration: duration || 0
              }
            })

            // Update interview status to COMPLETED
            await tx.mockInterview.update({
              where: {
                id: interviewId
              },
              data: { status: 'COMPLETED' }
            })

            return conversation
          },
          {
            maxWait: 10000, // Increased to 10s to wait for transaction slot
            timeout: 20000 // Increased to 20s for transaction completion
          }
        )

        console.log('Conversation saved and interview status updated to COMPLETED')

        return NextResponse.json({
          success: true,
          conversationId: (result as { id: string }).id,
          message: 'Conversation data saved successfully'
        })
      } catch (error) {
        lastError = error as Error
        // Check if it's a transaction conflict error (P2034) or serialization failure (P2028)
        if ((lastError && 'code' in lastError && (lastError.code === 'P2034' || lastError.code === 'P2028')) && attempt < maxRetries - 1) {
          // Exponential backoff: wait 200ms, 400ms, 800ms (longer delays)
          const delay = Math.pow(2, attempt + 1) * 100
          console.log(`Transaction conflict detected (attempt ${attempt + 1}/${maxRetries}), retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
          continue
        }
        // If it's not a retryable error or we've exhausted retries, throw
        throw error
      }
    }

    // This should never be reached, but TypeScript needs it
    throw lastError

  } catch (error) {
    console.error('Error saving conversation:', error)

    const prismaError = error as { code?: string }

    // Handle specific Prisma errors
    if (prismaError.code === 'P2034') {
      return NextResponse.json(
        { error: 'Transaction conflict occurred. Please try again.' },
        { status: 409 }
      )
    }

    if (prismaError.code === 'P2028') {
      return NextResponse.json(
        { error: 'Database serialization error. Please try again.' },
        { status: 409 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
