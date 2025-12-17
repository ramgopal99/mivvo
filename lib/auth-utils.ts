import type { UserData, SessionData } from "@/app/dashboard/types"
import jwt from 'jsonwebtoken'

/**
 * Get authentication headers for API requests
 */
export const getAuthHeaders = (includeContentType = true): Record<string, string> => {
  const headers: Record<string, string> = {}

  if (includeContentType) {
    headers['Content-Type'] = 'application/json'
  }

  // Check for NextAuth session token
  const nextAuthToken = typeof window !== 'undefined' ? (
    localStorage.getItem('next-auth.session-token') ||
    localStorage.getItem('__Secure-next-auth.session-token')
  ) : null
  if (nextAuthToken) {
    headers['Authorization'] = `Bearer ${nextAuthToken}`
  }

  // Check for JWT tokens (college students/admins) - updated token names
  const jwtToken = typeof window !== 'undefined' ? (
    localStorage.getItem('token') ||
    localStorage.getItem('student_token') ||
    localStorage.getItem('college_token')
  ) : null
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`
  }

  return headers
}

/**
 * Parse user data from localStorage for college students
 */
export const getUserDataFromStorage = (): UserData | null => {
  try {
    const storedUserData = localStorage.getItem('user_data')
    if (!storedUserData) return null

    const parsedUserData = JSON.parse(storedUserData)
    if (parsedUserData && parsedUserData.id) {
      return {
        id: parsedUserData.id,
        name: parsedUserData.name,
        email: parsedUserData.email,
        role: parsedUserData.role,
        college: parsedUserData.college ? {
          id: parsedUserData.college.id || parsedUserData.college,
          name: parsedUserData.college.name || parsedUserData.college,
          collegeId: parsedUserData.college.collegeId || parsedUserData.college.id || parsedUserData.college
        } : undefined
      }
    }
  } catch (error) {
    console.error('Error parsing college student data:', error)
  }
  return null
}

/**
 * Get user data based on authentication method
 */
export const getUserData = (session: SessionData | null, status: string): UserData | null => {
  // First priority: NextAuth session data (for Google OAuth users)
  if (status === 'authenticated' && session?.user) {
    return {
      id: session.user.id!,
      name: session.user.name || 'User',
      email: session.user.email!,
      college: undefined // NextAuth users don't have college data
    }
  }

  // Second priority: College student data from localStorage
  if (status !== 'loading') {
    return getUserDataFromStorage()
  }

  return null
}

/**
 * Verify college JWT token and return college data
 */
export async function verifyCollegeToken(token: string) {
  try {
    // Check if token is empty or null
    if (!token || token.trim() === '') {
      return null
    }

    // Decode token exactly like the session API does
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as {
      type?: string
      role?: string
      userId?: string
      collegeId?: string
      name?: string
      email?: string
      [key: string]: unknown
    }

    // Check if it's a college admin token (exactly like session API)
    if (decoded.type === 'college_admin' && decoded.userId) {
      // Get collegeId from user relationship (same as session API)
      const { prisma } = await import('@/lib/prisma')
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { collegeId: true }
      })

      if (!user || !user.collegeId) {
        return null
      }

      // Get college data
      const college = await prisma.college.findUnique({
        where: { id: user.collegeId }
      })

      if (!college) {
        return null
      }

      return college
    }

    return null
  } catch (error) {
    console.error('College token verification error:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}
