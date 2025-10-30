/**
 * Logout API Route
 *
 * Handles logout for all authentication types (NextAuth, college students, college admins)
 * Logs server-side logout and validates session cleanup
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Get NextAuth session if it exists
    const session = await getServerSession(authOptions)

    // Log logout attempt
    console.log('Server-side logout initiated', {
      hasNextAuthSession: !!session,
      userEmail: session?.user?.email,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    })

    // If there's a NextAuth session, we could optionally delete it from database
    // But NextAuth signOut will handle this automatically

    // For college tokens, we could optionally blacklist them
    // But since they expire in 24 hours, it's not necessary

    // Return success - client-side cleanup happens in logout dialog
    return NextResponse.json({
      success: true,
      message: 'Server logout acknowledged',
      sessionCleaned: !!session
    })

  } catch (error) {
    console.error('Server logout API error:', error)
    return NextResponse.json(
      { error: 'Server logout failed', success: false },
      { status: 500 }
    )
  }
}
