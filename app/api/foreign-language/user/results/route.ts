/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface MongoObjectId {
  $numberLong: string;
}

interface ChatMessage {
  sender: string;
  message: string;
  timestamp?: Date;
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

    // Check if this is a reading, MCQ, or writing session
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

    const writingSession = await prisma.writingSession.findUnique({
      where: { id: sessionId },
      include: {
        topics: true,
        chatScenarios: true,
      }
    });

    console.log('Reading session query result:', !!readingSession);
    console.log('MCQ session query result:', !!mcqSession);
    console.log('Writing session query result:', !!writingSession);

    console.log('Reading session found:', !!readingSession);
    console.log('MCQ session found by ID:', !!mcqSession);
    console.log('Writing session found by ID:', !!writingSession);

    // If not found by sessionId, check if it's an MCQ session by looking for question IDs
    let isMcqSession = !!mcqSession;
    const isWritingSession = !!writingSession;
    if (!readingSession && !mcqSession && !writingSession) {
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

    console.log('Final session types - isMcqSession:', isMcqSession, 'isWritingSession:', isWritingSession);

    if (!readingSession && !mcqSession && !writingSession) {
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

    if (isWritingSession && writingSession) {
      // Create writing attempt
      attemptId = `writing-attempt-${sessionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      await prisma.writingAttempt.create({
        data: {
          id: attemptId,
          userId: session.user.id,
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
    } else if (isMcqSession && mcqSession) {
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
    let topicWritingScore = 0;
    let aiConversationScore = 0;

    // Declare variables that will be used in timing calculations
    let savedMcqResults: Awaited<ReturnType<typeof prisma.mcqResult.findMany>> = [];
    let savedComprehensionResults: Awaited<ReturnType<typeof prisma.readingComprehensionResult.findMany>> = [];
    let savedRearrangingResults: Awaited<ReturnType<typeof prisma.readingRearrangeResult.findMany>> = [];
    let savedWritingTopicResults: Awaited<ReturnType<typeof prisma.writingTopicResult.findMany>> = [];
    let savedWritingChatResults: Awaited<ReturnType<typeof prisma.writingChatResult.findMany>> = [];

    if (isWritingSession) {
      console.log('=== PROCESSING WRITING SESSION RESULTS ===');
      console.log('Processing writing session results for attemptId:', attemptId);
      savedWritingTopicResults = await prisma.writingTopicResult.findMany({
        where: { attemptId }
      });

      savedWritingChatResults = await prisma.writingChatResult.findMany({
        where: { attemptId }
      });

      console.log('Found topic results:', savedWritingTopicResults.length, 'chat results:', savedWritingChatResults.length);
      console.log('Session topics count:', writingSession!.topics?.length || 0);

      // For writing sessions, calculate scores based on content quality and engagement
      console.log('=== STARTING WRITING SCORE CALCULATION ===');
      const totalTopics = writingSession!.topics?.length || 0;
      const totalScenarios = writingSession!.chatScenarios?.length || 0;
      console.log('Total topics:', totalTopics, 'total scenarios:', totalScenarios);

      // Topic writing score based on content quality and completion
      let topicScoreSum = 0;
      let validTopics = 0;

      savedWritingTopicResults.forEach(result => {
        console.log('Processing topic result:', {
          userAnswer: result.userAnswer?.substring(0, 50) + '...',
          wordCount: result.wordCount,
          hasContent: !!(result.userAnswer && result.userAnswer.trim().length > 0)
        });

        if (result.userAnswer && result.userAnswer.trim().length > 0) {
          // Has content - check word count and quality
          const wordCount = typeof result.wordCount === 'number' ? result.wordCount :
                           (result.wordCount && typeof result.wordCount === 'object' && '$numberLong' in result.wordCount) ?
                           parseInt((result.wordCount as MongoObjectId).$numberLong) : 0;
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
      console.log('topicScoreSum:', topicScoreSum, 'calculation:', totalTopics > 0 && validTopics > 0 ? Math.round(topicScoreSum / totalTopics) : 0);

      // AI conversation score based on message quality and engagement
      let chatScoreSum = 0;
      let validChats = 0;

      savedWritingChatResults.forEach(result => {
        if (result.conversation && Array.isArray(result.conversation) && result.conversation.length > 0) {
          // Has conversation messages
          const conversation = result.conversation as unknown as ChatMessage[];
          const userMessages = conversation.filter((msg: ChatMessage) =>
            msg && typeof msg === 'object' && msg.sender === 'user' && msg.message && msg.message.trim().length > 0
          );

          const messageCount = userMessages.length;
          const hasMinimumMessages = messageCount >= 2; // At least 2 messages
          const hasGoodEngagement = messageCount >= 4; // Good engagement (4+ messages)

          let chatScore = 20; // Base score for having conversation

          if (hasMinimumMessages) chatScore += 30; // +30 for minimum messages
          if (hasGoodEngagement) chatScore += 50; // +50 for good engagement

          // Check message quality (average length)
          const avgMessageLength = userMessages.reduce((sum: number, msg: ChatMessage) =>
            sum + (msg.message?.length || 0), 0) / userMessages.length;

          if (avgMessageLength > 20) chatScore += Math.min(20, Math.floor((avgMessageLength - 20) / 5)); // Bonus for longer messages

          chatScoreSum += Math.min(chatScore, 100); // Cap at 100
          validChats++;
        }
        // If no conversation, score remains 0 for this chat
      });

      aiConversationScore = totalScenarios > 0 && validChats > 0
        ? Math.round(chatScoreSum / totalScenarios)
        : 0;

      overallScore = Math.round((topicWritingScore + aiConversationScore) / 2);
      totalQuestions = totalTopics + totalScenarios;
      correctAnswers = validTopics + validChats; // All completed items count as "correct"
      accuracyPercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    } else if (isMcqSession) {
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
    const cefrLevel = isWritingSession && writingSession ? writingSession.cefrLevel :
                     (isMcqSession && mcqSession ? mcqSession.cefrLevel : readingSession!.cefrLevel);
    const levelInfo = getCEFRLevel(cefrLevel);

    // Generate AI-powered analysis
    const sessionType = isWritingSession ? 'writing' : (isMcqSession ? 'MCQ' : 'reading');

    // Build session details based on type
    let sessionDetails = `- CEFR Level: ${cefrLevel} (${levelInfo?.name || 'Unknown'})\n`;

    // Add user content for writing sessions
    let userContent = '';
    if (isWritingSession) {
      sessionDetails += `- Topics Completed: ${savedWritingTopicResults.length}\n`;
      sessionDetails += `- Conversations Completed: ${savedWritingChatResults.length}\n`;

      // Add user's written responses and conversations for analysis
      userContent += '\nUSER WRITING RESPONSES:\n';
      savedWritingTopicResults.forEach((result, index) => {
        userContent += `Topic ${index + 1}: "${result.userAnswer}"\n`;
      });

      userContent += '\nUSER CONVERSATIONS:\n';
      savedWritingChatResults.forEach((result, index) => {
        userContent += `Conversation ${index + 1}:\n`;
        if (Array.isArray(result.conversation)) {
          result.conversation.forEach(msg => {
            if (msg && typeof msg === 'object' && 'sender' in msg && 'message' in msg) {
              const messageObj = msg as { sender: string; message: string };
              if (messageObj.sender === 'user' && messageObj.message) {
                userContent += `User: ${messageObj.message}\n`;
              }
            }
          });
        }
        userContent += '\n';
      });
    } else if (isMcqSession) {
      sessionDetails += `- MCQ Score: ${overallScore}% (${correctAnswers}/${totalQuestions} correct)\n`;
    } else {
      sessionDetails += `- Comprehension Score: ${savedComprehensionResults.length > 0 ? Math.round((savedComprehensionResults.filter(r => r.isCorrect).length / savedComprehensionResults.length) * 100) : 0}% (${savedComprehensionResults.filter(r => r.isCorrect).length}/${savedComprehensionResults.length} correct)\n`;
      sessionDetails += `- Rearranging Score: ${savedRearrangingResults.length > 0 ? Math.round((savedRearrangingResults.filter(r => r.isCorrect).length / savedRearrangingResults.length) * 100) : 0}% (${savedRearrangingResults.filter(r => r.isCorrect).length}/${savedRearrangingResults.length} correct)\n`;
    }
    sessionDetails += `- Overall Score: ${overallScore}%\n`;
    sessionDetails += `- Total Time Spent: ${Math.round(savedTotalTimeSpent / 60)} minutes\n`;
    sessionDetails += `- Average Time Per Question: ${Math.round(avgTimePerQuestion)} seconds\n`;

    const analysisPrompt = `
Analyze this ${sessionType} practice session performance and provide detailed scores with personalized feedback:

Session Details:
${sessionDetails}
${userContent}
Level Context:
- Vocabulary Focus: ${levelInfo?.vocabulary || 'General vocabulary'}
- Grammar Focus: ${levelInfo?.grammar || 'General grammar'}
- Complexity: ${levelInfo?.complexity || 'Standard complexity'}

${isWritingSession ? `
For WRITING sessions, analyze the user's written responses and conversations to provide:
- creativityScore: Rate creativity and originality in writing (0-100)
- grammarAccuracy: Rate grammatical correctness (0-100)  
- vocabularyUsage: Rate vocabulary richness and appropriateness (0-100)
- conversationFlow: Rate natural conversation flow (0-100)
- topicCoverage: Rate how well topics were addressed (0-100)
- responseLength: Rate appropriate response length (0-100)

Base scores on actual user content provided above.
` : ''}

Please provide detailed analysis in the following JSON format. For WRITING sessions, analyze the actual user content provided above and assign appropriate scores from 0-100 based on quality:

{
  "strengths": ["Only include real strengths demonstrated in their performance - leave empty [] if none"],
  "weaknesses": ["Only include actual areas needing improvement - leave empty [] if performing well"],
  "recommendations": ["Only include specific, actionable recommendations - leave empty [] if no improvement needed"],
  "overallFeedback": "A comprehensive paragraph summarizing their performance and next steps"
  ${isWritingSession ? `,
  "creativityScore": 0,
  "grammarAccuracy": 0,
  "vocabularyUsage": 0,
  "conversationFlow": 0,
  "topicCoverage": 0,
  "responseLength": 0
  ` : ''}
}

Guidelines:
- If they performed well, strengths can be populated but weaknesses might be empty
- If they struggled, weaknesses should be populated but don't force fake strengths
- Only provide recommendations that would genuinely help their specific performance
- Be honest and specific - quality over quantity
- Focus on their actual content, scores, timing, and CEFR level performance
- Return ONLY the JSON object, no additional text or explanations
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
      let jsonContent = responseContent.trim();

      // Try to find JSON object by looking for the first '{' and matching closing '}'
      const jsonStart = jsonContent.indexOf('{');
      if (jsonStart !== -1) {
        let braceCount = 0;
        let jsonEnd = jsonStart;

        for (let i = jsonStart; i < jsonContent.length; i++) {
          if (jsonContent[i] === '{') {
            braceCount++;
          } else if (jsonContent[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              jsonEnd = i;
              break;
            }
          }
        }

        if (braceCount === 0 && jsonEnd > jsonStart) {
          jsonContent = jsonContent.substring(jsonStart, jsonEnd + 1);
        }
      }

      // If we still don't have valid JSON, try to clean it up
      if (!jsonContent.startsWith('{') || !jsonContent.endsWith('}')) {
        // Try to find any JSON-like content
        const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonContent = jsonMatch[0];
        }
      }

      let analysisData;
      try {
        analysisData = JSON.parse(jsonContent);

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

        // Extract detailed scores for writing sessions
        if (isWritingSession) {
          creativityScore = typeof analysisData.creativityScore === 'number' ? analysisData.creativityScore : null;
          grammarAccuracy = typeof analysisData.grammarAccuracy === 'number' ? analysisData.grammarAccuracy : null;
          vocabularyUsage = typeof analysisData.vocabularyUsage === 'number' ? analysisData.vocabularyUsage : null;
          conversationFlow = typeof analysisData.conversationFlow === 'number' ? analysisData.conversationFlow : null;
          topicCoverage = typeof analysisData.topicCoverage === 'number' ? analysisData.topicCoverage : null;
          responseLength = typeof analysisData.responseLength === 'number' ? analysisData.responseLength : null;
        }
      } catch (parseError) {
        console.error('Failed to parse AI analysis response as JSON:', jsonContent);
        // analysisData remains undefined, fallback logic will handle it
      }

    } catch (error) {
      console.error('Error generating AI analysis:', error);
      // Fallback to basic analysis if AI fails - no detailed scores
      const skillType = isWritingSession ? 'writing' : (isMcqSession ? 'MCQ' : 'reading');
      if (overallScore >= 70) {
        strengths = ["Good overall performance"];
        recommendations = ["Continue practicing to maintain your skills"];
        overallFeedback = `Well done! You achieved ${overallScore}% in ${skillType} practice. Keep up the good work.`;
      } else if (isWritingSession) {
        // Check if user provided any content
        const hasWritingContent = savedWritingTopicResults.some(r => r.userAnswer && r.userAnswer.trim().length > 0);
        const hasChatContent = savedWritingChatResults.some(r => r.conversation && Array.isArray(r.conversation) && r.conversation.length > 0);

        if (!hasWritingContent && !hasChatContent) {
          weaknesses = ["No content provided in writing tasks or conversations"];
          recommendations = ["Complete the writing tasks and engage in conversations to receive proper evaluation"];
          overallFeedback = `No content was provided in your writing practice. Please complete the tasks to receive a proper evaluation of your language skills.`;
        } else {
          weaknesses = [`Room for improvement in ${skillType} skills`];
          recommendations = ["Practice regularly and focus on content quality"];
          overallFeedback = `You scored ${overallScore}% in ${skillType} practice. Focus on providing substantive responses to improve your scores.`;
        }
      } else {
        weaknesses = [`Room for improvement in ${skillType} skills`];
        recommendations = ["Practice regularly and focus on weak areas"];
        overallFeedback = `You scored ${overallScore}% in ${skillType} practice. With regular practice, you'll see improvement.`;
      }

      // Detailed scores remain null if AI analysis failed
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
    if (isWritingSession) {
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
    } else if (isMcqSession) {
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
    const currentLevel = isWritingSession && writingSession ? writingSession.cefrLevel :
                        (isMcqSession && mcqSession ? mcqSession.cefrLevel : readingSession!.cefrLevel);
    const skillType = isWritingSession ? 'WRITING' :
                     (isMcqSession ? 'MCQ' : 'READING');

    // Get existing progress for this level and skill
    const currentLanguageId = isWritingSession && writingSession ? writingSession.languageId :
                             (isMcqSession && mcqSession ? mcqSession.languageId : readingSession!.languageId);
    const existingProgress = await prisma.userLevelProgress.findFirst({
      where: {
          userId: session.user.id,
        languageId: currentLanguageId,
          cefrLevel: currentLevel,
        skillType: skillType as 'READING' | 'MCQ' | 'WRITING'
      }
    });

    // Calculate new average score based on skill type
    let allAttempts;

    if (isWritingSession && writingSession) {
      allAttempts = await prisma.writingAttempt.findMany({
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
    } else if (isMcqSession && mcqSession) {
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
            languageId: isWritingSession && writingSession ? writingSession.languageId :
                       (isMcqSession && mcqSession ? mcqSession.languageId : readingSession!.languageId),
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
        ...(isWritingSession ? {
          topicWritingScore,
          aiConversationScore
        } : isMcqSession ? {
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