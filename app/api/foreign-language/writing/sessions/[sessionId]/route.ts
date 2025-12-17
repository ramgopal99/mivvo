import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
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

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const userId = await authenticateUser(request)
    if (!userId) {
      return new Response(null, { status: 401 });
    }

    const { sessionId } = await params;

    // Check if the session exists with user authentication
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
    const userId = await authenticateUser(request)
    if (!userId) {
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

    // User is authenticated and session exists - allow access
    // Language preference check removed as it's not required for session access

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