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

    // Find user's current reading level for this language
    const userProgress = await prisma.userLevelProgress.findMany({
      where: {
        userId: userId,
        languageId: languageConfig.id,
        skillType: 'READING'
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
    const readingConfig = practiceConfig.questionCounts.reading;
    const comprehensionCount = readingConfig.comprehension;
    const rearrangeCount = readingConfig.rearrange;

    // Generate reading comprehension questions
    const comprehensionQuestions = [];
    for (let i = 0; i < comprehensionCount; i++) {
      const comprehensionPrompt = `
Generate a reading comprehension question for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Vocabulary: ${levelInfo.vocabulary}
- Grammar: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create a passage of 4-6 sentences appropriate for ${levelInfo.level} level
- Create one multiple-choice question with 4 options (A, B, C, D)
- Only one correct answer
- Include a brief explanation for the correct answer
- Use vocabulary and grammar appropriate for ${levelInfo.level} level

Format your response as JSON:
{
  "passage": "The passage text here...",
  "question": "The question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Explanation for why this is correct..."
}
`;

      const comprehensionResponse = await openai.chat.completions.create({
        model: practiceConfig.openai.model,
        messages: [{ role: 'user', content: comprehensionPrompt }],
        temperature: practiceConfig.openai.temperature,
        max_tokens: practiceConfig.openai.maxTokens,
      });

      const comprehensionData = JSON.parse(comprehensionResponse.choices[0].message.content || '{}');
      comprehensionQuestions.push(comprehensionData);
    }

    // Generate sentence rearrangement tasks
    const rearrangeTasks = [];
    for (let i = 0; i < rearrangeCount; i++) {
      const rearrangePrompt = `
Generate a sentence rearrangement task for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Grammar: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create a meaningful sentence with 6-8 words
- Scramble the words randomly
- Provide the correct word order
- Include a brief explanation of the grammar rules used
- Use grammar structures appropriate for ${levelInfo.level} level

Format your response as JSON:
{
  "scrambledWords": ["word1", "word2", "word3", "word4", "word5", "word6"],
  "correctOrder": ["word1", "word2", "word3", "word4", "word5", "word6"],
  "explanation": "Grammar explanation here..."
}
`;

    const rearrangeResponse = await openai.chat.completions.create({
      model: practiceConfig.openai.model,
      messages: [{ role: 'user', content: rearrangePrompt }],
      temperature: practiceConfig.openai.temperature,
      max_tokens: practiceConfig.openai.maxTokens,
    });

      const rearrangeData = JSON.parse(rearrangeResponse.choices[0].message.content || '{}');
      rearrangeTasks.push(rearrangeData);
    }

    // Create reading session
    const sessionId = `reading-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const readingSession = await prisma.readingSession.create({
      data: {
        id: sessionId,
        title: `${targetLanguage} Reading Practice - ${currentLevel} Level`,
        sessionType: 'READING_COMPREHENSION',
        languageId: languageConfig.id,
        cefrLevel: currentLevel,
        timeLimit: practiceConfig.timeLimits.reading,
      }
    });

    // Create comprehension questions
    const comprehensionRecords = [];
    for (let i = 0; i < comprehensionQuestions.length; i++) {
      const comprehension = await prisma.readingComprehension.create({
        data: {
          sessionId: readingSession.id,
          passage: comprehensionQuestions[i].passage,
          question: comprehensionQuestions[i].question,
          options: comprehensionQuestions[i].options,
          correctAnswer: comprehensionQuestions[i].correctAnswer,
          explanation: comprehensionQuestions[i].explanation,
          order: i + 1
        }
      });
      comprehensionRecords.push(comprehension);
    }

    // Create rearrange tasks
    const rearrangeTasksCreated = [];
    for (let i = 0; i < rearrangeTasks.length; i++) {
      const rearrange = await prisma.readingRearrange.create({
        data: {
          sessionId: readingSession.id,
          scrambledWords: rearrangeTasks[i].scrambledWords,
          correctOrder: rearrangeTasks[i].correctOrder,
          explanation: rearrangeTasks[i].explanation,
          order: i + 1
        }
      });
      rearrangeTasksCreated.push(rearrange);
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: readingSession.id,
        level: currentLevel,
        language: languageConfig,
        questions: [
          ...comprehensionRecords.map(record => ({
            type: 'comprehension',
            data: record
          })),
          ...rearrangeTasksCreated.map(record => ({
            type: 'rearrange',
            data: record
          }))
        ]
      }
    });
  } catch (error) {
    console.error('Error generating reading practice:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate reading practice' },
      { status: 500 }
    );
  }
}