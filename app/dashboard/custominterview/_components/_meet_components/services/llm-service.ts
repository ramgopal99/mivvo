/* eslint-disable @typescript-eslint/no-unused-vars */
// LLM (Large Language Model) Service
// Handles communication with language model APIs

// LLM (Large Language Model) Service
// Handles communication with language model APIs

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface LLMConfig {
  apiUrl?: string
  model?: string
  temperature?: number
  maxTokens?: number
  systemPrompt?: string
}

export interface LLMCallbacks {
  onResponse?: (response: string) => void
  onError?: (error: string) => void
  onStart?: () => void
  onComplete?: () => void
}

export interface ConversationContext {
  messages: Message[]
  customPrompt?: string
  questionCount?: number
  lastTopics?: string
}

export class LLMService {
  private config: LLMConfig = {
    apiUrl: '/api/chat',
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 500,
    systemPrompt: 'You are an AI interviewer conducting a professional interview. Ask relevant questions and provide constructive feedback.'
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

  // Update configuration
  updateConfig(config: Partial<LLMConfig>): void {
    this.config = { ...this.config, ...config }
  }

  // Update callbacks
  updateCallbacks(callbacks: Partial<LLMCallbacks>): void {
    this.callbacks = callbacks
  }

  // Generate next interview question (demo implementation)
  async generateNextQuestion(context: ConversationContext): Promise<string> {
    this.callbacks.onStart?.()

    try {
      // Demo responses for clean setup
      const demoQuestions = [
        "Can you tell me about your experience with team collaboration?",
        "What are your strengths and how do you apply them in your work?",
        "How do you handle challenging situations at work?",
        "Where do you see yourself in five years?",
        "What motivates you to do your best work?",
        "Can you describe a project you're particularly proud of?",
        "How do you stay updated with industry trends?",
        "What are your thoughts on remote work?"
      ]

      const response = demoQuestions[Math.floor(Math.random() * demoQuestions.length)]

      this.callbacks.onResponse?.(response)
      this.callbacks.onComplete?.()

      return response
    } catch (error) {
      console.error('LLM Error:', error)
      const errorMessage = 'Sorry, I encountered an error. Please try again.'
      this.callbacks.onError?.(errorMessage)
      this.callbacks.onComplete?.()
      throw error
    }
  }

  // Send message to LLM and get response
  async sendMessage(context: ConversationContext): Promise<string> {
    this.callbacks.onStart?.()

    try {
      // Prepare messages array for API
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = []
      
      // Add system prompt if available
      if (this.config.systemPrompt) {
        messages.push({
          role: 'system',
          content: this.config.systemPrompt
        })
      }

      // Add conversation messages
      context.messages.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        })
      })

      // Call the API
      const response = await fetch(this.config.apiUrl || '/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      // Extract the response text from OpenAI API response
      const aiResponse = data.choices?.[0]?.message?.content || 
                        data.choices?.[0]?.message?.text ||
                        'I apologize, but I encountered an issue processing your message.'

      this.callbacks.onResponse?.(aiResponse)
      this.callbacks.onComplete?.()

      return aiResponse
    } catch (error) {
      console.error('LLM Error:', error)
      const errorMessage = 'Sorry, I encountered an error. Please try again.'
      this.callbacks.onError?.(errorMessage)
      this.callbacks.onComplete?.()
      throw error
    }
  }

  // Prepare user content based on context
  private prepareUserContent(context: ConversationContext): string {
    const { messages } = context

    // Get the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()
    if (!lastUserMessage) return ''

    return lastUserMessage.content
  }


  // Get current configuration
  getConfig(): LLMConfig {
    return { ...this.config }
  }
}

// Singleton instance for global use
let llmServiceInstance: LLMService | null = null

export const getLLMService = (config?: Partial<LLMConfig>, callbacks?: LLMCallbacks): LLMService => {
  if (!llmServiceInstance) {
    llmServiceInstance = new LLMService(config, callbacks)
  } else {
    if (config) {
      llmServiceInstance.updateConfig(config)
    }
    if (callbacks) {
      llmServiceInstance.updateCallbacks(callbacks)
    }
  }
  return llmServiceInstance
}

export const destroyLLMService = (): void => {
  if (llmServiceInstance) {
    llmServiceInstance = null
  }
}
