import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        college: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user has college association
    if (!user.collegeId || !user.college) {
      return NextResponse.json(
        { error: 'This account is not associated with a college' },
        { status: 403 }
      )
    }

    // Check if college is active
    if (!user.college.isActive) {
      return NextResponse.json(
        { error: 'College account is inactive' },
        { status: 403 }
      )
    }

    // Verify password (for college students with password auth)
    if (!user.password) {
      return NextResponse.json(
        { error: 'This account uses Google authentication' },
        { status: 403 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create JWT token for college student (expires in 24 hours)
    // Use the actual role from the database (could be COLLEGE_STUDENT or USER)
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role, // Use actual role from database
        collegeId: user.collegeId,
        collegeName: user.college.name,
        type: 'college_student'
      },
      process.env.NEXTAUTH_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'College student login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          jobTitle: user.jobTitle,
          company: user.company,
          location: user.location,
          bio: user.bio,
          cv: user.cv,
          careerGoals: user.careerGoals,
          linkedIn: user.linkedIn,
          github: user.github,
          totalTimeAllowance: user.totalTimeAllowance,
          usedTimeMinutes: user.usedTimeMinutes,
          timeAllowanceResetAt: user.timeAllowanceResetAt,
          rollNumber: user.rollNumber,
          branch: user.branch,
          course: user.course,
          courseDuration: user.courseDuration,
          year: user.year,
          college: {
            id: user.college.id,
            name: user.college.name,
            collegeId: user.college.collegeId
          }
        },
        token
      }
    })

  } catch (error) {
    console.error('College student login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
