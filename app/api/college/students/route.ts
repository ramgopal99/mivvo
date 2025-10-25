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
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

      // Get all conversation durations
      const allConversations = student.interviewAttempts.flatMap(attempt =>
        attempt.conversations.map(conv => ({
          duration: conv.duration,
          createdAt: conv.createdAt
        }))
      )

      // Calculate total time spent (in minutes)
      const totalTimeSpent = allConversations.reduce((total, conv) => total + conv.duration, 0)

      // Calculate this week's time (conversations from the last 7 days)
      const thisWeekConversations = allConversations.filter(conv =>
        conv.createdAt >= oneWeekAgo
      )
      const thisWeekTimeSpent = thisWeekConversations.reduce((total, conv) => total + conv.duration, 0)

      // Calculate last week's time (conversations from 7-14 days ago)
      const lastWeekConversations = allConversations.filter(conv =>
        conv.createdAt >= twoWeeksAgo && conv.createdAt < oneWeekAgo
      )
      const lastWeekTimeSpent = lastWeekConversations.reduce((total, conv) => total + conv.duration, 0)

      return {
        id: student.id,
        name: student.name || 'Unknown',
        email: student.email,
        rollNumber: student.rollNumber,
        collegeName: student.college?.name || student.collegeName || 'N/A', // Get college name from relation or fallback to stored field
        collegeId: student.college?.collegeId || student.collegeId || 'N/A', // Also include collegeId for reference
        averageScore,
        completedInterviews,
        totalInterviews: student._count.mockInterviews,
        totalTimeSpent, // in minutes
        thisWeekTimeSpent, // in minutes
        lastWeekTimeSpent, // in minutes
        status: 'active', // For now, assume all are active
        major: 'Computer Science', // Default major since we don't have this field
        year: '2024', // Default year since we don't have this field
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
