// STT (Speech-to-Text) Service
// Handles speech recognition functionality with support for multiple providers

// TypeScript interfaces for Web Speech API (if not available globally)
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onstart: ((event: Event) => void) | null
  onend: ((event: Event) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

export interface STTConfig {
  language?: string
  continuous?: boolean
  interimResults?: boolean
  maxAlternatives?: number
}

export interface STTCallbacks {
  onTranscript?: (transcript: string, isFinal?: boolean) => void
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: string) => void
  onResult?: (results: SpeechRecognitionResultList) => void
}

export interface STTProvider {
  start(config: STTConfig): void
  stop(): void
  abort(): void
  isListening(): boolean
  isSupported(): boolean
  updateConfig(config: Partial<STTConfig>): void
  setCallbacks(callbacks: STTCallbacks): void
  destroy(): void
}

// Web Speech API Provider (using react-speech-recognition)
class ReactSpeechRecognitionProvider implements STTProvider {
  private config: STTConfig = {
    language: 'en-US',
    continuous: true,
    interimResults: true,
    maxAlternatives: 1
  }
  private callbacks: STTCallbacks = {}
  private isListeningState: boolean = false
  private recognition: SpeechRecognition | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      // react-speech-recognition uses the Web Speech API under the hood
      this.initialize()
    }
  }

  private initialize(): void {
    // react-speech-recognition will be imported dynamically
    // This provider works with the useSpeechRecognition hook
  }

  start(config?: STTConfig): void {
    if (this.isListeningState) {
      this.stop()
    }

    if (config) {
      this.config = { ...this.config, ...config }
    }

    // This will be called from the hook that uses react-speech-recognition
    // The actual implementation is in useUserTranscription hook
    this.isListeningState = true
    this.callbacks.onStart?.()
  }

  stop(): void {
    if (this.isListeningState) {
      this.isListeningState = false
      this.callbacks.onEnd?.()
    }
  }

  abort(): void {
    this.stop()
  }

  isListening(): boolean {
    return this.isListeningState
  }

  isSupported(): boolean {
    if (typeof window === 'undefined') return false
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  }

  updateConfig(config: Partial<STTConfig>): void {
    this.config = { ...this.config, ...config }
  }

  setCallbacks(callbacks: STTCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  destroy(): void {
    this.stop()
    this.callbacks = {}
    this.recognition = null
  }
}

// Direct Web Speech API Provider (alternative implementation)
class WebSpeechAPIProvider implements STTProvider {
  private recognition: SpeechRecognition | null = null
  private config: STTConfig = {
    language: 'en-US',
    continuous: true,
    interimResults: true,
    maxAlternatives: 1
  }
  private callbacks: STTCallbacks = {}
  private isListeningState: boolean = false
  private accumulatedFinalTranscript: string = ''

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize()
    }
  }

  private initialize(): void {
    type WindowWithSpeechRecognition = Window & {
      SpeechRecognition?: new () => SpeechRecognition
      webkitSpeechRecognition?: new () => SpeechRecognition
    }
    
    const win = window as WindowWithSpeechRecognition
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.setupRecognition()
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return

    this.recognition.continuous = this.config.continuous ?? true
    this.recognition.interimResults = this.config.interimResults ?? true
    this.recognition.lang = this.config.language || 'en-US'
    this.recognition.maxAlternatives = this.config.maxAlternatives || 1

    this.recognition.onstart = () => {
      this.isListeningState = true
      this.callbacks.onStart?.()
    }

    this.recognition.onend = () => {
      this.isListeningState = false
      this.callbacks.onEnd?.()
      
      // Auto-restart if continuous mode is enabled
      if (this.config.continuous && this.isListeningState === false) {
        // Check if we should still be listening (this will be handled by the hook)
        // Don't auto-restart here to avoid conflicts with hook control
      }
    }

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // Ignore "aborted" and "no-speech" errors as they're expected behaviors
      // "aborted" happens when recognition is stopped
      // "no-speech" happens when no speech is detected (normal in continuous mode)
      if (event.error === 'aborted' || event.error === 'no-speech') {
        this.isListeningState = false
        // Don't call error callback for expected behaviors
        return
      }

      this.isListeningState = false
      const errorMessage = `Speech recognition error: ${event.error}`
      this.callbacks.onError?.(errorMessage)
    }

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = ''
      let hasNewFinal = false

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          // Accumulate final transcripts (only add once)
          this.accumulatedFinalTranscript += transcript + ' '
          hasNewFinal = true
        } else {
          interimTranscript += transcript
        }
      }

      // Combine accumulated final (which includes all previous + new final) + interim
      const fullTranscript = this.accumulatedFinalTranscript + interimTranscript
      if (fullTranscript.trim()) {
        this.callbacks.onTranscript?.(fullTranscript.trim(), hasNewFinal)
      }

      this.callbacks.onResult?.(event.results)
    }
  }

  start(config?: STTConfig): void {
    if (!this.recognition) {
      this.callbacks.onError?.('Speech recognition is not supported')
      return
    }

    if (config) {
      this.updateConfig(config)
      this.setupRecognition()
    }

    // Reset accumulated transcript when starting fresh
    this.accumulatedFinalTranscript = ''

    try {
      this.recognition.start()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      this.callbacks.onError?.(`Failed to start recognition: ${errorMessage}`)
    }
  }

  stop(): void {
    if (this.recognition) {
      try {
        this.recognition.stop()
        this.isListeningState = false
        this.accumulatedFinalTranscript = ''
      } catch {
        // Ignore errors when stopping
        this.isListeningState = false
        this.accumulatedFinalTranscript = ''
      }
    }
  }

  abort(): void {
    if (this.recognition) {
      try {
        this.recognition.abort()
        this.isListeningState = false
      } catch {
        // Ignore errors when aborting
        this.isListeningState = false
      }
    }
  }

  isListening(): boolean {
    return this.isListeningState
  }

  isSupported(): boolean {
    if (typeof window === 'undefined') return false
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  }

  updateConfig(config: Partial<STTConfig>): void {
    this.config = { ...this.config, ...config }
    if (this.recognition) {
      this.setupRecognition()
    }
  }

  setCallbacks(callbacks: STTCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  destroy(): void {
    this.abort()
    this.recognition = null
    this.callbacks = {}
  }
}

// Main STT Service Class
export class STTService {
  private provider: STTProvider
  private config: STTConfig = {
    language: 'en-US',
    continuous: true,
    interimResults: true,
    maxAlternatives: 1
  }
  private callbacks: STTCallbacks = {}
  private providerType: 'react-speech-recognition' | 'web-speech-api' = 'react-speech-recognition'

  constructor(
    providerType: 'react-speech-recognition' | 'web-speech-api' = 'react-speech-recognition',
    config?: STTConfig,
    callbacks?: STTCallbacks
  ) {
    this.providerType = providerType
    if (config) {
      this.config = { ...this.config, ...config }
    }
    if (callbacks) {
      this.callbacks = callbacks
    }

    // Initialize provider
    if (providerType === 'web-speech-api') {
      this.provider = new WebSpeechAPIProvider()
    } else {
      this.provider = new ReactSpeechRecognitionProvider()
    }

    this.provider.updateConfig(this.config)
    this.provider.setCallbacks(this.callbacks)
  }

  // Start listening
  start(config?: Partial<STTConfig>): void {
    const mergedConfig = config ? { ...this.config, ...config } : this.config
    this.provider.start(mergedConfig)
  }

  // Stop listening
  stop(): void {
    this.provider.stop()
  }

  // Abort recognition
  abort(): void {
    this.provider.abort()
  }

  // Check if listening
  isListening(): boolean {
    return this.provider.isListening()
  }

  // Check if STT is supported
  isSupported(): boolean {
    return this.provider.isSupported()
  }

  // Update configuration
  updateConfig(config: Partial<STTConfig>): void {
    this.config = { ...this.config, ...config }
    this.provider.updateConfig(this.config)
  }

  // Update callbacks
  updateCallbacks(callbacks: Partial<STTCallbacks>): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
    this.provider.setCallbacks(this.callbacks)
  }

  // Switch provider
  switchProvider(providerType: 'react-speech-recognition' | 'web-speech-api'): void {
    this.provider.destroy()
    this.providerType = providerType

    if (providerType === 'web-speech-api') {
      this.provider = new WebSpeechAPIProvider()
    } else {
      this.provider = new ReactSpeechRecognitionProvider()
    }

    this.provider.updateConfig(this.config)
    this.provider.setCallbacks(this.callbacks)
  }

  // Get current configuration
  getConfig(): STTConfig {
    return { ...this.config }
  }

  // Get provider type
  getProviderType(): string {
    return this.providerType
  }

  // Cleanup
  destroy(): void {
    this.provider.destroy()
  }
}

// Singleton instance for global use
let sttServiceInstance: STTService | null = null

export const getSTTService = (
  providerType: 'react-speech-recognition' | 'web-speech-api' = 'react-speech-recognition',
  config?: STTConfig,
  callbacks?: STTCallbacks
): STTService => {
  if (!sttServiceInstance) {
    sttServiceInstance = new STTService(providerType, config, callbacks)
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

// Export provider types for future extensions
export { ReactSpeechRecognitionProvider, WebSpeechAPIProvider }
