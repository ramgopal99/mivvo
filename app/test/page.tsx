'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { getSTTService, TestSTTService } from './stt-service'
import { getLLMService, TestLLMService } from './llm-service'
import { getTTSService, TestTTSService } from './tts-service'

export default function VoiceToVoiceTestPage() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [error, setError] = useState<string | null>(null)

  const sttServiceRef = useRef<TestSTTService | null>(null)
  const llmServiceRef = useRef<TestLLMService | null>(null)
  const ttsServiceRef = useRef<TestTTSService | null>(null)
  const finalTranscriptRef = useRef('')
  const accumulatedTranscriptRef = useRef('')
  const isListeningRef = useRef(false)
  const isProcessingRef = useRef(false)
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleUserMessage = useCallback(async (message: string) => {
    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', content: message }])

    // Send to LLM
    if (llmServiceRef.current) {
      try {
        await llmServiceRef.current.sendMessage(message, conversation.slice(-5)) // Keep last 5 messages for context
      } catch (err) {
        console.error('Error sending message to LLM:', err)
        setError('Failed to process message')
      }
    }
  }, [conversation])

  const startListening = useCallback(async () => {
    if (!sttServiceRef.current || isListeningRef.current || isProcessingRef.current || isSpeaking) return

    try {
      await sttServiceRef.current.start()
    } catch (err) {
      console.error('Failed to start speech recognition:', err)
      setError('Failed to start speech recognition')
    }
  }, [isSpeaking])

  useEffect(() => {
    // Initialize services
    sttServiceRef.current = getSTTService({ language: 'en-US', continuous: true }, {
        onStart: () => {
          setIsListening(true)
          isListeningRef.current = true
          setIsWaiting(false)
          setError(null)
          // Clear any existing pause timer and accumulated transcript
          if (pauseTimerRef.current) {
            clearTimeout(pauseTimerRef.current)
            pauseTimerRef.current = null
          }
          finalTranscriptRef.current = ''
          accumulatedTranscriptRef.current = ''
        },
        onResult: (text: string, isFinal: boolean) => {
          setTranscript(text)

          // Clear any existing pause timer
          if (pauseTimerRef.current) {
            clearTimeout(pauseTimerRef.current)
            pauseTimerRef.current = null
          }

          if (isFinal) {
            // Accumulate all final transcripts to combine complete speech
            if (accumulatedTranscriptRef.current) {
              accumulatedTranscriptRef.current += ' ' + text
            } else {
              accumulatedTranscriptRef.current = text
            }

            finalTranscriptRef.current = accumulatedTranscriptRef.current
            setIsWaiting(true)

            // Start 5-second pause timer before processing
            pauseTimerRef.current = setTimeout(() => {
              setIsWaiting(false)
              if (finalTranscriptRef.current.trim()) {
                handleUserMessage(finalTranscriptRef.current.trim())
              }
              // Clear accumulated transcript after processing
              finalTranscriptRef.current = ''
              accumulatedTranscriptRef.current = ''
              pauseTimerRef.current = null
            }, 5000) // 5 seconds delay
          }
        },
        onEnd: () => {
          setIsListening(false)
          isListeningRef.current = false
          // Don't process here - let the pause timer handle it
        },
        onError: (errorMsg: string) => {
          setError(errorMsg)
          setIsListening(false)
          isListeningRef.current = false
        }
      }
    )

    llmServiceRef.current = getLLMService({ systemPrompt: 'You are a helpful AI assistant in a voice conversation. Keep responses conversational, natural, and not too long. Respond as if you\'re speaking to someone directly.' }, {
        onStart: () => {
          setIsProcessing(true)
          isProcessingRef.current = true
        },
        onResponse: (response: string) => {
          setConversation(prev => [...prev, { role: 'assistant', content: response }])

          // Speak the response with a small delay to avoid hot reload interruptions
          setTimeout(() => {
            if (ttsServiceRef.current && ttsServiceRef.current.isReady() && !ttsServiceRef.current.isCurrentlySpeaking()) {
              ttsServiceRef.current.speak(response)
            } else if (!ttsServiceRef.current?.isReady()) {
              setError('Text-to-speech is not ready. Response shown as text.')
            }
          }, 200)
        },
        onError: (errorMsg: string) => {
          setError(errorMsg)
          setIsProcessing(false)
          isProcessingRef.current = false
        },
        onComplete: () => {
          setIsProcessing(false)
          isProcessingRef.current = false
        }
      }
    )

    ttsServiceRef.current = getTTSService({ rate: 0.9, volume: 0.8 }, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: (errorMsg: string) => {
          // Don't show "interrupted" errors to user - this is expected when manually stopping
          if (!errorMsg.includes('interrupted')) {
            setError(errorMsg)
          }
          setIsSpeaking(false)
        }
      }
    )

    return () => {
      // Cleanup
      if (sttServiceRef.current) {
        sttServiceRef.current.stop()
      }
      if (ttsServiceRef.current) {
        ttsServiceRef.current.stop()
      }
      // Clear pause timer and accumulated transcript
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current)
        pauseTimerRef.current = null
      }
      finalTranscriptRef.current = ''
      accumulatedTranscriptRef.current = ''
    }
  }, [handleUserMessage, startListening])

  const stopListening = useCallback(() => {
    if (sttServiceRef.current) {
      sttServiceRef.current.stop()
      setIsListening(false)
      isListeningRef.current = false
    }
    setIsWaiting(false)
    // Clear pause timer and accumulated transcript
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = null
    }
    finalTranscriptRef.current = ''
    accumulatedTranscriptRef.current = ''
  }, [])

  const stopSpeaking = () => {
    if (ttsServiceRef.current && ttsServiceRef.current.isCurrentlySpeaking()) {
      ttsServiceRef.current.stop()
      setIsSpeaking(false)
    }
  }

  const clearConversation = () => {
    setConversation([])
    setError(null)
    finalTranscriptRef.current = ''
    accumulatedTranscriptRef.current = ''
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = null
    }
    setIsWaiting(false)
  }

  const canStartListening = useCallback(() => {
    return !isListeningRef.current && !isProcessingRef.current && !isSpeaking && sttServiceRef.current?.getIsSupported()
  }, [isSpeaking])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Voice-to-Voice Test Mode
        </h1>

        {/* Status Indicators */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-sm font-medium">Listening</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isWaiting ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-sm font-medium">Waiting (5s)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isProcessing ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-sm font-medium">Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span className="text-sm font-medium">Speaking</span>
            </div>
          </div>

          {/* Current Transcript */}
          {transcript && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700">
                <strong>You said:</strong> {transcript}
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-700">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                ttsServiceRef.current?.markUserInteracted()
                startListening()
              }}
              disabled={!canStartListening()}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                canStartListening()
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isListening ? 'Listening...' : 'Start Listening'}
            </button>

            {isListening && (
              <button
                onClick={stopListening}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Stop Listening
              </button>
            )}

            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                Stop Speaking
              </button>
            )}

            <button
              onClick={clearConversation}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Clear Conversation
            </button>
            <button
              onClick={() => {
                if (ttsServiceRef.current?.isReady()) {
                  ttsServiceRef.current.speak('Hello! Text to speech is working correctly.')
                } else {
                  alert('TTS not ready yet. Please wait for initialization.')
                }
              }}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
            >
              Test TTS
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-600">
            {!sttServiceRef.current?.getIsSupported() && (
              <p>Speech recognition is not supported in this browser.</p>
            )}
            {ttsServiceRef.current?.getIsSupported() && !ttsServiceRef.current?.isReady() && (
              <p>Text-to-speech is initializing... Please wait.</p>
            )}
            {!ttsServiceRef.current?.getIsSupported() && (
              <p>Text-to-speech is not supported in this browser.</p>
            )}
            <button
              onClick={() => {
                // Mark user interaction and test TTS
                ttsServiceRef.current?.markUserInteracted()
                if (ttsServiceRef.current?.isReady() && !ttsServiceRef.current?.isCurrentlySpeaking()) {
                  console.log('Testing TTS short...')
                  // Add small delay to avoid hot reload interruptions
                  setTimeout(() => {
                    ttsServiceRef.current?.speak('Hello')
                  }, 100)
                } else if (ttsServiceRef.current?.isCurrentlySpeaking()) {
                  console.log('TTS is already speaking, stopping first...')
                  ttsServiceRef.current.stop()
                } else {
                  alert('TTS not ready. Please refresh the page and try again.')
                }
              }}
              className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
            >
              Test TTS (Short)
            </button>
            <button
              onClick={() => {
                // Mark user interaction and test TTS
                ttsServiceRef.current?.markUserInteracted()
                if (ttsServiceRef.current?.isReady() && !ttsServiceRef.current?.isCurrentlySpeaking()) {
                  console.log('Testing TTS long...')
                  // Add small delay to avoid hot reload interruptions
                  setTimeout(() => {
                    ttsServiceRef.current?.speak('Testing text to speech. This is a longer message to test if TTS works properly. Can you hear this audio clearly?')
                  }, 100)
                } else if (ttsServiceRef.current?.isCurrentlySpeaking()) {
                  console.log('TTS is already speaking, stopping first...')
                  ttsServiceRef.current.stop()
                } else {
                  alert('TTS not ready. Please refresh the page and try again.')
                }
              }}
              className="mt-2 ml-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
            >
              Test TTS (Long)
            </button>
            <div className="mt-2 text-xs text-gray-500">
              <p>If you don&apos;t hear audio, check:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Browser sound is not muted</li>
                <li>System volume is up</li>
                <li>Try clicking &quot;Test TTS&quot; buttons first</li>
                <li><strong>During development:</strong> Hot reload may interrupt TTS</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conversation History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Conversation History</h2>

          {conversation.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No conversation yet. Click &quot;Start Listening&quot; to begin. The system will wait 5 seconds after you finish speaking before processing your message.
          </p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {conversation.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-50 border-l-4 border-blue-400'
                      : 'bg-green-50 border-l-4 border-green-400'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      message.role === 'user' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {message.role === 'user' ? 'U' : 'AI'}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{message.content}</p>
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => {
                            if (ttsServiceRef.current?.isReady() && !ttsServiceRef.current.isCurrentlySpeaking()) {
                              ttsServiceRef.current.speak(message.content)
                            }
                          }}
                          className="mt-1 text-xs text-blue-600 hover:text-blue-800 underline"
                          disabled={!ttsServiceRef.current?.isReady() || ttsServiceRef.current?.isCurrentlySpeaking()}
                        >
                          🔊 Speak
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
