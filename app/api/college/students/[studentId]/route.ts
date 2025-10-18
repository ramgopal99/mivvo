/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface JWTPayload {
  collegeId: string
  role: string
  [key: string]: string | number | boolean | object | null | undefined
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ studentId: string }> }
) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    let decoded: JWTPayload
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as JWTPayload
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Check if user is a college admin
    if (decoded.role !== 'COLLEGE') {
      return NextResponse.json(
        { error: 'Access denied. College admin required.' },
        { status: 403 }
      )
    }

    const collegeId = decoded.collegeId
    const { studentId } = await params

    // Get student details with interview attempts
    const student = await prisma.user.findFirst({
      where: {
        id: studentId,
        collegeId: collegeId,
        role: 'USER' // Only get students, not admins
      },
      include: {
        _count: {
          select: {
            interviewAttempts: true
          }
        },
        interviewAttempts: {
          include: {
            results: {
              select: {
                id: true,
                overallScore: true
              }
            },
            interview: {
              select: {
                id: true,
                title: true,
                interviewType: true
              }
            }
          },
          orderBy: {
            startedAt: 'desc'
          }
        }
      }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Calculate average score from all interview results
    const allScores = student.interviewAttempts.flatMap(attempt =>
      attempt.results?.map(result => result.overallScore).filter(score => score != null) || []
    )
    const averageScore = allScores.length > 0
      ? Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)
      : 0

    // Count completed interviews
    const completedInterviews = student.interviewAttempts.filter(attempt =>
      attempt.status === 'COMPLETED'
    ).length

    // Format student data
    const studentData = {
      id: student.id,
      name: student.name || 'Unknown',
      email: student.email,
      rollNumber: student.rollNumber,
      collegeName: student.collegeName,
      averageScore,
      completedInterviews,
      totalInterviews: student._count.interviewAttempts,
      status: 'active', // For now, assume all are active
      major: 'Computer Science', // Default major since we don't have this field
      year: '2024', // Default year since we don't have this field
      lastActive: new Date().toISOString(), // Default to now
      avatar: null
    }

    // Format attempts data
    const attempts = student.interviewAttempts.map(attempt => {
      const result = attempt.results?.[0] // Get first result (overall analysis)
      const score = result?.overallScore || 0

      return {
        id: attempt.id,
        interviewId: attempt.interviewId,
        interviewTitle: attempt.interview.title || 'Untitled Interview',
        interviewType: attempt.interview.interviewType || 'General',
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt,
        duration: attempt.duration,
        status: attempt.status,
        score,
        resultId: result?.id || null
      }
    })

    const response = {
      success: true,
      data: {
        student: studentData,
        attempts
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('College student details fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
