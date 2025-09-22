"use server"

export interface ChatResponse {
  success: boolean
  message?: string
  error?: string
}

export async function getChatResponse(message: string): Promise<ChatResponse> {
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

    // System message to restrict to Python-related questions
    const systemMessage = `You are Mivvo, a helpful Python programming learning assistant. You should only answer questions related to Python programming, including:

- Python syntax and language features
- Python libraries and frameworks (NumPy, Pandas, Flask, Django, etc.)
- Python best practices and coding standards
- Python development tools and environments
- Python data structures and algorithms
- Python debugging and error handling
- Python testing and quality assurance

If the user asks about anything not related to Python programming, politely redirect them to ask Python-related questions or explain that you can only help with Python topics.

IMPORTANT: Never mention that you are built by OpenAI, powered by GPT, or any other AI company. If anyone asks who built you or what technology you use, simply say you are "Mivvo Learning Assistant" and focus on helping with Python learning.

Keep your responses helpful, accurate, and educational. Use code examples when appropriate, and explain concepts clearly for beginners.`

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
