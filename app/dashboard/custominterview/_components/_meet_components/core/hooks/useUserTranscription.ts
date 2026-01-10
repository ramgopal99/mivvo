/**
 * useUserTranscription Hook
 * 
 * This hook handles user speech-to-text transcription.
 * It ONLY uses the STT service from stt-service.ts - no direct Web Speech API calls.
 * All STT functionality is centralized in the service layer.
 */
import { useEffect, useRef, useState } from 'react'
import { getSTTService, STTConfig } from '../../services/stt-service'

interface UseUserTranscriptionProps {
  isAudioEnabled: boolean
  isConversationMode: boolean
  language?: string
  onFinalTranscript?: (text: string) => void
}

export function useUserTranscription({
  isAudioEnabled,
  isConversationMode,
  language = 'en-US',
  onFinalTranscript
}: UseUserTranscriptionProps) {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [browserSupportsSpeechRecognition, setBrowserSupportsSpeechRecognition] = useState(false)
  const sttServiceRef = useRef<ReturnType<typeof getSTTService> | null>(null)
  const wasListeningRef = useRef(false)
  const finalTranscriptRef = useRef('')
  const shouldListenRef = useRef(false)
  const onFinalTranscriptRef = useRef(onFinalTranscript)
  
  // Keep callback ref updated
  useEffect(() => {
    onFinalTranscriptRef.current = onFinalTranscript
  }, [onFinalTranscript])

  // Initialize STT service
  useEffect(() => {
    if (typeof window === 'undefined') return

    const config: STTConfig = {
      language: language,
      continuous: true,
      interimResults: true,
    }

    const sttService = getSTTService('web-speech-api', config, {
      onTranscript: (text, isFinal) => {
        // The service already accumulates final transcripts
        // Just update the display with the full transcript
        setTranscript(text)
        
        // When we get a final transcript, notify the callback
        if (isFinal && text.trim() && onFinalTranscriptRef.current) {
          onFinalTranscriptRef.current(text.trim())
        }
      },
      onStart: () => {
        setIsListening(true)
      },
      onEnd: () => {
        setIsListening(false)
        // Auto-restart if we should still be listening
        if (shouldListenRef.current && sttServiceRef.current) {
          setTimeout(() => {
            if (shouldListenRef.current && sttServiceRef.current) {
              try {
                sttServiceRef.current.start({
                  language: language,
                  continuous: true,
                  interimResults: true,
                })
              } catch (error) {
                console.error('Error restarting recognition:', error)
              }
            }
          }, 100)
        }
      },
      onError: (_error) => {
        // Service already filters out "aborted" and "no-speech" errors
        // Only real errors reach here, but we don't show them on screen
        // Silently handle errors to avoid UI disruption
        setIsListening(false)
      },
    })

    sttServiceRef.current = sttService
    const isSupported = sttService.isSupported()
    setBrowserSupportsSpeechRecognition(isSupported)

    return () => {
      if (sttServiceRef.current) {
        sttServiceRef.current.stop()
      }
    }
  }, [language])

  // Start/stop listening based on audio and conversation mode
  useEffect(() => {
    if (!sttServiceRef.current || !browserSupportsSpeechRecognition) {
      return
    }

    const shouldListen = isAudioEnabled && isConversationMode
    shouldListenRef.current = shouldListen

    if (shouldListen && !isListening && !wasListeningRef.current) {
      wasListeningRef.current = true
      finalTranscriptRef.current = '' // Reset transcript when starting
      setTranscript('')
      try {
        sttServiceRef.current.start({
          language: language,
          continuous: true,
          interimResults: true,
        })
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        wasListeningRef.current = false
      }
    } else if (!shouldListen && isListening) {
      wasListeningRef.current = false
      shouldListenRef.current = false
      try {
        sttServiceRef.current.stop()
        finalTranscriptRef.current = ''
        setTranscript('')
      } catch (error) {
        console.error('Error stopping speech recognition:', error)
      }
    }
  }, [isAudioEnabled, isConversationMode, isListening, language, browserSupportsSpeechRecognition])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sttServiceRef.current) {
        sttServiceRef.current.stop()
      }
    }
  }, [])

  return {
    transcript: transcript,
    isListening: isListening,
    browserSupportsSpeechRecognition,
  }
}
