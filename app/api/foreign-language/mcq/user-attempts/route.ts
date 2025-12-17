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

export async function GET(request: NextRequest) {
  try {
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');

    // Get MCQ attempts for the user, optionally filtered by language
    let languageConfigId: string | undefined;
    if (language) {
      const languageConfig = await prisma.languageConfig.findUnique({
        where: { language },
        select: { id: true }
      });
      languageConfigId = languageConfig?.id;
    }

    const attempts = await prisma.mcqAttempt.findMany({
      where: {
        userId: userId,
        ...(languageConfigId && {
          session: {
            languageId: languageConfigId
          }
        })
      },
      include: {
        session: {
          select: {
            id: true,
            title: true,
            cefrLevel: true,
            sessionType: true,
            languageId: true
          }
        },
        overallResult: {
          select: {
            overallScore: true,
            totalQuestions: true,
            correctAnswers: true,
            accuracyPercentage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform the data
    const attemptSummaries = attempts.map(attempt => ({
      id: attempt.id,
      sessionId: attempt.session.id,
      sessionTitle: attempt.session.title,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      duration: attempt.duration,
      status: attempt.status,
      overallScore: attempt.overallResult?.overallScore || null,
      totalQuestions: attempt.overallResult?.totalQuestions || null,
      correctAnswers: attempt.overallResult?.correctAnswers || null,
      accuracyPercentage: attempt.overallResult?.accuracyPercentage || null,
      cefrLevel: attempt.session.cefrLevel,
      sessionType: attempt.session.sessionType,
      createdAt: attempt.createdAt
    }));

    return NextResponse.json({
      success: true,
      data: attemptSummaries
    });
  } catch (error) {
    console.error('Error fetching user MCQ attempts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch MCQ attempts' },
      { status: 500 }
    );
  }
}