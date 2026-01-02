// STT (Speech-to-Text) Service
// Handles speech recognition functionality using Web Speech API

// Web Speech API Type Definitions
export interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onstart: ((event: Event) => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: ((event: Event) => void) | null
}

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

export interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

export interface SpeechRecognitionResult {
  readonly length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

export interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

export interface STTConfig {
  language?: string
  continuous?: boolean
  interimResults?: boolean
}

export interface STTCallbacks {
  onResult?: (transcript: string, isFinal: boolean) => void
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: string) => void
}

export class STTService {
  private recognition: SpeechRecognition | null = null
  private isSupported: boolean = false
  private isListening: boolean = false
  private callbacks: STTCallbacks = {}
  private config: STTConfig = {
    language: 'en-US',
    continuous: true,
    interimResults: true
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

    const SpeechRecognition = (window as Window & {
      SpeechRecognition?: new () => SpeechRecognition
      webkitSpeechRecognition?: new () => SpeechRecognition
    }).SpeechRecognition || (window as Window & {
      SpeechRecognition?: new () => SpeechRecognition
      webkitSpeechRecognition?: new () => SpeechRecognition
    }).webkitSpeechRecognition

    if (SpeechRecognition) {
      this.isSupported = true
      this.recognition = new SpeechRecognition()

      if (this.recognition) {
        this.setupRecognition()
      }
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return

    this.recognition.continuous = this.config.continuous ?? true
    this.recognition.interimResults = this.config.interimResults ?? true
    this.recognition.lang = this.config.language ?? 'en-US'

    this.recognition.onstart = () => {
      this.isListening = true
      this.callbacks.onStart?.()
    }

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcript = result[0].transcript

        this.callbacks.onResult?.(transcript, result.isFinal)
      }
    }

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      let errorMessage = ''
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected'
          break
        case 'audio-capture':
          errorMessage = 'Audio capture failed'
          break
        case 'not-allowed':
          errorMessage = 'Microphone access denied'
          break
        case 'network':
          errorMessage = 'Network error during speech recognition'
          break
        case 'service-not-allowed':
          errorMessage = 'Speech recognition service not allowed'
          break
        default:
          errorMessage = `Speech recognition error: ${event.error}`
      }

      this.callbacks.onError?.(errorMessage)
    }

    this.recognition.onend = () => {
      this.isListening = false
      this.callbacks.onEnd?.()
    }
  }

  // Update configuration
  updateConfig(config: Partial<STTConfig>): void {
    this.config = { ...this.config, ...config }
    if (this.recognition) {
      this.recognition.lang = this.config.language ?? 'en-US'
      this.recognition.continuous = this.config.continuous ?? true
      this.recognition.interimResults = this.config.interimResults ?? true
    }
  }

  // Update callbacks
  updateCallbacks(callbacks: Partial<STTCallbacks>): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  // Start speech recognition
  async start(): Promise<void> {
    if (!this.recognition || this.isListening) return

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true })
      this.recognition.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      this.callbacks.onError?.('Microphone access is required for speech recognition')
    }
  }

  // Stop speech recognition
  stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop()
      } catch (error) {
        console.log('Speech recognition already stopped or error:', error)
      }
    }
  }

  // Check if speech recognition is currently active
  isActive(): boolean {
    return this.isListening
  }

  // Check if speech recognition is supported
  isSupported(): boolean {
    return this.isSupported
  }

  // Get current language
  getLanguage(): string {
    return this.config.language ?? 'en-US'
  }

  // Set language
  setLanguage(language: string): void {
    this.config.language = language
    if (this.recognition) {
      this.recognition.lang = language
    }
  }

  // Cleanup
  destroy(): void {
    this.stop()
    this.recognition = null
    this.callbacks = {}
  }
}

// Singleton instance for global use
let sttServiceInstance: STTService | null = null

export const getSTTService = (config?: STTConfig, callbacks?: STTCallbacks): STTService => {
  if (!sttServiceInstance) {
    sttServiceInstance = new STTService(config, callbacks)
  } else {
    if (config) {
      sttServiceInstance.updateConfig(config)
    }
    if (callbacks) {
      sttServiceInstance.updateCallbacks(callbacks)
    }
  }
  return sttServiceInstance
}

export const destroySTTService = (): void => {
  if (sttServiceInstance) {
    sttServiceInstance.destroy()
    sttServiceInstance = null
  }
}
