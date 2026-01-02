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
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
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

  // Generate next interview question
  async generateNextQuestion(context: ConversationContext): Promise<string> {
    const { customPrompt, questionCount = 0, lastTopics = '' } = context

    this.callbacks.onStart?.()

    try {
      const response = await fetch(this.config.apiUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `${customPrompt || this.config.systemPrompt}

CONVERSATION CONTEXT (for reference only):
- Questions asked so far: ${questionCount}
- Recent topics discussed: ${lastTopics}

INSTRUCTION: Generate the next logical interview question based on the conversation context above. Ask ONE question directly without any introduction, acknowledgment, or transition phrases.`
            },
            {
              role: 'user',
              content: 'Ask the next interview question now.'
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // Clean the response - remove any potential acknowledgments
      let cleanResponse = aiResponse.trim()

      // Remove common acknowledgment patterns
      cleanResponse = cleanResponse.replace(/^(sure|of course|certainly|okay|alright|got it|understood|let's continue|moving on|next|following up)[\s,.-]*/i, '')
      cleanResponse = cleanResponse.replace(/^(i'll|let me|now|then|so|well)[\s,.-]*/i, '')

      // If the response is too short after cleaning, it might be just acknowledgment - use original
      if (cleanResponse.length < 10) {
        cleanResponse = aiResponse
      }

      this.callbacks.onResponse?.(cleanResponse)
      this.callbacks.onComplete?.()

      return cleanResponse
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
      // Prepare user content
      const userContent = this.prepareUserContent(context)

      const response = await fetch(this.config.apiUrl!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: context.customPrompt || this.config.systemPrompt
            },
            ...context.messages.map(m => ({ role: m.role, content: m.content })),
            {
              role: 'user',
              content: userContent
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

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
