import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import OpenAI from 'openai';
import { practiceConfig, getCEFRLevel } from '@/app/dashboard/foreign-lang/config';

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

    const { userMessage, conversationHistory, scenario, language, cefrLevel } = await request.json();

    if (!userMessage || !scenario || !language || !cefrLevel) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const levelInfo = getCEFRLevel(cefrLevel);
    if (!levelInfo) {
      return NextResponse.json(
        { success: false, error: 'Invalid CEFR level' },
        { status: 400 }
      );
    }

    const targetLanguage = language === 'ENGLISH' ? 'English' : 'French';

    // Generate AI response using OpenAI
    const responsePrompt = `
You are an AI assistant helping a ${targetLanguage} learner practice conversation at ${levelInfo.level} level.

Scenario Context:
- Title: ${scenario.title}
- Description: ${scenario.description}
${scenario.context ? `- Context: ${scenario.context}` : ''}
- Relevant vocabulary: ${scenario.vocabulary?.join(', ') || 'general conversation'}

Language Level Details:
- Level: ${levelInfo.level}
- Description: ${levelInfo.description}
- Vocabulary: ${levelInfo.vocabulary}
- Grammar: ${levelInfo.grammar}
- Complexity: ${levelInfo.complexity}

Conversation History:
${conversationHistory}

User's latest message: "${userMessage}"

Instructions:
- Respond naturally in ${targetLanguage} as if you were in this scenario
- Keep your response appropriate for ${levelInfo.level} level learners
- Use vocabulary and grammar structures suitable for ${levelInfo.level} level
- Keep responses conversational and not too long (2-4 sentences maximum)
- If the user says something unclear or off-topic, gently steer back to the scenario
- Encourage natural conversation flow
- Be friendly and helpful

Respond only with your reply message, no explanations or formatting.
`;

    const response = await openai.chat.completions.create({
      model: practiceConfig.openai.model,
      messages: [{ role: 'user', content: responsePrompt }],
      temperature: practiceConfig.openai.temperature,
      max_tokens: practiceConfig.openai.maxTokens,
    });

    const aiResponse = response.choices[0].message.content?.trim() || "I'm sorry, I didn't understand that. Could you please try again?";

    return NextResponse.json({
      success: true,
      response: aiResponse
    });
  } catch (error) {
    console.error('Error generating chat response:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}