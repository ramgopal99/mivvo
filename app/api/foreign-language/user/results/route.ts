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

interface PracticeResult {
  sessionId: string;
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

    const { results, sessionId }: { results: PracticeResult[], sessionId: string } = await request.json();

    if (!results || !Array.isArray(results) || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.log('=== PROCESSING RESULTS ===');
    console.log('Processing results for sessionId:', sessionId);
    console.log('Results count:', results.length);
    if (results.length > 0) {
      console.log('Sample result:', results[0]);
    }

    // Check if this is a reading or MCQ session
    console.log('Looking for session with ID:', sessionId);
    const readingSession = await prisma.readingSession.findUnique({
      where: { id: sessionId },
      include: {
        comprehensionData: true,
        rearrangingData: true,
      }
    });

    let mcqSession = await prisma.mcqSession.findUnique({
      where: { id: sessionId },
      include: {
        questions: true,
      }
    });

    console.log('Reading session query result:', !!readingSession);
    console.log('MCQ session query result:', !!mcqSession);

    console.log('Reading session found:', !!readingSession);
    console.log('MCQ session found by ID:', !!mcqSession);

    // If not found by sessionId, check if it's an MCQ session by looking for question IDs
    let isMcqSession = !!mcqSession;
    if (!readingSession && !mcqSession) {
      // Check if any result sessionId matches an MCQ question ID
      const questionIds = results.map(r => r.sessionId);
      console.log('Checking question IDs:', questionIds);
      const mcqQuestion = await prisma.mcqQuestion.findFirst({
        where: { id: { in: questionIds } },
        include: { session: true }
      });

      console.log('MCQ question found:', !!mcqQuestion);

      if (mcqQuestion) {
        isMcqSession = true;
        // Fetch the full session with questions
        mcqSession = await prisma.mcqSession.findUnique({
          where: { id: mcqQuestion.sessionId },
          include: { questions: true }
        });
        console.log('MCQ session found by question lookup:', !!mcqSession);
      }
    }

    console.log('Final session type - isMcqSession:', isMcqSession);

    if (!readingSession && !mcqSession) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    // Calculate total duration and start time
    const totalTimeSpent = results.reduce((sum, result) => sum + result.timeSpent, 0);
    const completedAt = new Date();
    const startedAt = new Date(completedAt.getTime() - (totalTimeSpent * 1000));

    let attemptId: string;

    if (isMcqSession && mcqSession) {
      // Create MCQ attempt
      attemptId = `mcq-attempt-${sessionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      await prisma.mcqAttempt.create({
        data: {
          id: attemptId,
          userId: session.user.id,
          sessionId: mcqSession.id,
          languageId: mcqSession.languageId,
          status: 'COMPLETED',
          startedAt: startedAt,
          completedAt: completedAt,
          duration: totalTimeSpent,
        }
      });

      // Process MCQ results - match by question ID instead of index
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
    } else {
      // Create reading attempt
      attemptId = `attempt-${sessionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await prisma.readingAttempt.create({
      data: {
        id: attemptId,
        userId: session.user.id,
        sessionId: sessionId,
          languageId: readingSession!.languageId,
        status: 'COMPLETED',
        startedAt: startedAt,
        completedAt: completedAt,
        duration: totalTimeSpent,
      }
    });

    // Process results and save to database
    // Group results by looking up question/task type from database
    const comprehensionResults: PracticeResult[] = [];
    const rearrangingResults: PracticeResult[] = [];

    for (const result of results) {
      // Check if this result corresponds to a comprehension question
      const comprehensionQuestion = readingSession!.comprehensionData?.find(q => q.id === result.sessionId);
      if (comprehensionQuestion) {
        comprehensionResults.push(result);
        continue;
      }

      // Check if this result corresponds to a rearranging task
      const rearrangingTask = readingSession!.rearrangingData?.find(t => t.id === result.sessionId);
      if (rearrangingTask) {
        rearrangingResults.push(result);
      }
    }

    // Save comprehension results
    for (const result of comprehensionResults) {
      const question = readingSession!.comprehensionData?.find(q => q.id === result.sessionId);
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
      const task = readingSession!.rearrangingData?.find(t => t.id === result.sessionId);
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
    }

    // Calculate overall results
    let overallScore: number;
    let totalQuestions: number;
    let correctAnswers: number;
    let accuracyPercentage: number;
    let comprehensionScore = 0;
    let rearrangingScore = 0;

    // Declare variables that will be used in timing calculations
    let savedMcqResults: Awaited<ReturnType<typeof prisma.mcqResult.findMany>> = [];
    let savedComprehensionResults: Awaited<ReturnType<typeof prisma.readingComprehensionResult.findMany>> = [];
    let savedRearrangingResults: Awaited<ReturnType<typeof prisma.readingRearrangeResult.findMany>> = [];

    if (isMcqSession) {
      savedMcqResults = await prisma.mcqResult.findMany({
        where: { attemptId }
      });

      totalQuestions = savedMcqResults.length;
      correctAnswers = savedMcqResults.filter(r => r.isCorrect).length;
      accuracyPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
      overallScore = accuracyPercentage;
    } else {
      savedComprehensionResults = await prisma.readingComprehensionResult.findMany({
      where: { attemptId }
    });

      savedRearrangingResults = await prisma.readingRearrangeResult.findMany({
      where: { attemptId }
    });

    // Calculate scores
      comprehensionScore = savedComprehensionResults.length > 0
      ? Math.round((savedComprehensionResults.filter(r => r.isCorrect).length / savedComprehensionResults.length) * 100)
      : 0;

      rearrangingScore = savedRearrangingResults.length > 0
      ? Math.round((savedRearrangingResults.filter(r => r.isCorrect).length / savedRearrangingResults.length) * 100)
      : 0;

      overallScore = Math.round((comprehensionScore + rearrangingScore) / 2);
      totalQuestions = savedComprehensionResults.length + savedRearrangingResults.length;
      correctAnswers = savedComprehensionResults.filter(r => r.isCorrect).length + savedRearrangingResults.filter(r => r.isCorrect).length;
      accuracyPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    }

    // Calculate timing data
    let savedTotalTimeSpent: number;
    let avgTimePerQuestion: number;

    if (isMcqSession) {
      savedTotalTimeSpent = savedMcqResults.reduce((sum, r) => sum + r.timeSpent, 0);
      avgTimePerQuestion = savedTotalTimeSpent / savedMcqResults.length;
    } else {
      savedTotalTimeSpent = savedComprehensionResults.reduce((sum, r) => sum + r.timeSpent, 0) +
                               savedRearrangingResults.reduce((sum, r) => sum + r.timeSpent, 0);
      avgTimePerQuestion = savedTotalTimeSpent / (savedComprehensionResults.length + savedRearrangingResults.length);
    }

    // Get CEFR level info for context
    const cefrLevel = isMcqSession && mcqSession ? mcqSession.cefrLevel : readingSession!.cefrLevel;
    const levelInfo = getCEFRLevel(cefrLevel);

    // Generate AI-powered analysis
    const analysisPrompt = `
Analyze this ${isMcqSession ? 'MCQ' : 'English reading'} practice session performance and provide personalized feedback:

Session Details:
- CEFR Level: ${cefrLevel} (${levelInfo?.name || 'Unknown'})
${isMcqSession ?
  `- MCQ Score: ${overallScore}% (${correctAnswers}/${totalQuestions} correct)` :
  `- Comprehension Score: ${savedComprehensionResults.length > 0 ? Math.round((savedComprehensionResults.filter(r => r.isCorrect).length / savedComprehensionResults.length) * 100) : 0}% (${savedComprehensionResults.filter(r => r.isCorrect).length}/${savedComprehensionResults.length} correct)
- Rearranging Score: ${savedRearrangingResults.length > 0 ? Math.round((savedRearrangingResults.filter(r => r.isCorrect).length / savedRearrangingResults.length) * 100) : 0}% (${savedRearrangingResults.filter(r => r.isCorrect).length}/${savedRearrangingResults.length} correct)`
}
- Overall Score: ${overallScore}%
- Total Time Spent: ${Math.round(savedTotalTimeSpent / 60)} minutes
- Average Time Per Question: ${Math.round(avgTimePerQuestion)} seconds

Level Context:
- Vocabulary Focus: ${levelInfo?.vocabulary || 'General vocabulary'}
- Grammar Focus: ${levelInfo?.grammar || 'General grammar'}
- Complexity: ${levelInfo?.complexity || 'Standard complexity'}

Please provide detailed analysis in the following JSON format. Only include items that are genuinely relevant and specific to their performance - do not make up generic feedback:
{
  "strengths": ["Only include real strengths demonstrated in their performance - leave empty [] if none"],
  "weaknesses": ["Only include actual areas needing improvement - leave empty [] if performing well"],
  "recommendations": ["Only include specific, actionable recommendations - leave empty [] if no improvement needed"],
  "overallFeedback": "A comprehensive paragraph summarizing their performance and next steps"
}

Guidelines:
- If they performed well, strengths can be populated but weaknesses might be empty
- If they struggled, weaknesses should be populated but don't force fake strengths
- Only provide recommendations that would genuinely help their specific performance
- Be honest and specific - quality over quantity
- Focus on their actual scores, timing, and CEFR level performance
`;

    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];
    let overallFeedback = `Overall performance: ${overallScore}% correct answers.`;

    try {
      // Check if OpenAI API key is available
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

      // Try to extract JSON from the response (AI might add extra text)
      let jsonContent = responseContent;
      const jsonStart = responseContent.indexOf('{');
      const jsonEnd = responseContent.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonContent = responseContent.substring(jsonStart, jsonEnd + 1);
      }

      const analysisData = JSON.parse(jsonContent);

      // Validate and assign the data
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
      // Fallback to basic analysis if AI fails
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

    // Only add minimal fallback if AI completely failed to generate meaningful content
    // The AI prompt is designed to generate quality feedback, so we trust its judgment
    if (overallFeedback === `Overall performance: ${overallScore}% correct answers.`) {
      // Only fallback if the AI response was completely unusable
      if (overallScore >= 80) {
        overallFeedback = `Excellent performance with ${overallScore}% accuracy. Keep up the great work!`;
      } else if (overallScore >= 60) {
        overallFeedback = `Good progress with ${overallScore}% accuracy. Continue practicing to improve further.`;
      } else {
        overallFeedback = `You scored ${overallScore}% accuracy. Regular practice will help you improve.`;
      }
    }

    // Create overall result
    if (isMcqSession) {
      await prisma.mcqOverallResult.create({
        data: {
          attemptId: attemptId,
          overallScore,
          totalQuestions,
          correctAnswers,
          accuracyPercentage,
          feedback: `You completed ${totalQuestions} MCQ questions in ${Math.round(savedTotalTimeSpent / 60)} minutes.`,
          overallFeedback,
          strengths,
          weaknesses,
          recommendations,
          timeSpent: savedTotalTimeSpent
        }
      });
    } else {
    await prisma.readingOverallResult.create({
      data: {
        attemptId: attemptId,
        overallScore,
        comprehensionScore,
        rearrangingScore,
        feedback: `You completed ${savedComprehensionResults.length} comprehension questions and ${savedRearrangingResults.length} rearranging tasks in ${Math.round(savedTotalTimeSpent / 60)} minutes.`,
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
    }

    // Update user level progress
    const currentLevel = isMcqSession && mcqSession ? mcqSession.cefrLevel : readingSession!.cefrLevel;
    const skillType = isMcqSession ? 'MCQ' : 'READING';

    // Get existing progress for this level and skill
    const currentLanguageId = isMcqSession && mcqSession ? mcqSession.languageId : readingSession!.languageId;
    const existingProgress = await prisma.userLevelProgress.findFirst({
      where: {
          userId: session.user.id,
        languageId: currentLanguageId,
          cefrLevel: currentLevel,
        skillType: skillType as 'READING' | 'MCQ'
      }
    });

    // Calculate new average score based on skill type
    let allAttempts;

    if (isMcqSession && mcqSession) {
      allAttempts = await prisma.mcqAttempt.findMany({
        where: {
          userId: session.user.id,
          languageId: currentLanguageId,
          session: {
            cefrLevel: currentLevel
          }
        },
        include: {
          overallResult: true
        }
      });
    } else {
      allAttempts = await prisma.readingAttempt.findMany({
      where: {
        userId: session.user.id,
          languageId: currentLanguageId,
        session: {
          cefrLevel: currentLevel
        }
      },
      include: {
        overallResult: true
      }
    });
    }

    const validAttempts = allAttempts.filter(a => a.overallResult);
    const averageScore = validAttempts.length > 0
      ? validAttempts.reduce((sum, a) => sum + (a.overallResult?.overallScore || 0), 0) / validAttempts.length
      : overallScore;

    // Get CEFR level config to determine target score
    const levelConfig = getCEFRLevel(currentLevel);

    if (levelConfig) {
      const targetScore = levelConfig.skillTargetScore;
      const isCompleted = Math.round(averageScore) >= targetScore;

      if (existingProgress) {
        // Update existing progress
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
        // Create new progress entry
        await prisma.userLevelProgress.create({
          data: {
            userId: session.user.id,
            languageId: isMcqSession && mcqSession ? mcqSession.languageId : readingSession!.languageId,
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
        ...(isMcqSession ? {
          totalQuestions,
          correctAnswers,
          accuracyPercentage
        } : {
        comprehensionScore,
        rearrangingScore
        })
      }
    });
  } catch (error) {
    console.error('Error saving practice results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save practice results' },
      { status: 500 }
    );
  }
}