/**
 * Individual Interview Attempt API Route
 *
 * This file handles operations on specific interview attempts by interview ID and attempt ID:
 * - GET: Fetch a single attempt with full details including results and conversations
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

/**
 * GET /api/custom-interviews/[id]/attempt/[attemptId]
 * Fetch a specific attempt with full details including results and conversations
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; attemptId: string }> }
) {
  try {
    // Verify user authentication (NextAuth or JWT token)
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: interviewId, attemptId } = await params

    // Fetch attempt with ownership validation and full data
    const attempt = await prisma.interviewAttempt.findFirst({
      where: {
        id: attemptId,
        interviewId: interviewId,
        interview: {
          createdBy: userId // Ensure user owns this interview
        }
      },
      include: {
        interview: {
          select: {
            id: true,
            title: true,
            companyName: true,
            position: true,
            jobDescription: true,
            interviewType: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        results: {
          select: {
            id: true,
            overallScore: true,
            overallFeedback: true,
            strengths: true,
            weaknesses: true,
            recommendations: true,
            communication: true,
            knowledge: true,
            feedback: true,
            duration: true,
            createdAt: true,
            vocabularyComplexity: true,
            emotionalTone: true,
            wordCountAnalysis: true,
            questionAnsweringQuality: true,
            followUpHandling: true,
            answerStructure: true,
            exampleUsage: true,
            relevantTopicAnswer: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        conversations: {
          select: {
            id: true,
            transcript: true,
            messages: true,
            duration: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    if (!attempt) {
      return NextResponse.json({ error: 'Attempt not found' }, { status: 404 })
    }

    // Format attempt data for frontend consumption
    const formattedAttempt = {
      id: attempt.id,
      startedAt: attempt.startedAt?.toISOString(),
      completedAt: attempt.completedAt?.toISOString(),
      duration: attempt.duration,
      status: attempt.status,
      createdAt: attempt.createdAt.toISOString(),
      interview: {
        id: attempt.interview.id,
        title: attempt.interview.title,
        companyName: attempt.interview.companyName,
        position: attempt.interview.position,
        jobDescription: attempt.interview.jobDescription,
        interviewType: attempt.interview.interviewType,
        createdAt: attempt.interview.createdAt.toISOString(),
        user: attempt.interview.user ? {
          name: attempt.interview.user.name,
          email: attempt.interview.user.email
        } : undefined
      },
      results: attempt.results.map(result => ({
        id: result.id,
        overallScore: result.overallScore,
        overallFeedback: result.overallFeedback,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        recommendations: result.recommendations,
        communication: result.communication,
        knowledge: result.knowledge,
        feedback: result.feedback,
        duration: result.duration,
        createdAt: result.createdAt.toISOString(),
        vocabularyComplexity: result.vocabularyComplexity,
        emotionalTone: result.emotionalTone,
        wordCountAnalysis: result.wordCountAnalysis,
        questionAnsweringQuality: result.questionAnsweringQuality,
        followUpHandling: result.followUpHandling,
        answerStructure: result.answerStructure,
        exampleUsage: result.exampleUsage,
        relevantTopicAnswer: result.relevantTopicAnswer
      })),
      conversations: attempt.conversations.map(conversation => ({
        id: conversation.id,
        transcript: conversation.transcript,
        messages: conversation.messages,
        duration: conversation.duration,
        createdAt: conversation.createdAt.toISOString()
      }))
    }

    return NextResponse.json(formattedAttempt)
  } catch (error) {
    console.error('Error fetching attempt details:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
