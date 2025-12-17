/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { verifyCollegeToken } from '@/lib/auth-utils';
import { getCEFRLevel } from '@/app/dashboard/foreign-lang/config';

const prisma = new PrismaClient();

interface ComprehensionQuestion {
  type: 'comprehension';
  data: {
    id: string;
    passage: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    order: number;
  };
}

interface RearrangeQuestion {
  type: 'rearrange';
  data: {
    id: string;
    scrambledWords: string[];
    correctOrder: string[];
    explanation: string;
    order: number;
  };
}

type ReadingQuestion = ComprehensionQuestion | RearrangeQuestion;

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Just check if the session exists without authentication for HEAD requests
    const readingSession = await prisma.readingSession.findUnique({
      where: { id: sessionId },
      select: { id: true } // Only select ID for existence check
    });

    if (readingSession) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 404 });
    }
  } catch (error) {
    console.error('Error checking reading session existence:', error);
    return new Response(null, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Authentication check - support both NextAuth and JWT
    const session = await getServerSession(authOptions);
    let userId: string | null = null;

    // Check NextAuth session first
    if (session?.user?.id) {
      userId = session.user.id;
    } else {
      // Check for college JWT token
      const authHeader = request.headers.get('authorization');
      console.log('Reading session GET: Auth header present:', !!authHeader);
      if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const jwt = await import('jsonwebtoken');
        try {
          const decoded = jwt.default.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any;
          console.log('Reading session GET: JWT decoded type:', decoded.type);

          // Check if it's a college student or admin token
          if ((decoded.type === 'college_student' || decoded.type === 'college_admin') && decoded.userId) {
            userId = decoded.userId;
            console.log('Reading session GET: JWT user authenticated:', userId);
          }
        } catch (error) {
          console.error('Reading session GET: JWT verification failed:', error);
        }
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch reading session with all related data
    const readingSession = await prisma.readingSession.findUnique({
      where: { id: sessionId },
      include: {
        comprehensionData: true,
        rearrangingData: true,
        language: true,
      }
    });

    if (!readingSession) {
      return NextResponse.json(
        { success: false, error: 'Reading session not found' },
        { status: 404 }
      );
    }

    // Structure the response data
    const questions: ReadingQuestion[] = [];

    // Add comprehension questions
    if (readingSession.comprehensionData && readingSession.comprehensionData.length > 0) {
      readingSession.comprehensionData.forEach((comp, index) => {
        questions.push({
          type: 'comprehension',
          data: {
            id: comp.id,
            passage: comp.passage,
            question: comp.question,
            options: comp.options,
            correctAnswer: comp.correctAnswer,
            explanation: comp.explanation,
            order: comp.order
          }
        });
      });
    }

    // Add rearranging questions
    if (readingSession.rearrangingData && readingSession.rearrangingData.length > 0) {
      readingSession.rearrangingData.forEach((rearrange, index) => {
        questions.push({
          type: 'rearrange',
          data: {
            id: rearrange.id,
            scrambledWords: rearrange.scrambledWords,
            correctOrder: rearrange.correctOrder,
            explanation: rearrange.explanation,
            order: rearrange.order
          }
        });
      });
    }

    // Get CEFR level details from config
    const cefrLevelDetails = getCEFRLevel(readingSession.cefrLevel);

    return NextResponse.json({
      success: true,
      data: {
        session: {
          id: readingSession.id,
          title: readingSession.title,
          sessionType: readingSession.sessionType,
          timeLimit: readingSession.timeLimit,
          language: readingSession.language,
          cefrLevel: cefrLevelDetails || { level: readingSession.cefrLevel, name: readingSession.cefrLevel }
        },
        questions: questions.sort((a, b) => a.data.order - b.data.order)
      }
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}