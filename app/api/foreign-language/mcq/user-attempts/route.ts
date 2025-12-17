import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { verifyCollegeToken } from '@/lib/auth-utils';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Authentication check - support both NextAuth and JWT
    const session = await getServerSession(authOptions);
    let userId: string | null = null;

    // Check NextAuth session first
    if (session?.user?.id) {
      userId = session.user.id;
    } else {
      // Check for college JWT token
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const jwt = await import('jsonwebtoken');
        const decoded = jwt.default.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any;

        // Check if it's a college student or admin token
        if ((decoded.type === 'college_student' || decoded.type === 'college_admin') && decoded.userId) {
          userId = decoded.userId;
        }
      }
    }

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