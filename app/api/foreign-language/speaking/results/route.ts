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

interface SpeakingResult {
  sessionId: string; // This is the question ID
  userAnswer: string;
  wordCount: number;
  timeSpent: number;
  audioDuration?: number;
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

    const { results, sessionId }: { results: SpeakingResult[], sessionId: string } = await request.json();

    if (!results || !Array.isArray(results) || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.log('=== PROCESSING SPEAKING RESULTS ===');
    console.log('Processing speaking results for sessionId:', sessionId);
    console.log('Results count:', results.length);
    if (results.length > 0) {
      console.log('Sample result:', results[0]);
    }

    // Find the speaking session
    const speakingSession = await prisma.speakingSession.findUnique({
      where: { id: sessionId },
      include: { questions: true }
    });

    if (!speakingSession) {
      return NextResponse.json(
        { success: false, error: 'Speaking session not found' },
        { status: 404 }
      );
    }

    // Calculate total duration and start time
    const totalTimeSpent = results.reduce((sum, result) => sum + result.timeSpent, 0);
    const completedAt = new Date();
    const startedAt = new Date(completedAt.getTime() - (totalTimeSpent * 1000));

    // Create speaking attempt
    const attemptId = `speaking-attempt-${sessionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await prisma.speakingAttempt.create({
      data: {
        id: attemptId,
        userId: userId,
        sessionId: speakingSession.id,
        languageId: speakingSession.languageId,
        status: 'COMPLETED',
        startedAt: startedAt,
        completedAt: completedAt,
        duration: totalTimeSpent,
      }
    });

    // Process speaking results
    const speakingQuestions = speakingSession.questions || [];
    console.log('Processing speaking results for', results.length, 'results');
    console.log('Speaking questions available:', speakingQuestions.length);

    for (const result of results) {
      // Find the question by ID (result.sessionId should be the question ID)
      const question = speakingQuestions.find(q => q.id === result.sessionId);
      console.log('Processing result for questionId:', result.sessionId, 'found question:', !!question);
      console.log('Result data:', {
        sessionId: result.sessionId,
        userAnswer: result.userAnswer,
        userAnswerType: typeof result.userAnswer,
        userAnswerLength: result.userAnswer?.length,
        wordCount: result.wordCount,
        timeSpent: result.timeSpent
      });

      if (question) {
        await prisma.speakingResult.create({
          data: {
            attemptId: attemptId,
            questionId: question.id,
            userAnswer: result.userAnswer || "",
            wordCount: typeof result.wordCount === 'number' ? result.wordCount : 0,
            timeSpent: typeof result.timeSpent === 'number' ? result.timeSpent : 0,
            audioDuration: result.audioDuration || null,
            confidence: 0.8 // Default confidence, could be improved with actual speech recognition
          }
        });
        console.log('Saved speaking result for question:', question.id, 'wordCount:', result.wordCount);
      } else {
        console.log('Question not found for result:', result.sessionId);
      }
    }

    // Calculate overall results
    const savedSpeakingResults = await prisma.speakingResult.findMany({
      where: { attemptId }
    });

    const totalWords = savedSpeakingResults.reduce((sum, r) => sum + r.wordCount, 0);
    const averageAudioDuration = savedSpeakingResults.length > 0
      ? savedSpeakingResults.reduce((sum, r) => sum + (r.audioDuration || 0), 0) / savedSpeakingResults.length
      : 0;

    // Get CEFR level info for context
    const cefrLevel = speakingSession.cefrLevel;
    const levelInfo = getCEFRLevel(cefrLevel);

    // Generate AI-powered analysis for speaking performance
    const analysisPrompt = `
ANALYZE THIS SPEAKING PRACTICE SESSION BASED ON QUESTIONS AND RESPONSES:

SESSION SUMMARY:
- Total Words Spoken: ${totalWords}
- Average Audio Duration: ${Math.round(averageAudioDuration)} seconds per response
- Total Time Spent: ${Math.round(totalTimeSpent / 60)} minutes
- Number of Responses: ${savedSpeakingResults.length}
- CEFR Level: ${cefrLevel} (${levelInfo?.name || 'Unknown'})

CRITICAL ANALYSIS REQUIREMENTS:
1. Compare each RESPONSE to its corresponding QUESTION
2. Evaluate if the response ANSWERS the question appropriately
3. Assess content relevance, completeness, and accuracy
4. Evaluate language quality: fluency, pronunciation, vocabulary, grammar
5. Penalize responses that don't address the question asked
6. Give low scores for irrelevant or off-topic answers

EVALUATION CRITERIA:
- **Content/Relevance**: Does the response actually answer the question?
- **Fluency**: How smoothly and continuously the speech flows
- **Pronunciation**: Clarity and correctness of spoken sounds
- **Vocabulary**: Appropriate word choice and range
- **Grammar**: Accuracy of sentence structures and grammar

SCORE GUIDELINES:
- 90-100: Excellent - directly answers question + good language
- 70-89: Good - mostly relevant + decent language quality
- 50-69: Fair - somewhat relevant or language issues
- 30-49: Poor - minimally relevant or major language problems
- 0-29: Very Poor - irrelevant answer or severe language issues

REQUIRED JSON RESPONSE FORMAT:
{
  "fluencyScore": 75,
  "pronunciationScore": 80,
  "vocabularyScore": 70,
  "grammarScore": 85,
  "overallScore": 78,
  "strengths": ["Good fluency in connected speech", "Clear pronunciation of most words"],
  "weaknesses": ["Response was not relevant to the question asked", "Limited vocabulary range"],
  "recommendations": ["Ensure answers directly address the questions", "Focus on expanding vocabulary"],
  "overallFeedback": "Performance needs improvement - responses must be relevant to questions asked."
}
`;

    let fluencyScore = 70;
    let pronunciationScore = 75;
    let vocabularyScore = 65;
    let grammarScore = 80;
    let overallScore = 73;
    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];
    let overallFeedback = `Overall speaking performance with ${totalWords} words spoken in ${savedSpeakingResults.length} responses.`;

    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      // Get sample responses for analysis (limit to avoid token limits)
      const sampleResults = savedSpeakingResults.slice(0, 3); // Get 3 samples for better analysis
      console.log('Sample results for AI analysis:', sampleResults.map(r => ({
        id: r.id,
        userAnswer: r.userAnswer,
        wordCount: r.wordCount,
        timeSpent: r.timeSpent
      })));

      let sampleResponsesText = '';
      if (sampleResults.length > 0) {
        sampleResponsesText = '\n\nQUESTION-RESPONSE PAIRS FOR ANALYSIS:\n' +
          sampleResults.map((r, i) => {
            // Find the corresponding question for this result
            const question = speakingQuestions.find(q => q.id === r.questionId);
            return `PAIR ${i+1}:
QUESTION: "${question?.question || 'Question not found'}"
RESPONSE (${r.wordCount} words, ${r.timeSpent}s): "${r.userAnswer || 'No response recorded'}"`;
          }).join('\n\n');
      } else {
        sampleResponsesText = '\n\nQUESTION-RESPONSE PAIRS FOR ANALYSIS:\nNo responses available for analysis.';
      }

      // Add more detailed analysis instructions
      const detailedAnalysisInstructions = `
IMPORTANT ANALYSIS REQUIREMENTS:
- Analyze the ACTUAL spoken responses provided above
- Consider word count, speaking time, and content quality
- If responses are empty or minimal, note lack of speaking
- If responses show actual speech, evaluate fluency, vocabulary, grammar
- Be specific about what was observed in the responses
- Don't give generic feedback - base analysis on the real data`;

      const enhancedPrompt = analysisPrompt + sampleResponsesText + detailedAnalysisInstructions +
        '\n\nCRITICAL REQUIREMENTS:\n' +
        '- COMPARE each response to its question - penalize irrelevant answers heavily\n' +
        '- Give LOW scores (0-40) for responses that don\'t address the question\n' +
        '- Content relevance is MORE important than language quality\n' +
        '- If responses are completely off-topic, mention "Response not relevant to question" in weaknesses\n' +
        '- Respond with ONLY a valid JSON object in the exact format specified above. No other text.';

      console.log('=== SENDING TO OPENAI FOR ANALYSIS ===');
      console.log('Total words in session:', totalWords);
      console.log('Number of responses:', savedSpeakingResults.length);
      console.log('Sample responses being analyzed:', sampleResults.length);
      console.log('Full prompt being sent to OpenAI:');
      console.log(enhancedPrompt.substring(0, 500) + '...[truncated]');

      const analysisResponse = await openai.chat.completions.create({
        model: practiceConfig.openai.model,
        messages: [{ role: 'user', content: enhancedPrompt }],
        temperature: practiceConfig.openai.temperature,
        max_tokens: practiceConfig.openai.maxTokens,
      });

      const responseContent = analysisResponse.choices[0].message.content || '{}';
      console.log('=== OPENAI ANALYSIS RESPONSE ===');
      console.log('Raw AI response:', responseContent);

      let jsonContent = responseContent;
      const jsonStart = responseContent.indexOf('{');
      const jsonEnd = responseContent.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonContent = responseContent.substring(jsonStart, jsonEnd + 1);
      }
      console.log('Extracted JSON content:', jsonContent);

      const analysisData = JSON.parse(jsonContent);

      if (typeof analysisData.fluencyScore === 'number') fluencyScore = Math.min(100, Math.max(0, analysisData.fluencyScore));
      if (typeof analysisData.pronunciationScore === 'number') pronunciationScore = Math.min(100, Math.max(0, analysisData.pronunciationScore));
      if (typeof analysisData.vocabularyScore === 'number') vocabularyScore = Math.min(100, Math.max(0, analysisData.vocabularyScore));
      if (typeof analysisData.grammarScore === 'number') grammarScore = Math.min(100, Math.max(0, analysisData.grammarScore));
      if (typeof analysisData.overallScore === 'number') overallScore = Math.min(100, Math.max(0, analysisData.overallScore));

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
      // AI analysis is mandatory - fail the entire request if it doesn't work
      throw new Error(`AI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Create overall result with AI analysis data
    console.log('=== SAVING SPEAKING OVERALL RESULT ===');
    console.log('Analysis scores:', { fluencyScore, pronunciationScore, vocabularyScore, grammarScore, overallScore });
    console.log('Analysis feedback:', { overallFeedback, strengths, weaknesses, recommendations });
    console.log('Session stats:', { totalWords, averageAudioDuration, timeSpent: totalTimeSpent });

    await prisma.speakingOverallResult.create({
      data: {
        attemptId: attemptId,
        fluencyScore,
        pronunciationScore,
        vocabularyScore,
        grammarScore,
        overallScore,
        feedback: `You completed ${savedSpeakingResults.length} speaking exercises in ${Math.round(totalTimeSpent / 60)} minutes, speaking ${totalWords} words total.`,
        overallFeedback,
        strengths,
        weaknesses,
        recommendations,
        totalWords,
        averageAudioDuration,
        timeSpent: totalTimeSpent
      }
    });

    console.log('✅ Speaking overall result saved successfully with AI analysis');

    // Update user level progress
    const currentLevel = speakingSession.cefrLevel;
    const skillType = 'SPEAKING';

    const existingProgress = await prisma.userLevelProgress.findFirst({
      where: {
        userId: userId,
        languageId: speakingSession.languageId,
        cefrLevel: currentLevel,
        skillType: skillType
      }
    });

    const allAttempts = await prisma.speakingAttempt.findMany({
      where: {
        userId: userId,
        languageId: speakingSession.languageId,
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
            languageId: speakingSession.languageId,
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
        totalWords,
        feedback: {
          fluencyScore,
          pronunciationScore,
          vocabularyScore,
          grammarScore,
          strengths,
          weaknesses,
          recommendations,
          overallFeedback
        }
      }
    });
  } catch (error) {
    console.error('Error saving speaking practice results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save speaking practice results' },
      { status: 500 }
    );
  }
}
