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
    const mcqSession = await prisma.mcqSession.findUnique({
      where: { id: sessionId },
      select: { id: true } // Only select ID for existence check
    });

    if (mcqSession) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 404 });
    }
  } catch (error) {
    console.error('Error checking MCQ session existence:', error);
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

    // Get MCQ session with questions
    const mcqSession = await prisma.mcqSession.findUnique({
      where: { id: sessionId },
      include: {
        questions: {
          orderBy: { order: 'asc' }
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
      sessionId: mcqSession.id,
      level: mcqSession.cefrLevel,
      language: mcqSession.languageId,
      questions: mcqSession.questions.map(question => ({
        type: 'mcq',
        data: {
          id: question.id,
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          category: question.category
        }
      }))
    };

    return NextResponse.json({
      success: true,
      data: sessionData
    });
  } catch (error) {
    console.error('Error fetching MCQ session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch MCQ session' },
      { status: 500 }
    );
  }
}
