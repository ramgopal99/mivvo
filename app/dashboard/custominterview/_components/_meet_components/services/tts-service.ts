// TTS (Text-to-Speech) Service
// Handles speech synthesis functionality using Web Speech API

export interface TTSConfig {
  voice?: string
  rate?: number
  pitch?: number
  volume?: number
  language?: string
}

export interface TTSCallbacks {
  onStart?: () => void
  onEnd?: () => void
  onError?: (error: string) => void
  onPause?: () => void
  onResume?: () => void
}

export class TTSService {
  private synthesis: SpeechSynthesis | null = null
  private currentUtterance: SpeechSynthesisUtterance | null = null
  private isSupported: boolean = false
  private isSpeaking: boolean = false
  private availableVoices: SpeechSynthesisVoice[] = []
  private callbacks: TTSCallbacks = {}
  private config: TTSConfig = {
    voice: '',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    language: 'en-US'
  }

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

      // Load available voices
      this.loadVoices()

      // Listen for voice changes
      if (this.synthesis) {
        this.synthesis.onvoiceschanged = () => {
          this.loadVoices()
        }
      }
    }
  }

  private loadVoices(): void {
    if (!this.synthesis) return

    const voices = this.synthesis.getVoices()
    this.availableVoices = voices

    // Auto-select a voice if configured
    if (this.config.voice && !this.getCurrentVoice()) {
      const targetVoice = voices.find(v => v.voiceURI === this.config.voice)
      if (!targetVoice && voices.length > 0) {
        // Fallback to first available voice
        this.config.voice = voices[0].voiceURI
      }
    }
  }

  // Force reload voices (useful when voices are loaded asynchronously)
  reloadVoices(): void {
    this.loadVoices()
  }

  // Update configuration
  updateConfig(config: Partial<TTSConfig>): void {
    this.config = { ...this.config, ...config }
  }

  // Update callbacks
  updateCallbacks(callbacks: Partial<TTSCallbacks>): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  // Speak text
  speak(text: string): void {
    // Re-check synthesis availability
    if (typeof window === 'undefined') {
      console.warn('TTS: Window is undefined')
      return
    }

    if (!this.isSupported) {
      console.warn('TTS: Speech synthesis not supported in this browser')
      return
    }

    if (!this.synthesis) {
      // Try to re-initialize
      this.initialize()
      if (!this.synthesis) {
        console.error('TTS: Speech synthesis not available after re-initialization')
        return
      }
    }
    
    if (!text.trim()) {
      console.warn('TTS: Empty text provided')
      return
    }

    console.log('TTS: Starting to speak:', text.substring(0, 50) + (text.length > 50 ? '...' : ''))

    // Cancel any ongoing speech
    this.stop()

    // Reload voices to ensure we have the latest list
    this.loadVoices()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = this.config.rate ?? 1.0
    utterance.pitch = this.config.pitch ?? 1.0
    utterance.volume = this.config.volume ?? 1.0

    // Set voice if configured - this is critical for using the selected voice
    if (this.config.voice) {
      const voice = this.availableVoices.find(v => v.voiceURI === this.config.voice)
      if (voice) {
        utterance.voice = voice
        console.log('TTS Speaking with voice:', voice.name)
      } else {
        console.warn('TTS Voice not found for speaking:', this.config.voice)
        // Try to use first available voice as fallback
        if (this.availableVoices.length > 0) {
          utterance.voice = this.availableVoices[0]
          console.log('TTS Using fallback voice for speaking:', this.availableVoices[0].name)
        }
      }
    }

    // Set language if specified
    if (this.config.language) {
      utterance.lang = this.config.language
    }

    // Set up event handlers
    utterance.onstart = () => {
      this.isSpeaking = true
      this.callbacks.onStart?.()
    }

    utterance.onend = () => {
      this.isSpeaking = false
      this.currentUtterance = null
      this.callbacks.onEnd?.()
    }

    utterance.onerror = (event) => {
      // Filter out expected operational errors (not actual errors)
      // "interrupted" and "canceled" occur when speech is stopped/cancelled, which is expected behavior
      if (event.error === 'interrupted' || event.error === 'canceled') {
        // These are expected when stop() is called, don't treat as errors
        this.isSpeaking = false
        this.currentUtterance = null
        // Silently handle these expected events
        return
      }
      
      // Only handle actual errors
      this.isSpeaking = false
      this.currentUtterance = null
      const errorMessage = `Speech synthesis error: ${event.error}`
      this.callbacks.onError?.(errorMessage)
    }

    utterance.onpause = () => {
      this.callbacks.onPause?.()
    }

    utterance.onresume = () => {
      this.callbacks.onResume?.()
    }

    this.currentUtterance = utterance
    this.synthesis.speak(utterance)
  }

  // Stop speaking
  stop(): void {
    if (this.synthesis && this.isSpeaking) {
      this.synthesis.cancel()
      this.isSpeaking = false
      this.currentUtterance = null
      // Call onEnd callback since speech was interrupted
      this.callbacks.onEnd?.()
    } else if (this.synthesis && this.currentUtterance) {
      // Also cancel if there's a current utterance even if not speaking
      this.synthesis.cancel()
      this.currentUtterance = null
    }
  }

  // Pause speaking
  pause(): void {
    if (this.synthesis && this.isSpeaking && this.currentUtterance) {
      this.synthesis.pause()
    }
  }

  // Resume speaking
  resume(): void {
    if (this.synthesis && this.currentUtterance) {
      this.synthesis.resume()
    }
  }

  // Check if currently speaking
  isCurrentlySpeaking(): boolean {
    return this.isSpeaking
  }

  // Check if TTS is supported
  isTextToSpeechSupported(): boolean {
    return this.isSupported
  }

  // Get available voices
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return [...this.availableVoices]
  }

  // Get current voice
  getCurrentVoice(): SpeechSynthesisVoice | null {
    if (!this.config.voice) return null
    return this.availableVoices.find(v => v.voiceURI === this.config.voice) || null
  }

  // Set voice by voiceURI
  setVoice(voiceURI: string): void {
    const voice = this.availableVoices.find(v => v.voiceURI === voiceURI)
    if (voice) {
      this.config.voice = voiceURI
    }
  }

  // Set speech rate
  setRate(rate: number): void {
    this.config.rate = Math.max(0.1, Math.min(10, rate))
  }

  // Set speech pitch
  setPitch(pitch: number): void {
    this.config.pitch = Math.max(0, Math.min(2, pitch))
  }

  // Set volume
  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume))
  }

  // Set language
  setLanguage(language: string): void {
    this.config.language = language
  }

  // Get current configuration
  getConfig(): TTSConfig {
    return { ...this.config }
  }

  // Cleanup
  destroy(): void {
    this.stop()
    this.synthesis = null
    this.currentUtterance = null
    this.callbacks = {}
  }
}

// Singleton instance for global use
let ttsServiceInstance: TTSService | null = null

export const getTTSService = (config?: TTSConfig, callbacks?: TTSCallbacks): TTSService => {
  if (!ttsServiceInstance) {
    ttsServiceInstance = new TTSService(config, callbacks)
  } else {
    if (config) {
      ttsServiceInstance.updateConfig(config)
    }
    if (callbacks) {
      ttsServiceInstance.updateCallbacks(callbacks)
    }
  }
  return ttsServiceInstance
}

export const destroyTTSService = (): void => {
  if (ttsServiceInstance) {
    ttsServiceInstance.destroy()
    ttsServiceInstance = null
  }
}
