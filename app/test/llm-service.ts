// Simplified LLM (Language Learning Model) Service for Voice-to-Voice Test
// Based on the existing LLM service but simplified for testing

export interface LLMConfig {
  apiUrl?: string
  systemPrompt?: string
}

export interface LLMCallbacks {
  onResponse?: (response: string) => void
  onError?: (error: string) => void
  onStart?: () => void
  onComplete?: () => void
}

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export class TestLLMService {
  private config: LLMConfig = {
    apiUrl: '/api/chat',
    systemPrompt: 'You are a helpful AI assistant engaged in voice conversation. Keep responses conversational and natural.'
  }

  private callbacks: LLMCallbacks = {}

  constructor(config?: Partial<LLMConfig>, callbacks?: LLMCallbacks) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
    if (callbacks) {
      this.callbacks = callbacks
    }
  }

  async sendMessage(message: string, context: Message[] = []): Promise<string> {
    this.callbacks.onStart?.()

    try {
      const messages = [
        {
          role: 'system' as const,
          content: this.config.systemPrompt!
        },
        ...context,
        {
          role: 'user' as const,
          content: message
        }
      ]

      const response = await fetch(this.config.apiUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.'

      this.callbacks.onResponse?.(aiResponse)
      this.callbacks.onComplete?.()

      return aiResponse
    } catch (error) {
      console.error('LLM Error:', error)
      const errorMessage = 'Sorry, I encountered an error. Please try again.'
      this.callbacks.onError?.(errorMessage)
      this.callbacks.onComplete?.()
      return errorMessage
    }
  }

  updateConfig(config: Partial<LLMConfig>): void {
    this.config = { ...this.config, ...config }
  }

  updateCallbacks(callbacks: Partial<LLMCallbacks>): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }
}

// Export singleton instance
let llmInstance: TestLLMService | null = null

export const getLLMService = (config?: Partial<LLMConfig>, callbacks?: LLMCallbacks): TestLLMService => {
  if (!llmInstance) {
    llmInstance = new TestLLMService(config, callbacks)
  } else {
    if (config) {
      llmInstance.updateConfig(config)
    }
    if (callbacks) {
      llmInstance.updateCallbacks(callbacks)
    }
  }
  return llmInstance
}
