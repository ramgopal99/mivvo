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

    // Create JWT token for college student
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: 'USER', // College students still have USER role
        collegeId: user.collegeId,
        collegeName: user.college.name,
        type: 'college_student'
      },
      process.env.NEXTAUTH_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
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
          firstName: user.firstName,
          lastName: user.lastName,
          rollNumber: user.rollNumber,
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
