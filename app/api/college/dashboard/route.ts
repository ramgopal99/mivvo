import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

interface JWTPayload {
  userId?: string
  collegeId?: string
  collegeName?: string
  role: string
  type: string
}

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    
    // Verify JWT token
    let payload: JWTPayload
    try {
      payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as JWTPayload
      console.log('JWT payload:', payload)
    } catch (error) {
      console.error('JWT verification error:', error)
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Check if user is a college admin
    if (payload.role !== 'COLLEGE_ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
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
        return NextResponse.json({ error: 'College admin not associated with a college' }, { status: 403 })
      }

      collegeId = user.collegeId
    } else {
      return NextResponse.json({ error: 'Invalid token structure' }, { status: 401 })
    }

    // Get college information
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      select: {
        id: true,
        name: true,
        collegeId: true,
        isActive: true,
        createdAt: true
      }
    })

    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }

    // Get total students count
    const totalStudents = await prisma.user.count({
      where: {
        collegeId: collegeId,
        role: { in: ['USER', 'COLLEGE_STUDENT'] }
      }
    })

    // Get students with interview statistics
    const studentsWithStats = await prisma.user.findMany({
      where: {
        collegeId: collegeId,
        role: { in: ['USER', 'COLLEGE_STUDENT'] }
      },
      select: {
        id: true,
        name: true,
        email: true,
        rollNumber: true,
        createdAt: true,
        totalCreditAllocation: true,
        usedCredits: true,
        _count: {
          select: {
            interviewAttempts: true
          }
        },
        interviewAttempts: {
          select: {
            id: true,
            status: true,
            startedAt: true,
            completedAt: true,
            duration: true,
            results: {
              select: {
                overallScore: true,
                communication: true,
                knowledge: true
              }
            }
          }
        }
      }
    })

    // Get total interviews created by students in this college
    const totalInterviewsCreated = await prisma.mockInterview.count({
      where: {
        user: {
          collegeId: collegeId,
          role: { in: ['USER', 'COLLEGE_STUDENT'] }
        }
      }
    })

    // Calculate statistics
    const totalInterviews = studentsWithStats.reduce((sum, student) => sum + student._count.interviewAttempts, 0)
    const completedInterviews = studentsWithStats.reduce((sum, student) => 
      sum + student.interviewAttempts.filter(attempt => attempt.status === 'COMPLETED').length, 0
    )
    
    const totalCreditsAllowed = studentsWithStats.reduce((sum, student) => sum + (student.totalCreditAllocation || 0), 0)

    // Calculate total time used and allowed (in minutes)
    const totalTimeUsed = studentsWithStats.reduce((sum, student) => {
      const studentTime = student.interviewAttempts.reduce((attemptSum, attempt) => {
        return attemptSum + (attempt.duration || 0)
      }, 0)
      return sum + studentTime
    }, 0)
    
    // Total time allowed is based on credits (assuming 1 credit = 30 minutes)
    const totalTimeAllowed = totalCreditsAllowed * 30

    // Calculate average scores
    const allScores = studentsWithStats.flatMap(student => 
      student.interviewAttempts
        .filter(attempt => attempt.results && attempt.results.length > 0)
        .flatMap(attempt => attempt.results!)
        .filter(result => result.overallScore !== null)
        .map(result => result.overallScore!)
    )
    
    const averageScore = allScores.length > 0 
      ? allScores.reduce((sum, score) => sum + score, 0) / allScores.length 
      : 0

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentInterviews = await prisma.interviewAttempt.count({
      where: {
        candidate: {
          collegeId: collegeId,
          role: { in: ['USER', 'COLLEGE_STUDENT'] }
        },
        startedAt: {
          gte: sevenDaysAgo
        }
      }
    })

    // Get students by performance level
    const highPerformers = studentsWithStats.filter(student => {
      const scores = student.interviewAttempts
        .filter(attempt => attempt.results && attempt.results.length > 0)
        .flatMap(attempt => attempt.results!)
        .filter(result => result.overallScore !== null)
        .map(result => result.overallScore!)
      return scores.length > 0 && scores.reduce((sum, score) => sum + score, 0) / scores.length >= 80
    }).length

    const averagePerformers = studentsWithStats.filter(student => {
      const scores = student.interviewAttempts
        .filter(attempt => attempt.results && attempt.results.length > 0)
        .flatMap(attempt => attempt.results!)
        .filter(result => result.overallScore !== null)
        .map(result => result.overallScore!)
      const avgScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0
      return avgScore >= 60 && avgScore < 80
    }).length

    const lowPerformers = studentsWithStats.filter(student => {
      const scores = student.interviewAttempts
        .filter(attempt => attempt.results && attempt.results.length > 0)
        .flatMap(attempt => attempt.results!)
        .filter(result => result.overallScore !== null)
        .map(result => result.overallScore!)
      const avgScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0
      return avgScore < 60 && scores.length > 0
    }).length

    const noAttempts = studentsWithStats.filter(student => student._count.interviewAttempts === 0).length

    const stats = {
      college: {
        id: college.id,
        name: college.name,
        collegeId: college.collegeId,
        isActive: college.isActive,
        createdAt: college.createdAt
      },
      students: {
        total: totalStudents,
        highPerformers,
        averagePerformers,
        lowPerformers,
        noAttempts
      },
      interviews: {
        total: totalInterviewsCreated,
        completed: completedInterviews,
        completionRate: totalInterviews > 0 ? (completedInterviews / totalInterviews) * 100 : 0,
        averageScore: Math.round(averageScore * 100) / 100,
        recentActivity: recentInterviews
      },
      timeUsage: {
        totalUsed: totalTimeUsed,
        totalAllowed: totalTimeAllowed,
        usagePercentage: totalTimeAllowed > 0 ? (totalTimeUsed / totalTimeAllowed) * 100 : 0
      },
      studentsList: studentsWithStats.map(student => ({
        id: student.id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        createdAt: student.createdAt,
        totalCreditAllocation: student.totalCreditAllocation,
        usedCredits: student.usedCredits,
        interviewCount: student._count.interviewAttempts,
        averageScore: (() => {
          const scores = student.interviewAttempts
            .filter(attempt => attempt.results && attempt.results.length > 0)
            .flatMap(attempt => attempt.results!)
            .filter(result => result.overallScore !== null)
            .map(result => result.overallScore!)
          return scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0
        })()
      }))
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Error fetching college dashboard stats:', error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}
