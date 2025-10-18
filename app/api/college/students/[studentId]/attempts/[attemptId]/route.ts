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
  { params }: { params: Promise<{ studentId: string; attemptId: string }> }
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
    const { studentId, attemptId } = await params

    // First verify the student belongs to this college
    const student = await prisma.user.findFirst({
      where: {
        id: studentId,
        collegeId: collegeId,
        role: 'USER'
      },
      select: {
        id: true,
        name: true,
        email: true,
        rollNumber: true,
        collegeName: true
      }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Get the attempt with results
    const attempt = await prisma.interviewAttempt.findFirst({
      where: {
        id: attemptId,
        candidateId: studentId
      },
      include: {
        interview: {
          select: {
            id: true,
            title: true,
            interviewType: true
          }
        },
        results: true
      }
    })

    if (!attempt) {
      return NextResponse.json(
        { error: 'Attempt not found' },
        { status: 404 }
      )
    }

    // Format the response
    const attemptData = {
      id: attempt.id,
      interviewId: attempt.interviewId,
      interviewTitle: attempt.interview.title || 'Untitled Interview',
      interviewType: attempt.interview.interviewType || 'General',
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      duration: attempt.duration,
      status: attempt.status,
      result: attempt.results && attempt.results.length > 0 ? {
        id: attempt.results[0].id,
        overallScore: attempt.results[0].overallScore || 0,
        overallFeedback: attempt.results[0].overallFeedback,
        knowledge: attempt.results[0].knowledge,
        communication: attempt.results[0].communication,
        strengths: attempt.results[0].strengths || [],
        weaknesses: attempt.results[0].weaknesses || [],
        recommendations: attempt.results[0].recommendations || [],
        notes: attempt.results[0].notes,
        createdAt: attempt.results[0].createdAt
      } : null
    }

    const response = {
      success: true,
      data: {
        student: {
          ...student,
          major: 'Computer Science', // Default value since field doesn't exist in schema
          year: '2024' // Default value since field doesn't exist in schema
        },
        attempt: attemptData
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('College student attempt fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
