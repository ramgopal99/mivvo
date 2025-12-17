import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import OpenAI from 'openai';
import { practiceConfig, getCEFRLevel } from '@/app/dashboard/foreign-lang/config';
import jwt from 'jsonwebtoken';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

interface McqResult {
  sessionId: string; // This is the question ID
  userAnswer?: number;
  isCorrect?: boolean;
  timeSpent: number;
  completedAt: Date;
}

export async function POST(request: NextRequest) {
  try {
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { results, sessionId }: { results: McqResult[], sessionId: string } = await request.json();

    if (!results || !Array.isArray(results) || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.log('=== PROCESSING MCQ RESULTS ===');
    console.log('Processing MCQ results for sessionId:', sessionId);
    console.log('Results count:', results.length);
    if (results.length > 0) {
      console.log('Sample result:', results[0]);
    }

    // Find the MCQ session
    const mcqSession = await prisma.mcqSession.findUnique({
      where: { id: sessionId },
      include: { questions: true }
    });

    if (!mcqSession) {
      return NextResponse.json(
        { success: false, error: 'MCQ session not found' },
        { status: 404 }
      );
    }

    // Calculate total duration and start time
    const totalTimeSpent = results.reduce((sum, result) => sum + result.timeSpent, 0);
    const completedAt = new Date();
    const startedAt = new Date(completedAt.getTime() - (totalTimeSpent * 1000));

    // Create MCQ attempt
    const attemptId = `mcq-attempt-${sessionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await prisma.mcqAttempt.create({
      data: {
        id: attemptId,
        userId: userId,
        sessionId: mcqSession.id,
        languageId: mcqSession.languageId,
        status: 'COMPLETED',
        startedAt: startedAt,
        completedAt: completedAt,
        duration: totalTimeSpent,
      }
    });

    // Process MCQ results
    const mcqQuestions = mcqSession.questions || [];
    console.log('Processing MCQ results for', results.length, 'results');
    console.log('MCQ questions available:', mcqQuestions.length);

    for (const result of results) {
      // Find the question by ID (result.sessionId should be the question ID)
      const question = mcqQuestions.find(q => q.id === result.sessionId);
      console.log('Processing result for questionId:', result.sessionId, 'found question:', !!question, 'userAnswer:', result.userAnswer, 'isCorrect:', result.isCorrect);

      if (question) {
        // Handle userAnswer - null if not provided (unanswered)
        const userAnswer = typeof result.userAnswer === 'number' ? result.userAnswer : null;

        await prisma.mcqResult.create({
          data: {
            attemptId: attemptId,
            questionId: question.id,
            userAnswer: userAnswer,
            isCorrect: result.isCorrect || false,
            timeSpent: result.timeSpent,
          }
        });
        console.log('Saved MCQ result for question:', question.id, 'userAnswer:', userAnswer, 'isCorrect:', result.isCorrect || false);
      } else {
        console.log('Question not found for result:', result.sessionId);
      }
    }

    // Calculate overall results
    const savedMcqResults = await prisma.mcqResult.findMany({
      where: { attemptId }
    });

    const totalQuestions = savedMcqResults.length;
    const correctAnswers = savedMcqResults.filter(r => r.isCorrect).length;
    const accuracyPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const overallScore = accuracyPercentage;

    // Get CEFR level info for context
    const cefrLevel = mcqSession.cefrLevel;
    const levelInfo = getCEFRLevel(cefrLevel);

    // Generate AI-powered analysis
    const analysisPrompt = `
Analyze this MCQ practice session performance and provide personalized feedback:

Session Details:
- MCQ Score: ${overallScore}% (${correctAnswers}/${totalQuestions} correct)
- Overall Score: ${overallScore}%
- Total Time Spent: ${Math.round(totalTimeSpent / 60)} minutes
- Average Time Per Question: ${Math.round(totalTimeSpent / savedMcqResults.length)} seconds

Level Context:
- CEFR Level: ${cefrLevel} (${levelInfo?.name || 'Unknown'})

Please provide detailed analysis in the following JSON format. Only include items that are genuinely relevant and specific to their performance:
{
  "strengths": ["Only include real strengths demonstrated in their performance - leave empty [] if none"],
  "weaknesses": ["Only include actual areas needing improvement - leave empty [] if none"],
  "recommendations": ["Only include specific, actionable recommendations - leave empty [] if no improvement needed"],
  "overallFeedback": "A comprehensive paragraph summarizing their performance and next steps"
}

Guidelines:
- If they performed well, strengths can be populated but weaknesses might be empty
- If they struggled, weaknesses should be populated but don't force fake strengths
- Only provide recommendations that would genuinely help their specific performance
- Be honest and specific - quality over quantity
- Focus on their actual scores and CEFR level performance
`;

    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];
    let overallFeedback = `Overall performance: ${overallScore}% correct answers.`;

    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      const analysisResponse = await openai.chat.completions.create({
        model: practiceConfig.openai.model,
        messages: [{ role: 'user', content: analysisPrompt }],
        temperature: practiceConfig.openai.temperature,
        max_tokens: practiceConfig.openai.maxTokens,
      });

      const responseContent = analysisResponse.choices[0].message.content || '{}';

      let jsonContent = responseContent;
      const jsonStart = responseContent.indexOf('{');
      const jsonEnd = responseContent.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonContent = responseContent.substring(jsonStart, jsonEnd + 1);
      }

      const analysisData = JSON.parse(jsonContent);

      if (Array.isArray(analysisData.strengths) && analysisData.strengths.length > 0) {
        strengths = analysisData.strengths.filter((s: string) => typeof s === 'string' && s.trim().length > 0);
      }
      if (Array.isArray(analysisData.weaknesses) && analysisData.weaknesses.length > 0) {
        weaknesses = analysisData.weaknesses.filter((w: string) => typeof w === 'string' && w.trim().length > 0);
      }
      if (Array.isArray(analysisData.recommendations) && analysisData.recommendations.length > 0) {
        recommendations = analysisData.recommendations.filter((r: string) => typeof r === 'string' && r.trim().length > 0);
      }
      if (typeof analysisData.overallFeedback === 'string' && analysisData.overallFeedback.trim().length > 10) {
        overallFeedback = analysisData.overallFeedback.trim();
      }

    } catch (error) {
      console.error('Error generating AI analysis:', error);
      if (overallScore >= 70) {
        strengths = ["Good overall performance"];
        recommendations = ["Continue practicing to maintain your skills"];
        overallFeedback = `Well done! You achieved ${overallScore}% overall. Keep up the good work.`;
      } else {
        weaknesses = ["Room for improvement in MCQ skills"];
        recommendations = ["Practice regularly and focus on weak areas"];
        overallFeedback = `You scored ${overallScore}% overall. With regular practice, you'll see improvement.`;
      }
    }

    // Create overall result
    await prisma.mcqOverallResult.create({
      data: {
        attemptId: attemptId,
        overallScore,
        totalQuestions,
        correctAnswers,
        accuracyPercentage,
        feedback: `You completed ${totalQuestions} MCQ questions in ${Math.round(totalTimeSpent / 60)} minutes.`,
        overallFeedback,
        strengths,
        weaknesses,
        recommendations,
        timeSpent: totalTimeSpent
      }
    });

    // Update user level progress
    const currentLevel = mcqSession.cefrLevel;
    const skillType = 'MCQ';

    const existingProgress = await prisma.userLevelProgress.findFirst({
      where: {
        userId: userId,
        languageId: mcqSession.languageId,
        cefrLevel: currentLevel,
        skillType: skillType as 'READING' | 'MCQ'
      }
    });

    const allAttempts = await prisma.mcqAttempt.findMany({
      where: {
        userId: userId,
        languageId: mcqSession.languageId,
        session: {
          cefrLevel: currentLevel
        }
      },
      include: {
        overallResult: true
      }
    });

    const validAttempts = allAttempts.filter(a => a.overallResult);
    const averageScore = validAttempts.length > 0
      ? validAttempts.reduce((sum, a) => sum + (a.overallResult?.overallScore || 0), 0) / validAttempts.length
      : overallScore;

    const levelConfig = getCEFRLevel(currentLevel);

    if (levelConfig) {
      const targetScore = levelConfig.skillTargetScore;
      const isCompleted = Math.round(averageScore) >= targetScore;

      if (existingProgress) {
        await prisma.userLevelProgress.update({
          where: { id: existingProgress.id },
          data: {
            currentAverageScore: averageScore,
            attemptsCount: { increment: 1 },
            isCompleted,
            lastAttemptAt: new Date(),
            completedAt: isCompleted ? new Date() : null
          }
        });
      } else {
        await prisma.userLevelProgress.create({
          data: {
            userId: userId,
            languageId: mcqSession.languageId,
            cefrLevel: currentLevel,
            skillType: skillType,
            currentAverageScore: averageScore,
            requiredTargetScore: targetScore,
            attemptsCount: 1,
            isCompleted,
            lastAttemptAt: new Date(),
            completedAt: isCompleted ? new Date() : null
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        attemptId,
        overallScore,
        totalQuestions,
        correctAnswers,
        accuracyPercentage
      }
    });
  } catch (error) {
    console.error('Error saving MCQ practice results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save MCQ practice results' },
      { status: 500 }
    );
  }
}