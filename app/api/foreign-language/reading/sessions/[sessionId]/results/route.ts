import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { sessionId } = await params;
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');

    // Get the reading session with all attempts and results
    const readingSession = await prisma.readingSession.findUnique({
      where: {
        id: sessionId,
        ...(language && {
          language: {
            name: language.toUpperCase()
          }
        }),
        language: {
          readingSessions: {
            some: {
              id: sessionId
            }
          }
        }
      },
      include: {
        language: true,
        attempts: {
          where: {
            userId: session.user.id
          },
          include: {
            comprehensionResults: true,
            rearrangingResults: true,
            overallResult: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!readingSession) {
      return NextResponse.json({
        success: true,
        data: {
          id: sessionId,
          title: 'Reading Session',
          language: 'english',
          createdAt: new Date(),
          attempts: []
        },
        message: 'No analysis data available for this session'
      });
    }

    // Transform the data to match the expected format
    const sessionData = {
      id: readingSession.id,
      title: readingSession.title,
      language: readingSession.language.name.toLowerCase(),
      createdAt: readingSession.createdAt,
      attempts: readingSession.attempts.map(attempt => ({
        id: attempt.id,
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt,
        duration: attempt.duration,
        status: attempt.status,
        createdAt: attempt.createdAt,
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
      }))
    };

    return NextResponse.json({
      success: true,
      data: sessionData
    });
  } catch (error) {
    console.error('Error fetching reading session results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reading session results' },
      { status: 500 }
    );
  }
}