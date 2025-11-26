import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

interface JWTPayload {
  userId?: string
  collegeId?: string
  collegeName?: string
  role: string
  type?: string
  iat?: number
  exp?: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    let collegeId: string

    // Handle both old JWT structure (collegeId directly) and new structure (userId with college relationship)
    if (payload.collegeId) {
      // Old structure - collegeId directly in JWT
      collegeId = payload.collegeId
    } else if (payload.userId) {
      // New structure - get collegeId from user relationship
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { collegeId: true }
      })

      if (!user || !user.collegeId) {
        return NextResponse.json(
          { error: 'College admin not associated with a college' },
          { status: 403 }
        )
      }

      collegeId = user.collegeId
    } else {
      return NextResponse.json(
        { error: 'Invalid token structure' },
        { status: 401 }
      )
    }

    const studentId = id

    // Get student details with comprehensive data
    const student = await prisma.user.findFirst({
      where: {
        id: studentId,
        collegeId: collegeId,
        role: { in: ['USER', 'COLLEGE_STUDENT'] }
      },
      include: {
        mockInterviews: {
          include: {
            attempts: {
              include: {
                results: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        interviewAttempts: {
          include: {
            results: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Calculate statistics
    const totalInterviewsCreated = student.mockInterviews.length

    // Count attempts from all interviews created by this student
    const allAttempts = student.mockInterviews.flatMap(interview => interview.attempts)
    const totalAttempts = allAttempts.length
    const completedAttempts = allAttempts.filter(attempt => attempt.results.length > 0).length

    // Calculate average score from all results
    const allResults = allAttempts.flatMap(attempt => attempt.results)
    const averageScore = allResults.length > 0
      ? allResults.reduce((sum, result) => sum + (result.overallScore || 0), 0) / allResults.length
      : 0

    // Calculate total time usage (in minutes)
    const totalTimeMinutes = allAttempts.reduce((total, attempt) => {
      return total + (attempt.duration || 0) / 60 // Convert seconds to minutes
    }, 0)
    const hours = Math.floor(totalTimeMinutes / 60)
    const minutes = Math.floor(totalTimeMinutes % 60)
    const seconds = Math.floor((totalTimeMinutes * 60) % 60) // Calculate remaining seconds

    // Format interviews data for the table
    const interviewsData = student.mockInterviews.map(interview => {
      // Calculate total duration from all attempts (in seconds)
      const totalDurationSeconds = interview.attempts.reduce((total, attempt) => {
        return total + (attempt.duration || 0)
      }, 0)
      
      return {
        id: interview.id,
        title: interview.title || 'Untitled Interview',
        description: interview.jobDescription ? 
          (interview.jobDescription.length > 50 ? 
            interview.jobDescription.substring(0, 50) + '...' : 
            interview.jobDescription) : '',
        difficulty: interview.experienceLevel || 'Medium',
        duration: totalDurationSeconds,
        createdAt: interview.createdAt,
        totalAttempts: interview.attempts.length,
        averageScore: interview.attempts.length > 0 
          ? interview.attempts
              .flatMap(attempt => attempt.results)
              .reduce((sum, result) => sum + (result.overallScore || 0), 0) / interview.attempts.flatMap(attempt => attempt.results).length || 0
          : 0
      }
    })

    const stats = {
      totalInterviewsCreated,
      totalAttempts,
      completedAttempts,
      averageScore: Math.round(averageScore),
      totalTimeUsage: {
        hours,
        minutes,
        seconds
      },
      timeUsageString: `${hours}h ${minutes}m ${seconds}s`
    }

    return NextResponse.json({
      success: true,
      data: {
        student: {
          id: student.id,
          name: student.name,
          email: student.email,
          rollNumber: student.rollNumber,
          collegeName: student.collegeName,
          status: 'active', // Default status since it's not in schema
          avatar: student.image,
          createdAt: student.createdAt
        },
        stats,
        interviews: interviewsData
      }
    })

  } catch (error) {
    console.error('Error fetching student details:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
