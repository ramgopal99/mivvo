import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import OpenAI from 'openai';
import { practiceConfig, getCEFRLevel } from '@/app/dashboard/foreign-lang/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

interface ReadingResult {
  sessionId: string; // This is the question/task ID
  userAnswer?: string | number | string[];
  isCorrect?: boolean;
  timeSpent: number;
  completedAt: Date;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { results, sessionId }: { results: ReadingResult[], sessionId: string } = await request.json();

    if (!results || !Array.isArray(results) || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.log('=== PROCESSING READING RESULTS ===');
    console.log('Processing reading results for sessionId:', sessionId);
    console.log('Results count:', results.length);
    if (results.length > 0) {
      console.log('Sample result:', results[0]);
    }

    // Find the reading session
    const readingSession = await prisma.readingSession.findUnique({
      where: { id: sessionId },
      include: {
        comprehensionData: true,
        rearrangingData: true,
      }
    });

    if (!readingSession) {
      return NextResponse.json(
        { success: false, error: 'Reading session not found' },
        { status: 404 }
      );
    }

    // Calculate total duration and start time
    const totalTimeSpent = results.reduce((sum, result) => sum + result.timeSpent, 0);
    const completedAt = new Date();
    const startedAt = new Date(completedAt.getTime() - (totalTimeSpent * 1000));

    // Create reading attempt
    const attemptId = `reading-attempt-${sessionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await prisma.readingAttempt.create({
      data: {
        id: attemptId,
        userId: session.user.id,
        sessionId: sessionId,
        languageId: readingSession.languageId,
        status: 'COMPLETED',
        startedAt: startedAt,
        completedAt: completedAt,
        duration: totalTimeSpent,
      }
    });

    // Process results and save to database
    const comprehensionResults: ReadingResult[] = [];
    const rearrangingResults: ReadingResult[] = [];

    for (const result of results) {
      // Check if this result corresponds to a comprehension question
      const comprehensionQuestion = readingSession.comprehensionData?.find(q => q.id === result.sessionId);
      if (comprehensionQuestion) {
        comprehensionResults.push(result);
        continue;
      }

      // Check if this result corresponds to a rearranging task
      const rearrangingTask = readingSession.rearrangingData?.find(t => t.id === result.sessionId);
      if (rearrangingTask) {
        rearrangingResults.push(result);
      }
    }

    // Save comprehension results
    for (const result of comprehensionResults) {
      const question = readingSession.comprehensionData?.find(q => q.id === result.sessionId);
      if (question) {
        await prisma.readingComprehensionResult.create({
          data: {
            attemptId: attemptId,
            questionId: question.id,
            userAnswer: typeof result.userAnswer === 'number' ? result.userAnswer : 0,
            isCorrect: result.isCorrect || false,
            timeSpent: result.timeSpent,
          }
        });
      }
    }

    // Save rearranging results
    for (const result of rearrangingResults) {
      const task = readingSession.rearrangingData?.find(t => t.id === result.sessionId);
      if (task) {
        await prisma.readingRearrangeResult.create({
          data: {
            attemptId: attemptId,
            taskId: task.id,
            userAnswer: Array.isArray(result.userAnswer) ? result.userAnswer : [],
            isCorrect: result.isCorrect || false,
            timeSpent: result.timeSpent,
          }
        });
      }
    }

    // Calculate overall results
    const savedComprehensionResults = await prisma.readingComprehensionResult.findMany({
      where: { attemptId }
    });

    const savedRearrangingResults = await prisma.readingRearrangeResult.findMany({
      where: { attemptId }
    });

    const comprehensionScore = savedComprehensionResults.length > 0
      ? Math.round((savedComprehensionResults.filter(r => r.isCorrect).length / savedComprehensionResults.length) * 100)
      : 0;

    const rearrangingScore = savedRearrangingResults.length > 0
      ? Math.round((savedRearrangingResults.filter(r => r.isCorrect).length / savedRearrangingResults.length) * 100)
      : 0;

    const overallScore = Math.round((comprehensionScore + rearrangingScore) / 2);

    // Get CEFR level info for context
    const cefrLevel = readingSession.cefrLevel;
    const levelInfo = getCEFRLevel(cefrLevel);

    // Generate AI-powered analysis
    const analysisPrompt = `
Analyze this English reading practice session performance and provide personalized feedback:

Session Details:
- Comprehension Score: ${savedComprehensionResults.length > 0 ? Math.round((savedComprehensionResults.filter(r => r.isCorrect).length / savedComprehensionResults.length) * 100) : 0}% (${savedComprehensionResults.filter(r => r.isCorrect).length}/${savedComprehensionResults.length} correct)
- Rearranging Score: ${savedRearrangingResults.length > 0 ? Math.round((savedRearrangingResults.filter(r => r.isCorrect).length / savedRearrangingResults.length) * 100) : 0}% (${savedRearrangingResults.filter(r => r.isCorrect).length}/${savedRearrangingResults.length} correct)
- Overall Score: ${overallScore}%

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
        weaknesses = ["Room for improvement in reading skills"];
        recommendations = ["Practice regularly and focus on weak areas"];
        overallFeedback = `You scored ${overallScore}% overall. With regular practice, you'll see improvement.`;
      }
    }

    // Create overall result
    await prisma.readingOverallResult.create({
      data: {
        attemptId: attemptId,
        overallScore,
        comprehensionScore,
        rearrangingScore,
        feedback: `You completed ${savedComprehensionResults.length} comprehension questions and ${savedRearrangingResults.length} rearranging tasks in ${Math.round(totalTimeSpent / 60)} minutes.`,
        overallFeedback,
        strengths,
        weaknesses,
        recommendations,
        timeSpent: {
          comprehension: savedComprehensionResults.reduce((sum, r) => sum + r.timeSpent, 0),
          rearranging: savedRearrangingResults.reduce((sum, r) => sum + r.timeSpent, 0)
        }
      }
    });

    // Update user level progress
    const currentLevel = readingSession.cefrLevel;
    const skillType = 'READING';

    const existingProgress = await prisma.userLevelProgress.findFirst({
      where: {
        userId: session.user.id,
        languageId: readingSession.languageId,
        cefrLevel: currentLevel,
        skillType: skillType as 'READING' | 'MCQ'
      }
    });

    const allAttempts = await prisma.readingAttempt.findMany({
      where: {
        userId: session.user.id,
        languageId: readingSession.languageId,
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
            userId: session.user.id,
            languageId: readingSession.languageId,
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
        comprehensionScore,
        rearrangingScore
      }
    });
  } catch (error) {
    console.error('Error saving reading practice results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save reading practice results' },
      { status: 500 }
    );
  }
}