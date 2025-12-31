import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// API endpoint for fetching detailed user information

export async function GET() {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions)

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    // Fetch real statistics from database
    const [
      totalUsers,
      usersWithCourses,
      proUsers,
      totalIncome
    ] = await Promise.all([
      // Total Users
      prisma.user.count(),

      // Users with Courses (users who have at least one course enrollment)
      prisma.user.count({
        where: {
          courseEnrollments: {
            some: {}
          }
        }
      }),

      // PRO Users (users with userType = 'PRO')
      prisma.user.count({
        where: {
          userType: 'PRO'
        }
      }),

      // Total Income (sum of all successful payments)
      prisma.payment.aggregate({
        where: {
          status: 'COMPLETED'
        },
        _sum: {
          amount: true
        }
      }).then(result => result._sum.amount || 0)
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        usersWithCourses,
        proUsers,
        totalIncome: Number(totalIncome)
      }
    })

  } catch (error) {
    console.error('Admin dashboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
