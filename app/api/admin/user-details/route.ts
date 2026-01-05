import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Fetch comprehensive user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        userType: true,
        collegeName: true,
        collegeAdminId: true,
        createdAt: true,
        sessions: {
          select: {
            expires: true,
          },
          orderBy: {
            expires: 'desc'
          }
        },
        courseEnrollments: {
          select: {
            id: true,
            courseId: true,
            enrolledAt: true
          },
          orderBy: {
            enrolledAt: 'desc'
          }
        },
          mockInterviews: {
            select: {
              id: true,
              title: true,
              status: true,
              createdAt: true,
              attempts: {
                select: {
                  id: true,
                  duration: true,
                  completedAt: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
      }
    })

    // Use enrollments from user query
    const enrollments = user?.courseEnrollments || []

    // Fetch courses that exist for these enrollments
    // Note: enrollment.courseId refers to Course.id (primary key), not Course.courseId
    const coursePrimaryKeys = enrollments.map(e => e.courseId).filter(id => id)

    const courses = coursePrimaryKeys.length > 0 ? await prisma.course.findMany({
      where: {
        id: {
          in: coursePrimaryKeys
        }
      },
      select: {
        id: true,
        courseId: true,
        title: true,
        description: true
      }
    }) : []

    // Create a map of course primary key (id) to course data
    const courseMap = new Map(courses.map(c => [c.id, c]))

    // Combine enrollments with course data, filtering out those without courses
    const courseDetails = enrollments
      .map(enrollment => ({
        ...enrollment,
        course: courseMap.get(enrollment.courseId) || null
      }))
      .filter((enrollment): enrollment is typeof enrollment & { course: NonNullable<typeof enrollment.course> } =>
        enrollment.course !== null
      )


    // Fetch payments separately - try all payments first for debugging
    const allUserPayments = await prisma.payment.findMany({
      where: {
        userId: userId
      },
      select: {
        id: true,
        amount: true,
        currency: true,
        paymentCategory: true,
        description: true,
        paymentDate: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        paymentDate: 'desc'
      }
    })


    // Filter for completed payments
    const userPayments = allUserPayments.filter(payment => payment.status === 'COMPLETED')

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Transform data for frontend
    const lastLogin = user.sessions.length > 0
      ? user.sessions[0].expires.toISOString()
      : user.createdAt?.toISOString() || new Date().toISOString()

    const totalLogins = user.sessions.length

    // Calculate progress for each enrolled course
    const coursesWithProgress = await Promise.all(
      courseDetails.map(async (enrollment) => {
        // Get total items (topics + exercises) for this course
        const courseModules = await prisma.courseModule.findMany({
          where: { courseId: enrollment.course.courseId },
          select: {
            id: true,
            topics: {
              select: { id: true }
            },
            exercises: {
              select: { id: true }
            }
          }
        })

        // Count total items
        const totalItems = courseModules.reduce((total, module) => {
          return total + module.topics.length + module.exercises.length
        }, 0)

        // Get completed items for this user and course
        const completedItems = await prisma.courseUserProgress.count({
          where: {
            userId: userId,
            courseId: enrollment.course.id,
            isCompleted: true
          }
        })

        // Calculate progress percentage
        const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

        return {
          title: enrollment.course.title,
          enrolledAt: enrollment.enrolledAt.toISOString(),
          progress: progress
        }
      })
    )

    const payments = userPayments.map(payment => ({
      description: payment.description || `${payment.paymentCategory} Payment`,
      amount: Number(payment.amount),
      date: payment.paymentDate.toISOString()
    }))


    const totalIncome = payments.reduce((sum, payment) => sum + payment.amount, 0)

    const interviews = user.mockInterviews.map(interview => ({
      id: interview.id,
      title: interview.title,
      status: interview.status,
      attempts: interview.attempts.length
    }))

    const userDetails = {
      id: user.id,
      name: user.name || user.email.split('@')[0],
      email: user.email,
      role: user.role === 'SUPERADMIN' ? 'super_admin' : user.role === 'COLLEGE_ADMIN' ? 'college_admin' : 'user',
      status: user.status === 'SUSPENDED' ? 'suspended' : user.status === 'ACTIVE' ? 'active' : 'inactive',
      userType: user.userType || 'FREE',
      totalLogins,
      collegeName: user.collegeName || undefined,
      createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
      lastLogin,
      courses: coursesWithProgress,
      payments,
      interviews,
      totalIncome
    }

    return NextResponse.json({
      success: true,
      data: userDetails
    })

  } catch (error) {
    console.error('User details API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user details' },
      { status: 500 }
    )
  }
}
