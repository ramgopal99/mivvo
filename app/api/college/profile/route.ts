import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

interface JWTPayload {
  role: string
  collegeId: string
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
    if (decoded.role !== 'COLLEGE') {
      return NextResponse.json(
        { error: 'Access denied. College admin required.' },
        { status: 403 }
      )
    }

    const { name, email, description, location, website, phone, establishedYear } = await request.json()

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'College name and email are required' },
        { status: 400 }
      )
    }

    // Update college profile
    const updatedCollege = await prisma.college.update({
      where: {
        id: decoded.collegeId
      },
      data: {
        name,
        email,
        description,
        location,
        website,
        phone,
        establishedYear: establishedYear ? parseInt(establishedYear) : null,
        updatedAt: new Date()
      }
    })

    // Return updated college data (without sensitive fields)
    const responseData = {
      id: updatedCollege.id,
      collegeId: updatedCollege.collegeId,
      name: updatedCollege.name,
      email: updatedCollege.email,
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
    if (decoded.role !== 'COLLEGE') {
      return NextResponse.json(
        { error: 'Access denied. College admin required.' },
        { status: 403 }
      )
    }

    // Get college profile
    const college = await prisma.college.findUnique({
      where: {
        id: decoded.collegeId
      }
    })

    if (!college) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      )
    }

    // Return college data (without sensitive fields)
    const responseData = {
      id: college.id,
      collegeId: college.collegeId,
      name: college.name,
      email: college.email,
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
