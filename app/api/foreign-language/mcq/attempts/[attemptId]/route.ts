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

    // Get MCQ attempt with detailed results
    const attempt = await prisma.mcqAttempt.findUnique({
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
        { success: false, error: 'MCQ attempt not found' },
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
        language: attempt.session.language?.name?.toLowerCase() || 'english'
      },

      // Questions with user answers
      questions: attempt.session.questions.map(question => {
        const userResult = attempt.results.find(r => r.questionId === question.id);
        return {
          id: question.id,
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          category: question.category,
          userAnswer: userResult?.userAnswer || null,
          isCorrect: userResult?.isCorrect || false,
          timeSpent: userResult?.timeSpent || 0
        };
      }),

      // Overall results
      overallResult: attempt.overallResult ? {
        id: attempt.overallResult.id,
        overallScore: attempt.overallResult.overallScore,
        totalQuestions: attempt.overallResult.totalQuestions,
        correctAnswers: attempt.overallResult.correctAnswers,
        accuracyPercentage: attempt.overallResult.accuracyPercentage,
        feedback: attempt.overallResult.feedback,
        overallFeedback: attempt.overallResult.overallFeedback,
        strengths: attempt.overallResult.strengths,
        weaknesses: attempt.overallResult.weaknesses,
        recommendations: attempt.overallResult.recommendations,
        timeSpent: attempt.overallResult.timeSpent
      } : null
    };

    return NextResponse.json({
      success: true,
      data: attemptData
    });
  } catch (error) {
    console.error('Error fetching MCQ attempt details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch MCQ attempt details' },
      { status: 500 }
    );
  }
}
