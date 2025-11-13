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

    // Find user by collegeAdminId with COLLEGE_ADMIN role
    const user = await prisma.user.findFirst({
      where: {
        collegeAdminId: collegeId,
        role: 'COLLEGE_ADMIN'
      },
      include: {
        college: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid college ID or not a college admin' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.collegeAdminPassword || '')
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Check if associated college is active (if exists)
    if (user.college && !user.college.isActive) {
      return NextResponse.json(
        { error: 'College account is inactive' },
        { status: 403 }
      )
    }

    // Create JWT token for college admin
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        collegeId: user.college?.id,
        collegeName: user.college?.name || user.collegeName,
        role: 'COLLEGE_ADMIN',
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
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          collegeAdminId: user.collegeAdminId,
          collegeName: user.collegeName,
          role: user.role,
          cv: user.cv,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          careerGoals: user.careerGoals,
          linkedIn: user.linkedIn,
          github: user.github
        },
        college: user.college ? {
          id: user.college.id,
          collegeId: user.college.collegeId,
          name: user.college.name,
          description: user.college.description,
          location: user.college.location,
          website: user.college.website,
          phone: user.college.phone,
          establishedYear: user.college.establishedYear,
          isActive: user.college.isActive,
          maxStudents: user.college.maxStudents,
          currentStudents: user.college.currentStudents,
          monthlyRatePerUser: user.college.monthlyRatePerUser,
          billingCycle: user.college.billingCycle
        } : null,
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
