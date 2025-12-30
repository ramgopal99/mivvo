import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ courseId: string }>;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { message } = body;

    // Validate input
    if (!message || message.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Message cannot be empty'
      });
    }

    // Get course AI assistant configuration
    const course = await prisma.course.findUnique({
      where: { courseId: resolvedParams.courseId },
      select: {
        aiAssistantPrompt: true,
        aiAssistantName: true,
        displayName: true,
      },
    });

    if (!course?.aiAssistantPrompt) {
      return NextResponse.json({
        success: false,
        error: 'AI assistant is not available for this course'
      });
    }

    // Get OpenAI API key from environment
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json({
        success: false,
        error: 'AI assistant is currently unavailable. Please try again later.'
      });
    }

    // Call OpenAI API with GPT-4 mini
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: course.aiAssistantPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      return NextResponse.json({
        success: false,
        error: 'Sorry, I\'m having trouble connecting to my knowledge base. Please try again.'
      });
    }

    const result = await response.json();
    const aiMessage = result.choices[0]?.message?.content?.trim();

    // Log token usage
    if (result.usage) {
      console.log('🔢 AI Chat Token Usage:', {
        courseId: resolvedParams.courseId,
        courseName: course.displayName,
        userMessageLength: message.length,
        aiAssistantName: course.aiAssistantName,
        promptTokens: result.usage.prompt_tokens,
        completionTokens: result.usage.completion_tokens,
        totalTokens: result.usage.total_tokens,
        estimatedCost: `₹${(result.usage.total_tokens * 0.00015 * 90).toFixed(2)}`, // GPT-4o-mini pricing converted to INR (1$ = 90₹)
        model: result.model,
        timestamp: new Date().toISOString()
      });
    }

    if (!aiMessage) {
      return NextResponse.json({
        success: false,
        error: 'I received an empty response. Please try rephrasing your question.'
      });
    }

    return NextResponse.json({
      success: true,
      message: aiMessage
    });

  } catch (error) {
    console.error('Error in course chat response:', error);
    return NextResponse.json({
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    });
  }
}
