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

    const { name, description, location, website, phone, establishedYear } = await request.json()

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'College name is required' },
        { status: 400 }
      )
    }

    // Update college profile (email removed from College model)
    const updatedCollege = await prisma.college.update({
      where: {
        id: collegeId
      },
      data: {
        name,
        description,
        location,
        website,
        phone,
        establishedYear: establishedYear ? parseInt(establishedYear) : null,
        updatedAt: new Date()
      }
    })

    // Return updated college data (without sensitive fields - email removed)
    const responseData = {
      id: updatedCollege.id,
      collegeId: updatedCollege.collegeId,
      name: updatedCollege.name,
      description: updatedCollege.description,
      location: updatedCollege.location,
      website: updatedCollege.website,
      phone: updatedCollege.phone,
      establishedYear: updatedCollege.establishedYear,
      isActive: updatedCollege.isActive,
      maxStudents: updatedCollege.maxStudents,
      currentStudents: updatedCollege.currentStudents,
      monthlyRatePerUser: updatedCollege.monthlyRatePerUser,
      billingCycle: updatedCollege.billingCycle
    }

    return NextResponse.json({
      success: true,
      message: 'College profile updated successfully',
      data: responseData
    })

  } catch (error) {
    console.error('College profile update error:', error)

    // Handle unique constraint violations
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email address is already in use by another college' },
        { status: 409 }
      )
    }

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

    // Get college profile
    const college = await prisma.college.findUnique({
      where: {
        id: collegeId
      }
    })

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      )
    }

    // Return college data (without sensitive fields - email removed)
    const responseData = {
      id: college.id,
      collegeId: college.collegeId,
      name: college.name,
      description: college.description,
      location: college.location,
      website: college.website,
      phone: college.phone,
      establishedYear: college.establishedYear,
      isActive: college.isActive,
      maxStudents: college.maxStudents,
      currentStudents: college.currentStudents,
      monthlyRatePerUser: college.monthlyRatePerUser,
      billingCycle: college.billingCycle
    }

    return NextResponse.json({
      success: true,
      data: responseData
    })

  } catch (error) {
    console.error('College profile fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
