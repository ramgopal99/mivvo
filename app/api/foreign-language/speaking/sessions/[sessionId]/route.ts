import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
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
