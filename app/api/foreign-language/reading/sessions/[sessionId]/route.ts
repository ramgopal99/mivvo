/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCEFRLevel } from '@/app/dashboard/foreign-lang/config';
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

    const { sessionId } = await params;

    // Fetch reading session with all related data
    const session = await prisma.readingSession.findUnique({
      where: { id: sessionId },
      include: {
        comprehensionData: true,
        rearrangingData: true,
        language: true,
      }
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    // Structure the response data
    const questions: ReadingQuestion[] = [];

    // Add comprehension questions
    if (session.comprehensionData && session.comprehensionData.length > 0) {
      session.comprehensionData.forEach((comp, index) => {
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
    if (session.rearrangingData && session.rearrangingData.length > 0) {
      session.rearrangingData.forEach((rearrange, index) => {
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
    const cefrLevelDetails = getCEFRLevel(session.cefrLevel);

    return NextResponse.json({
      success: true,
      data: {
        session: {
          id: session.id,
          title: session.title,
          sessionType: session.sessionType,
          timeLimit: session.timeLimit,
          language: session.language,
          cefrLevel: cefrLevelDetails || { level: session.cefrLevel, name: session.cefrLevel }
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