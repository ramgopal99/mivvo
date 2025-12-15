import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface DecodedToken {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
  collegeId?: string;
  collegeName?: string;
  type?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    // First, try to get NextAuth session
    const session = await getServerSession(authOptions);
    let userId = session?.user?.id;

    // If no NextAuth session, check for JWT tokens
    if (!userId) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);

        try {
          const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as DecodedToken;

          // Check if it's a college student or admin token
          if ((decoded.type === 'college_student' || decoded.type === 'college_admin') && decoded.userId) {
            userId = decoded.userId;
          }
        } catch (error) {
          console.error('JWT verification failed:', error);
        }
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { attemptId } = await params;


    // Get the writing attempt with all related data
    const attempt = await prisma.writingAttempt.findUnique({
      where: {
        id: attemptId,
        userId: userId // Ensure user can only access their own attempts
      },
      include: {
        session: {
          include: {
            language: true,
            topics: true,
            chatScenarios: true
          }
        },
        topicResults: {
          include: {
            topic: true
          }
        },
        chatResults: {
          include: {
            scenario: true
          }
        },
        overallResult: true
      }
    });

    if (!attempt) {
      return NextResponse.json({
        success: false,
        error: 'Attempt not found'
      }, { status: 404 });
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
        createdAt: attempt.session.createdAt,
        topics: attempt.session.topics.map(topic => ({
          id: topic.id,
          topic: topic.topic,
          description: topic.description,
          instructions: topic.instructions,
          wordLimit: topic.wordLimit
        })),
        chatScenarios: attempt.session.chatScenarios.map(scenario => ({
          id: scenario.id,
          title: scenario.title,
          description: scenario.description,
          initialMessage: scenario.initialMessage,
          vocabulary: scenario.vocabulary,
          context: scenario.context
        }))
      },
      topicResults: attempt.topicResults.map(result => ({
        id: result.id,
        topicId: result.topicId,
        userAnswer: result.userAnswer,
        wordCount: result.wordCount,
        timeSpent: result.timeSpent,
        createdAt: result.createdAt,
        topic: {
          id: result.topic.id,
          topic: result.topic.topic,
          description: result.topic.description,
          instructions: result.topic.instructions,
          wordLimit: result.topic.wordLimit
        }
      })),
      chatResults: attempt.chatResults.map(result => ({
        id: result.id,
        scenarioId: result.scenarioId,
        conversation: result.conversation,
        messageCount: result.messageCount,
        timeSpent: result.timeSpent,
        createdAt: result.createdAt,
        scenario: {
          id: result.scenario.id,
          title: result.scenario.title,
          description: result.scenario.description,
          initialMessage: result.scenario.initialMessage,
          vocabulary: result.scenario.vocabulary,
          context: result.scenario.context
        }
      })),
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
        createdAt: attempt.overallResult.createdAt,
        creativityScore: attempt.overallResult.creativityScore,
        grammarAccuracy: attempt.overallResult.grammarAccuracy,
        vocabularyUsage: attempt.overallResult.vocabularyUsage,
        conversationFlow: attempt.overallResult.conversationFlow,
        topicCoverage: attempt.overallResult.topicCoverage,
        responseLength: attempt.overallResult.responseLength
      }] : []
    };

    return NextResponse.json({
      success: true,
      data: attemptData
    });
  } catch (error) {
    console.error('Error fetching writing attempt:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch writing attempt' },
      { status: 500 }
    );
  }
}