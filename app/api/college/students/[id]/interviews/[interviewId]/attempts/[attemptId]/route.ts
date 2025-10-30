import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

interface JWTPayload {
  collegeId: string
  collegeName: string
  role: string
  type: string
  iat?: number
  exp?: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, interviewId: string, attemptId: string }> }
) {
  try {
    const { id: studentId, interviewId, attemptId } = await params
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No authentication token found' }, { status: 401 })
    }

    // Verify JWT token
    let payload: JWTPayload
    try {
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as JWTPayload
    } catch (error) {
      console.error('JWT verification error:', error)
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Check if user is college admin
    if (payload.role !== 'COLLEGE_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Get attempt with results and conversations
    const attempt = await prisma.interviewAttempt.findFirst({
      where: {
        id: attemptId,
        interviewId: interviewId,
        interview: {
          createdBy: studentId,
          user: {
            collegeId: payload.collegeId,
            role: { in: ['USER', 'COLLEGE_STUDENT'] }
          }
        }
      },
      include: {
        results: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        conversations: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        interview: {
          select: {
            id: true,
            title: true,
            experienceLevel: true
          }
        }
      }
    })

    if (!attempt) {
      return NextResponse.json({ error: 'Attempt not found' }, { status: 404 })
    }

    // Format interview data
    const interviewData = {
      id: attempt.interview.id,
      title: attempt.interview.title || 'Untitled Interview',
      difficulty: attempt.interview.experienceLevel || 'Medium'
    }

    // Format attempt data
    const attemptData = {
      id: attempt.id,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      duration: attempt.duration || 0,
      status: attempt.status,
      results: attempt.results.map(result => ({
        id: result.id,
        overallScore: result.overallScore || 0,
        knowledge: result.knowledge || 0,
        communication: result.communication || 0,
        problemSolving: result.questionAnsweringQuality || 0,
        feedback: result.feedback || '',
        createdAt: result.createdAt
      })),
      conversations: attempt.conversations.map(conversation => ({
        id: conversation.id,
        transcript: conversation.transcript || '',
        messages: conversation.messages || '',
        duration: conversation.duration || 0,
        createdAt: conversation.createdAt
      }))
    }

    return NextResponse.json({
      success: true,
      data: {
        interview: interviewData,
        attempt: attemptData
      }
    })

  } catch (error) {
    console.error('Error fetching attempt results:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
