import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

/**
 * Authenticate user from NextAuth session or JWT token
 * @param request - NextRequest object
 * @returns User ID if authenticated, null otherwise
 */
async function authenticateUser(request: NextRequest): Promise<string | null> {
  // First, try NextAuth session
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    return session.user.id
  }

  // If no NextAuth session, try JWT token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as { userId?: string }
      if (decoded.userId) {
        return decoded.userId
      }
    } catch (error) {
      console.error('JWT verification failed:', error)
    }
  }

  return null
}

export async function GET(request: NextRequest) {
  try {
    // Verify user authentication (NextAuth or JWT token)
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile data from database
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        jobTitle: true,
        company: true,
        location: true,
        bio: true,
        careerGoals: true,
        linkedIn: true,
        github: true,
        totalTimeAllowance: true,
        usedTimeMinutes: true,
        timeAllowanceResetAt: true,
        rollNumber: true,
        branch: true,
        course: true,
        courseDuration: true,
        year: true,
        // College relationship
        college: {
          select: {
            id: true,
            name: true,
            collegeId: true
          }
        }
      }
    })

    if (!userProfile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Extract first and last name from Google session data if not stored in DB
    let firstName = userProfile.firstName
    let lastName = userProfile.lastName

    if (!firstName && !lastName && userProfile.name) {
      const fullName = userProfile.name.trim()
      const nameParts = fullName.split(' ')

      if (nameParts.length === 1) {
        firstName = nameParts[0]
        lastName = ""
      } else if (nameParts.length >= 2) {
        firstName = nameParts[0]
        lastName = nameParts.slice(1).join(' ')
      }
    }

    const userData = {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      image: userProfile.image,
      createdAt: userProfile.createdAt,
      firstName,
      lastName,
      phone: userProfile.phone,
      dateOfBirth: userProfile.dateOfBirth,
      jobTitle: userProfile.jobTitle,
      company: userProfile.company,
      location: userProfile.location,
      bio: userProfile.bio,
      careerGoals: userProfile.careerGoals,
      linkedIn: userProfile.linkedIn,
      github: userProfile.github,
      totalTimeAllowance: userProfile.totalTimeAllowance,
      usedTimeMinutes: userProfile.usedTimeMinutes,
      timeAllowanceResetAt: userProfile.timeAllowanceResetAt,
      rollNumber: userProfile.rollNumber,
      branch: userProfile.branch,
      course: userProfile.course,
      courseDuration: userProfile.courseDuration,
      year: userProfile.year,
      college: userProfile.college
    }

    return NextResponse.json({
      success: true,
      data: userData
    })

  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
