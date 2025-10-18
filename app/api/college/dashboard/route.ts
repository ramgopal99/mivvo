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

    // Debug logging
    console.log('College Dashboard API - collegeId:', collegeId, 'type:', typeof collegeId)

    // Check if college exists
    const collegeExists = await prisma.college.findUnique({
      where: { id: collegeId }
    })
    console.log('College exists:', !!collegeExists, collegeExists?.name)

    // Check total data in database
    const totalColleges = await prisma.college.count()
    const totalUsers = await prisma.user.count()
    const totalAttempts = await prisma.interviewAttempt.count()
    console.log('Database totals - Colleges:', totalColleges, 'Users:', totalUsers, 'Attempts:', totalAttempts)

    // Get college stats
    const [totalStudents, totalInterviews, completedInterviews, averageScore] = await Promise.all([
      // Total students in college
      prisma.user.count({
        where: { collegeId }
      }),

      // Total interview attempts
      prisma.interviewAttempt.count({
        where: {
          candidate: {
            collegeId
          }
        }
      }),

      // Completed interviews
      prisma.interviewAttempt.count({
        where: {
          candidate: {
            collegeId
          },
          status: 'COMPLETED'
        }
      }),

      // Average score across all completed interviews
      prisma.interviewResult.aggregate({
        where: {
          attempt: {
            candidate: {
              collegeId
            }
          }
        },
        _avg: {
          overallScore: true
        }
      })
    ])

    // Get top performing students
    const topStudents = await prisma.user.findMany({
      where: { collegeId },
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
      take: 5,
      orderBy: {
        interviewAttempts: {
          _count: 'desc'
        }
      }
    })

    // Get recent activity (students who had interviews in the last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentActivity = await prisma.interviewAttempt.findMany({
      where: {
        candidate: {
          collegeId
        },
        startedAt: {
          gte: sevenDaysAgo
        }
      },
      include: {
        candidate: {
          select: {
            id: true,
            name: true,
            email: true,
            rollNumber: true
          }
        },
        interview: {
          select: {
            title: true,
            interviewType: true
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      },
      take: 5
    })

    // Get interview type distribution
    const interviewTypes = await prisma.mockInterview.groupBy({
      by: ['interviewType'],
      where: {
        createdBy: {
          in: (await prisma.user.findMany({
            where: { collegeId },
            select: { id: true }
          })).map(u => u.id)
        }
      },
      _count: {
        interviewType: true
      }
    })

    // Get monthly interview trends (last 6 months)
    const monthlyTrends = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      const count = await prisma.interviewAttempt.count({
        where: {
          candidate: {
            collegeId
          },
          startedAt: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      })

      monthlyTrends.push({
        month: monthStart.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        interviews: count
      })
    }

    // Calculate completion rate
    const completionRate = totalInterviews > 0 ? Math.round((completedInterviews / totalInterviews) * 100) : 0

    // Get active students this month
    const monthStart = new Date()
    monthStart.setDate(1)

    const activeStudentsThisMonth = await prisma.interviewAttempt.findMany({
      where: {
        candidate: {
          collegeId
        },
        startedAt: {
          gte: monthStart
        }
      },
      select: {
        candidateId: true
      },
      distinct: ['candidateId']
    })

    const collegeStats = {
      totalStudents,
      totalInterviews,
      completedInterviews,
      completionRate,
      averageScore: Math.round(averageScore._avg.overallScore || 0),
      activeStudentsThisMonth: activeStudentsThisMonth.length,
      topStudents: topStudents.map(student => {
        // Calculate average score from all interview results
        const allScores = student.interviewAttempts.flatMap(attempt =>
          attempt.results?.map(result => result.overallScore).filter(score => score != null) || []
        )
        const averageScore = allScores.length > 0
          ? Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)
          : 0

        return {
          id: student.id,
          name: student.name || 'Unknown',
          email: student.email,
          rollNumber: student.rollNumber,
          totalInterviews: student._count.interviewAttempts,
          averageScore
        }
      }),
      recentActivity: recentActivity.map(activity => ({
        id: activity.id,
        studentName: activity.candidate?.name || 'Unknown',
        studentEmail: activity.candidate?.email || 'N/A',
        rollNumber: activity.candidate?.rollNumber || null,
        interviewTitle: activity.interview.title,
        interviewType: activity.interview.interviewType,
        startedAt: activity.startedAt,
        status: activity.status
      })),
      interviewTypes: interviewTypes.map(type => ({
        type: type.interviewType,
        count: type._count.interviewType
      })),
      monthlyTrends
    }

    return NextResponse.json({
      success: true,
      data: collegeStats
    })

  } catch (error) {
    console.error('College dashboard fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
