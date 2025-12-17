/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { verifyCollegeToken } from '@/lib/auth-utils';

const prisma = new PrismaClient();

// Helper function for dual authentication
async function authenticateUser(request: NextRequest) {
  // Check NextAuth session first
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    return session.user.id;
  }

  // Check for college JWT token
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.default.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any;

    // Check if it's a college student or admin token
    if ((decoded.type === 'college_student' || decoded.type === 'college_admin') && decoded.userId) {
      return decoded.userId;
    }
  }

  return null;
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await authenticateUser(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
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
    const userId = await authenticateUser(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's preferred language
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        preferredLanguage: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        preferredLanguage: user.preferredLanguage || 'ENGLISH' // Default to English
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