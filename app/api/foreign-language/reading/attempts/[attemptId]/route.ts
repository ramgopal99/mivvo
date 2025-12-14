import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getCEFRLevel } from '@/app/dashboard/foreign-lang/config';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
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
        userId: session.user.id, // Ensure user can only access their own attempts
        ...(language && {
          session: {
            language: {
              name: language.toUpperCase()
            }
          }
        })
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