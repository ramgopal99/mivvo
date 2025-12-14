import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import OpenAI from 'openai';
import { practiceConfig, getCEFRLevel } from '@/app/dashboard/foreign-lang/config';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
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
        where: { id: session.user.id },
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
        userId: session.user.id,
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

    // Generate reading comprehension question
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

    // Generate sentence rearrangement task
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

    // Create comprehension question
    const comprehension = await prisma.readingComprehension.create({
      data: {
        sessionId: readingSession.id,
        passage: comprehensionData.passage,
        question: comprehensionData.question,
        options: comprehensionData.options,
        correctAnswer: comprehensionData.correctAnswer,
        explanation: comprehensionData.explanation,
        order: 1
      }
    });

    // Create rearrange task
    const rearrange = await prisma.readingRearrange.create({
      data: {
        sessionId: readingSession.id,
        scrambledWords: rearrangeData.scrambledWords,
        correctOrder: rearrangeData.correctOrder,
        explanation: rearrangeData.explanation,
        order: 1
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        sessionId: readingSession.id,
        level: currentLevel,
        language: languageConfig,
        questions: [
          {
            type: 'comprehension',
            data: comprehension
          },
          {
            type: 'rearrange',
            data: rearrange
          }
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