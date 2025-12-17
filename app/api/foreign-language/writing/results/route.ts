import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { verifyCollegeToken } from '@/lib/auth-utils';
import jwt from 'jsonwebtoken';
import OpenAI from 'openai';
import jwt from 'jsonwebtoken';
import { practiceConfig, getCEFRLevel } from '@/app/dashboard/foreign-lang/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prisma = new PrismaClient();

interface DecodedToken {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
  collegeId?: string;
  collegeName?: string;
  type?: string;
}

interface WritingResult {
  sessionId: string; // This is the topic/scenario ID
  userAnswer?: string | string[];
  timeSpent: number;
  completedAt: Date;
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp?: Date;
}

export async function POST(request: NextRequest) {
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
        try {
          const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as any;

          // Check if it's a college student or admin token
          if ((decoded.type === 'college_student' || decoded.type === 'college_admin') && decoded.userId) {
            userId = decoded.userId;
          }
        } catch (error) {
          console.error('JWT verification failed:', error);
        }
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { results, sessionId }: { results: WritingResult[], sessionId: string } = await request.json();

    if (!results || !Array.isArray(results) || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      );
    }

    console.log('=== PROCESSING WRITING RESULTS ===');
    console.log('Processing writing results for sessionId:', sessionId);
    console.log('Results count:', results.length);
    if (results.length > 0) {
      console.log('Sample result:', results[0]);
    }

    // Find the writing session
    const writingSession = await prisma.writingSession.findUnique({
      where: { id: sessionId },
      include: {
        topics: true,
        chatScenarios: true,
        language: true,
      }
    });

    if (!writingSession) {
      return NextResponse.json(
        { success: false, error: 'Writing session not found' },
        { status: 404 }
      );
    }

    // Calculate total duration and start time
    const totalTimeSpent = results.reduce((sum, result) => sum + result.timeSpent, 0);
    const completedAt = new Date();
    const startedAt = new Date(completedAt.getTime() - (totalTimeSpent * 1000));

    // Create writing attempt
    const attemptId = `writing-attempt-${sessionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await prisma.writingAttempt.create({
      data: {
        id: attemptId,
        userId: userId,
        sessionId: writingSession.id,
        languageId: writingSession.languageId,
        status: 'COMPLETED',
        startedAt: startedAt,
        completedAt: completedAt,
        duration: totalTimeSpent,
      }
    });

    // Process writing results
    const writingTopics = writingSession.topics || [];
    const writingChatScenarios = writingSession.chatScenarios || [];

    for (const result of results) {
      // Check if this result corresponds to a writing topic
      const topic = writingTopics.find(t => t.id === result.sessionId);
      if (topic) {
        await prisma.writingTopicResult.create({
          data: {
            attemptId: attemptId,
            topicId: topic.id,
            userAnswer: typeof result.userAnswer === 'string' ? result.userAnswer : '',
            wordCount: typeof result.userAnswer === 'string' ? result.userAnswer.trim().split(/\s+/).filter(word => word.length > 0).length : 0,
            timeSpent: result.timeSpent,
          }
        });
        continue;
      }

      // Check if this result corresponds to a chat scenario
      const scenario = writingChatScenarios.find(s => s.id === result.sessionId);
      if (scenario) {
        await prisma.writingChatResult.create({
          data: {
            attemptId: attemptId,
            scenarioId: scenario.id,
            conversation: result.userAnswer || [],
            messageCount: Array.isArray(result.userAnswer) ? result.userAnswer.length : 0,
            timeSpent: result.timeSpent,
          }
        });
      }
    }

    // Retrieve saved results for scoring
    const savedWritingTopicResults = await prisma.writingTopicResult.findMany({
      where: { attemptId }
    });

    const savedWritingChatResults = await prisma.writingChatResult.findMany({
      where: { attemptId }
    });

    console.log('Found topic results:', savedWritingTopicResults.length, 'chat results:', savedWritingChatResults.length);
    console.log('Session topics count:', writingSession.topics?.length || 0);

    // For writing sessions, calculate scores based on content quality and engagement
    console.log('=== STARTING WRITING SCORE CALCULATION ===');
    const totalTopics = writingSession.topics?.length || 0;
    const totalScenarios = writingSession.chatScenarios?.length || 0;
    console.log('Total topics:', totalTopics, 'total scenarios:', totalScenarios);

    // Topic writing score based on content quality and completion
    let topicScoreSum = 0;
    let validTopics = 0;
    let topicWritingScore = 0;

    savedWritingTopicResults.forEach(result => {
      console.log('Processing topic result:', {
        userAnswer: result.userAnswer?.substring(0, 50) + '...',
        wordCount: result.wordCount,
        hasContent: !!(result.userAnswer && result.userAnswer.trim().length > 0)
      });

      if (result.userAnswer && result.userAnswer.trim().length > 0) {
        // Has content - check word count and quality
        const wordCount = typeof result.wordCount === 'number' ? result.wordCount :
                         (result.wordCount && typeof result.wordCount === 'object' && 'toString' in result.wordCount) ?
                         parseInt(String(result.wordCount)) : 0;
        const hasMinimumWords = wordCount >= 10; // Minimum 10 words
        const hasGoodLength = wordCount >= 50; // Good length (50+ words)

        let topicScore = 30; // Base score for having content

        if (hasMinimumWords) topicScore += 30; // +30 for minimum words
        if (hasGoodLength) topicScore += 40; // +40 for good length

        topicScoreSum += Math.min(topicScore, 100); // Cap at 100
        validTopics++;
        console.log('Added topic score:', topicScore, 'total so far:', topicScoreSum);
      } else {
        console.log('No content in topic, score remains 0');
      }
      // If no content, score remains 0 for this topic
    });

    topicWritingScore = totalTopics > 0 && validTopics > 0
      ? Math.round(topicScoreSum / totalTopics)
      : 0;

    console.log('Final topic writing score:', topicWritingScore, 'from', validTopics, 'valid topics out of', totalTopics);

    // AI conversation score based on message quality and engagement
    let chatScoreSum = 0;
    let validChats = 0;
    let aiConversationScore = 0;

    savedWritingChatResults.forEach(result => {
      if (result.conversation && Array.isArray(result.conversation) && result.conversation.length > 0) {
        // Has conversation messages
        const conversation = result.conversation as unknown[];
        const userMessages = conversation.filter((msg: unknown): msg is ChatMessage =>
          msg !== null &&
          typeof msg === 'object' &&
          'sender' in msg &&
          'message' in msg &&
          (msg as ChatMessage).sender === 'user' &&
          typeof (msg as ChatMessage).message === 'string' &&
          (msg as ChatMessage).message.trim().length > 0
        );

        const messageCount = userMessages.length;
        const hasMinimumMessages = messageCount >= 2; // At least 2 messages
        const hasGoodEngagement = messageCount >= 4; // Good engagement (4+ messages)

        let chatScore = 20; // Base score for having conversation

        if (hasMinimumMessages) chatScore += 30; // +30 for minimum messages
        if (hasGoodEngagement) chatScore += 50; // +50 for good engagement

        // Check message quality (average length)
        const avgMessageLength = userMessages.reduce((sum: number, msg) =>
          sum + msg.message.length, 0) / userMessages.length;

        if (avgMessageLength > 20) chatScore += Math.min(20, Math.floor((avgMessageLength - 20) / 5)); // Bonus for longer messages

        chatScoreSum += Math.min(chatScore, 100); // Cap at 100
        validChats++;
      }
      // If no conversation, score remains 0 for this chat
    });

    aiConversationScore = totalScenarios > 0 && validChats > 0
      ? Math.round(chatScoreSum / totalScenarios)
      : 0;

    const overallScore = Math.round((topicWritingScore + aiConversationScore) / 2);

    // Calculate timing data
    const savedTotalTimeSpent = savedWritingTopicResults.reduce((sum, r) => sum + r.timeSpent, 0) +
                               savedWritingChatResults.reduce((sum, r) => sum + r.timeSpent, 0);

    // Get CEFR level info for context
    const cefrLevel = writingSession.cefrLevel;
    const levelInfo = getCEFRLevel(cefrLevel);
    const targetLanguage = writingSession.language?.name || 'English';

    // Get sample content for language analysis
    const sampleTopicContent = savedWritingTopicResults
      .filter(r => r.userAnswer && r.userAnswer.trim().length > 0)
      .slice(0, 2) // Get first 2 topic responses
      .map(r => r.userAnswer?.substring(0, 300) || '') // Limit to 300 chars each
      .join('\n\n');

    const sampleChatContent = savedWritingChatResults
      .filter(r => r.conversation && Array.isArray(r.conversation))
      .slice(0, 1) // Get first chat conversation
      .map(r => {
        const conversation = r.conversation as unknown[];
        const userMessages = conversation.filter((msg: unknown): msg is ChatMessage =>
          msg !== null &&
          typeof msg === 'object' &&
          'sender' in msg &&
          'message' in msg &&
          (msg as ChatMessage).sender === 'user' &&
          typeof (msg as ChatMessage).message === 'string'
        ).slice(0, 3); // Get first 3 user messages
        return userMessages.map(msg => msg.message).join(' | ');
      })
      .join('\n\n');

    // Generate AI-powered analysis
    const analysisPrompt = `
Analyze this ${targetLanguage} writing practice session performance and provide personalized feedback:

Session Details:
- Topic Writing Score: ${topicWritingScore}% (${validTopics}/${totalTopics} topics completed)
- AI Conversation Score: ${aiConversationScore}% (${validChats}/${totalScenarios} conversations completed)
- Overall Score: ${overallScore}%

Level Context:
- CEFR Level: ${cefrLevel} (${levelInfo?.name || 'Unknown'})
- Target Language: ${targetLanguage}

Sample User Content for Analysis:
${sampleTopicContent ? `Topic Writing Sample: ${sampleTopicContent}` : 'No topic writing samples available'}
${sampleChatContent ? `Chat Conversation Sample: ${sampleChatContent}` : 'No chat conversation samples available'}

Please provide detailed analysis in the following JSON format. Only include items that are genuinely relevant and specific to their performance:
{
  "strengths": ["Only include real strengths demonstrated in their performance - leave empty [] if none"],
  "weaknesses": ["Only include actual areas needing improvement - leave empty [] if none"],
  "recommendations": ["Only include specific, actionable recommendations - leave empty [] if no improvement needed"],
  "overallFeedback": "A comprehensive paragraph summarizing their performance and next steps",
  "creativityScore": 0,
  "grammarAccuracy": 0,
  "vocabularyUsage": 0,
  "conversationFlow": 0,
  "topicCoverage": 0,
  "responseLength": 0
}

Guidelines:
- If they performed well, strengths can be populated but weaknesses might be empty
- If they struggled, weaknesses should be populated but don't force fake strengths
- Only provide recommendations that would genuinely help their specific performance
- Be honest and specific - quality over quantity
- Focus on their actual scores and CEFR level performance
- Rate detailed scores 0-100 based on their actual performance
- CRITICAL: Check language usage - if content is written in a completely different language than ${targetLanguage}, give 0 points for all scores
- If they mix languages or use partial wrong language, give very low scores (0-40 range) and note this as a major weakness
- Language validation takes precedence - wrong language content should receive minimal or zero scores
- Provide all analysis text (feedback, strengths, weaknesses, recommendations) in ${targetLanguage}
`;

    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];
    let overallFeedback = `Overall performance: ${overallScore}% correct answers.`;

    // Detailed scores for writing sessions
    let creativityScore: number | null = null;
    let grammarAccuracy: number | null = null;
    let vocabularyUsage: number | null = null;
    let conversationFlow: number | null = null;
    let topicCoverage: number | null = null;
    let responseLength: number | null = null;

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

      // Extract detailed scores for writing sessions
      creativityScore = typeof analysisData.creativityScore === 'number' ? analysisData.creativityScore : null;
      grammarAccuracy = typeof analysisData.grammarAccuracy === 'number' ? analysisData.grammarAccuracy : null;
      vocabularyUsage = typeof analysisData.vocabularyUsage === 'number' ? analysisData.vocabularyUsage : null;
      conversationFlow = typeof analysisData.conversationFlow === 'number' ? analysisData.conversationFlow : null;
      topicCoverage = typeof analysisData.topicCoverage === 'number' ? analysisData.topicCoverage : null;
      responseLength = typeof analysisData.responseLength === 'number' ? analysisData.responseLength : null;

    } catch (error) {
      console.error('Error generating AI analysis:', error);
      // Fallback to basic analysis if AI fails - no detailed scores
      if (overallScore >= 70) {
        strengths = ["Good overall performance"];
        recommendations = ["Continue practicing to maintain your skills"];
        overallFeedback = `Well done! You achieved ${overallScore}% in writing practice. Keep up the good work.`;
      } else if (validTopics === 0 && validChats === 0) {
        // Check if user provided any content
        const hasWritingContent = savedWritingTopicResults.some(r => r.userAnswer && r.userAnswer.trim().length > 0);
        const hasChatContent = savedWritingChatResults.some(r => r.conversation && Array.isArray(r.conversation) && r.conversation.length > 0);

        if (!hasWritingContent && !hasChatContent) {
          weaknesses = ["No content provided"];
          recommendations = ["Start by writing responses to the topics and engaging in conversations"];
          overallFeedback = `You didn't provide any content for this writing session. Try to write responses and engage in conversations to get feedback.`;
        } else {
          weaknesses = ["Room for improvement in writing skills"];
          recommendations = ["Practice regularly and focus on weak areas"];
          overallFeedback = `You scored ${overallScore}% overall. With regular practice, you'll see improvement.`;
        }
      } else {
        weaknesses = ["Room for improvement in writing skills"];
        recommendations = ["Practice regularly and focus on weak areas"];
        overallFeedback = `You scored ${overallScore}% overall. With regular practice, you'll see improvement.`;
      }
    }

    // Create overall result
    await prisma.writingOverallResult.create({
      data: {
        attemptId: attemptId,
        overallScore,
        topicWritingScore,
        aiConversationScore,
        feedback: `You completed ${savedWritingTopicResults.length} writing topics and ${savedWritingChatResults.length} AI conversations in ${Math.round(savedTotalTimeSpent / 60)} minutes.`,
        overallFeedback,
        strengths,
        weaknesses,
        recommendations,
        timeSpent: {
          topics: savedWritingTopicResults.reduce((sum, r) => sum + r.timeSpent, 0),
          chat: savedWritingChatResults.reduce((sum, r) => sum + r.timeSpent, 0)
        },
        creativityScore,
        grammarAccuracy,
        vocabularyUsage,
        conversationFlow,
        topicCoverage,
        responseLength
      }
    });

    // Update user level progress
    const currentLevel = writingSession.cefrLevel;
    const skillType = 'WRITING';

    const existingProgress = await prisma.userLevelProgress.findFirst({
      where: {
        userId: userId,
        languageId: writingSession.languageId,
        cefrLevel: currentLevel,
        skillType: skillType as 'READING' | 'MCQ' | 'WRITING'
      }
    });

    const allAttempts = await prisma.writingAttempt.findMany({
      where: {
        userId: userId,
        languageId: writingSession.languageId,
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
            languageId: writingSession.languageId,
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
        topicWritingScore,
        aiConversationScore
      }
    });
  } catch (error) {
    console.error('Error saving writing practice results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save writing practice results' },
      { status: 500 }
    );
  }
}
