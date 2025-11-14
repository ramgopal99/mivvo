'use server'

import { getSessionUserData } from "@/lib/session"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"

export async function getDashboardData(collegeUserData?: { id: string; name: string; email: string; role?: string; college?: { id: string; name: string; collegeId: string } }) {
  let user = await getSessionUserData()

  // If college user data is provided, use it instead of session data
  if (collegeUserData) {
    user = {
      id: collegeUserData.id,
      name: collegeUserData.name,
      email: collegeUserData.email,
      image: null,
      role: (collegeUserData.role as UserRole) || UserRole.COLLEGE_STUDENT
    }
  }

  if (!user) {
    return {
      stats: {
        totalInterviews: 0,
        totalTimeSpent: 0,
        averageScore: 0
      },
      recentInterviews: []
    }
  }

  // Get all interviews for the user
  const interviews = await prisma.mockInterview.findMany({
    where: {
      createdBy: user.id
    },
    include: {
      attempts: {
        include: {
          results: true,
          conversations: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Calculate stats
  const totalInterviews = interviews.length

  // Calculate total time spent - actual time user invested in ALL interview attempts
  const allAttempts = interviews.flatMap(i => i.attempts)
  const totalTimeSpent = allAttempts.reduce((total, attempt) => {
    return total + attempt.conversations.reduce((convTotal, conv) => convTotal + (conv.duration || 0), 0)
  }, 0)

  // Calculate average score from results - include all results regardless of completion status
  const allResults = interviews.flatMap(interview =>
    interview.attempts.flatMap(attempt => attempt.results)
  )

  // Calculate average from all results that have scores
  const resultsWithScores = allResults.filter(result => result.overallScore !== null && result.overallScore !== undefined && result.overallScore >= 0)

  const averageScore = resultsWithScores.length > 0
    ? Math.round(resultsWithScores.reduce((sum, result) => sum + result.overallScore!, 0) / resultsWithScores.length)
    : 0

  // Get recent interviews (last 5)
  const recentInterviews = interviews.slice(0, 5).map(interview => {
    const latestAttempt = interview.attempts[0]
    const latestResult = latestAttempt?.results[0]

    return {
      id: interview.id,
      title: interview.title || `${interview.position} Interview${interview.companyName ? ` - ${interview.companyName}` : ''}`,
      type: interview.interviewType?.replace('_', ' ') || 'GENERAL',
      status: latestAttempt?.status === 'COMPLETED' ? 'COMPLETED' as const : 'IN_PROGRESS' as const,
      score: latestResult?.overallScore ? Math.round(latestResult.overallScore) : undefined,
      duration: Math.round((latestAttempt?.conversations.reduce((total, conv) => total + conv.duration, 0) || 0) / 60), // Convert seconds to minutes
      createdAt: interview.createdAt,
      companyName: interview.companyName || undefined,
      position: interview.position || undefined
    }
  })

  return {
    stats: {
      totalInterviews,
      totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
      averageScore
    },
    recentInterviews
  }
}
