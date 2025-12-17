import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
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

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessionId = (await params).sessionId;

    // Get speaking session with attempts and results
    const speakingSession = await prisma.speakingSession.findUnique({
      where: { id: sessionId },
      include: {
        attempts: {
          where: { userId: userId },
          include: {
            overallResult: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
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
      id: speakingSession.id,
      title: speakingSession.title,
      language: speakingSession.languageId === 'ENGLISH' ? 'english' : 'french',
      cefrLevel: speakingSession.cefrLevel,
      createdAt: speakingSession.createdAt,
      attempts: speakingSession.attempts.map(attempt => ({
        id: attempt.id,
        startedAt: attempt.startedAt,
        completedAt: attempt.completedAt,
        duration: attempt.duration,
        status: attempt.status,
        createdAt: attempt.createdAt,
        results: attempt.overallResult ? [{
          id: attempt.overallResult.id,
          duration: attempt.duration,
          feedback: attempt.overallResult.feedback,
          fluencyScore: attempt.overallResult.fluencyScore,
          pronunciationScore: attempt.overallResult.pronunciationScore,
          vocabularyScore: attempt.overallResult.vocabularyScore,
          grammarScore: attempt.overallResult.grammarScore,
          overallScore: attempt.overallResult.overallScore,
          overallFeedback: attempt.overallResult.overallFeedback,
          strengths: attempt.overallResult.strengths,
          weaknesses: attempt.overallResult.weaknesses,
          recommendations: attempt.overallResult.recommendations,
          totalWords: attempt.overallResult.totalWords,
          averageAudioDuration: attempt.overallResult.averageAudioDuration,
          createdAt: attempt.overallResult.createdAt
        }] : []
      }))
    };

    return NextResponse.json({
      success: true,
      data: sessionData
    });
  } catch (error) {
    console.error('Error fetching speaking session results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch speaking session results' },
      { status: 500 }
    );
  }
}
