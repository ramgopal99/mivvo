/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getCEFRLevel } from '@/app/dashboard/foreign-lang/config';
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { attemptId } = await params;
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');

    // Get the reading attempt with all related data
    const attempt = await prisma.readingAttempt.findUnique({
      where: {
        id: attemptId,
        userId: userId // Ensure user can only access their own attempts
      },
      include: {
        session: {
          include: {
            language: true
          }
        },
        comprehensionResults: {
          include: {
            question: true
          }
        },
        rearrangingResults: {
          include: {
            task: true
          }
        },
        overallResult: true
      }
    });

    if (!attempt) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No analysis data available for this attempt'
      });
    }

    // Transform the data to match the expected format
    const attemptData = {
      id: attempt.id,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      duration: attempt.duration,
      status: attempt.status,
      createdAt: attempt.createdAt,
      session: {
        id: attempt.session.id,
        title: attempt.session.title,
        language: attempt.session.language?.name?.toLowerCase() || 'unknown',
        createdAt: attempt.session.createdAt
      },
      results: attempt.overallResult ? [{
        id: attempt.overallResult.id,
        overallScore: attempt.overallResult.overallScore,
        overallFeedback: attempt.overallResult.overallFeedback,
        strengths: attempt.overallResult.strengths,
        weaknesses: attempt.overallResult.weaknesses,
        recommendations: attempt.overallResult.recommendations,
        comprehensionScore: attempt.overallResult.comprehensionScore,
        rearrangingScore: attempt.overallResult.rearrangingScore,
        feedback: attempt.overallResult.feedback,
        duration: attempt.duration,
        timeSpent: attempt.overallResult.timeSpent,
        createdAt: attempt.overallResult.createdAt
      }] : []
    };

    return NextResponse.json({
      success: true,
      data: attemptData
    });
  } catch (error) {
    console.error('Error fetching reading attempt:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reading attempt' },
      { status: 500 }
    );
  }
}