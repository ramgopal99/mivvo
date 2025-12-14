import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessionId = (await params).sessionId;

    // Get MCQ session with attempts and results
    const mcqSession = await prisma.mcqSession.findUnique({
      where: { id: sessionId },
      include: {
        attempts: {
          where: { userId: session.user.id },
          include: {
            overallResult: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!mcqSession) {
      return NextResponse.json(
        { success: false, error: 'MCQ session not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format
    const sessionData = {
      id: mcqSession.id,
      title: mcqSession.title,
      language: mcqSession.languageId === 'ENGLISH' ? 'english' : 'french',
      createdAt: mcqSession.createdAt,
      attempts: mcqSession.attempts.map(attempt => ({
        id: attempt.id,
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt,
        duration: attempt.duration,
        status: attempt.status,
        createdAt: attempt.createdAt,
        results: attempt.overallResult ? [{
          id: attempt.overallResult.id,
          duration: attempt.duration,
          feedback: attempt.overallResult.feedback,
          overallScore: attempt.overallResult.overallScore,
          overallFeedback: attempt.overallResult.overallFeedback,
          strengths: attempt.overallResult.strengths,
          weaknesses: attempt.overallResult.weaknesses,
          recommendations: attempt.overallResult.recommendations,
          totalQuestions: attempt.overallResult.totalQuestions,
          correctAnswers: attempt.overallResult.correctAnswers,
          accuracyPercentage: attempt.overallResult.accuracyPercentage,
          createdAt: attempt.overallResult.createdAt
        }] : []
      }))
    };

    return NextResponse.json({
      success: true,
      data: sessionData
    });
  } catch (error) {
    console.error('Error fetching MCQ session results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch MCQ session results' },
      { status: 500 }
    );
  }
}
