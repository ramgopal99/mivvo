import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Just check if the session exists without authentication for HEAD requests
    const writingSession = await prisma.writingSession.findUnique({
      where: { id: sessionId },
      select: { id: true } // Only select ID for existence check
    });

    if (writingSession) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 404 });
    }
  } catch (error) {
    console.error('Error checking writing session existence:', error);
    return new Response(null, { status: 500 });
  }
}

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

    const resolvedParams = await params;
    const sessionId = resolvedParams.sessionId;

    // Fetch writing session with topics and chat scenarios
    const writingSession = await prisma.writingSession.findUnique({
      where: { id: sessionId },
      include: {
        topics: {
          orderBy: { order: 'asc' }
        },
        chatScenarios: {
          orderBy: { order: 'asc' }
        },
        language: {
          select: {
            id: true,
            name: true,
            code: true
          }
        }
      }
    });

    if (!writingSession) {
      return NextResponse.json(
        { success: false, error: 'Writing session not found' },
        { status: 404 }
      );
    }

    // Check if user has access to this session (same language as user's preference)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { preferredLanguage: true }
    });

    if (!user?.preferredLanguage) {
      return NextResponse.json(
        { success: false, error: 'User language preference not set' },
        { status: 400 }
      );
    }

    // Transform the data to match the expected format
    const transformedData = {
      sessionId: writingSession.id,
      level: writingSession.cefrLevel,
      language: writingSession.language,
      writingTopics: writingSession.topics.map(topic => ({
        id: topic.id,
        topic: topic.topic,
        description: topic.description,
        instructions: topic.instructions,
        wordLimit: topic.wordLimit
      })),
      chatScenarios: writingSession.chatScenarios.map(scenario => ({
        id: scenario.id,
        title: scenario.title,
        description: scenario.description,
        initialMessage: scenario.initialMessage,
        vocabulary: scenario.vocabulary,
        context: scenario.context
      }))
    };

    return NextResponse.json({
      success: true,
      data: transformedData
    });
  } catch (error) {
    console.error('Error fetching writing session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch writing session' },
      { status: 500 }
    );
  }
}