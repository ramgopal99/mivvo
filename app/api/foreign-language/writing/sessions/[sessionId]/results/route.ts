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

    console.log('Fetching writing session:', sessionId, 'for user:', session.user.id);

    // Get the writing session with all attempts and results
    const writingSession = await prisma.writingSession.findUnique({
      where: {
        id: sessionId,
        ...(language && {
          language: {
            name: language.toUpperCase()
          }
        })
      },
      include: {
        language: true,
        attempts: {
          where: {
            userId: session.user.id
          },
          include: {
            topicResults: true,
            chatResults: true,
            overallResult: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    console.log('Found writing session:', !!writingSession);
    if (writingSession) {
      console.log('Session attempts count:', writingSession.attempts.length);
    }

    if (!writingSession) {
      return NextResponse.json({
        success: true,
        data: {
          id: sessionId,
          title: 'Writing Session',
          language: 'english',
          createdAt: new Date(),
          attempts: []
        },
        message: 'No analysis data available for this session'
      });
    }

    // Transform the data to match the expected format
    const sessionData = {
      id: writingSession.id,
      title: writingSession.title,
      language: writingSession.language.name.toLowerCase(),
      createdAt: writingSession.createdAt,
      attempts: writingSession.attempts.map(attempt => ({
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
          topicWritingScore: attempt.overallResult.topicWritingScore,
          aiConversationScore: attempt.overallResult.aiConversationScore,
          feedback: attempt.overallResult.feedback,
          duration: attempt.duration,
          timeSpent: attempt.overallResult.timeSpent,
          creativityScore: attempt.overallResult.creativityScore,
          grammarAccuracy: attempt.overallResult.grammarAccuracy,
          vocabularyUsage: attempt.overallResult.vocabularyUsage,
          conversationFlow: attempt.overallResult.conversationFlow,
          topicCoverage: attempt.overallResult.topicCoverage,
          responseLength: attempt.overallResult.responseLength,
          createdAt: attempt.overallResult.createdAt
        }] : []
      }))
    };

    return NextResponse.json({
      success: true,
      data: sessionData
    });
  } catch (error) {
    console.error('Error fetching writing session results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch writing session results' },
      { status: 500 }
    );
  }
}
