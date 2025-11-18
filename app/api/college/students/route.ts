/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface JWTPayload {
  userId?: string
  collegeId?: string
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
    if (decoded.role !== 'COLLEGE_ADMIN') {
      return NextResponse.json(
        { error: 'Access denied. College admin required.' },
        { status: 403 }
      )
    }

    let collegeId: string

    // Handle both old JWT structure (collegeId directly) and new structure (userId with college relationship)
    if (decoded.collegeId) {
      // Old structure - collegeId directly in JWT
      collegeId = decoded.collegeId
    } else if (decoded.userId) {
      // New structure - get collegeId from user relationship
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
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

    // Get total count for pagination
    const totalStudents = await prisma.user.count({
      where: {
        collegeId: collegeId,
        role: { in: ['USER', 'COLLEGE_STUDENT'] } // Get students and college students, not admins
      }
    })

    // Get paginated students for this college
    const students = await prisma.user.findMany({
      where: {
        collegeId: collegeId,
        role: { in: ['USER', 'COLLEGE_STUDENT'] } // Get students and college students, not admins
      },
      include: {
        college: {
          select: {
            name: true,
            collegeId: true
          }
        },
        _count: {
          select: {
            interviewAttempts: true,
            mockInterviews: true
          }
        },
        interviewAttempts: {
          include: {
            results: {
              select: {
                overallScore: true
              }
            },
            conversations: {
              select: {
                duration: true,
                createdAt: true
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

      // Calculate time spent data
      const now = new Date()
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

      // Get all conversation durations
      const allConversations = student.interviewAttempts.flatMap(attempt =>
        attempt.conversations.map(conv => ({
          duration: conv.duration,
          createdAt: conv.createdAt
        }))
      )

      // Calculate total time spent (in minutes)
      const totalTimeSpent = allConversations.reduce((total, conv) => total + conv.duration, 0)


      // Calculate this month's time (conversations from the start of this month)
      const thisMonthConversations = allConversations.filter(conv =>
        conv.createdAt >= startOfThisMonth
      )
      const thisMonthTimeSpent = thisMonthConversations.reduce((total, conv) => total + conv.duration, 0)

      // Calculate last month's time (conversations from the start of last month to end of last month)
      const lastMonthConversations = allConversations.filter(conv =>
        conv.createdAt >= startOfLastMonth && conv.createdAt <= endOfLastMonth
      )
      const lastMonthTimeSpent = lastMonthConversations.reduce((total, conv) => total + conv.duration, 0)

      return {
        id: student.id,
        name: student.name || 'Unknown',
        email: student.email,
        rollNumber: student.rollNumber,
        collegeName: student.college?.name || student.collegeName || 'N/A', // Get college name from relation or fallback to stored field
        collegeId: student.college?.collegeId || student.collegeId || 'N/A', // Also include collegeId for reference
        branch: student.branch,
        course: student.course,
        courseDuration: student.courseDuration,
        averageScore,
        completedInterviews,
        totalInterviews: student._count.mockInterviews,
        totalTimeSpent, // in minutes
        thisMonthTimeSpent, // in minutes
        lastMonthTimeSpent, // in minutes
        lastActive: new Date().toISOString(), // Default to now
        avatar: null,
        // Additional fields from the database
        firstName: student.firstName,
        lastName: student.lastName,
        phone: student.phone,
        careerGoals: student.careerGoals,
        linkedIn: student.linkedIn,
        github: student.github,
        totalTimeAllowance: student.totalTimeAllowance,
        usedTimeMinutes: student.usedTimeMinutes,
        createdAt: student.createdAt?.toISOString(),
        updatedAt: student.updatedAt?.toISOString()
      }
    })

    // Calculate overall stats (from current page)
    const overallAverageScore = studentsWithStats.length > 0
      ? Math.round(studentsWithStats.reduce((acc, s) => acc + s.averageScore, 0) / studentsWithStats.length)
      : 0
    const totalInterviews = studentsWithStats.reduce((acc, s) => acc + s.totalInterviews, 0)

    // Calculate pagination info
    const totalPages = Math.ceil(totalStudents / limit)

    const response = {
      success: true,
      data: {
        students: studentsWithStats,
        stats: {
          totalStudents: totalStudents, // Total across all pages
          averageScore: overallAverageScore,
          totalInterviews
        },
        filters: {},
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
