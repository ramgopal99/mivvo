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
  { params }: { params: Promise<{ id: string, interviewId: string }> }
) {
  try {
    const { id: studentId, interviewId } = await params
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
    if (payload.role !== 'COLLEGE') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Get interview with attempts
    const interview = await prisma.mockInterview.findFirst({
      where: {
        id: interviewId,
        createdBy: studentId,
        user: {
          collegeId: payload.collegeId,
          role: 'USER'
        }
      },
      include: {
        attempts: {
          include: {
            results: true
          },
          orderBy: {
            startedAt: 'desc'
          }
        }
      }
    })

    if (!interview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 })
    }

    // Format interview data
    const interviewData = {
      id: interview.id,
      title: interview.title || 'Untitled Interview',
      description: interview.jobDescription || '',
      difficulty: interview.experienceLevel || 'Medium',
      createdAt: interview.createdAt
    }

    // Format attempts data
    const attemptsData = interview.attempts.map(attempt => {
      const results = attempt.results
      const averageScore = results.length > 0 
        ? results.reduce((sum, result) => sum + (result.overallScore || 0), 0) / results.length 
        : 0

      return {
        id: attempt.id,
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt,
        duration: attempt.duration || 0,
        status: attempt.status,
        score: Math.round(averageScore),
        results: results.map(result => ({
          overallScore: result.overallScore || 0,
          knowledge: result.knowledge || 0,
          communication: result.communication || 0,
          problemSolving: result.questionAnsweringQuality || 0
        }))
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        interview: interviewData,
        attempts: attemptsData
      }
    })

  } catch (error) {
    console.error('Error fetching interview attempts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
