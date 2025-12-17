import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');

    // Get speaking attempts for the user, optionally filtered by language
    let languageConfigId: string | undefined;
    if (language) {
      const languageConfig = await prisma.languageConfig.findUnique({
        where: { language },
        select: { id: true }
      });
      languageConfigId = languageConfig?.id;
    }

    const attempts = await prisma.speakingAttempt.findMany({
      where: {
        userId: session.user.id,
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
            fluencyScore: true,
            pronunciationScore: true,
            vocabularyScore: true,
            grammarScore: true,
            totalWords: true,
            averageAudioDuration: true
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
      fluencyScore: attempt.overallResult?.fluencyScore || null,
      pronunciationScore: attempt.overallResult?.pronunciationScore || null,
      vocabularyScore: attempt.overallResult?.vocabularyScore || null,
      grammarScore: attempt.overallResult?.grammarScore || null,
      totalWords: attempt.overallResult?.totalWords || null,
      averageAudioDuration: attempt.overallResult?.averageAudioDuration || null,
      cefrLevel: attempt.session.cefrLevel,
      sessionType: attempt.session.sessionType,
      createdAt: attempt.createdAt
    }));

    return NextResponse.json({
      success: true,
      data: attemptSummaries
    });
  } catch (error) {
    console.error('Error fetching user speaking attempts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch speaking attempts' },
      { status: 500 }
    );
  }
}
