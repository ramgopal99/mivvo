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

export async function POST(request: NextRequest) {
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

    const { monthlyRatePerUser } = await request.json()

    // Validate the rate
    if (typeof monthlyRatePerUser !== 'number' || monthlyRatePerUser < 0) {
      return NextResponse.json(
        { error: 'Monthly rate must be a non-negative number' },
        { status: 400 }
      )
    }

    // Update college monthly rate
    const updatedCollege = await prisma.college.update({
      where: {
        id: collegeId
      },
      data: {
        monthlyRatePerUser,
        updatedAt: new Date()
      }
    })

    // Return updated college data
    const responseData = {
      id: updatedCollege.id,
      collegeId: updatedCollege.collegeId,
      name: updatedCollege.name,
      monthlyRatePerUser: updatedCollege.monthlyRatePerUser,
      billingCycle: updatedCollege.billingCycle
    }

    return NextResponse.json({
      success: true,
      message: 'Monthly rate updated successfully',
      data: responseData
    })

  } catch (error) {
    console.error('College rate update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
