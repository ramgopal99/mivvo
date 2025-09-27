'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mic, Square } from 'lucide-react'

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

export default function SpeechToText() {
  const [text, setText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [interimText, setInterimText] = useState('')
  const [error, setError] = useState<string>('')
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'fr-FR', name: 'French (France)' },
    { code: 'de-DE', name: 'German (Germany)' },
    { code: 'it-IT', name: 'Italian (Italy)' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'ja-JP', name: 'Japanese (Japan)' },
    { code: 'ko-KR', name: 'Korean (Korea)' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)' },
  ]

  const getErrorMessage = (errorType: string): string => {
    switch (errorType) {
      case 'network':
        return 'Network error: Unable to connect to speech recognition service. Check your internet connection and try again.'
      case 'not-allowed':
        return 'Microphone access denied. Please allow microphone access and try again.'
      case 'no-speech':
        return 'No speech detected. Please speak clearly into your microphone.'
      case 'aborted':
        return 'Speech recognition was cancelled.'
      case 'audio-capture':
        return 'Audio capture failed. Please check your microphone and try again.'
      case 'service-not-allowed':
        return 'Speech recognition service is not available in your region.'
      default:
        return `Speech recognition error: ${errorType}`
    }
  }

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()

      const recognition = recognitionRef.current
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = selectedLanguage

      recognition.onstart = () => {
        setIsListening(true)
      }

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
          setText(prev => prev + finalTranscript)
          setError('') // Clear any previous errors on successful transcription
        }
        setInterimText(interimTranscript)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error)
        const errorMessage = getErrorMessage(event.error)
        setError(errorMessage)
        setIsListening(false)
        setInterimText('')
      }

      recognition.onend = () => {
        setIsListening(false)
        setInterimText('')
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [selectedLanguage])

  const startListening = async () => {
    if (!recognitionRef.current) return

    try {
      setError('') // Clear any previous errors
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true })
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setError('Microphone access is required for speech recognition. Please allow microphone access and try again.')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const clearText = () => {
    setText('')
    setInterimText('')
    setError('')
  }

  const retryConnection = () => {
    setError('')
    startListening()
  }

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Speech to Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">
                  Speech recognition is not supported in your browser.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please use Chrome, Edge, or Safari for the best experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Speech to Text</CardTitle>
            <p className="text-sm text-muted-foreground">
              Click the microphone to start speaking. For better accuracy, speak clearly and use a quiet environment.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language">Select language:</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text">Transcribed text:</Label>
              <Textarea
                id="text"
                value={text + interimText}
                onChange={(e) => setText(e.target.value)}
                placeholder="Your speech will appear here..."
                className="min-h-[120px]"
              />
              {interimText && (
                <p className="text-sm text-muted-foreground italic">
                  Listening: {interimText}
                </p>
              )}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-700 mb-2">{error}</p>
                  {error.includes('Network error') && (
                    <Button
                      onClick={retryConnection}
                      size="sm"
                      variant="outline"
                      className="text-red-700 border-red-300 hover:bg-red-100"
                    >
                      Try Again
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {!isListening ? (
                <Button
                  onClick={startListening}
                  className="flex-1"
                  size="lg"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Listening
                </Button>
              ) : (
                <Button
                  onClick={stopListening}
                  variant="destructive"
                  className="flex-1"
                  size="lg"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop Listening
                </Button>
              )}

              <Button
                onClick={clearText}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Clear Text
              </Button>
            </div>

            <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded">
              <strong>Features & Troubleshooting:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Real-time transcription with interim results</li>
                <li>• Automatic error handling with retry options</li>
                <li>• Network issues will show retry buttons</li>
                <li>• Best results with Chrome/Edge browsers</li>
                <li>• For professional accuracy, consider cloud services (Google Speech API, AWS Transcribe, etc.)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
