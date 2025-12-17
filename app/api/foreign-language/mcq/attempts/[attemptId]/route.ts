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

export async function GET(
  request: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  try {
    const userId = await authenticateUser(request)
    if (!userId) {
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
        userId: userId // Ensure user can only access their own attempts
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
