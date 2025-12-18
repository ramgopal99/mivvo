"use server"

import { getAIAssistantPrompt } from '../config';

export interface ChatResponse {
  success: boolean
  message?: string
  error?: string
}

export async function getChatResponse(message: string, language: string = 'python'): Promise<ChatResponse> {
  try {
    // Validate input
    if (!message || message.trim().length === 0) {
      return {
        success: false,
        error: 'Message cannot be empty'
      }
    }

    // Get OpenAI API key from environment
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (!openaiApiKey) {
      return {
        success: false,
        error: 'AI assistant is currently unavailable. Please try again later.'
      }
    }

    // Get dynamic system message based on the selected language/course
    const systemMessage = getAIAssistantPrompt(language);

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
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText)
      return {
        success: false,
        error: 'Sorry, I\'m having trouble connecting to my knowledge base. Please try again.'
      }
    }

    const result = await response.json()
    const aiMessage = result.choices[0]?.message?.content?.trim()

    if (!aiMessage) {
      return {
        success: false,
        error: 'I received an empty response. Please try rephrasing your question.'
      }
    }

    return {
      success: true,
      message: aiMessage
    }

  } catch (error) {
    console.error('Error in chat response:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}
