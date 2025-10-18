import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { collegeId, password } = await request.json()

    if (!collegeId || !password) {
      return NextResponse.json(
        { error: 'College ID and password are required' },
        { status: 400 }
      )
    }

    // Find college by collegeId
    const college = await prisma.college.findUnique({
      where: { collegeId }
    })

    if (!college) {
      return NextResponse.json(
        { error: 'Invalid college ID' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, college.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Check if college is active
    if (!college.isActive) {
      return NextResponse.json(
        { error: 'College account is inactive' },
        { status: 403 }
      )
    }

    // Create JWT token for college admin
    const token = jwt.sign(
      {
        collegeId: college.id,
        collegeName: college.name,
        role: 'COLLEGE',
        type: 'college_admin'
      },
      process.env.NEXTAUTH_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'College admin login successful',
      data: {
        college: {
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
        },
        token
      }
    })

  } catch (error) {
    console.error('College admin login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
