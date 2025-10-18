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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')
  const skip = (page - 1) * limit
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

    // Get total count for pagination
    const totalStudents = await prisma.user.count({
      where: {
        collegeId: collegeId,
        role: 'USER' // Only get students, not admins
      }
    })

    // Get paginated students for this college
    const students = await prisma.user.findMany({
      where: {
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
                overallScore: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      },
      skip: skip,
      take: limit
    })

    // Calculate stats for each student
    const studentsWithStats = students.map(student => {
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

      return {
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
    })

    // Calculate overall stats (from current page)
    const activeStudents = studentsWithStats.filter(s => s.status === 'active').length
    const overallAverageScore = studentsWithStats.length > 0
      ? Math.round(studentsWithStats.reduce((acc, s) => acc + s.averageScore, 0) / studentsWithStats.length)
      : 0
    const totalInterviews = studentsWithStats.reduce((acc, s) => acc + s.totalInterviews, 0)

    // Get unique majors and years (for filters)
    const majors = [...new Set(studentsWithStats.map(s => s.major))]
    const years = [...new Set(studentsWithStats.map(s => s.year))]

    // Calculate pagination info
    const totalPages = Math.ceil(totalStudents / limit)

    const response = {
      success: true,
      data: {
        students: studentsWithStats,
        stats: {
          totalStudents: totalStudents, // Total across all pages
          activeStudents,
          averageScore: overallAverageScore,
          totalInterviews
        },
        filters: {
          majors,
          years
        },
        pagination: {
          page,
          limit,
          totalStudents,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('College students fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
