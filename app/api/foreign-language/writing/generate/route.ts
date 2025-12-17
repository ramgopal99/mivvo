import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import OpenAI from 'openai';
import { practiceConfig, getCEFRLevel } from '@/app/dashboard/foreign-lang/config';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export async function POST(request: NextRequest) {
  try {
    const userId = await authenticateUser(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    let { language } = body;

    // If no language specified, use user's preferred language
    if (!language) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { preferredLanguage: true }
      });
      language = user?.preferredLanguage || 'ENGLISH';
    }

    // Get or create language config
    let languageConfig = await prisma.languageConfig.findUnique({
      where: { language },
    });

    // If language config doesn't exist, create it
    if (!languageConfig) {
      const languageData = {
        ENGLISH: { name: 'English', code: 'en' },
        FRENCH: { name: 'French', code: 'fr' }
      };

      const langInfo = languageData[language as keyof typeof languageData];
      if (!langInfo) {
        return NextResponse.json(
          { success: false, error: 'Unsupported language' },
          { status: 400 }
        );
      }

      languageConfig = await prisma.languageConfig.create({
        data: {
          language,
          name: langInfo.name,
          code: langInfo.code,
          isActive: true
        }
      });
    }

    // Find user's current writing level for this language
    const userProgress = await prisma.userLevelProgress.findMany({
      where: {
        userId: userId,
        languageId: languageConfig.id,
        skillType: 'WRITING'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Determine current level (highest incomplete level or lowest level if no progress)
    let currentLevel = 'A1';
    if (userProgress.length > 0) {
      // Sort progress by CEFR level order (A1, A2, B1, etc.)
      const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const sortedProgress = userProgress.sort((a, b) =>
        levelOrder.indexOf(b.cefrLevel) - levelOrder.indexOf(a.cefrLevel)
      );

      for (const progress of sortedProgress) {
        if (!progress.isCompleted) {
          currentLevel = progress.cefrLevel;
          break;
        }
      }
    }

    const levelInfo = getCEFRLevel(currentLevel);
    if (!levelInfo) {
      return NextResponse.json(
        { success: false, error: 'Invalid CEFR level configuration' },
        { status: 500 }
      );
    }
    const targetLanguage = language === 'ENGLISH' ? 'English' : 'French';

    // Get generation counts from config
    const writingConfig = practiceConfig.questionCounts.writing;
    const topicsCount = writingConfig.topics;
    const chatCount = writingConfig.chat;

    // Generate writing topics
    const writingTopics = [];
    for (let i = 0; i < topicsCount; i++) {
      const writingPrompt = `
Generate 1 writing topic for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Vocabulary: ${levelInfo.vocabulary}
- Grammar: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create one writing topic appropriate for ${levelInfo.level} level
- The topic should include a clear title, description, and detailed instructions
- Topic should encourage creative writing and practical communication
- Word limit should be appropriate for ${levelInfo.level} level (150-300 words)
- Include specific requirements in the instructions

Format your response as JSON:
{
  "topic": "Topic Title Here",
  "description": "Brief description of what to write about",
  "instructions": "Detailed instructions for the writing task",
  "wordLimit": 200
}
`;

    const writingResponse = await openai.chat.completions.create({
      model: practiceConfig.openai.model,
      messages: [{ role: 'user', content: writingPrompt }],
      temperature: practiceConfig.openai.temperature,
      max_tokens: practiceConfig.openai.maxTokens,
    });

      const writingTopic = JSON.parse(writingResponse.choices[0].message.content || '{}');
      writingTopics.push(writingTopic);
    }

    // Generate AI chat scenarios
    const chatScenarios = [];
    for (let i = 0; i < chatCount; i++) {
      const chatPrompt = `
Generate an AI chat scenario for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Vocabulary: ${levelInfo.vocabulary}
- Grammar: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create one realistic chat scenario for practicing ${targetLanguage}
- Choose an everyday situation (shopping, ordering food, making plans, etc.)
- Create a natural initial message from the AI
- Include vocabulary relevant to the scenario and ${levelInfo.level} level
- The scenario should encourage natural conversation and practical language use

Format your response as JSON:
{
  "title": "Scenario Title",
  "description": "Brief description of the scenario",
  "initialMessage": "The AI's opening message in ${targetLanguage}",
  "vocabulary": ["word1", "word2", "word3", "word4", "word5"],
  "context": "Brief context about what kind of conversation this is"
}
`;

      const chatResponse = await openai.chat.completions.create({
        model: practiceConfig.openai.model,
        messages: [{ role: 'user', content: chatPrompt }],
        temperature: practiceConfig.openai.temperature,
        max_tokens: practiceConfig.openai.maxTokens,
      });

      const chatScenario = JSON.parse(chatResponse.choices[0].message.content || '{}');
      chatScenarios.push(chatScenario);
    }

    // Create writing session
    const sessionId = `writing-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const writingSession = await prisma.writingSession.create({
      data: {
        id: sessionId,
        title: `${targetLanguage} Writing Practice - ${currentLevel} Level`,
        sessionType: 'WRITING_COMPREHENSIVE',
        languageId: languageConfig.id,
        cefrLevel: currentLevel,
        timeLimit: practiceConfig.timeLimits.writing,
      }
    });

    // Create writing topics
    const createdTopics = [];
    for (let i = 0; i < writingTopics.length; i++) {
      const createdTopic = await prisma.writingTopic.create({
        data: {
          sessionId: writingSession.id,
          topic: writingTopics[i].topic,
          description: writingTopics[i].description,
          instructions: writingTopics[i].instructions,
          wordLimit: writingTopics[i].wordLimit || 200,
          order: i + 1
        }
      });
      createdTopics.push(createdTopic);
    }

    // Create chat scenarios
    const createdChatScenarios = [];
    for (let i = 0; i < chatScenarios.length; i++) {
      const createdChatScenario = await prisma.writingChatScenario.create({
        data: {
          sessionId: writingSession.id,
          title: chatScenarios[i].title,
          description: chatScenarios[i].description,
          initialMessage: chatScenarios[i].initialMessage,
          vocabulary: chatScenarios[i].vocabulary || [],
          context: chatScenarios[i].context || '',
          order: i + 1
        }
      });
      createdChatScenarios.push(createdChatScenario);
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: writingSession.id,
        level: currentLevel,
        language: languageConfig,
        writingTopics: createdTopics,
        chatScenarios: createdChatScenarios
      }
    });
  } catch (error) {
    console.error('Error generating writing practice:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate writing practice' },
      { status: 500 }
    );
  }
}