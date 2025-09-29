'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Mic, MicOff, Volume2, VolumeX, Send } from 'lucide-react'
import VoiceSettings from './voice-settings'

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

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function LLM() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string>('')
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [speechRate, setSpeechRate] = useState<number>(0.9)
  const [speechPitch, setSpeechPitch] = useState<number>(1)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [autoListenAfterAI, setAutoListenAfterAI] = useState<boolean>(false)
  const [isConversationMode, setIsConversationMode] = useState<boolean>(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const handleSendMessageRef = useRef<((message: string) => void) | null>(null)
  const startListeningRef = useRef<(() => void) | null>(null)
  const isListeningRef = useRef<boolean>(false)
  const isConversationModeRef = useRef<boolean>(false)
  const autoListenAfterAIRef = useRef<boolean>(false)

  const startListening = useCallback(async () => {
    if (!recognitionRef.current || isListening) return

    try {
      setError('') // Clear any previous errors
      await navigator.mediaDevices.getUserMedia({ audio: true })
      recognitionRef.current.start()
    } catch (error) {
      console.error('Error accessing microphone:', error)
      setError('Microphone access is required for speech recognition. Please allow microphone access and try again.')
    }
  }, [isListening])

  const speakText = useCallback((text: string) => {
    if (!speechSynthesisRef.current) return

    // Cancel any ongoing speech
    speechSynthesisRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speechRate
    utterance.pitch = speechPitch

    // Set voice if selected
    if (selectedVoice) {
      const voice = availableVoices.find(v => v.voiceURI === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      console.log('AI speech ended, isConversationMode:', isConversationModeRef.current, 'autoListenAfterAI:', autoListenAfterAIRef.current)
      // Auto-start listening if enabled (conversation mode or auto-listen setting)
      // Use setTimeout to avoid calling async function in synchronous callback
      if (isConversationModeRef.current || autoListenAfterAIRef.current) {
        console.log('Auto-starting listening...')
        setTimeout(() => {
          console.log('Checking if should start listening:', !isListeningRef.current, !!startListeningRef.current)
          if (!isListeningRef.current && startListeningRef.current) {
            console.log('Starting listening automatically')
            startListeningRef.current()
          }
        }, 100) // Small delay to ensure speech has fully ended
      }
    }
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesisRef.current.speak(utterance)
  }, [selectedVoice, speechRate, speechPitch, availableVoices])

  const handleSendMessage = useCallback(async (messageText: string = currentInput) => {
    if (!messageText.trim()) return

    setIsLoading(true)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentInput('')

    try {
      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: `You are conducting a technical interview for a Software Developer position at Amazon. You are an experienced interviewer who asks thoughtful, technical questions and provides constructive feedback.

Interview Guidelines:
- Ask one question at a time
- Start with easier questions and progress to more complex ones
- Ask follow-up questions based on the candidate's responses
- Provide hints if the candidate is struggling, but don't give away the answer
- Focus on problem-solving ability, coding skills, and system design knowledge
- Ask about data structures, algorithms, and real-world application

Current Interview Progress:
- This is an ongoing technical interview
- Adapt questions based on previous responses
- Score the candidate's responses (keep track internally)
- End the interview appropriately when complete

Remember: You are interviewing the candidate, not just chatting. Maintain a professional interviewer demeanor.` },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: messageText }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      // Speak the AI response
      speakText(aiResponse)

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [currentInput, messages, speakText])

  // Initialize speech recognition and voices on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SpeechRecognition) {
      setIsSupported(true)
      recognitionRef.current = new SpeechRecognition()
      speechSynthesisRef.current = window.speechSynthesis

      // Load available voices
      const loadVoices = () => {
        const voices = speechSynthesisRef.current?.getVoices() || []
        setAvailableVoices(voices)
      }

      loadVoices()
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.onvoiceschanged = loadVoices
      }

      const recognition = recognitionRef.current
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        isListeningRef.current = true
        setError('') // Clear any previous errors when starting
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[event.resultIndex][0].transcript
        if (event.results[event.resultIndex].isFinal) {
          setCurrentInput(transcript)
          setError('') // Clear errors on successful recognition
          // Use ref to avoid stale closure issues
          handleSendMessageRef.current?.(transcript)
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let errorMessage = ''
        switch (event.error) {
          case 'no-speech':
            if (isConversationModeRef.current || autoListenAfterAIRef.current) {
              console.log('No speech detected, restarting listening...')
              setTimeout(() => {
                if (!isListeningRef.current && startListeningRef.current) {
                  startListeningRef.current()
                }
              }, 100)
            } else {
              console.log('No speech detected, but auto-listen not enabled')
            }
            return
            break
          case 'audio-capture':
            errorMessage = 'Audio capture failed. Please check your microphone and try again.'
            break
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access and try again.'
            break
          case 'network':
            errorMessage = 'Network error. Check your internet connection and try again.'
            break
          case 'service-not-allowed':
            errorMessage = 'Speech recognition service is not available in your region.'
            break
          default:
            errorMessage = `Speech recognition error: ${event.error}`
        }

        setError(errorMessage)
        setIsListening(false)
        isListeningRef.current = false
        setIsLoading(false)
      }

      recognition.onend = () => {
        setIsListening(false)
        isListeningRef.current = false
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
    }
  }, []) // Empty dependency array - only run once on mount

  // Update the refs whenever functions change
  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage
  }, [handleSendMessage])

  useEffect(() => {
    startListeningRef.current = startListening
  }, [startListening])

  // Set default voice when voices become available
  useEffect(() => {
    if (availableVoices.length > 0 && !selectedVoice) {
      setSelectedVoice(availableVoices[0].voiceURI)
    }
  }, [availableVoices, selectedVoice])

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const stopSpeaking = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const startConversation = useCallback(() => {
    console.log('Starting Amazon interview...')
    setIsConversationMode(true)
    isConversationModeRef.current = true
    // Add AI interview greeting message
    const greetingMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Hello! Welcome to your Amazon Software Developer interview. I\'m your interviewer today. Let\'s start with some technical questions. Are you ready to begin?',
      timestamp: new Date()
    }
    setMessages([greetingMessage])
    console.log('Speaking interview greeting:', greetingMessage.content)
    // Speak the greeting
    speakText(greetingMessage.content)
  }, [speakText])

  const stopConversation = useCallback(() => {
    setIsConversationMode(false)
    isConversationModeRef.current = false
    stopListening()
    stopSpeaking()
  }, [])

  const clearConversation = () => {
    setMessages([])
    setCurrentInput('')
    stopSpeaking()
    setIsConversationMode(false)
    isConversationModeRef.current = false
  }

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Voice LLM Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">
                  Voice chat requires speech recognition support.
                </p>
                <p className="text-sm text-muted-foreground">
                  Please use Chrome or Edge browser.
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
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Voice LLM Chat</CardTitle>
            <p className="text-sm text-muted-foreground">
              Click the microphone to speak, or type your message. The AI will respond with voice.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Messages Display */}
            <div className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <p>Start a conversation by speaking or typing a message!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Controls */}
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!currentInput.trim() || isLoading}
                  className="px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Conversation Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {!isConversationMode ? (
                    <Button
                      onClick={startConversation}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      Start Conversation
                    </Button>
                  ) : (
                    <Button
                      onClick={stopConversation}
                      variant="destructive"
                    >
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop Conversation
                    </Button>
                  )}

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={autoListenAfterAI}
                      onChange={(e) => {
                        setAutoListenAfterAI(e.target.checked)
                        autoListenAfterAIRef.current = e.target.checked
                      }}
                      className="rounded"
                    />
                    <span>Auto-listen after AI response</span>
                  </label>
                </div>

                <Button
                  onClick={clearConversation}
                  variant="ghost"
                  size="sm"
                >
                  Clear Chat
                </Button>
              </div>

              {/* Voice Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {!isListening ? (
                    <Button
                      onClick={startListening}
                      disabled={isLoading}
                      variant="outline"
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      Voice Input
                    </Button>
                  ) : (
                    <Button
                      onClick={stopListening}
                      variant="destructive"
                    >
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop Listening
                    </Button>
                  )}

                  {isSpeaking ? (
                    <Button
                      onClick={stopSpeaking}
                      variant="outline"
                    >
                      <VolumeX className="w-4 h-4 mr-2" />
                      Stop Speaking
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        const lastMessage = messages[messages.length - 1]
                        if (lastMessage && lastMessage.role === 'assistant') {
                          speakText(lastMessage.content)
                        }
                      }}
                      disabled={messages.length === 0 || messages[messages.length - 1]?.role !== 'assistant'}
                      variant="outline"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Replay Last
                    </Button>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <VoiceSettings
                selectedVoice={selectedVoice}
                speechRate={speechRate}
                speechPitch={speechPitch}
                availableVoices={availableVoices}
                onVoiceChange={setSelectedVoice}
                onRateChange={setSpeechRate}
                onPitchChange={setSpeechPitch}
                onTestVoice={() => speakText("Hello! This is how your selected voice sounds.")}
              />

              {isListening && (
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">🎤 Listening... Speak now!</p>
                  <p className="text-sm text-red-600 mt-1">
                    Click &quot;Stop Listening&quot; when you&apos;re done speaking.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
