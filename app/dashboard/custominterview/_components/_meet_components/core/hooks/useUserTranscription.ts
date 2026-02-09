/**
 * useUserTranscription Hook
 * 
 * This hook handles user speech-to-text transcription.
 * It tries to use react-speech-recognition first, and falls back to Web Speech API if it fails.
 */
'use client'

import { useEffect, useRef, useState } from 'react'
import { getSTTService, STTConfig } from '../../services/stt-service'

// Always import react-speech-recognition (it's installed in package.json)
// The hook handles browser support internally
import { useSpeechRecognition } from 'react-speech-recognition'
import SpeechRecognition from 'react-speech-recognition'

interface UseUserTranscriptionProps {
  isAudioEnabled: boolean
  isConversationMode: boolean
  language?: string
  shouldPause?: boolean // Pause transcription when AI is speaking
  onFinalTranscript?: (text: string) => void
  onTranscriptSent?: () => void // Callback to reset transcript after sending to LLM
}

export function useUserTranscription({
  isAudioEnabled,
  isConversationMode,
  language = 'en-US',
  shouldPause = false,
  onFinalTranscript,
  onTranscriptSent
}: UseUserTranscriptionProps) {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [browserSupportsSpeechRecognition, setBrowserSupportsSpeechRecognition] = useState(false)
  const [useReactSR, setUseReactSR] = useState<boolean>(false)
  const [moduleLoaded, setModuleLoaded] = useState(false)
  const sttServiceRef = useRef<ReturnType<typeof getSTTService> | null>(null)
  const wasListeningRef = useRef(false)
  const finalTranscriptRef = useRef('')
  const shouldListenRef = useRef(false)
  const onFinalTranscriptRef = useRef(onFinalTranscript)
  const onTranscriptSentRef = useRef(onTranscriptSent)
  const accumulatedFinalRef = useRef('')
  const lastFinalTranscriptRef = useRef('') // Track last final transcript to detect new ones
  const transcriptStartRef = useRef('') // Track transcript at start of current session
  
  // Keep callback refs updated
  useEffect(() => {
    onFinalTranscriptRef.current = onFinalTranscript
    onTranscriptSentRef.current = onTranscriptSent
  }, [onFinalTranscript, onTranscriptSent])

  // Always call the hook - it handles browser support internally
  const reactSRResult = useSpeechRecognition()

  // Determine which provider to use
  useEffect(() => {
    if (reactSRResult && SpeechRecognition) {
      const { browserSupportsSpeechRecognition: supports } = reactSRResult
      if (supports && SpeechRecognition.browserSupportsSpeechRecognition()) {
        setUseReactSR(true)
        setBrowserSupportsSpeechRecognition(true)
        setModuleLoaded(true)
        return
      }
    }
    
    // Fallback to Web Speech API
    setUseReactSR(false)
    setModuleLoaded(true)
  }, [reactSRResult])

  // Handle react-speech-recognition results
  useEffect(() => {
    if (!useReactSR || !reactSRResult || !SpeechRecognition) return

    const {
      transcript: srTranscript,
      finalTranscript: srFinalTranscript,
      listening: srListening,
      browserSupportsSpeechRecognition: srSupports,
      resetTranscript: srResetTranscript,
    } = reactSRResult

    // Update state from react-speech-recognition
    // Only show the current session's transcript, not accumulated
    // Calculate the difference from when we started this session
    const currentTranscript = srTranscript || ''
    let sessionTranscript = currentTranscript
    
    if (transcriptStartRef.current && currentTranscript.startsWith(transcriptStartRef.current)) {
      // Remove the starting transcript to show only new content
      sessionTranscript = currentTranscript.slice(transcriptStartRef.current.length).trim()
    } else if (transcriptStartRef.current && currentTranscript.length < transcriptStartRef.current.length) {
      // Transcript was reset, update the start reference
      transcriptStartRef.current = currentTranscript
      sessionTranscript = ''
    }
    
    setTranscript(sessionTranscript)
    setIsListening(srListening)
    setBrowserSupportsSpeechRecognition(srSupports || false)

    // Handle final transcripts
    // finalTranscript from react-speech-recognition contains only new final parts since last reset
    // We send each new final part to the callback, which will accumulate them
    // The transcript will only be reset after sending to LLM (not here)
    if (srFinalTranscript && srFinalTranscript.trim()) {
      const currentFinal = srFinalTranscript.trim()
      
      // Calculate only the NEW part (difference from what we last processed)
      let newPart = currentFinal
      if (lastFinalTranscriptRef.current) {
        // If current final starts with what we last processed, extract only the new part
        if (currentFinal.startsWith(lastFinalTranscriptRef.current)) {
          newPart = currentFinal.slice(lastFinalTranscriptRef.current.length).trim()
        } else if (lastFinalTranscriptRef.current.includes(currentFinal)) {
          // If last processed contains current, it means transcript was reset, use current as new
          newPart = currentFinal
          lastFinalTranscriptRef.current = '' // Reset tracking
        }
        // If they're completely different, use current as new
      }
      
      // Only process if there's actually new content
      // Note: We allow the same text to be sent multiple times if needed for accumulation
      if (newPart && newPart.length > 0) {
        // Update tracking - store the full current final for next comparison
        lastFinalTranscriptRef.current = currentFinal
        
        // Send the new final part to callback - it will accumulate and reset timeout
        if (onFinalTranscriptRef.current) {
          onFinalTranscriptRef.current(newPart)
        }
        
        // Don't reset transcript here - let it accumulate until user is silent
        // The transcript will be reset after sending to LLM in meet-test-room.tsx
        // This allows multiple final transcripts to accumulate before sending
      }
    } else if (!srFinalTranscript && lastFinalTranscriptRef.current) {
      // Transcript was reset (empty), clear our tracking
      lastFinalTranscriptRef.current = ''
    }

    // Start/stop listening - pause when AI is speaking
    const shouldListen = isAudioEnabled && isConversationMode && !shouldPause
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('[STT] shouldListen:', shouldListen, {
        isAudioEnabled,
        isConversationMode,
        shouldPause,
        srListening,
        wasListening: wasListeningRef.current
      })
    }

    if (shouldListen && !srListening) {
      // Start listening if we should be listening but aren't
      if (!wasListeningRef.current) {
        wasListeningRef.current = true
        accumulatedFinalRef.current = ''
        lastFinalTranscriptRef.current = '' // Reset tracking
        // Store the current transcript as the starting point for this session
        transcriptStartRef.current = srTranscript || ''
        srResetTranscript() // Reset the transcript
      }
      try {
        SpeechRecognition.startListening({
          continuous: true,
          language: language,
          interimResults: true,
        })
      } catch (error) {
        console.error('Error starting react-speech-recognition:', error)
        wasListeningRef.current = false
        // Fallback to Web Speech API on error
        setUseReactSR(false)
      }
    } else if (!shouldListen && srListening) {
      // Stop listening if we shouldn't be listening but are
      wasListeningRef.current = false
      shouldListenRef.current = false
      try {
        SpeechRecognition.stopListening()
        accumulatedFinalRef.current = ''
        lastFinalTranscriptRef.current = ''
        transcriptStartRef.current = ''
        srResetTranscript()
      } catch (error) {
        console.error('Error stopping react-speech-recognition:', error)
      }
    } else if (!shouldListen) {
      // Ensure wasListeningRef is false when we shouldn't be listening
      wasListeningRef.current = false
    }
  }, [
    useReactSR,
    reactSRResult,
    isAudioEnabled,
    isConversationMode,
    shouldPause,
    language,
  ])

  // Initialize Web Speech API fallback
  useEffect(() => {
    if (typeof window === 'undefined' || !moduleLoaded) return
    if (useReactSR) return // Skip if using react-speech-recognition

    const config: STTConfig = {
      language: language,
      continuous: true,
      interimResults: true,
    }

    const sttService = getSTTService('web-speech-api', config, {
      onTranscript: (text, isFinal) => {
        // For Web Speech API, the service already handles accumulation
        // We just need to show the current session's transcript
        setTranscript(text)
        if (isFinal && text.trim() && onFinalTranscriptRef.current) {
          onFinalTranscriptRef.current(text.trim())
        }
      },
      onStart: () => {
        setIsListening(true)
      },
      onEnd: () => {
        setIsListening(false)
        if (shouldListenRef.current && sttServiceRef.current) {
          setTimeout(() => {
            if (!shouldListenRef.current || !sttServiceRef.current) return
            // Present-timing guard: only start if not already listening (avoids double-start
            // e.g. if useTTS also restarted STT after TTS ended)
            if (sttServiceRef.current.isListening()) return
            try {
              sttServiceRef.current.start({
                language: language,
                continuous: true,
                interimResults: true,
              })
            } catch (error) {
              console.error('Error restarting recognition:', error)
            }
          }, 100)
        }
      },
      onError: (error) => {
        console.error('Web Speech API error:', error)
        setIsListening(false)
        // Try to fallback to react-speech-recognition if Web Speech API fails
        if (reactSRResult && SpeechRecognition) {
          const { browserSupportsSpeechRecognition: supports } = reactSRResult
          if (supports && SpeechRecognition.browserSupportsSpeechRecognition()) {
            console.log('Falling back to react-speech-recognition')
            setUseReactSR(true)
          }
        }
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
       }, [language, useReactSR, moduleLoaded, shouldPause, reactSRResult])

       // Start/stop listening for Web Speech API fallback
       useEffect(() => {
         if (useReactSR || !sttServiceRef.current || !browserSupportsSpeechRecognition) {
           return
         }

         const shouldListen = isAudioEnabled && isConversationMode && !shouldPause
         shouldListenRef.current = shouldListen

         if (shouldListen && !isListening) {
           // Start listening if we should be listening but aren't
           if (!wasListeningRef.current) {
             wasListeningRef.current = true
             finalTranscriptRef.current = ''
             transcriptStartRef.current = '' // Reset for new session
             setTranscript('')
           }
           try {
             sttServiceRef.current.start({
               language: language,
               continuous: true,
               interimResults: true,
             })
           } catch (error) {
             console.error('Error starting speech recognition:', error)
             wasListeningRef.current = false
             // Try to fallback to react-speech-recognition
             if (reactSRResult && SpeechRecognition) {
               const { browserSupportsSpeechRecognition: supports } = reactSRResult
               if (supports && SpeechRecognition.browserSupportsSpeechRecognition()) {
                 setUseReactSR(true)
               }
             }
           }
         } else if (!shouldListen && isListening) {
           // Stop listening if we shouldn't be listening but are
           wasListeningRef.current = false
           shouldListenRef.current = false
           try {
             sttServiceRef.current.stop()
             finalTranscriptRef.current = ''
             transcriptStartRef.current = ''
             setTranscript('')
           } catch (error) {
             console.error('Error stopping speech recognition:', error)
           }
         } else if (!shouldListen) {
           // Ensure wasListeningRef is false when we shouldn't be listening
           wasListeningRef.current = false
         }
       }, [isAudioEnabled, isConversationMode, shouldPause, isListening, language, browserSupportsSpeechRecognition, useReactSR, reactSRResult])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sttServiceRef.current) {
        sttServiceRef.current.stop()
      }
      if (useReactSR && SpeechRecognition) {
        try {
          SpeechRecognition.stopListening()
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  }, [useReactSR])

  // Expose reset function to parent component
  const resetTranscript = useRef(() => {
    if (useReactSR && reactSRResult && SpeechRecognition) {
      try {
        // Reset the transcript - this clears it
        reactSRResult.resetTranscript()
        // Update start reference to empty since transcript is now empty
        transcriptStartRef.current = ''
        lastFinalTranscriptRef.current = ''
        accumulatedFinalRef.current = ''
        setTranscript('')
      } catch (error) {
        console.error('Error resetting react-speech-recognition transcript:', error)
      }
    } else if (sttServiceRef.current) {
      // For Web Speech API, we need to restart to reset
      try {
        sttServiceRef.current.stop()
        finalTranscriptRef.current = ''
        transcriptStartRef.current = ''
        setTranscript('')
        if (shouldListenRef.current) {
          setTimeout(() => {
            if (sttServiceRef.current && shouldListenRef.current) {
              sttServiceRef.current.start({
                language: language,
                continuous: true,
                interimResults: true,
              })
            }
          }, 100)
        }
      } catch (error) {
        console.error('Error resetting Web Speech API transcript:', error)
      }
    }
  }).current

  return {
    transcript: transcript,
    isListening: isListening,
    browserSupportsSpeechRecognition,
    resetTranscript, // Expose reset function
  }
}
