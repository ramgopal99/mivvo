'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Mic, Square, Play, RotateCcw, Brain, FileText } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognition extends EventTarget {
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

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor
    webkitSpeechRecognition: SpeechRecognitionConstructor
  }
}

// Ultimate VAD Configuration interface - combining all features
interface UltimateVADConfig {
  // Basic Audio Features
  frameSize: number // 20-30ms in samples
  sampleRate: number
  energyThreshold: number
  zcrThreshold: number
  spectralCentroidThreshold: number
  minSpeechFrames: number // 3-5 frames
  hangoverFrames: number // 15-20 frames
  hysteresisStartThreshold: number
  hysteresisEndThreshold: number
  smoothingWindow: number
  voiceFreqMin: number // 300Hz
  voiceFreqMax: number // 3400Hz
  snrThreshold: number
  confidenceThreshold: number

  // Prosodic features
  pitchThreshold: number
  intonationThreshold: number
  speechRateThreshold: number
  energyPatternThreshold: number
  pauseContextThreshold: number
  stressPatternThreshold: number

  // Linguistic features
  grammarConfidenceThreshold: number
  wordBoundaryThreshold: number
  semanticConfidenceThreshold: number

  // Multi-modal decision
  audioWeight: number
  linguisticWeight: number
  prosodicWeight: number

  // Timing
  completionTimeout: number // ms to wait for sentence completion
}

// Feature extraction results - combining all features
interface AudioFeatures {
  rms: number
  zcr: number
  spectralCentroid: number
  snr: number
  autocorrelation: number
  confidence: number
}

interface ProsodicFeatures {
  pitchContour: number
  intonation: 'rising' | 'falling' | 'neutral'
  speechRate: number
  energyPattern: number
  pauseContext: number
  stressPattern: number
}

interface LinguisticFeatures {
  transcript: string
  isComplete: boolean
  grammarScore: number
  wordBoundaries: number[]
  semanticConfidence: number
}

interface CompletionDecision {
  isComplete: boolean
  confidence: number
  reason: string
  features: {
    prosodic: ProsodicFeatures
    linguistic: LinguisticFeatures
    audio: AudioFeatures
  }
  // Advanced completion analysis properties
  hesitationDetected?: boolean
  fillerWordsDetected?: string[]
  pausePattern?: 'thinking' | 'complete' | 'interrupted' | 'unknown'
  timeSinceLastSpeech?: number
  completionScore?: number
}

// VAD State - combining both state systems
enum VADState {
  SILENCE = 'silence',
  SPEECH_START = 'speech_start',
  SPEECH = 'speech',
  SPEECH_END = 'speech_end'
}

// Completion State - Enhanced with hesitation detection
enum CompletionState {
  INCOMPLETE = 'incomplete',
  HESITATING = 'hesitating', // User is thinking/pausing
  POTENTIALLY_COMPLETE = 'potentially_complete',
  COMPLETE = 'complete',
  CONFIRMED_COMPLETE = 'confirmed_complete'
}

// Speech Completion Analysis
interface SpeechCompletionAnalysis {
  isComplete: boolean
  confidence: number
  reason: string
  hesitationDetected: boolean
  fillerWordsDetected: string[]
  pausePattern: 'thinking' | 'complete' | 'interrupted' | 'unknown'
  timeSinceLastSpeech: number
  completionScore: number
}

export default function VoiceActivityDetector() {
  // Audio context and processing - combining both systems
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // State management - combining both VAD systems
  const [isRecording, setIsRecording] = useState(false)
  const [vadState, setVadState] = useState<VADState>(VADState.SILENCE)
  const [completionState, setCompletionState] = useState<CompletionState>(CompletionState.INCOMPLETE)
  const [showCompletionBanner, setShowCompletionBanner] = useState(false)
  const [completionTrigger, setCompletionTrigger] = useState<'ai' | 'pause' | null>(null)
  const [shouldStopRecording, setShouldStopRecording] = useState(false)

  // Ultimate configuration combining all features
  const [config, setConfig] = useState<UltimateVADConfig>({
    // Basic Audio Features
    frameSize: 512, // ~23ms at 22kHz
    sampleRate: 22050,
    energyThreshold: 0.01,
    zcrThreshold: 0.15,
    spectralCentroidThreshold: 2000,
    minSpeechFrames: 3,
    hangoverFrames: 15,
    hysteresisStartThreshold: 0.02,
    hysteresisEndThreshold: 0.008,
    smoothingWindow: 5,
    voiceFreqMin: 300,
    voiceFreqMax: 3400,
    snrThreshold: 10,
    confidenceThreshold: 0.7,

    // Prosodic features
    pitchThreshold: 0.6,
    intonationThreshold: 0.5,
    speechRateThreshold: 0.4,
    energyPatternThreshold: 0.5,
    pauseContextThreshold: 0.3,
    stressPatternThreshold: 0.6,

    // Linguistic features
    grammarConfidenceThreshold: 0.7,
    wordBoundaryThreshold: 0.5,
    semanticConfidenceThreshold: 0.8,

    // Multi-modal decision
    audioWeight: 0.4,
    linguisticWeight: 0.4,
    prosodicWeight: 0.2,

    // Timing
    completionTimeout: 1500
  })

  // Real-time metrics - combining all feature types
  const [currentAudioFeatures, setCurrentAudioFeatures] = useState<AudioFeatures>({
    rms: 0,
    zcr: 0,
    spectralCentroid: 0,
    snr: 0,
    autocorrelation: 0,
    confidence: 0
  })

  const [currentProsodicFeatures, setCurrentProsodicFeatures] = useState<ProsodicFeatures>({
    pitchContour: 0,
    intonation: 'neutral',
    speechRate: 0,
    energyPattern: 0,
    pauseContext: 0,
    stressPattern: 0
  })

  const [currentLinguisticFeatures, setCurrentLinguisticFeatures] = useState<LinguisticFeatures>({
    transcript: '',
    isComplete: false,
    grammarScore: 0,
    wordBoundaries: [],
    semanticConfidence: 0
  })

  const [completionDecision, setCompletionDecision] = useState<CompletionDecision>({
    isComplete: false,
    confidence: 0,
    reason: 'No analysis yet',
    features: {
      prosodic: currentProsodicFeatures,
      linguistic: currentLinguisticFeatures,
      audio: currentAudioFeatures
    }
  })

  // History and timing refs - combining both systems
  const transcriptHistoryRef = useRef<string[]>([])
  const pitchHistoryRef = useRef<number[]>([])
  const completionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastSpeechTimeRef = useRef<number>(0)

  // Background noise estimation
  const noiseFloorRef = useRef({
    rms: 0.001,
    zcr: 0.1,
    spectralCentroid: 1000,
    lastUpdate: Date.now()
  })

  // State machine counters - combining both systems
  const speechFrameCountRef = useRef(0)
  const silenceFrameCountRef = useRef(0)
  const featureHistoryRef = useRef<number[]>([])

  // Audio buffer management
  const [audioBuffers, setAudioBuffers] = useState<Float32Array[]>([])
  const [currentUtterance, setCurrentUtterance] = useState<Float32Array[]>([])

  // Visualization data
  const [waveformData, setWaveformData] = useState<number[]>([])
  const [spectrumData, setSpectrumData] = useState<number[]>([])

  // Feature extraction functions - combining all algorithms
  const calculateRMS = useCallback((buffer: Float32Array): number => {
    let sum = 0
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i] * buffer[i]
    }
    return Math.sqrt(sum / buffer.length)
  }, [])

  const calculateZCR = useCallback((buffer: Float32Array): number => {
    let crossings = 0
    for (let i = 1; i < buffer.length; i++) {
      if ((buffer[i] > 0 && buffer[i - 1] <= 0) || (buffer[i] < 0 && buffer[i - 1] >= 0)) {
        crossings++
      }
    }
    return crossings / buffer.length
  }, [])

  const calculateSpectralCentroid = useCallback((buffer: Float32Array, sampleRate: number): number => {
    const fftSize = Math.min(2048, buffer.length)
    const fft = new Float32Array(fftSize / 2)

    // Simple DFT (simplified for real-time performance)
    for (let k = 0; k < fftSize / 2; k++) {
      let real = 0, imag = 0
      for (let n = 0; n < fftSize && n < buffer.length; n++) {
        const angle = -2 * Math.PI * k * n / fftSize
        real += buffer[n] * Math.cos(angle)
        imag += buffer[n] * Math.sin(angle)
      }
      fft[k] = Math.sqrt(real * real + imag * imag)
    }

    let numerator = 0, denominator = 0
    for (let k = 0; k < fft.length; k++) {
      const freq = k * sampleRate / fftSize
      numerator += freq * fft[k]
      denominator += fft[k]
    }

    return denominator > 0 ? numerator / denominator : 0
  }, [])

  const calculateSNR = useCallback((signalRMS: number, noiseRMS: number): number => {
    if (noiseRMS === 0) return Infinity
    return 20 * Math.log10(signalRMS / noiseRMS)
  }, [])

  const calculateAutocorrelation = useCallback((buffer: Float32Array, lag: number = 100): number => {
    let sum = 0
    for (let i = lag; i < buffer.length; i++) {
      sum += buffer[i] * buffer[i - lag]
    }
    return sum / (buffer.length - lag)
  }, [])

  const applyVoiceFrequencyFilter = useCallback((buffer: Float32Array): Float32Array => {
    // Simple bandpass filter for voice frequencies (300-3400Hz)
    const filtered = new Float32Array(buffer.length)

    // Design simple IIR bandpass filter
    // Note: coefficients are pre-calculated for 300-3400Hz voice frequency range

    // Coefficients for 2nd order bandpass filter (pre-calculated for voice frequencies)
    const a = [1, -1.5, 0.75] // denominator
    const b = [0.25, 0, -0.25] // numerator

    let x1 = 0, x2 = 0, y1 = 0, y2 = 0

    for (let i = 0; i < buffer.length; i++) {
      const x0 = buffer[i]
      const y0 = b[0] * x0 + b[1] * x1 + b[2] * x2 - a[1] * y1 - a[2] * y2

      filtered[i] = y0

      x2 = x1; x1 = x0
      y2 = y1; y1 = y0
    }

    return filtered
  }, [])

  // Prosodic Analysis Functions (from Advanced VAD)
  const calculatePitchContour = useCallback((buffer: Float32Array, sampleRate: number): number => {
    // Simplified pitch detection using autocorrelation
    const frameSize = Math.min(1024, buffer.length)
    const correlations = new Array(frameSize / 2).fill(0)

    for (let lag = 20; lag < frameSize / 2; lag++) { // Min pitch ~80Hz, max ~1000Hz
      let correlation = 0
      for (let i = 0; i < frameSize - lag; i++) {
        correlation += buffer[i] * buffer[i + lag]
      }
      correlations[lag] = correlation / (frameSize - lag)
    }

    // Find peak correlation (fundamental frequency)
    let maxCorrelation = 0
    let bestLag = 0
    for (let i = 20; i < correlations.length; i++) {
      if (correlations[i] > maxCorrelation) {
        maxCorrelation = correlations[i]
        bestLag = i
      }
    }

    // Convert lag to pitch (Hz)
    const pitch = bestLag > 0 ? sampleRate / bestLag : 0

    // Normalize to 0-1 scale (typical speech pitch range 80-400Hz)
    return Math.max(0, Math.min(1, (pitch - 80) / 320))
  }, [])

  const analyzeIntonation = useCallback((pitchValues: number[]): 'rising' | 'falling' | 'neutral' => {
    if (pitchValues.length < 5) return 'neutral'

    const recent = pitchValues.slice(-5)
    const trend = recent[recent.length - 1] - recent[0]
    const threshold = 0.1

    if (trend > threshold) return 'rising'
    if (trend < -threshold) return 'falling'
    return 'neutral'
  }, [])

  const calculateSpeechRate = useCallback((transcript: string, timeWindow: number): number => {
    // Estimate words per minute
    const words = transcript.trim().split(/\s+/).length
    const minutes = timeWindow / 60000
    const wpm = words / minutes

    // Normalize: typical speech is 120-160 WPM
    return Math.max(0, Math.min(1, (wpm - 100) / 100))
  }, [])

  const analyzeEnergyPattern = useCallback((buffer: Float32Array): number => {
    // Analyze vowel vs consonant energy distribution
    const frameSize = 256
    const frames = []

    for (let i = 0; i < buffer.length - frameSize; i += frameSize) {
      const frame = buffer.slice(i, i + frameSize)
      const energy = frame.reduce((sum, val) => sum + val * val, 0) / frameSize
      frames.push(Math.sqrt(energy))
    }

    if (frames.length < 3) return 0.5

    // Look for energy patterns typical of sentence endings
    const recent = frames.slice(-3)
    const avgRecent = recent.reduce((a, b) => a + b, 0) / recent.length
    const avgOverall = frames.reduce((a, b) => a + b, 0) / frames.length

    // Higher energy in recent frames might indicate completion
    return Math.max(0, Math.min(1, avgRecent / (avgOverall + 0.001)))
  }, [])

  const analyzePauseContext = useCallback((currentTime: number, lastSpeechTime: number): number => {
    const pauseDuration = currentTime - lastSpeechTime
    // Typical short pause after complete thought: 500-2000ms
    const optimalPause = 750
    const deviation = Math.abs(pauseDuration - optimalPause)
    return Math.max(0, 1 - deviation / 1000)
  }, [])

  const analyzeStressPattern = useCallback((buffer: Float32Array): number => {
    // Analyze energy variations (stress patterns)
    const frameSize = 512
    const energies = []

    for (let i = 0; i < buffer.length - frameSize; i += frameSize) {
      const frame = buffer.slice(i, i + frameSize)
      const energy = frame.reduce((sum, val) => sum + val * val, 0) / frameSize
      energies.push(Math.sqrt(energy))
    }

    if (energies.length < 5) return 0.5

    // Calculate energy variation coefficient
    const mean = energies.reduce((a, b) => a + b, 0) / energies.length
    const variance = energies.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / energies.length
    const stdDev = Math.sqrt(variance)

    // Normalize coefficient of variation
    return Math.max(0, Math.min(1, stdDev / (mean + 0.001)))
  }, [])

  // Linguistic Analysis Functions (from Advanced VAD)
  const analyzeGrammarPattern = useCallback((transcript: string): number => {
    if (!transcript.trim()) return 0

    let score = 0

    // Check for sentence-ending punctuation patterns
    const endsWithPeriod = transcript.trim().endsWith('.') || transcript.trim().endsWith('!')
    const endsWithQuestion = transcript.trim().endsWith('?')
    const endsWithCompleteThought = /\b(is|are|was|were|has|have|had|will|would|can|could|should|may|might|must|do|does|did|make|makes|made|get|gets|got|take|takes|took|come|comes|came|go|goes|went|see|sees|saw|know|knows|knew|think|thinks|thought|say|says|said|want|wants|wanted|need|needs|needed|feel|feels|felt|look|looks|looked|work|works|worked|use|uses|used|find|finds|found|give|gives|gave|tell|tells|told|ask|asks|asked|try|tries|tried|call|calls|called|wait|waits|waited)\b.*[.!?]$/i.test(transcript)

    if (endsWithPeriod) score += 0.4
    if (endsWithQuestion) score += 0.5
    if (endsWithCompleteThought) score += 0.6

    // Check for complete sentence structure
    const hasSubject = /\b(I|you|he|she|it|we|they|this|that|these|those|my|your|his|her|its|our|their)\b/i.test(transcript)
    const hasVerb = /\b(am|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|can|could|should|may|might|must|make|get|take|come|go|see|know|think|say|want|need|feel|look|work|use|find|give|tell|ask|try|call|wait)\b/i.test(transcript)

    if (hasSubject && hasVerb) score += 0.3

    return Math.min(1, score)
  }, [])

  const detectWordBoundaries = useCallback((transcript: string): number[] => {
    const words = transcript.trim().split(/\s+/)
    const boundaries = []

    for (let i = 0; i < words.length; i++) {
      const word = words[i]

      // Check for words that typically end sentences
      const sentenceEnders = /\b(and|but|or|so|because|although|though|while|since|unless|if|when|where|why|how|what|which|who|whose|whom|that|then|after|before|during|while|until|as|like|such|rather|whether|either|neither|both|all|some|any|many|much|few|little|most|several|enough|various|different|similar|same|other|another|each|every|either|neither)\b/i

      if (sentenceEnders.test(word)) {
        boundaries.push(i)
      }
    }

    return boundaries
  }, [])

  const calculateSemanticConfidence = useCallback((transcript: string): number => {
    if (!transcript.trim()) return 0

    let confidence = 0

    // Length-based confidence (longer utterances are more likely complete)
    const wordCount = transcript.trim().split(/\s+/).length
    confidence += Math.min(0.3, wordCount / 20)

    // Structure-based confidence
    const hasCompleteStructure = /^[A-Z][^.!?]*[.!?]$/.test(transcript.trim())
    if (hasCompleteStructure) confidence += 0.4

    // Coherence indicators
    const coherenceWords = /\b(therefore|however|moreover|furthermore|consequently|accordingly|similarly|likewise|contrastingly|additionally|specifically|generally|particularly|especially|importantly|significantly|notably|remarkably|interestingly|surprisingly|unfortunately|fortunately|clearly|obviously|apparently|presumably|arguably|certainly|definitely|absolutely|completely|totally|entirely|fully|thoroughly|carefully|attentively|closely|directly|immediately|instantly|quickly|rapidly|slowly|gradually|steadily|continuously|constantly|always|never|sometimes|often|usually|generally|frequently|occasionally|seldom|rarely)\b/i
    if (coherenceWords.test(transcript)) confidence += 0.2

    // Topic completeness indicators
    const completeIndicators = /\b(in conclusion|to summarize|to sum up|in summary|finally|ultimately|essentially|basically|fundamentally|overall|in general|on the whole|by and large|all in all|at the end of the day|when all is said and done)\b/i
    if (completeIndicators.test(transcript)) confidence += 0.3

    return Math.min(1, confidence)
  }, [])

  // Enhanced Completion Detection Functions
  const detectFillerWords = useCallback((transcript: string): string[] => {
    const fillerPatterns = [
      /\b(mmm|mmmh|mmhm|mm-hmm|hmm|hum|uh|uhh|um|umm|uh-huh|uh-uh|er|erm|ah|ahh|oh|ohh|eh|ehh)\b/gi,
      /\b(like|you know|sort of|kind of|sorta|kinda|well|so|okay|alright|right|yeah|yes|yep|sure|totally|actually|basically|literally|seriously|honestly|apparently|supposedly|probably|maybe|perhaps)\b/gi,
      /\b(i mean|i think|i guess|i suppose|i wonder|i dunno|i don't know)\b/gi
    ]

    const detectedFillers: string[] = []
    fillerPatterns.forEach(pattern => {
      const matches = transcript.match(pattern)
      if (matches) {
        detectedFillers.push(...matches)
      }
    })

    return [...new Set(detectedFillers)] // Remove duplicates
  }, [])

  const analyzeHesitationPatterns = useCallback((transcript: string, prosodic: ProsodicFeatures): boolean => {
    // Detect hesitation patterns
    const hesitationIndicators = [
      detectFillerWords(transcript).length > 0,
      prosodic.speechRate < 0.3, // Very slow speech rate
      prosodic.energyPattern < 0.2, // Low energy variations
      transcript.split(' ').length < 3 // Very short utterances
    ]

    // Hesitation if multiple indicators are present
    return hesitationIndicators.filter(Boolean).length >= 2
  }, [detectFillerWords])

  const analyzePausePatterns = useCallback((
    timeSinceLastSpeech: number,
    hasFillers: boolean,
    intonation: string,
    transcriptLength: number
  ): 'thinking' | 'complete' | 'interrupted' | 'unknown' => {

    // Very short pauses (0-500ms) - likely thinking or hesitation
    if (timeSinceLastSpeech < 500) {
      return 'thinking'
    }

    // Medium pauses (500-1500ms) with fillers - likely thinking
    if (timeSinceLastSpeech >= 500 && timeSinceLastSpeech < 1500 && hasFillers) {
      return 'thinking'
    }

    // Medium pauses (500-1500ms) without fillers - could be complete
    if (timeSinceLastSpeech >= 500 && timeSinceLastSpeech < 1500 && !hasFillers) {
      return transcriptLength > 5 ? 'complete' : 'thinking'
    }

    // Longer pauses (1500-3000ms) - likely complete
    if (timeSinceLastSpeech >= 1500 && timeSinceLastSpeech < 3000) {
      return 'complete'
    }

    // Very long pauses (3000ms+) - definitely complete or interrupted
    if (timeSinceLastSpeech >= 3000) {
      return 'complete'
    }

    return 'unknown'
  }, [])

  const calculateAdvancedCompletionScore = useCallback((
    prosodic: ProsodicFeatures,
    linguistic: LinguisticFeatures,
    audio: AudioFeatures,
    timeSinceLastSpeech: number,
    fillerWords: string[]
  ): SpeechCompletionAnalysis => {

    const hasFillers = fillerWords.length > 0
    const isHesitating = analyzeHesitationPatterns(linguistic.transcript, prosodic)
    const pausePattern = analyzePausePatterns(timeSinceLastSpeech, hasFillers, prosodic.intonation, linguistic.transcript.length)

    // Base scores from existing logic
    const prosodicScore = (
      (prosodic.intonation === 'falling' ? config.intonationThreshold : 0) +
      (prosodic.pitchContour > config.pitchThreshold ? 0.3 : 0) +
      (prosodic.speechRate < config.speechRateThreshold ? 0.2 : 0) +
      (prosodic.energyPattern > config.energyPatternThreshold ? 0.2 : 0) +
      (prosodic.pauseContext > config.pauseContextThreshold ? 0.2 : 0) +
      (prosodic.stressPattern > config.stressPatternThreshold ? 0.1 : 0)
    ) / 1.2

    const linguisticScore = (
      (linguistic.grammarScore > config.grammarConfidenceThreshold ? 0.4 : 0) +
      (linguistic.wordBoundaries.length > 0 ? 0.3 : 0) +
      (linguistic.semanticConfidence > config.semanticConfidenceThreshold ? 0.3 : 0)
    )

    const audioScore = audio.confidence

    // Enhanced completion logic
    let completionScore = 0
    let isComplete = false
    let reason = 'Analyzing speech patterns...'
    let confidence = 0

    // Hesitation detection reduces completion confidence
    if (isHesitating && pausePattern === 'thinking') {
      completionScore = Math.max(0, (prosodicScore + linguisticScore + audioScore) / 3 - 0.3)
      reason = 'Hesitation detected - user may still be thinking'
    }
    // Fillers at end reduce confidence
    else if (hasFillers && pausePattern === 'thinking') {
      completionScore = Math.max(0, (prosodicScore + linguisticScore + audioScore) / 3 - 0.2)
      reason = 'Filler words detected - speech may continue'
    }
    // Strong completion indicators
    else if (pausePattern === 'complete' && prosodic.intonation === 'falling' && linguistic.grammarScore > 0.6) {
      completionScore = Math.min(1, (prosodicScore + linguisticScore + audioScore) / 3 + 0.2)
      isComplete = completionScore > 0.7
      reason = 'Strong completion indicators detected'
    }
    // Moderate completion
    else if (pausePattern === 'complete' && (linguistic.semanticConfidence > 0.7 || linguistic.grammarScore > 0.7)) {
      completionScore = Math.min(1, (prosodicScore + linguisticScore + audioScore) / 3 + 0.1)
      isComplete = completionScore > 0.6
      reason = 'Moderate completion indicators'
    }
    else {
      completionScore = (prosodicScore + linguisticScore + audioScore) / 3
      isComplete = completionScore > 0.8
      reason = 'Standard completion analysis'
    }

    confidence = completionScore

    return {
      isComplete,
      confidence,
      reason,
      hesitationDetected: isHesitating,
      fillerWordsDetected: fillerWords,
      pausePattern,
      timeSinceLastSpeech,
      completionScore
    }
  }, [config, analyzeHesitationPatterns, analyzePausePatterns])

  // Enhanced Multi-modal Decision Logic with Advanced Completion Detection
  const makeCompletionDecision = useCallback((
    prosodic: ProsodicFeatures,
    linguistic: LinguisticFeatures,
    audio: AudioFeatures
  ): CompletionDecision => {

    const timeSinceLastSpeech = Date.now() - lastSpeechTimeRef.current
    const fillerWords = detectFillerWords(linguistic.transcript)

    // Use the advanced completion analysis
    const advancedAnalysis = calculateAdvancedCompletionScore(
      prosodic,
      linguistic,
      audio,
      timeSinceLastSpeech,
      fillerWords
    )

    return {
      isComplete: advancedAnalysis.isComplete,
      confidence: advancedAnalysis.confidence,
      reason: advancedAnalysis.reason,
      features: { prosodic, linguistic, audio },
      // Add advanced analysis data
      hesitationDetected: advancedAnalysis.hesitationDetected,
      fillerWordsDetected: advancedAnalysis.fillerWordsDetected,
      pausePattern: advancedAnalysis.pausePattern,
      timeSinceLastSpeech: advancedAnalysis.timeSinceLastSpeech,
      completionScore: advancedAnalysis.completionScore
    }
  }, [detectFillerWords, calculateAdvancedCompletionScore])

  // Core VAD functions
  const updateNoiseFloor = useCallback((features: AudioFeatures) => {
    const now = Date.now()
    const timeSinceLastUpdate = now - noiseFloorRef.current.lastUpdate

    // Update noise floor with exponential moving average
    const alpha = Math.min(timeSinceLastUpdate / 10000, 0.1) // Adapt over ~10 seconds

    noiseFloorRef.current.rms = noiseFloorRef.current.rms * (1 - alpha) + features.rms * alpha
    noiseFloorRef.current.zcr = noiseFloorRef.current.zcr * (1 - alpha) + features.zcr * alpha
    noiseFloorRef.current.spectralCentroid =
      noiseFloorRef.current.spectralCentroid * (1 - alpha) + features.spectralCentroid * alpha

    noiseFloorRef.current.lastUpdate = now
  }, [])

  const smoothFeatures = useCallback((newValue: number): number => {
    featureHistoryRef.current.push(newValue)
    if (featureHistoryRef.current.length > config.smoothingWindow) {
      featureHistoryRef.current.shift()
    }

    const sum = featureHistoryRef.current.reduce((a, b) => a + b, 0)
    return sum / featureHistoryRef.current.length
  }, [config.smoothingWindow])

  const calculateAudioConfidence = useCallback((features: AudioFeatures): number => {
    // Multi-criteria confidence scoring for basic VAD
    let confidence = 0

    // Energy above noise floor
    const energyScore = Math.min(features.rms / (noiseFloorRef.current.rms * 2), 1)
    confidence += energyScore * 0.3

    // ZCR in human voice range
    const zcrScore = 1 - Math.abs(features.zcr - 0.2) / 0.3 // Optimal ZCR around 0.2
    confidence += Math.max(0, zcrScore) * 0.2

    // Spectral centroid in voice range
    const centroidScore = features.spectralCentroid > config.voiceFreqMin &&
                         features.spectralCentroid < config.voiceFreqMax ? 1 : 0
    confidence += centroidScore * 0.2

    // SNR above threshold
    const snrScore = Math.min(features.snr / 20, 1) // Normalize SNR to 0-1
    confidence += snrScore * 0.15

    // Autocorrelation indicates periodicity
    const autocorrScore = Math.max(0, features.autocorrelation)
    confidence += autocorrScore * 0.15

    return Math.min(confidence, 1)
  }, [config.voiceFreqMin, config.voiceFreqMax])

  const processAudioFrame = useCallback((buffer: Float32Array) => {
    // Apply voice frequency filter
    const filteredBuffer = applyVoiceFrequencyFilter(buffer)

    // Extract AUDIO features (basic VAD)
    const rms = calculateRMS(filteredBuffer)
    const zcr = calculateZCR(filteredBuffer)
    const spectralCentroid = calculateSpectralCentroid(filteredBuffer, config.sampleRate)
    const snr = calculateSNR(rms, noiseFloorRef.current.rms)
    const autocorrelation = calculateAutocorrelation(filteredBuffer)

    const rawAudioFeatures: AudioFeatures = {
      rms, zcr, spectralCentroid, snr, autocorrelation, confidence: 0
    }

    // Update noise floor during silence periods
    if (vadState === VADState.SILENCE) {
      updateNoiseFloor(rawAudioFeatures)
    }

    // Smooth audio features
    const smoothedRMS = smoothFeatures(rms)
    const smoothedZCR = smoothFeatures(zcr)
    const smoothedCentroid = smoothFeatures(spectralCentroid)

    const smoothedAudioFeatures: AudioFeatures = {
      rms: smoothedRMS,
      zcr: smoothedZCR,
      spectralCentroid: smoothedCentroid,
      snr,
      autocorrelation,
      confidence: 0
    }

    // Calculate audio confidence
    smoothedAudioFeatures.confidence = calculateAudioConfidence(smoothedAudioFeatures)

    // Extract PROSODIC features
    const pitchContour = calculatePitchContour(filteredBuffer, config.sampleRate)
    pitchHistoryRef.current.push(pitchContour)
    if (pitchHistoryRef.current.length > 10) {
      pitchHistoryRef.current.shift()
    }

    const prosodicFeatures: ProsodicFeatures = {
      pitchContour,
      intonation: analyzeIntonation(pitchHistoryRef.current),
      speechRate: calculateSpeechRate(currentLinguisticFeatures.transcript, 5000),
      energyPattern: analyzeEnergyPattern(filteredBuffer),
      pauseContext: analyzePauseContext(Date.now(), lastSpeechTimeRef.current),
      stressPattern: analyzeStressPattern(filteredBuffer)
    }

    // Update state with current features
    setCurrentAudioFeatures(smoothedAudioFeatures)
    setCurrentProsodicFeatures(prosodicFeatures)

    // VAD Decision Logic with Hysteresis (Basic Audio VAD)
    const currentThreshold = vadState === VADState.SILENCE || vadState === VADState.SPEECH_END
      ? config.hysteresisStartThreshold
      : config.hysteresisEndThreshold

    const isSpeechFrame = smoothedAudioFeatures.confidence > config.confidenceThreshold &&
                         smoothedAudioFeatures.rms > currentThreshold &&
                         smoothedAudioFeatures.spectralCentroid > config.voiceFreqMin &&
                         smoothedAudioFeatures.spectralCentroid < config.voiceFreqMax

    // Basic VAD State machine
    switch (vadState) {
      case VADState.SILENCE:
        if (isSpeechFrame) {
          speechFrameCountRef.current++
          if (speechFrameCountRef.current >= config.minSpeechFrames) {
            setVadState(VADState.SPEECH_START)
            speechFrameCountRef.current = 0
          }
        } else {
          speechFrameCountRef.current = 0
        }
        break

      case VADState.SPEECH_START:
        if (isSpeechFrame) {
          setVadState(VADState.SPEECH)
          // Start collecting audio buffer
          setCurrentUtterance([buffer.slice()])
        } else {
          setVadState(VADState.SILENCE)
        }
        break

      case VADState.SPEECH:
        if (isSpeechFrame) {
          silenceFrameCountRef.current = 0
          // Continue collecting audio
          setCurrentUtterance(prev => [...prev, buffer.slice()])
        } else {
          silenceFrameCountRef.current++
          if (silenceFrameCountRef.current >= config.hangoverFrames) {
            setVadState(VADState.SPEECH_END)
            silenceFrameCountRef.current = 0
          }
        }
        break

      case VADState.SPEECH_END:
        // Save the completed utterance
        if (currentUtterance.length > 0) {
          // Concatenate all Float32Arrays in the utterance
          const totalLength = currentUtterance.reduce((sum, arr) => sum + arr.length, 0)
          const combinedBuffer = new Float32Array(totalLength)
          let offset = 0
          for (const buffer of currentUtterance) {
            combinedBuffer.set(buffer, offset)
            offset += buffer.length
          }
          setAudioBuffers(prev => [...prev, combinedBuffer])
          setCurrentUtterance([])
        }
        setVadState(VADState.SILENCE)
        break
    }

    // Completion Decision Logic (Advanced Linguistic + Prosodic)
    const decision = makeCompletionDecision(
      prosodicFeatures,
      currentLinguisticFeatures,
      smoothedAudioFeatures
    )

    setCompletionDecision(decision)

    // Update completion state based on advanced decision
    const advancedDecision = decision as CompletionDecision & SpeechCompletionAnalysis
    const timeSinceLastSpeech = Date.now() - lastSpeechTimeRef.current

    // Check for long pause that might indicate completion (even without full analysis confirmation)
    const isLongPause = timeSinceLastSpeech > 2500 && currentLinguisticFeatures.transcript.length > 0

    if (advancedDecision.hesitationDetected && advancedDecision.pausePattern === 'thinking') {
      // User is hesitating - show hesitating state
      setCompletionState(CompletionState.HESITATING)

      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current)
        completionTimeoutRef.current = null
      }
    } else if (advancedDecision.isComplete && advancedDecision.confidence > 0.7) {
      // Strong completion indicators
      setCompletionState(CompletionState.POTENTIALLY_COMPLETE)

      // Set timeout for confirmation
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current)
      }

      completionTimeoutRef.current = setTimeout(() => {
        setCompletionState(CompletionState.CONFIRMED_COMPLETE)
        setCompletionTrigger('ai')
        setShowCompletionBanner(true)
        setShouldStopRecording(true) // Signal to stop recording

        // Auto-hide banner after 5 seconds
        setTimeout(() => {
          setShowCompletionBanner(false)
          setCompletionTrigger(null)
        }, 5000)
      }, config.completionTimeout)
    } else if (isLongPause && !advancedDecision.hesitationDetected) {
      // Long pause with no hesitation detected - likely user completed their thought
      setCompletionState(CompletionState.CONFIRMED_COMPLETE)
      setCompletionTrigger('pause')
      setShowCompletionBanner(true)
      setShouldStopRecording(true) // Signal to stop recording

      // Show completion feedback for pause-based completion
      setTimeout(() => {
        setShowCompletionBanner(false)
        setCompletionTrigger(null)
      }, 4000) // Shorter duration for pause-based completion
    } else if (advancedDecision.confidence < 0.3) {
      // Low confidence - likely incomplete
      setCompletionState(CompletionState.INCOMPLETE)

      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current)
        completionTimeoutRef.current = null
      }
    } else if (advancedDecision.pausePattern === 'complete' && !advancedDecision.hesitationDetected) {
      // Pause suggests completion but check for hesitation
      setCompletionState(CompletionState.POTENTIALLY_COMPLETE)
    } else {
      // Default to incomplete
      setCompletionState(CompletionState.INCOMPLETE)
    }

    // Update visualization data
    setWaveformData(Array.from(buffer.slice(0, 100)))
    if (analyserRef.current) {
      const spectrum = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(spectrum)
      setSpectrumData(Array.from(spectrum.slice(0, 100)))
    }
  }, [vadState, config, calculateRMS, calculateZCR, calculateSpectralCentroid, calculateSNR, calculateAutocorrelation, applyVoiceFrequencyFilter, updateNoiseFloor, smoothFeatures, calculateAudioConfidence, calculatePitchContour, analyzeIntonation, calculateSpeechRate, analyzeEnergyPattern, analyzePauseContext, analyzeStressPattern, makeCompletionDecision, currentLinguisticFeatures, currentUtterance])

  // Audio processing setup - combining Web Audio API + Speech Recognition
  const setupAudioProcessing = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: config.sampleRate,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      streamRef.current = stream
      audioContextRef.current = new AudioContext({ sampleRate: config.sampleRate })
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 2048

      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream)
      microphoneRef.current.connect(analyserRef.current)

      // Setup Speech Recognition (for linguistic analysis)
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        speechRecognitionRef.current = new SpeechRecognition()
        const recognition = speechRecognitionRef.current
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = ''
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          if (finalTranscript) {
            transcriptHistoryRef.current.push(finalTranscript)
            lastSpeechTimeRef.current = Date.now()
          }

          const currentTranscript = transcriptHistoryRef.current.join(' ') + interimTranscript

          // Update linguistic features
          const linguistic: LinguisticFeatures = {
            transcript: currentTranscript,
            isComplete: analyzeGrammarPattern(currentTranscript) > config.grammarConfidenceThreshold,
            grammarScore: analyzeGrammarPattern(currentTranscript),
            wordBoundaries: detectWordBoundaries(currentTranscript),
            semanticConfidence: calculateSemanticConfidence(currentTranscript)
          }

          setCurrentLinguisticFeatures(linguistic)
        }
      }

      // Create script processor for real-time audio analysis
      processorRef.current = audioContextRef.current.createScriptProcessor(config.frameSize, 1, 1)
      processorRef.current.onaudioprocess = (event) => {
        const inputBuffer = event.inputBuffer.getChannelData(0)
        processAudioFrame(inputBuffer)
      }

      analyserRef.current.connect(processorRef.current)
      processorRef.current.connect(audioContextRef.current.destination)

    } catch (error) {
      console.error('Error setting up advanced audio processing:', error)
      throw error
    }
  }, [config.sampleRate, config.frameSize, config.grammarConfidenceThreshold, processAudioFrame, analyzeGrammarPattern, detectWordBoundaries, calculateSemanticConfidence])

  const startRecording = useCallback(async () => {
    try {
      await setupAudioProcessing()
      speechRecognitionRef.current?.start()
      setIsRecording(true)
      setCompletionState(CompletionState.INCOMPLETE)
      transcriptHistoryRef.current = []
      pitchHistoryRef.current = []
      lastSpeechTimeRef.current = Date.now()
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }, [setupAudioProcessing])

  const stopRecording = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop()
    }
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current)
    }
    setIsRecording(false)
    setVadState(VADState.SILENCE)
    setCompletionState(CompletionState.INCOMPLETE)
    speechFrameCountRef.current = 0
    silenceFrameCountRef.current = 0
    setCurrentUtterance([])
  }, [])

  const resetAnalysis = useCallback(() => {
    setCompletionState(CompletionState.INCOMPLETE)
    setShowCompletionBanner(false)
    setCompletionTrigger(null)
    setShouldStopRecording(false)
    setCompletionDecision({
      isComplete: false,
      confidence: 0,
      reason: 'Analysis reset',
      features: {
        prosodic: currentProsodicFeatures,
        linguistic: currentLinguisticFeatures,
        audio: currentAudioFeatures
      }
    })
    transcriptHistoryRef.current = []
    pitchHistoryRef.current = []
    setCurrentLinguisticFeatures({
      transcript: '',
      isComplete: false,
      grammarScore: 0,
      wordBoundaries: [],
      semanticConfidence: 0
    })
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current)
      completionTimeoutRef.current = null
    }
  }, [currentProsodicFeatures, currentLinguisticFeatures, currentAudioFeatures])

  const clearBuffers = useCallback(() => {
    setAudioBuffers([])
    setCurrentUtterance([])
  }, [])

  const playBuffer = useCallback((buffer: Float32Array) => {
    if (!audioContextRef.current) return

    const audioBuffer = audioContextRef.current.createBuffer(1, buffer.length, config.sampleRate)
    audioBuffer.copyFromChannel(buffer.slice(), 0, 0)

    const source = audioContextRef.current.createBufferSource()
    source.buffer = audioBuffer
    source.connect(audioContextRef.current.destination)
    source.start()
  }, [config.sampleRate])

  // Handle automatic stopping when completion is detected
  useEffect(() => {
    if (shouldStopRecording && isRecording) {
      stopRecording()
      setShouldStopRecording(false)
    }
  }, [shouldStopRecording, isRecording, stopRecording])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording()
    }
  }, [stopRecording])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Global Success Banner - Shows when speech is completed */}
      {showCompletionBanner && completionState === CompletionState.CONFIRMED_COMPLETE && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 shadow-lg transform transition-all duration-500 ease-out animate-in slide-in-from-top">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
            <span className="text-3xl animate-bounce">🎉</span>
            <div className="text-center">
              <div className="text-xl font-bold">
                {completionTrigger === 'pause' ? 'SPEECH COMPLETED - PAUSE DETECTED!' : 'SPEECH COMPLETED SUCCESSFULLY!'}
              </div>
              <div className="text-sm opacity-90">
                {completionTrigger === 'pause'
                  ? 'Detected completion based on pause pattern'
                  : 'Advanced AI analysis confirmed speech completion'
                }
              </div>
            </div>
            <span className="text-3xl animate-bounce">✅</span>
          </div>
        </div>
      )}

      <div className={`max-w-6xl mx-auto space-y-6 ${completionState === CompletionState.CONFIRMED_COMPLETE ? 'pt-24' : ''}`}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Ultimate Voice Activity Detection (VAD)
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Complete multi-modal sentence completion detection combining acoustic, prosodic, and linguistic analysis
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Control Panel */}
            <div className="flex gap-4 items-center">
              {!isRecording ? (
                <Button onClick={startRecording} className="flex-1" size="lg">
                  <Mic className="w-4 h-4 mr-2" />
                  Start Ultimate VAD
                </Button>
              ) : (
                <Button onClick={stopRecording} variant="destructive" className="flex-1" size="lg">
                  <Square className="w-4 h-4 mr-2" />
                  Stop Analysis
                </Button>
              )}

              <Button onClick={clearBuffers} variant="outline" size="lg">
                Clear Buffers
              </Button>

              <Button onClick={resetAnalysis} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Analysis
              </Button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4 flex-wrap">
              <Badge variant={vadState === VADState.SPEECH ? 'default' : 'secondary'}>
                VAD State: {vadState.replace('_', ' ').toUpperCase()}
              </Badge>
              <Badge variant={
                completionState === CompletionState.CONFIRMED_COMPLETE ? 'default' :
                completionState === CompletionState.HESITATING ? 'destructive' :
                completionState === CompletionState.POTENTIALLY_COMPLETE ? 'secondary' :
                'outline'
              }>
                Completion: {completionState.replace('_', ' ').toUpperCase()}
                {completionTrigger && (
                  <span className="ml-1 text-xs">
                    ({completionTrigger === 'pause' ? 'Pause' : 'AI'})
                  </span>
                )}
              </Badge>
              <Badge variant={isRecording ? 'default' : 'secondary'}>
                Recording: {isRecording ? 'ON' : 'OFF'}
              </Badge>
              <Badge variant="outline">
                Confidence: {(completionDecision.confidence * 100).toFixed(1)}%
              </Badge>
              {completionDecision.hesitationDetected && (
                <Badge variant="destructive" className="animate-pulse">
                  🤔 Hesitating
                </Badge>
              )}
              {completionDecision.fillerWordsDetected && completionDecision.fillerWordsDetected.length > 0 && (
                <Badge variant="secondary">
                  💬 Fillers: {completionDecision.fillerWordsDetected.slice(0, 2).join(', ')}
                  {completionDecision.fillerWordsDetected.length > 2 && '...'}
                </Badge>
              )}
            </div>

            {/* Live Text Display - Prominent and Large */}
            <Card className={`border-4 ${
              completionState === CompletionState.CONFIRMED_COMPLETE
                ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg shadow-green-200'
                : completionState === CompletionState.HESITATING
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-blue-200 bg-blue-50'
            } transition-all duration-500 ${
              completionState === CompletionState.CONFIRMED_COMPLETE ? 'animate-pulse' : ''
            }`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-2xl flex items-center gap-2 ${
                  completionState === CompletionState.CONFIRMED_COMPLETE
                    ? 'text-green-800 font-bold'
                    : completionState === CompletionState.HESITATING
                    ? 'text-yellow-800'
                    : 'text-blue-800'
                }`}>
                  {completionState === CompletionState.CONFIRMED_COMPLETE ? (
                    <>
                      <span className="text-3xl animate-bounce">🎉</span>
                      <span className="bg-green-600 text-white px-4 py-1 rounded-full text-lg font-bold shadow-lg">
                        SPEECH COMPLETED!
                      </span>
                    </>
                  ) : completionState === CompletionState.HESITATING ? (
                    <>
                      <span className="text-2xl">🤔</span>
                      User Thinking...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Live Speech-to-Text
                    </>
                  )}
                </CardTitle>

                {completionState === CompletionState.CONFIRMED_COMPLETE && (
                  <div className="mt-2">
                    <div className="bg-green-600 text-white px-6 py-3 rounded-lg text-center shadow-lg">
                      <div className="text-2xl font-bold mb-1">✅ USER SPEECH COMPLETE!</div>
                      <div className="text-sm opacity-90">Ready for next input or action</div>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className={`min-h-[120px] rounded-lg border-2 ${
                  completionState === CompletionState.CONFIRMED_COMPLETE
                    ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100 shadow-inner'
                    : completionState === CompletionState.HESITATING
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-dashed border-blue-300 bg-white'
                } p-6 flex items-center justify-center transition-all duration-500 ${
                  completionState === CompletionState.CONFIRMED_COMPLETE ? 'shadow-lg shadow-green-300/50' : ''
                }`}>
                  <div className="text-center">
                    {currentLinguisticFeatures.transcript ? (
                      <div className={`text-2xl md:text-3xl font-medium leading-relaxed ${
                        completionState === CompletionState.CONFIRMED_COMPLETE
                          ? 'text-green-800 font-bold'
                          : completionState === CompletionState.HESITATING
                          ? 'text-yellow-700'
                          : 'text-gray-800'
                      }`}>
                        {currentLinguisticFeatures.transcript}
                        {completionState === CompletionState.HESITATING && (
                          <span className="animate-pulse text-yellow-500 text-4xl">...</span>
                        )}
                        {completionState !== CompletionState.CONFIRMED_COMPLETE &&
                         !currentLinguisticFeatures.transcript.endsWith(' ') &&
                         isRecording &&
                         completionState !== CompletionState.HESITATING && (
                          <span className="animate-pulse text-blue-500">|</span>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-lg">
                        {isRecording ? (
                          <span>Listening... Speak to see live transcription</span>
                        ) : (
                          <span>Click &quot;Start Ultimate VAD&quot; to begin transcription</span>
                        )}
                      </div>
                    )}

                    {completionState === CompletionState.CONFIRMED_COMPLETE && (
                      <div className="mt-4">
                        <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                          <span className="text-lg">🎯</span>
                          <span>Speech Successfully Captured!</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {currentLinguisticFeatures.transcript && (
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                    <span>
                      Words: {currentLinguisticFeatures.transcript.trim().split(/\s+/).filter(w => w).length}
                    </span>
                    <div className="flex gap-2">
                      <Badge variant={
                        completionState === CompletionState.CONFIRMED_COMPLETE ? 'default' :
                        completionState === CompletionState.HESITATING ? 'secondary' :
                        currentLinguisticFeatures.isComplete ? 'default' : 'secondary'
                      }>
                        {completionState === CompletionState.CONFIRMED_COMPLETE
                          ? '🎉 Speech Complete!'
                          : completionState === CompletionState.HESITATING
                          ? '💭 Thinking...'
                          : currentLinguisticFeatures.isComplete
                          ? 'Complete Sentence'
                          : 'In Progress'
                        }
                      </Badge>
                      {completionDecision.fillerWordsDetected && completionDecision.fillerWordsDetected.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          Fillers: {completionDecision.fillerWordsDetected.length}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Completion Decision */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Sentence Completion Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant={completionDecision.isComplete ? 'default' : 'secondary'}>
                      {completionDecision.isComplete ? '✅ Speech Complete' : '⏳ Speech Continuing'}
                    </Badge>
                    <Progress value={completionDecision.confidence * 100} className="flex-1" />
                    <span className="text-sm font-medium">
                      {completionDecision.confidence > 0.8 ? 'High' :
                       completionDecision.confidence > 0.6 ? 'Medium' : 'Low'} Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Analysis Details:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Pause Pattern:</span>
                          <Badge variant="outline" className="text-xs">
                            {completionDecision.pausePattern || 'unknown'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Since Speech:</span>
                          <span className="text-xs">{(completionDecision.timeSinceLastSpeech || 0).toFixed(0)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completion Score:</span>
                          <span className="text-xs">{(completionDecision.completionScore || 0).toFixed(3)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Detected Patterns:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <span className={completionDecision.hesitationDetected ? 'text-red-600' : 'text-green-600'}>
                            {completionDecision.hesitationDetected ? '🤔' : '✅'}
                          </span>
                          <span>Hesitation: {completionDecision.hesitationDetected ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={(completionDecision.fillerWordsDetected && completionDecision.fillerWordsDetected.length > 0) ? 'text-yellow-600' : 'text-green-600'}>
                            {(completionDecision.fillerWordsDetected && completionDecision.fillerWordsDetected.length > 0) ? '💬' : '✅'}
                          </span>
                          <span>Fillers: {completionDecision.fillerWordsDetected?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm text-muted-foreground">
                      <strong>Analysis:</strong> {completionDecision.reason}
                    </p>
                    {completionDecision.fillerWordsDetected && completionDecision.fillerWordsDetected.length > 0 && (
                      <p className="text-sm text-yellow-600 mt-1">
                        <strong>Filler words detected:</strong> {completionDecision.fillerWordsDetected.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-time Audio Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label>RMS Energy</Label>
                    <Progress value={Math.min(currentAudioFeatures.rms * 1000, 100)} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentAudioFeatures.rms.toFixed(6)}
                    </p>
                  </div>
                  <div>
                    <Label>Zero Crossing Rate</Label>
                    <Progress value={currentAudioFeatures.zcr * 100} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentAudioFeatures.zcr.toFixed(3)}
                    </p>
                  </div>
                  <div>
                    <Label>Spectral Centroid</Label>
                    <Progress value={(currentAudioFeatures.spectralCentroid / 5000) * 100} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentAudioFeatures.spectralCentroid.toFixed(0)} Hz
                    </p>
                  </div>
                  <div>
                    <Label>Signal-to-Noise Ratio</Label>
                    <Progress value={Math.min(currentAudioFeatures.snr / 2, 100)} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentAudioFeatures.snr.toFixed(1)} dB
                    </p>
                  </div>
                  <div>
                    <Label>Autocorrelation</Label>
                    <Progress value={Math.abs(currentAudioFeatures.autocorrelation) * 100} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentAudioFeatures.autocorrelation.toFixed(3)}
                    </p>
                  </div>
                  <div>
                    <Label>Confidence Score</Label>
                    <Progress value={currentAudioFeatures.confidence * 100} className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {(currentAudioFeatures.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visualizations */}
            <Tabs defaultValue="waveform" className="w-full">
              <TabsList>
                <TabsTrigger value="waveform">Waveform</TabsTrigger>
                <TabsTrigger value="spectrum">Spectrum</TabsTrigger>
                <TabsTrigger value="buffers">Audio Buffers</TabsTrigger>
              </TabsList>

              <TabsContent value="waveform">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Real-time Waveform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 -1 100 2">
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="1"
                          points={waveformData.map((val, i) => `${i},${val}`).join(' ')}
                        />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="spectrum">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Frequency Spectrum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                      <svg width="100%" height="100%" viewBox="0 0 100 256">
                        {spectrumData.map((val, i) => (
                          <rect
                            key={i}
                            x={i}
                            y={256 - val}
                            width="1"
                            height={val}
                            fill="#ef4444"
                          />
                        ))}
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="buffers">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Captured Audio Buffers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {audioBuffers.map((buffer, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <span className="text-sm font-mono">Buffer {index + 1}</span>
                          <span className="text-xs text-muted-foreground">
                            {buffer.length} samples
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => playBuffer(buffer)}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Play
                          </Button>
                        </div>
                      ))}
                      {audioBuffers.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          No audio buffers captured yet. Start recording to capture speech segments.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Configuration Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">VAD Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label>Energy Threshold</Label>
                    <Slider
                      value={[config.energyThreshold]}
                      onValueChange={([value]) => setConfig(prev => ({ ...prev, energyThreshold: value }))}
                      min={0.001}
                      max={0.1}
                      step={0.001}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {config.energyThreshold.toFixed(4)}
                    </p>
                  </div>

                  <div>
                    <Label>ZCR Threshold</Label>
                    <Slider
                      value={[config.zcrThreshold]}
                      onValueChange={([value]) => setConfig(prev => ({ ...prev, zcrThreshold: value }))}
                      min={0.05}
                      max={0.5}
                      step={0.01}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {config.zcrThreshold.toFixed(3)}
                    </p>
                  </div>

                  <div>
                    <Label>Spectral Centroid Threshold</Label>
                    <Slider
                      value={[config.spectralCentroidThreshold]}
                      onValueChange={([value]) => setConfig(prev => ({ ...prev, spectralCentroidThreshold: value }))}
                      min={500}
                      max={4000}
                      step={50}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {config.spectralCentroidThreshold} Hz
                    </p>
                  </div>

                  <div>
                    <Label>Confidence Threshold</Label>
                    <Slider
                      value={[config.confidenceThreshold]}
                      onValueChange={([value]) => setConfig(prev => ({ ...prev, confidenceThreshold: value }))}
                      min={0.1}
                      max={1.0}
                      step={0.05}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {(config.confidenceThreshold * 100).toFixed(1)}%
                    </p>
                  </div>

                  <div>
                    <Label>Min Speech Frames</Label>
                    <Slider
                      value={[config.minSpeechFrames]}
                      onValueChange={([value]) => setConfig(prev => ({ ...prev, minSpeechFrames: value }))}
                      min={1}
                      max={10}
                      step={1}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {config.minSpeechFrames} frames
                    </p>
                  </div>

                  <div>
                    <Label>Hangover Frames</Label>
                    <Slider
                      value={[config.hangoverFrames]}
                      onValueChange={([value]) => setConfig(prev => ({ ...prev, hangoverFrames: value }))}
                      min={5}
                      max={30}
                      step={1}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {config.hangoverFrames} frames
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature Explanations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ultimate VAD Features - All Combined</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">🎵 Acoustic Analysis:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Short-time Energy (RMS)</li>
                      <li>• Zero-Crossing Rate</li>
                      <li>• Spectral Centroid</li>
                      <li>• Signal-to-Noise Ratio</li>
                      <li>• Autocorrelation Analysis</li>
                      <li>• Voice Frequency Filtering</li>
                      <li>• Audio Buffer Management</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🎭 Prosodic Analysis:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Pitch Contour Analysis</li>
                      <li>• Intonation Detection</li>
                      <li>• Speech Rate Monitoring</li>
                      <li>• Energy Pattern Analysis</li>
                      <li>• Pause Context Analysis</li>
                      <li>• Stress Pattern Detection</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📝 Linguistic Analysis:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Real-time STT Integration</li>
                      <li>• Grammar Pattern Matching</li>
                      <li>• Word Boundary Analysis</li>
                      <li>• Semantic VAD</li>
                      <li>• Multi-modal Decision Logic</li>
                      <li>• Confidence Scoring</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
