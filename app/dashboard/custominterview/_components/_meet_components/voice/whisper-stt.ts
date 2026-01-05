/**
 * Whisper STT Service
 * Handles audio recording and OpenAI Whisper API integration
 */

export interface WhisperSTTConfig {
  apiUrl: string
  language?: string
  model: string
  responseFormat: string
}

export interface WhisperTranscriptionResult {
  text: string
  language?: string
  duration?: number
  segments?: Array<{
    start: number
    end: number
    text: string
  }>
}

export class WhisperSTTService {
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private stream: MediaStream | null = null
  private isRecording = false
  private config: WhisperSTTConfig

  constructor(config: WhisperSTTConfig) {
    this.config = config
  }

  /**
   * Initialize microphone access
   */
  async initialize(): Promise<void> {
    console.log('🎤 WHISPER-STT: Initializing microphone access...')
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000, // Optimal for Whisper
        }
      })
      console.log('🎤 WHISPER-STT: Microphone access granted successfully')
    } catch (error) {
      console.error('🎤 WHISPER-STT: Failed to access microphone:', error)
      throw new Error(`Failed to access microphone: ${error}`)
    }
  }

  /**
   * Start recording audio
   */
  startRecording(): Promise<void> {
    console.log('🎤 WHISPER-STT: Starting audio recording...')
    return new Promise((resolve, reject) => {
      if (!this.stream) {
        console.error('🎤 WHISPER-STT: Cannot start recording - microphone not initialized')
        reject(new Error('Microphone not initialized'))
        return
      }

      this.audioChunks = []
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'audio/webm;codecs=opus'
      })

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data)
          console.log(`🎤 WHISPER-STT: Received audio chunk, size: ${event.data.size} bytes`)
        }
      }

      this.mediaRecorder.onstop = () => {
        this.isRecording = false
        console.log('🎤 WHISPER-STT: Recording stopped')
      }

      this.mediaRecorder.onerror = (event) => {
        console.error('🎤 WHISPER-STT: Recording error:', event.error)
        reject(new Error(`Recording error: ${event.error}`))
      }

      this.mediaRecorder.start()
      this.isRecording = true
      console.log('🎤 WHISPER-STT: Recording started successfully')
      resolve()
    })
  }

  /**
   * Stop recording and get audio blob
   */
  stopRecording(): Promise<Blob> {
    console.log('🎤 WHISPER-STT: Stopping recording...')
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.isRecording) {
        console.error('🎤 WHISPER-STT: Cannot stop recording - not currently recording')
        reject(new Error('Not currently recording'))
        return
      }

      this.mediaRecorder.onstop = () => {
        this.isRecording = false
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' })
        const totalSize = this.audioChunks.reduce((sum, chunk) => sum + chunk.size, 0)
        console.log(`🎤 WHISPER-STT: Recording stopped, created audio blob: ${audioBlob.size} bytes (${this.audioChunks.length} chunks, total raw size: ${totalSize} bytes)`)
        resolve(audioBlob)
      }

      this.mediaRecorder.stop()
    })
  }

  /**
   * Transcribe audio using OpenAI Whisper API
   */
  async transcribeAudio(audioBlob: Blob): Promise<WhisperTranscriptionResult> {
    console.log(`🎤 WHISPER-STT: Preparing to transcribe audio blob (${audioBlob.size} bytes) using ${this.config.model}`)

    const formData = new FormData()
    formData.append('file', audioBlob, 'audio.webm')
    formData.append('model', this.config.model)
    formData.append('response_format', this.config.responseFormat)

    if (this.config.language) {
      formData.append('language', this.config.language)
      console.log(`🎤 WHISPER-STT: Using language: ${this.config.language}`)
    }

    console.log(`🎤 WHISPER-STT: Sending request to ${this.config.apiUrl}...`)
    const startTime = Date.now()

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        body: formData
      })

      const duration = Date.now() - startTime
      console.log(`🎤 WHISPER-STT: API response received in ${duration}ms, status: ${response.status}`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('🎤 WHISPER-STT: API error response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        throw new Error(`Whisper API error: ${response.status} - ${errorData.error || 'Unknown error'}`)
      }

      const result: WhisperTranscriptionResult = await response.json()
      console.log('🎤 WHISPER-STT: Transcription successful:', {
        text: result.text,
        language: result.language,
        duration: result.duration,
        segmentsCount: result.segments?.length || 0,
        hasText: !!result.text?.trim()
      })

      return result
    } catch (error) {
      console.error('🎤 WHISPER-STT: Transcription failed:', error)
      throw error
    }
  }

  /**
   * Record audio for a specified duration and transcribe
   */
  async recordAndTranscribe(durationMs: number): Promise<WhisperTranscriptionResult> {
    console.log(`🎤 WHISPER-STT: Starting record-and-transcribe session (${durationMs}ms)`)

    await this.startRecording()

    // Wait for specified duration
    console.log(`🎤 WHISPER-STT: Recording for ${durationMs}ms...`)
    await new Promise(resolve => setTimeout(resolve, durationMs))

    const audioBlob = await this.stopRecording()

    console.log(`🎤 WHISPER-STT: Recording complete, now transcribing ${audioBlob.size} bytes...`)
    const result = await this.transcribeAudio(audioBlob)

    console.log('🎤 WHISPER-STT: Record-and-transcribe session complete')
    return result
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    console.log('🎤 WHISPER-STT: Cleaning up resources...')

    if (this.mediaRecorder && this.isRecording) {
      console.log('🎤 WHISPER-STT: Stopping active recording')
      this.mediaRecorder.stop()
    }

    if (this.stream) {
      console.log('🎤 WHISPER-STT: Stopping microphone stream')
      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
    }

    this.audioChunks = []
    this.isRecording = false
    console.log('🎤 WHISPER-STT: Cleanup complete')
  }

  /**
   * Check if currently recording
   */
  getIsRecording(): boolean {
    return this.isRecording
  }

  /**
   * Get microphone stream (for external use if needed)
   */
  getStream(): MediaStream | null {
    return this.stream
  }
}

/**
 * Factory function to create Whisper STT service
 */
export function createWhisperSTTService(config: WhisperSTTConfig): WhisperSTTService {
  return new WhisperSTTService(config)
}
