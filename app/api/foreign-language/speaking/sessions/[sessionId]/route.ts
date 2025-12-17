import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { verifyCollegeToken } from '@/lib/auth-utils';

const prisma = new PrismaClient();

export async function HEAD(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = (await params).sessionId;

    // Just check if the session exists without authentication for HEAD requests
    const speakingSession = await prisma.speakingSession.findUnique({
      where: { id: sessionId },
      select: { id: true } // Only select ID for existence check
    });

    if (speakingSession) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 404 });
    }
  } catch (error) {
    console.error('Error checking speaking session existence:', error);
    return new Response(null, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    // Authentication check - support both NextAuth and JWT
    const session = await getServerSession(authOptions);
    let userId: string | null = null;

    // Check NextAuth session first
    if (session?.user?.id) {
      userId = session.user.id;
    } else {
      // Check for college JWT token
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const jwt = await import('jsonwebtoken');
        const decoded = jwt.default.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any;

        // Check if it's a college student or admin token
        if ((decoded.type === 'college_student' || decoded.type === 'college_admin') && decoded.userId) {
          userId = decoded.userId;
        }
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessionId = (await params).sessionId;

    // Get speaking session with questions
    const speakingSession = await prisma.speakingSession.findUnique({
      where: { id: sessionId },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        },
        language: true // Include language relation
      }
    });

    if (!speakingSession) {
      return NextResponse.json(
        { success: false, error: 'Speaking session not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the expected format
    const sessionData = {
      sessionId: speakingSession.id,
      level: speakingSession.cefrLevel,
      language: {
        code: speakingSession.language.code // Return language code like 'en', 'fr'
      },
      questions: speakingSession.questions.map(question => ({
        type: 'speaking',
        data: {
          id: question.id,
          question: question.question,
          category: question.category.toLowerCase(),
          order: question.order
        }
      }))
    };

    return NextResponse.json({
      success: true,
      data: sessionData
    });
  } catch (error) {
    console.error('Error fetching speaking session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch speaking session' },
      { status: 500 }
    );
  }
}
