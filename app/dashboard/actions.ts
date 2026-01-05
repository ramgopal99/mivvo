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
        averageScore: 0,
        enrolledCourses: 0
      },
      recentInterviews: [],
      recentCourses: []
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

    // Determine status based on attempts
    let status: 'COMPLETED' | 'IN_PROGRESS'
    if (interview.attempts.length === 0) {
      // No attempts yet - not started
      status = 'IN_PROGRESS' // Keep as IN_PROGRESS for backward compatibility with component logic
    } else if (latestAttempt?.status === 'COMPLETED') {
      status = 'COMPLETED'
    } else {
      status = 'IN_PROGRESS'
    }

    return {
      id: interview.id,
      title: interview.title || `${interview.position} Interview${interview.companyName ? ` - ${interview.companyName}` : ''}`,
      type: interview.interviewType?.replace('_', ' ') || 'GENERAL',
      status,
      score: latestResult?.overallScore ? Math.round(latestResult.overallScore) : undefined,
      duration: Math.round((latestAttempt?.conversations.reduce((total, conv) => total + conv.duration, 0) || 0) / 60), // Convert seconds to minutes
      createdAt: interview.createdAt,
      companyName: interview.companyName || undefined,
      position: interview.position || undefined,
      hasAttempts: interview.attempts.length > 0 // Add this to help with button logic
    }
  })

  // Get enrolled course IDs first
  const enrollments = await prisma.courseEnrollment.findMany({
    where: {
      userId: user.id,
      isActive: true
    },
    select: {
      courseId: true,
      updatedAt: true
    }
  })

  // Get the actual courses that exist (filtering out deleted courses)
  const enrolledCourseIds = enrollments.map(e => e.courseId)
  const enrolledCourses = await prisma.course.findMany({
    where: {
      id: {
        in: enrolledCourseIds
      }
    },
    include: {
      modules: {
        include: {
          topics: true,
          exercises: true
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  // Create a map of courseId to enrollment updatedAt
  const enrollmentMap = new Map(enrollments.map(e => [e.courseId, e.updatedAt]))

  // Calculate progress for each enrolled course
  const coursesWithProgress = await Promise.all(
    enrolledCourses.map(async (course) => {

      // Get user's progress for this course
      const progressRecords = await prisma.courseUserProgress.findMany({
        where: {
          userId: user.id,
          courseId: course.id,
          isCompleted: true,
        },
      })

      // Calculate total items in course
      let totalItems = 0
      let completedModules = 0
      course.modules.forEach((module) => {
        const moduleItems = (module.topics?.length || 0) + (module.exercises?.length || 0)
        totalItems += moduleItems

        // Check if module is completed (all topics and exercises completed)
        const moduleProgressRecords = progressRecords.filter(p =>
          module.topics?.some(t => `${module.id}-${t.id}` === p.itemKey) ||
          module.exercises?.some(e => `${module.id}-${e.id}` === p.itemKey)
        )
        if (moduleProgressRecords.length === moduleItems) {
          completedModules++
        }
      })

      // Calculate completion percentage
      const completedItems = progressRecords.length
      const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

      return {
        id: course.id,
        courseId: course.courseId,
        displayName: course.displayName,
        headerTitle: course.headerTitle,
        completionPercentage: progressPercentage,
        completedModules,
        totalModules: course.modules.length,
        lastAccessed: enrollmentMap.get(course.id) || new Date() // Use enrollment updatedAt as last accessed
      }
    })
  )

  // Filter for incomplete courses (progress < 100%) and sort by last accessed
  const incompleteCourses = coursesWithProgress
    .filter(course => course.completionPercentage < 100)
    .sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime())
    .slice(0, 2) // Get top 2 incomplete courses

  return {
    stats: {
      totalInterviews,
      totalTimeSpent: Math.round(totalTimeSpent / 60), // Convert to minutes
      averageScore,
      enrolledCourses: enrolledCourses.length
    },
    recentInterviews,
    recentCourses: incompleteCourses
  }
}
