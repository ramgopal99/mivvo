import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface JWTPayload {
  role: string
  userId?: string
  collegeId?: string
  [key: string]: unknown
}


export async function PUT(request: NextRequest) {
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
    } catch {
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

    // Get current college data (no updates allowed)
    const currentCollege = await prisma.college.findUnique({
      where: { id: collegeId }
    })

    if (!currentCollege) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      )
    }

    // Return current college billing data (read-only)
    const responseData = {
      id: currentCollege.id,
      collegeId: currentCollege.collegeId,
      name: currentCollege.name,
      monthlyRatePerUser: currentCollege.monthlyRatePerUser,
      billingCycle: currentCollege.billingCycle,
      nextBillingDate: currentCollege.nextBillingDate,
      lastBillingAmount: currentCollege.lastBillingAmount
    }

    return NextResponse.json({
      success: true,
      message: 'College billing settings updated successfully',
      data: responseData
    })

  } catch (error) {
    console.error('College billing update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
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
    } catch {
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

    // Get college billing data with associated students count
    const college = await prisma.college.findUnique({
      where: {
        id: collegeId
      },
      include: {
        _count: {
          select: {
            users: true // Count of users associated with this college
          }
        }
      }
    })

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      )
    }

    // Return college billing data
    const responseData = {
      id: college.id,
      collegeId: college.collegeId,
      name: college.name,
      totalAssociatedStudents: college._count.users,
      monthlyRatePerUser: college.monthlyRatePerUser,
      billingCycle: college.billingCycle,
      nextBillingDate: college.nextBillingDate,
      lastBillingAmount: college.lastBillingAmount
    }

    return NextResponse.json({
      success: true,
      data: responseData
    })

  } catch (error) {
    console.error('College billing fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
