/**
 * Session Check API Route
 *
 * Returns current session information including user details and role
 * Used by frontend to check authentication status and user role
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import jwt from 'jsonwebtoken'

interface SessionUserWithRole {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
}

interface DecodedToken {
  userId?: string
  email?: string
  name?: string
  role?: string
  collegeId?: string
  collegeName?: string
  type?: string
  iat?: number
  exp?: number
}

export async function GET(request: NextRequest) {
  try {
    // First, try to get NextAuth session
    const session = await getServerSession(authOptions)

    if (session?.user) {
      // NextAuth session exists
      return NextResponse.json({
        authenticated: true,
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          role: (session.user as SessionUserWithRole).role
        },
        provider: 'nextauth'
      })
    }

    // If no NextAuth session, check for college JWT tokens (student or admin)
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7)

      try {
        console.log('Verifying JWT token...')
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as DecodedToken
        console.log('Decoded token:', { type: decoded.type, role: decoded.role, hasUserId: !!decoded.userId, hasCollegeId: !!decoded.collegeId })

        // Check if it's a college student token
        if (decoded.type === 'college_student' && decoded.userId) {
          console.log('Valid college student token found')
          return NextResponse.json({
            authenticated: true,
            user: {
              id: decoded.userId,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              collegeId: decoded.collegeId,
              collegeName: decoded.collegeName
            },
            provider: 'college_jwt'
          })
        }

        // Check if it's a college student token
        if (decoded.type === 'college_student' && decoded.userId) {
          console.log('Valid college student token found')
          return NextResponse.json({
            authenticated: true,
            user: {
              id: decoded.userId,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              collegeId: decoded.collegeId,
              collegeName: decoded.collegeName
            },
            provider: 'college_student_jwt'
          })
        }

        // Check if it's a college admin token (now uses userId like regular users)
        if (decoded.type === 'college_admin' && decoded.userId) {
          console.log('Valid college admin token found')
          return NextResponse.json({
            authenticated: true,
            user: {
              id: decoded.userId,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              collegeId: decoded.collegeId,
              collegeName: decoded.collegeName
            },
            provider: 'college_admin_jwt'
          })
        }

        console.log('Token type not recognized:', decoded.type)
      } catch (error) {
        // Token is invalid or expired
        console.error('JWT verification failed:', error)
        return NextResponse.json({
          authenticated: false,
          error: 'Invalid token',
          user: null,
          provider: null
        })
      }
    }

    // No valid authentication found
    return NextResponse.json({
      authenticated: false,
      user: null,
      provider: null
    })

  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { error: 'Failed to check session' },
      { status: 500 }
    )
  }
}
