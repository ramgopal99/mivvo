// Simplified TTS (Text-to-Speech) Service for Voice-to-Voice Test
// Based on the existing TTS service but simplified for testing

export interface TTSConfig {
  voice?: string
  rate?: number
  volume?: number
}

export interface TTSCallbacks {
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: string) => void
}

export class TestTTSService {
  private synthesis: SpeechSynthesis | null = null
  private isSupported: boolean = false
  private isSpeaking: boolean = false
  private callbacks: TTSCallbacks = {}
  private config: TTSConfig = {
    rate: 1.0,
    volume: 1.0
  }
  private lastSpeakTime: number = 0
  private hasUserInteracted: boolean = false

  constructor(config?: TTSConfig, callbacks?: TTSCallbacks) {
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

    if ('speechSynthesis' in window) {
      this.isSupported = true
      this.synthesis = window.speechSynthesis
      console.log('TTS: Initialized, voices available:', this.synthesis.getVoices().length)

      // Check if we need to load voices
      const voices = this.synthesis.getVoices()
      if (voices.length === 0) {
        console.log('TTS: No voices loaded yet, waiting for voiceschanged event')
      } else {
        console.log('TTS: Voices already loaded:', voices.length)
        voices.forEach((voice, index) => {
          console.log(`TTS: Voice ${index}: ${voice.name} (${voice.lang})`)
        })
      }

      // Listen for voices to be loaded
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = () => {
          const loadedVoices = this.synthesis?.getVoices() || []
          console.log('TTS: Voices loaded, count:', loadedVoices.length)
          if (loadedVoices.length > 0) {
            console.log('TTS: Available voices:')
            loadedVoices.forEach((voice, index) => {
              console.log(`  ${index}: ${voice.name} (${voice.lang}) ${voice.default ? '[DEFAULT]' : ''}`)
            })
          }
        }
      }
    } else {
      console.warn('TTS: Speech synthesis not supported')
    }
  }

  speak(text: string): void {
    const now = Date.now()
    const timeSinceLastSpeak = now - this.lastSpeakTime

    console.log('TTS: speak() called with text:', text)
    console.log('TTS: time since last speak:', timeSinceLastSpeak, 'ms')
    console.log('TTS: synthesis available?', !!this.synthesis)
    console.log('TTS: text trimmed:', text.trim())
    console.log('TTS: currently speaking?', this.isSpeaking)
    console.log('TTS: pending utterances?', this.synthesis?.pending)
    console.log('TTS: speaking?', this.synthesis?.speaking)

    if (!this.synthesis || !text.trim()) {
      console.warn('TTS: Cannot speak - synthesis not available or empty text')
      return
    }

    // Check if user has interacted with the page (required for TTS in some browsers)
    if (!this.hasUserInteracted) {
      console.warn('TTS: No user interaction detected. Enabling TTS on first use.')
      this.hasUserInteracted = true
    }

    // Prevent rapid TTS calls (less than 100ms apart) to avoid interruptions
    if (timeSinceLastSpeak < 100) {
      console.warn('TTS: Ignoring rapid speak call to prevent interruptions')
      return
    }

    this.lastSpeakTime = now

    // Stop any ongoing speech (this will cause "interrupted" error if speaking)
    if (this.isSpeaking) {
      console.log('TTS: Stopping current speech before starting new one')
    }
    this.stop()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = this.config.rate ?? 1.0
    utterance.volume = this.config.volume ?? 1.0

    console.log('TTS: Created utterance with rate:', utterance.rate, 'volume:', utterance.volume)

    utterance.onstart = () => {
      console.log('TTS: Speech started - utterance began speaking')
      this.isSpeaking = true
      this.callbacks.onStart?.()

      // Add a small delay check to see if speech gets interrupted immediately
      setTimeout(() => {
        if (this.isSpeaking && this.synthesis && !this.synthesis.speaking) {
          console.warn('TTS: Speech may have been interrupted by external factors (hot reload, etc.)')
        }
      }, 500)
    }

    utterance.onend = () => {
      console.log('TTS: Speech ended - utterance completed')
      this.isSpeaking = false
      this.callbacks.onEnd?.()
    }

    utterance.onpause = () => console.log('TTS: Speech paused')
    utterance.onresume = () => console.log('TTS: Speech resumed')
    utterance.onmark = () => console.log('TTS: Speech mark reached')
    utterance.onboundary = () => console.log('TTS: Speech boundary reached')

    console.log('TTS: Calling synthesis.speak()')
    console.log('TTS: Document hidden?', document.hidden)
    console.log('TTS: Document visibility:', document.visibilityState)

    try {
      this.synthesis.speak(utterance)
      console.log('TTS: synthesis.speak() called successfully')
      console.log('TTS: After speak - pending:', this.synthesis.pending, 'speaking:', this.synthesis.speaking)

    } catch (error) {
      console.error('TTS: Error calling synthesis.speak():', error)
      this.callbacks.onError?.('Failed to start speech synthesis')
    }
  }

  stop(): void {
    if (this.synthesis && this.isSpeaking) {
      this.synthesis.cancel()
      this.isSpeaking = false
      this.callbacks.onEnd?.()
    }
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking
  }

  getIsSupported(): boolean {
    return this.isSupported
  }

  setRate(rate: number): void {
    this.config.rate = Math.max(0.1, Math.min(2, rate))
  }

  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume))
  }

  // Update configuration
  updateConfig(config: Partial<TTSConfig>): void {
    this.config = { ...this.config, ...config }
  }

  // Update callbacks
  updateCallbacks(callbacks: Partial<TTSCallbacks>): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  // Check if TTS is ready (has voices loaded)
  isReady(): boolean {
    return this.isSupported && !!this.synthesis && this.synthesis.getVoices().length > 0
  }

  // Mark that user has interacted (enables TTS in some browsers)
  markUserInteracted(): void {
    this.hasUserInteracted = true
    console.log('TTS: User interaction marked')
  }
}

// Export singleton instance
let ttsInstance: TestTTSService | null = null

export const getTTSService = (config?: TTSConfig, callbacks?: TTSCallbacks): TestTTSService => {
  if (!ttsInstance) {
    ttsInstance = new TestTTSService(config, callbacks)
  } else {
    if (config) {
      ttsInstance.updateConfig(config)
    }
    if (callbacks) {
      ttsInstance.updateCallbacks(callbacks)
    }
  }
  return ttsInstance
}
