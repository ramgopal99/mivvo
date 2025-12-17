import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import OpenAI from 'openai';
import { practiceConfig, getCEFRLevel, type CEFRLevelDefinition } from '@/app/dashboard/foreign-lang/config';
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
    const { category } = body;

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

    // Find user's current MCQ level for this language
    const userProgress = await prisma.userLevelProgress.findMany({
      where: {
        userId: userId,
        languageId: languageConfig.id,
        skillType: 'MCQ'
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

    // Determine session type based on category
    const sessionType = category ? category.toUpperCase() : 'MIXED';

    // Generate MCQ questions based on category or config counts
    const questions = [];

    if (category) {
      // Generate questions for specific category
      const count = 1; // Default 1 question for specific category
      for (let i = 0; i < count; i++) {
        const questionPrompt = generateQuestionPrompt(category, targetLanguage, levelInfo);

        const questionResponse = await openai.chat.completions.create({
          model: practiceConfig.openai.model,
          messages: [{ role: 'user', content: questionPrompt }],
          temperature: practiceConfig.openai.temperature,
          max_tokens: practiceConfig.openai.maxTokens,
        });

        const questionData = JSON.parse(questionResponse.choices[0].message.content || '{}');
        questionData.category = category.toUpperCase().replace('-', '_');
        questions.push(questionData);
      }
    } else {
      // Generate questions for each topic based on config counts
      const mcqConfig = practiceConfig.questionCounts.mcq;

      // Generate questions for each topic
      const topics = [
        { name: 'grammar', count: mcqConfig.grammar },
        { name: 'error-detection', count: mcqConfig['error-detection'] },
        { name: 'synonyms-antonyms', count: mcqConfig['synonyms-antonyms'] },
        { name: 'sentence-completion', count: mcqConfig['sentence-completion'] },
        { name: 'word-replacement', count: mcqConfig['word-replacement'] },
      ];

      for (const topic of topics) {
        for (let i = 0; i < topic.count; i++) {
          const questionPrompt = generateQuestionPrompt(topic.name, targetLanguage, levelInfo);

          const questionResponse = await openai.chat.completions.create({
            model: practiceConfig.openai.model,
            messages: [{ role: 'user', content: questionPrompt }],
            temperature: practiceConfig.openai.temperature,
            max_tokens: practiceConfig.openai.maxTokens,
          });

          const questionData = JSON.parse(questionResponse.choices[0].message.content || '{}');
          questionData.category = topic.name.toUpperCase().replace('-', '_');
          questions.push(questionData);
        }
      }
    }

    // Create MCQ session
    const sessionId = `mcq-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const mcqSession = await prisma.mcqSession.create({
      data: {
        id: sessionId,
        title: `${targetLanguage} MCQ Practice - ${currentLevel} Level`,
        sessionType: sessionType as 'MIXED' | 'VOCABULARY' | 'GRAMMAR' | 'ERROR_DETECTION' | 'SYNONYMS_ANTONYMS' | 'SENTENCE_COMPLETION' | 'WORD_REPLACEMENT',
        languageId: languageConfig.id,
        cefrLevel: currentLevel,
        timeLimit: practiceConfig.timeLimits.mcq,
      }
    });

    // Create questions
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      await prisma.mcqQuestion.create({
        data: {
          sessionId: mcqSession.id,
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          category: question.category,
          order: i + 1
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: mcqSession.id,
        level: currentLevel,
        language: languageConfig,
        questions: questions.map((q, index) => ({
          id: `question-${index + 1}`,
          question: q.question,
          options: q.options,
          category: q.category,
          explanation: q.explanation
        }))
      }
    });
  } catch (error) {
    console.error('Error generating MCQ practice:', error);

    // Provide specific error message for OpenAI API issues
    let errorMessage = 'Failed to generate MCQ practice';
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'OpenAI API key is not configured properly';
      } else if (error.message.includes('quota') || error.message.includes('billing')) {
        errorMessage = 'OpenAI API quota exceeded or billing issue';
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'OpenAI API rate limit exceeded';
      }
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}


function generateQuestionPrompt(category: string, targetLanguage: string, levelInfo: CEFRLevelDefinition): string {
  const categoryPrompts = {
    grammar: `
Generate a grammar MCQ question for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Grammar Focus: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create a question testing grammar knowledge appropriate for ${levelInfo.level} level
- Create 4 options (A, B, C, D) with one correct answer
- Include a brief explanation for the correct answer
- Use grammar structures appropriate for ${levelInfo.level} level
- Make options plausible but clearly distinguishable
`,
    'error-detection': `
Generate an error detection MCQ question for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Grammar Focus: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create a sentence with one grammatical error
- Create 4 options showing different parts of the sentence
- Only one option should contain the error
- Include a brief explanation of the error
- Use grammar structures appropriate for ${levelInfo.level} level
`,
    'synonyms-antonyms': `
Generate a synonyms/antonyms MCQ question for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Vocabulary Focus: ${levelInfo.vocabulary}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create a question asking for synonym or antonym of a word
- Create 4 options (A, B, C, D) with one correct answer
- Include a brief explanation for the correct answer
- Use vocabulary appropriate for ${levelInfo.level} level
- Test understanding of word relationships
`,
    'sentence-completion': `
Generate a sentence completion MCQ question for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Grammar Focus: ${levelInfo.grammar}
- Vocabulary Focus: ${levelInfo.vocabulary}

Requirements:
- Create a sentence with one missing word
- Create 4 options (A, B, C, D) with one correct answer
- Include a brief explanation for the correct answer
- Use grammar and vocabulary appropriate for ${levelInfo.level} level
- Test grammar structures, word forms, or collocations
`,
    'word-replacement': `
Generate a word replacement MCQ question for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Grammar Focus: ${levelInfo.grammar}
- Vocabulary Focus: ${levelInfo.vocabulary}

Requirements:
- Create a sentence with one incorrect word
- Create 4 options showing different words that could replace the incorrect one
- Only one option should be the correct replacement
- Include a brief explanation of why it's correct
- Use grammar and vocabulary appropriate for ${levelInfo.level} level
`
  };

  const basePrompt = categoryPrompts[category as keyof typeof categoryPrompts] || categoryPrompts.grammar;

  return basePrompt + `

Format your response as JSON:
{
  "question": "The question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Explanation for why this is correct..."
}`;
}
