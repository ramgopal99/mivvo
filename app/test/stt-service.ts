// Simplified STT (Speech-to-Text) Service for Voice-to-Voice Test
// Based on the existing STT service but simplified for testing

export interface STTConfig {
  language?: string
  continuous?: boolean
}

export interface STTCallbacks {
  onResult?: (transcript: string, isFinal: boolean) => void
  onError?: (error: string) => void
  onStart?: () => void
  onEnd?: () => void
}

export class TestSTTService {
  private recognition: any = null
  private isSupported: boolean = false
  private isListening: boolean = false
  private callbacks: STTCallbacks = {}
  private config: STTConfig = {
    language: 'en-US',
    continuous: true
  }

  constructor(config?: STTConfig, callbacks?: STTCallbacks) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
    if (callbacks) {
      this.callbacks = callbacks
    }
    this.initialize()
  }

  private initialize(): void {
    if (typeof window === 'undefined') return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      this.isSupported = true
      this.recognition = new SpeechRecognition()
      this.setupRecognition()
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return

    this.recognition.continuous = this.config.continuous ?? true
    this.recognition.interimResults = true
    this.recognition.lang = this.config.language ?? 'en-US'

    this.recognition.onstart = () => {
      this.isListening = true
      this.callbacks.onStart?.()
    }

    this.recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcript = result[0].transcript
        this.callbacks.onResult?.(transcript, result.isFinal)
      }
    }

    this.recognition.onerror = (event: any) => {
      let errorMessage = 'Speech recognition error'
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected'
          break
        case 'not-allowed':
          errorMessage = 'Microphone access denied'
          break
      }
      this.callbacks.onError?.(errorMessage)
    }

    this.recognition.onend = () => {
      this.isListening = false
      this.callbacks.onEnd?.()
    }
  }

  async start(): Promise<void> {
    if (!this.recognition || this.isListening) return

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      this.recognition.start()
    } catch (error) {
      this.callbacks.onError?.('Microphone access required')
    }
  }

  stop(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
    }
  }

  isActive(): boolean {
    return this.isListening
  }

  getIsSupported(): boolean {
    return this.isSupported
  }

  setLanguage(language: string): void {
    this.config.language = language
    if (this.recognition) {
      this.recognition.lang = language
    }
  }
}

// Export singleton instance
let sttInstance: TestSTTService | null = null

export const getSTTService = (config?: STTConfig, callbacks?: STTCallbacks): TestSTTService => {
  if (!sttInstance) {
    sttInstance = new TestSTTService(config, callbacks)
  } else {
    if (config) {
      // Update config if needed
    }
    if (callbacks) {
      sttInstance.callbacks = callbacks
    }
  }
  return sttInstance
}
