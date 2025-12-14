import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
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