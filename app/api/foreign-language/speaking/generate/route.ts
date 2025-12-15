import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import OpenAI from 'openai';
import { practiceConfig, getCEFRLevel, type CEFRLevelDefinition } from '@/app/dashboard/foreign-lang/config';

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
    const { category } = body;

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

    // Find user's current speaking level for this language
    const userProgress = await prisma.userLevelProgress.findMany({
      where: {
        userId: session.user.id,
        languageId: languageConfig.id,
        skillType: 'SPEAKING'
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

    // Generate speaking questions based on category or config counts
    const questions = [];

    if (category) {
      // Generate questions for specific category
      const count = 1; // Default 1 question for specific category
      for (let i = 0; i < count; i++) {
        const questionPrompt = generateQuestionPrompt(category, targetLanguage, levelInfo);
        const questionData = await generateSpeakingQuestion(questionPrompt);
        questionData.category = category.toUpperCase().replace('-', '_');
        questions.push(questionData);
      }
    } else {
      // Generate questions for each topic based on config counts
      const speakingConfig = practiceConfig.questionCounts.speaking;

      // Generate questions for each topic
      const topics = [
        { name: 'listen-speak', count: speakingConfig['listen-speak'] },
        { name: 'listen-repeat', count: speakingConfig['listen-repeat'] },
      ];

      for (const topic of topics) {
        for (let i = 0; i < topic.count; i++) {
          const questionPrompt = generateQuestionPrompt(topic.name, targetLanguage, levelInfo);
          const questionData = await generateSpeakingQuestion(questionPrompt);
          questionData.category = topic.name.toUpperCase().replace('-', '_');
          questions.push(questionData);
        }
      }
    }

    // Create speaking session
    const sessionId = `speaking-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const speakingSession = await prisma.speakingSession.create({
      data: {
        id: sessionId,
        title: `${targetLanguage} Speaking Practice - ${currentLevel} Level`,
        sessionType: sessionType as 'LISTEN_SPEAK' | 'LISTEN_REPEAT' | 'MIXED',
        languageId: languageConfig.id,
        cefrLevel: currentLevel,
        timeLimit: practiceConfig.timeLimits.speaking,
        totalTimeLimit: practiceConfig.timeLimits.speaking
      }
    });

    // Create questions
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      await prisma.speakingQuestion.create({
        data: {
          sessionId: speakingSession.id,
          question: question.question,
          category: question.category as 'LISTEN_SPEAK' | 'LISTEN_REPEAT',
          order: i + 1
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: speakingSession.id,
        level: currentLevel,
        language: languageConfig,
        questions: questions.map((q, index) => ({
          id: `question-${index + 1}`,
          question: q.question,
          category: q.category
        }))
      }
    });
  } catch (error) {
    console.error('Error generating speaking practice:', error);

    // Provide specific error message for OpenAI API issues
    let errorMessage = 'Failed to generate speaking practice';
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

async function generateSpeakingQuestion(prompt: string): Promise<{ question: string; category: string }> {
  try {
    const response = await openai.chat.completions.create({
      model: practiceConfig.openai.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: practiceConfig.openai.temperature,
      max_tokens: practiceConfig.openai.maxTokens,
    });

    const responseContent = response.choices[0].message.content || '{}';

    // Try to parse as JSON first
    try {
      const jsonResponse = JSON.parse(responseContent);
      return {
        question: jsonResponse.question || 'Please speak about this topic.',
        category: jsonResponse.category || 'LISTEN_SPEAK'
      };
    } catch {
      // If not JSON, use the raw text as question
      return {
        question: responseContent.trim() || 'Please speak about this topic.',
        category: 'LISTEN_SPEAK'
      };
    }
  } catch (error) {
    console.error('Error generating question with AI:', error);
    return {
      question: 'Please speak about a topic that interests you.',
      category: 'LISTEN_SPEAK'
    };
  }
}

function generateQuestionPrompt(category: string, targetLanguage: string, levelInfo: CEFRLevelDefinition): string {
  const categoryPrompts = {
    'listen-speak': `
Generate a listen-and-speak question for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Grammar Focus: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create a question that prompts the learner to speak for at least 30 seconds
- Use vocabulary and grammar appropriate for ${levelInfo.level} level
- Make it conversational and natural
- Focus on topics that encourage extended speaking

Format your response as JSON:
{
  "question": "Your question here?"
}
`,
    'listen-repeat': `
Generate a listen-and-repeat phrase for ${targetLanguage} learners at ${levelInfo.level} level.

Level details:
- Description: ${levelInfo.description}
- Grammar Focus: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Requirements:
- Create a phrase that tests pronunciation and listening skills
- Use vocabulary and grammar appropriate for ${levelInfo.level} level
- Make it clear and pronounceable
- Keep it to 1-2 sentences

Format your response as JSON:
{
  "question": "Phrase to repeat here."
}
`
  };

  return categoryPrompts[category as keyof typeof categoryPrompts] || categoryPrompts['listen-speak'];
}
