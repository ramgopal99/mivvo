"use server"

export interface ChatResponse {
  success: boolean
  message?: string
  error?: string
}

export async function getChatResponse(message: string, courseId: string): Promise<ChatResponse> {
  try {
    // Validate input
    if (!message || message.trim().length === 0) {
      return {
        success: false,
        error: 'Message cannot be empty'
      }
    }

    // Call the course chat API
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/courses/${courseId}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to get chat response'
      };
    }

    return result;

  } catch (error) {
    console.error('Error in chat response:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }
  }
}
