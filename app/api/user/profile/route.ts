import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { verifyCollegeToken } from '@/lib/auth-utils'

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
      // Decode the JWT token to check its type
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as {
        userId?: string
        type?: string
        role?: string
      }

      // Handle college student tokens
      if (decoded.type === 'college_student' && decoded.userId) {
        return decoded.userId
      }

      // Handle standard JWT tokens
      if (decoded.userId) {
        return decoded.userId
      }
    } catch (error) {
      console.error('JWT verification failed:', error)
    }

    // Try college admin token as fallback
    try {
      const collegeData = await verifyCollegeToken(token)
      if (collegeData) {
        // For college admins, we need to get userId differently
        // This might need additional logic based on how college admin auth works
        return null // College admin handling might need different approach
      }
    } catch (collegeError) {
      console.error('College token verification failed:', collegeError)
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
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true,
        userType: true,
        status: true,
        suspendedAt: true,
        suspendedBy: true,
        suspendReason: true,
        rollNumber: true,
        branch: true,
        course: true,
        courseDuration: true,
        year: true,
        role: true,
        // College relationship
        college: {
          select: {
            id: true,
            name: true,
            collegeId: true
          }
        },
        // Include enrollment data for college students
        studentEnrollment: {
          where: {
            isActive: true
          },
          select: {
            enrollmentDate: true,
            expirationDate: true,
            isActive: true
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

    // Get enrollment data for college students (get the most recent active enrollment)
    let enrollmentData = null

    if (userProfile.studentEnrollment) {
      if (Array.isArray(userProfile.studentEnrollment) && userProfile.studentEnrollment.length > 0) {
        // Sort enrollments by enrollment date descending to get the most recent
        const sortedEnrollments = userProfile.studentEnrollment.sort(
          (a: { enrollmentDate: Date }, b: { enrollmentDate: Date }) =>
            new Date(b.enrollmentDate).getTime() - new Date(a.enrollmentDate).getTime()
        )
        enrollmentData = {
          enrollmentDate: sortedEnrollments[0].enrollmentDate,
          expirationDate: sortedEnrollments[0].expirationDate,
          isActive: sortedEnrollments[0].isActive
        }
      } else if (typeof userProfile.studentEnrollment === 'object' && userProfile.studentEnrollment.enrollmentDate) {
        // Handle as single object (when take: 1 returns a single object instead of array)
        enrollmentData = {
          enrollmentDate: userProfile.studentEnrollment.enrollmentDate,
          expirationDate: userProfile.studentEnrollment.expirationDate,
          isActive: userProfile.studentEnrollment.isActive
        }
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
      totalCreditAllocation: userProfile.totalCreditAllocation,
      usedCredits: userProfile.usedCredits,
      creditResetAt: userProfile.creditResetAt,
      userType: userProfile.userType,
      status: userProfile.status,
      suspendedAt: userProfile.suspendedAt,
      suspendedBy: userProfile.suspendedBy,
      suspendReason: userProfile.suspendReason,
      rollNumber: userProfile.rollNumber,
      branch: userProfile.branch,
      course: userProfile.course,
      courseDuration: userProfile.courseDuration,
      year: userProfile.year,
      role: userProfile.role,
      college: userProfile.college,
      enrollment: enrollmentData
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
