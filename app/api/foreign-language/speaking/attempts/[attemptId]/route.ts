import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const attemptId = (await params).attemptId;

    // Get speaking attempt with detailed results
    const attempt = await prisma.speakingAttempt.findUnique({
      where: {
        id: attemptId,
        userId: session.user.id // Ensure user can only access their own attempts
      },
      include: {
        session: {
          include: {
            questions: {
              orderBy: { order: 'asc' }
            },
            language: true // Include language relation
          }
        },
        results: {
          include: {
            question: true
          },
          orderBy: {
            question: {
              order: 'asc'
            }
          }
        },
        overallResult: true
      }
    });

    if (!attempt) {
      return NextResponse.json(
        { success: false, error: 'Speaking attempt not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format
    const attemptData = {
      id: attempt.id,
      sessionId: attempt.session.id,
      sessionTitle: attempt.session.title,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      duration: attempt.duration,
      status: attempt.status,
      cefrLevel: attempt.session.cefrLevel,
      sessionType: attempt.session.sessionType,
      session: {
        id: attempt.session.id,
        title: attempt.session.title,
        cefrLevel: attempt.session.cefrLevel,
        sessionType: attempt.session.sessionType,
        language: attempt.session.language?.name?.toLowerCase() || 'english',
        createdAt: attempt.session.createdAt
      },

      // Questions with user answers
      questions: attempt.session.questions.map(question => {
        const userResult = attempt.results.find(r => r.questionId === question.id);
        return {
          id: question.id,
          question: question.question,
          category: question.category,
          userAnswer: userResult?.userAnswer || null,
          wordCount: userResult?.wordCount || 0,
          timeSpent: userResult?.timeSpent || 0,
          audioDuration: userResult?.audioDuration || null,
          confidence: userResult?.confidence || null
        };
      }),

      // Overall results
      overallResult: attempt.overallResult ? {
        id: attempt.overallResult.id,
        fluencyScore: attempt.overallResult.fluencyScore,
        pronunciationScore: attempt.overallResult.pronunciationScore,
        vocabularyScore: attempt.overallResult.vocabularyScore,
        grammarScore: attempt.overallResult.grammarScore,
        overallScore: attempt.overallResult.overallScore,
        feedback: attempt.overallResult.feedback,
        overallFeedback: attempt.overallResult.overallFeedback,
        strengths: attempt.overallResult.strengths,
        weaknesses: attempt.overallResult.weaknesses,
        recommendations: attempt.overallResult.recommendations,
        totalWords: attempt.overallResult.totalWords,
        averageAudioDuration: attempt.overallResult.averageAudioDuration,
        timeSpent: attempt.overallResult.timeSpent
      } : null
    };

    return NextResponse.json({
      success: true,
      data: attemptData
    });
  } catch (error) {
    console.error('Error fetching speaking attempt details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch speaking attempt details' },
      { status: 500 }
    );
  }
}
