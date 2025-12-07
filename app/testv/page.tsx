'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Volume2, Play, Square } from 'lucide-react'


// Emotion types and their speech parameters
interface EmotionConfig {
  name: string
  color: string
  rate: number
  pitch: number
  volume: number
  description: string
}

const EMOTION_CONFIGS: Record<string, EmotionConfig> = {
  angry: {
    name: 'Angry',
    color: 'bg-red-100 text-red-800 border-red-200',
    rate: 1.5,
    pitch: 1.2,
    volume: 0.9,
    description: 'Fast, raised pitch, intense'
  },
  sad: {
    name: 'Sad',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    rate: 1.1,
    pitch: 0.9,
    volume: 0.7,
    description: 'Lower pitch, soft, melancholic'
  },
  happy: {
    name: 'Happy',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    rate: 1.4,
    pitch: 1.15,
    volume: 0.85,
    description: 'Fast, raised pitch, cheerful'
  },
  excited: {
    name: 'Excited',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    rate: 1.6,
    pitch: 1.25,
    volume: 0.95,
    description: 'Very fast, high pitch, energetic'
  },
  calm: {
    name: 'Calm',
    color: 'bg-green-100 text-green-800 border-green-200',
    rate: 1.2,
    pitch: 0.95,
    volume: 0.75,
    description: 'Gentle, steady pace'
  },
  serious: {
    name: 'Serious',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    rate: 1.25,
    pitch: 0.95,
    volume: 0.8,
    description: 'Measured pace, authoritative'
  },
  neutral: {
    name: 'Neutral',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    rate: 1.3,
    pitch: 1.0,
    volume: 0.8,
    description: 'Normal speaking parameters (1.3x)'
  }
}

// Emotion detection patterns
const EMOTION_PATTERNS = {
  angry: /\b(?:angry|mad|furious|rage|outraged|infuriated|enraged|pissed|annoyed|frustrated|irritated|livid|wrath|hatred|hostile|aggressive|violent|threatening|damn|hell|shit|fuck|crap|screw|bastard|asshole)\b/gi,
  sad: /\b(?:sad|sorrow|grief|depressed|heartbroken|unhappy|miserable|disappointed|devastated|hopeless|lonely|alone|weep|cry|tears|pain|hurt|suffering|tragic|depressing|melancholy|blue|down|low)\b/gi,
  happy: /\b(?:happy|joy|delighted|pleased|cheerful|excited|thrilled|ecstatic|glad|wonderful|fantastic|amazing|awesome|great|love|smile|laugh|celebrate|party|fun|enjoy|blessed|grateful)\b/gi,
  excited: /\b(?:excited|thrilled|amazing|awesome|incredible|unbelievable|wow|omg|oh my god|can't wait|so pumped|eager|enthusiastic|buzzing|vibrant|alive|energy|hyper|super|ultra|mega|intense)\b/gi,
  calm: /\b(?:calm|peaceful|relaxed|serene|tranquil|gentle|soothing|quiet|mellow|easygoing|composed|steady|balanced|harmonious|meditative|zen|chill|laid back|easy)\b/gi,
  serious: /\b(?:serious|important|critical|vital|essential|crucial|significant|grave|severe|urgent|pressing|weighty|somber|solemn|formal|professional|official|authoritative|strict|stern)\b/gi
}

function detectEmotion(text: string): string {
  const textLower = text.toLowerCase()
  const scores: Record<string, number> = {}

  // Count matches for each emotion
  Object.entries(EMOTION_PATTERNS).forEach(([emotion, pattern]) => {
    const matches = textLower.match(pattern)
    scores[emotion] = matches ? matches.length : 0
  })

  // Find emotion with highest score
  const maxEmotion = Object.entries(scores).reduce((max, [emotion, score]) => {
    return score > max.score ? { emotion, score } : max
  }, { emotion: 'neutral', score: 0 })

  // If no strong emotion detected, return neutral
  return maxEmotion.score > 0 ? maxEmotion.emotion : 'neutral'
}

// Split text into emotional segments
function splitTextIntoEmotionalSegments(text: string): Array<{text: string, emotion: string}> {
  // Split by sentences and punctuation
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)

  return sentences.map(sentence => ({
    text: sentence.trim() + (sentence.includes('?') ? '?' : sentence.includes('!') ? '!' : '.'),
    emotion: detectEmotion(sentence.trim())
  }))
}

// Get dynamic speech parameters based on emotion and intensity
function getDynamicSpeechParams(emotion: string, intensity: number = 1): {rate: number, pitch: number, volume: number} {
  const baseConfig = EMOTION_CONFIGS[emotion] || EMOTION_CONFIGS.neutral

  // Add subtle variation based on intensity (smaller variation for more natural speech)
  const rateVariation = 0.08 * intensity
  const pitchVariation = 0.03 * intensity
  const volumeVariation = 0.02 * intensity

  return {
    rate: Math.max(1.1, Math.min(1.7, baseConfig.rate + (Math.random() - 0.5) * rateVariation)),
    pitch: Math.max(0.85, Math.min(1.3, baseConfig.pitch + (Math.random() - 0.5) * pitchVariation)),
    volume: Math.max(0.6, Math.min(1.0, baseConfig.volume + (Math.random() - 0.5) * volumeVariation))
  }
}

export default function TTSTestPage() {
  const [text, setText] = useState('Hello! This is a test of emotional text-to-speech functionality. You can type angry, sad, happy, excited, calm, or serious text and hear it spoken with the appropriate emotion!')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string>('')
  const [isSupported, setIsSupported] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [speechRate, setSpeechRate] = useState([0.9])
  const [speechPitch, setSpeechPitch] = useState([1])
  const [autoEmotion, setAutoEmotion] = useState(true)
  const [detectedEmotion, setDetectedEmotion] = useState<string>('neutral')
  const [manualEmotion, setManualEmotion] = useState<string>('neutral')

  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)
      speechSynthesisRef.current = window.speechSynthesis

      // Load voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        setAvailableVoices(voices)
        if (voices.length > 0 && !selectedVoice) {
          setSelectedVoice(voices[0].voiceURI)
        }
      }

      loadVoices()
      // Some browsers load voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    } else {
      setIsSupported(false)
      setError('Text-to-speech not supported in this browser')
    }

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, [selectedVoice])

  // Detect emotion when text changes
  useEffect(() => {
    if (autoEmotion && text.trim()) {
      const emotion = detectEmotion(text)
      setDetectedEmotion(emotion)
    }
  }, [text, autoEmotion])

  const speakText = () => {
    if (!speechSynthesisRef.current || !text.trim()) return

    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel()

    let utterances: SpeechSynthesisUtterance[] = []

    if (autoEmotion) {
      // Split text into emotional segments and create dynamic utterances
      const segments = splitTextIntoEmotionalSegments(text)

      utterances = segments.map((segment, index) => {
        const utterance = new SpeechSynthesisUtterance(segment.text)

        // Get dynamic parameters for this segment
        const params = getDynamicSpeechParams(segment.emotion, 1)

        utterance.rate = params.rate
        utterance.pitch = params.pitch
        utterance.volume = params.volume

        // Set voice if selected
        if (selectedVoice) {
          const voice = availableVoices.find(v => v.voiceURI === selectedVoice)
          if (voice) {
            utterance.voice = voice
          }
        }

        // Handle speech events
        if (index === 0) {
          utterance.onstart = () => {
            setIsSpeaking(true)
            setError('')
          }
        }

        if (index === segments.length - 1) {
          utterance.onend = () => {
            setIsSpeaking(false)
          }
        }

        utterance.onerror = (event) => {
          setIsSpeaking(false)
          setError(`Speech synthesis error: ${event.error}`)
        }

        return utterance
      })
    } else {
      // Manual mode - use single utterance with manual settings
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = speechRate[0]
      utterance.pitch = speechPitch[0]
      utterance.volume = 0.8 // Default volume for manual mode

      // Set voice if selected
      if (selectedVoice) {
        const voice = availableVoices.find(v => v.voiceURI === selectedVoice)
        if (voice) {
          utterance.voice = voice
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true)
        setError('')
      }

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      utterance.onerror = (event) => {
        setIsSpeaking(false)
        setError(`Speech synthesis error: ${event.error}`)
      }

      utterances = [utterance]
    }

    // Speak all utterances in sequence
    utterances.forEach(utterance => {
      speechSynthesisRef.current!.speak(utterance)
    })
  }

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const getVoiceDisplayName = (voice: SpeechSynthesisVoice) => {
    // Create shorter, more user-friendly names
    const name = voice.name
    if (name === 'Google US English') return 'US English'
    if (name === 'Google UK English Female') return 'UK Female'
    if (name === 'Google UK English Male') return 'UK Male'
    if (name.startsWith('Google') && name.includes('US English')) {
      return name.replace('Google US English ', '').replace(' (en-US)', '')
    }
    if (name.startsWith('Google') && name.includes('UK English')) {
      return name.includes('Female') ? 'UK Female' : 'UK Male'
    }

    // Handle Microsoft voices
    if (name.includes('Microsoft')) {
      const words = name.split(' ')
      if (words.length >= 2) {
        return words[1] // Second word is usually the character name
      }
    }

    return name.split(' ')[0] || name
  }

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Text-to-Speech Not Supported</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your browser doesn&apos;t support text-to-speech. Please use a modern browser like Chrome, Edge, or Safari.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-6 h-6" />
              TTS (Text-to-Speech) Test Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="text-input" className="text-sm font-medium">
                Text to Speak
              </Label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to speech..."
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Emotion Detection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Emotion Detection</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Auto-detect</span>
                  <input
                    type="checkbox"
                    id="auto-emotion"
                    checked={autoEmotion}
                    onChange={(e) => setAutoEmotion(e.target.checked)}
                    className="rounded"
                    aria-label="Auto-detect emotions"
                  />
                </div>
              </div>

              {autoEmotion ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Overall Emotion:</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${EMOTION_CONFIGS[detectedEmotion].color}`}>
                      {EMOTION_CONFIGS[detectedEmotion].name}
                    </div>
                  </div>

                  {/* Show emotional segments */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">Emotional Segments:</span>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {splitTextIntoEmotionalSegments(text).map((segment, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <div className={`px-2 py-1 rounded text-xs font-medium border ${EMOTION_CONFIGS[segment.emotion].color} min-w-16 text-center`}>
                            {EMOTION_CONFIGS[segment.emotion].name}
                          </div>
                          <span className="text-muted-foreground truncate flex-1">{segment.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Manual Emotion</Label>
                  <Select value={manualEmotion} onValueChange={setManualEmotion}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(EMOTION_CONFIGS).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{config.name}</span>
                            <span className="text-xs text-muted-foreground">({config.description})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Voice Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Voice Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Voice ({availableVoices.length} available)</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVoices.map((voice, index) => (
                      <SelectItem key={`${voice.voiceURI}-${index}`} value={voice.voiceURI}>
                        {getVoiceDisplayName(voice)} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Speech Rate */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Speed: {speechRate[0].toFixed(1)}x
                </Label>
                <Slider
                  value={speechRate}
                  onValueChange={setSpeechRate}
                  max={2}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Speech Pitch */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Pitch: {speechPitch[0].toFixed(1)}
                </Label>
                <Slider
                  value={speechPitch}
                  onValueChange={setSpeechPitch}
                  max={2}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4">
              {!isSpeaking ? (
                <Button
                  onClick={speakText}
                  disabled={!text.trim()}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4" />
                  Speak Text
                </Button>
              ) : (
                <Button
                  onClick={stopSpeaking}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Stop Speaking
                </Button>
              )}

              <Button
                onClick={() => setText('')}
                variant="outline"
                disabled={!text}
              >
                Clear Text
              </Button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                isSpeaking
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`} />
                {isSpeaking ? 'Speaking...' : 'Ready'}
              </div>
              <div className="text-sm text-muted-foreground">
                {text.length} characters
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">Error: {error}</p>
              </div>
            )}

            {/* Sample Emotional Texts */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Sample Emotional Texts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setText('I am so angry and furious about this situation! This is absolutely outrageous and unacceptable. But then I calmed down and realized everything would be okay. I feel much better now.')}
                  className="text-left h-auto p-3 justify-start"
                >
                  <div>
                    <div className="font-medium text-red-600">🎭 Mixed Emotions</div>
                    <div className="text-xs text-muted-foreground">Angry (1.5x) → Calm (1.2x)</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setText('I feel so sad and heartbroken. My heart is heavy with sorrow and disappointment. But then something amazing happened! I won the lottery and I am so happy!')}
                  className="text-left h-auto p-3 justify-start"
                >
                  <div>
                    <div className="font-medium text-blue-600">😢→😊 Sad to Happy</div>
                    <div className="text-xs text-muted-foreground">Sad (1.1x) → Happy (1.4x)</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setText('I am so happy and thrilled! This is absolutely wonderful and fantastic! I can\'t stop smiling and feeling joyful!')}
                  className="text-left h-auto p-3 justify-start"
                >
                  <div>
                    <div className="font-medium text-yellow-600">😊 Happy</div>
                    <div className="text-xs text-muted-foreground">Fast (1.4x), raised pitch</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setText('OMG this is so amazing and incredible! I\'m super excited and can\'t wait! This is the best thing ever and I am thrilled!')}
                  className="text-left h-auto p-3 justify-start"
                >
                  <div>
                    <div className="font-medium text-orange-600">🤩 Excited</div>
                    <div className="text-xs text-muted-foreground">Very fast (1.6x), high pitch</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setText('Everything is calm and peaceful. I feel relaxed and serene. Take a deep breath and enjoy this gentle moment.')}
                  className="text-left h-auto p-3 justify-start"
                >
                  <div>
                    <div className="font-medium text-green-600">😌 Calm</div>
                    <div className="text-xs text-muted-foreground">Gentle (1.2x), steady pace</div>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setText('This matter is of grave importance. We must address this issue with the utmost seriousness and careful attention.')}
                  className="text-left h-auto p-3 justify-start"
                >
                  <div>
                    <div className="font-medium text-purple-600">😐 Serious</div>
                    <div className="text-xs text-muted-foreground">Measured (1.25x), authoritative</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Technical Info */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Technical Details:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Uses Web Speech API (SpeechSynthesis)</li>
                <li>• <strong>Dynamic Segmentation:</strong> Splits text into sentences and analyzes each for emotion</li>
                <li>• <strong>Real-time Emotion Changes:</strong> Each segment gets unique speech parameters based on its emotion</li>
                <li>• <strong>Auto Emotion Mode:</strong> Automatically detects and applies emotions per sentence</li>
                <li>• <strong>Manual Mode:</strong> Use fixed emotion for entire text</li>
                <li>• <strong>Fast Rate Management:</strong> All emotions use rates from 1.1x to 1.6x for energetic speech</li>
                <li>• <strong>Normal Baseline:</strong> Neutral speech at 1.3x rate</li>
                <li>• <strong>Dynamic Parameter Variation:</strong> Small randomization (±0.08) for natural speech variation</li>
                <li>• Emotion affects: Speech rate, pitch, volume with fast, expressive differences</li>
                <li>• Supports multiple voices and languages</li>
                <li>• Works in all modern browsers</li>
                <li>• No special permissions required</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
