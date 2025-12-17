/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function authenticateUser(request: NextRequest): Promise<string | null> {
  console.log('Authenticating user...')

  // First, try NextAuth session
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    console.log('Using NextAuth session for user:', session.user.id)
    return session.user.id
  }

  // If no NextAuth session, try JWT token from Authorization header
  const authHeader = request.headers.get('authorization')
  console.log('Auth header:', authHeader ? 'present' : 'missing')

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    console.log('JWT token present, attempting verification...')
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as { userId?: string; email?: string }
      console.log('JWT decoded:', { userId: decoded.userId, email: decoded.email })
      if (decoded.userId) {
        console.log('Using JWT token for user:', decoded.userId)
        return decoded.userId
      }
    } catch (error) {
      console.error('JWT verification failed:', error)
    }
  } else {
    console.log('No Bearer token found in authorization header')
  }

  console.log('Authentication failed - returning null')
  return null
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - authentication required to update preferences' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { language } = body;

    if (!language) {
      return NextResponse.json(
        { success: false, error: 'Language is required' },
        { status: 400 }
      );
    }

    // Update user's preferred language
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { preferredLanguage: language },
      select: {
        id: true,
        preferredLanguage: true
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user language preference:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update language preference' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await authenticateUser(request)

    // If authenticated, get user's preferred language
    if (userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
      select: {
        id: true,
        preferredLanguage: true
      }
    });

      if (user) {
    return NextResponse.json({
      success: true,
      data: {
        preferredLanguage: user.preferredLanguage || 'ENGLISH' // Default to English
          }
        });
      }
    }

    // If not authenticated or user not found, return default
    return NextResponse.json({
      success: true,
      data: {
        preferredLanguage: 'ENGLISH' // Default to English for unauthenticated users
      }
    });
  } catch (error) {
    console.error('Error fetching user language preference:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch language preference' },
      { status: 500 }
    );
  }
}