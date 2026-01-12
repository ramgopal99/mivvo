/**
 * useTTS Hook
 * 
 * Handles TTS (Text-to-Speech) service initialization and management.
 * Automatically selects default voice from config and manages TTS lifecycle.
 */
import { useEffect, useRef } from 'react'
import { getTTSService } from '../../services/tts-service'
import { getSTTService } from '../../services/stt-service'
import { VoiceConfig } from '../../types'

interface UseTTSProps {
  voiceConfig: VoiceConfig
  availableVoices: SpeechSynthesisVoice[]
  selectedVoice: string
  setSelectedVoice: (voiceURI: string) => void
  isAudioEnabled: boolean
  isConversationMode: boolean
  onTTSSpeak?: (isSpeaking: boolean) => void // Changed to boolean to track speaking state
}

export function useTTS({
  voiceConfig,
  availableVoices,
  selectedVoice,
  setSelectedVoice,
  isAudioEnabled,
  isConversationMode,
  onTTSSpeak,
}: UseTTSProps) {
  const ttsServiceRef = useRef<ReturnType<typeof getTTSService> | null>(null)
  const sttServiceRef = useRef<ReturnType<typeof getSTTService> | null>(null)
  const wasListeningBeforeTTSRef = useRef<boolean>(false)

  // Get STT service instance for controlling speech recognition
  useEffect(() => {
    sttServiceRef.current = getSTTService('web-speech-api')
  }, [])

  // Find default voice based on config
  const findDefaultVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
    if (voices.length === 0) return null

    // First priority: configured default voice name
    if (voiceConfig.defaultVoiceName) {
      const defaultVoice = voices.find(voice => {
        const defaultName = voiceConfig.defaultVoiceName!
        return voice.name.toLowerCase().includes(defaultName.toLowerCase()) ||
               voice.name.includes(defaultName)
      })
      if (defaultVoice) {
        console.log('Found configured default voice:', defaultVoice.name)
        return defaultVoice
      }
    }

    // Second priority: Google/Microsoft English voices
    const preferredEnglish = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft'))
    )
    if (preferredEnglish) return preferredEnglish

    // Third priority: Any English voice
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'))
    if (englishVoice) return englishVoice

    // Fallback: First available voice
    return voices[0]
  }

  // Initialize TTS service with default voice
  useEffect(() => {
    // Initialize TTS service even if voices aren't loaded yet
    if (!ttsServiceRef.current) {
      const defaultVoice = findDefaultVoice(availableVoices)

      console.log('Initializing TTS service with voice:', defaultVoice?.name || 'default (will be set when voices load)')
      if (voiceConfig.defaultVoiceName) {
        console.log('Looking for default voice:', voiceConfig.defaultVoiceName)
        const foundVoice = availableVoices.find(v => 
          v.name.toLowerCase().includes(voiceConfig.defaultVoiceName!.toLowerCase())
        )
        console.log('Found default voice?', foundVoice?.name || 'Not found')
      }

      ttsServiceRef.current = getTTSService(
        {
          voice: defaultVoice?.voiceURI || '',
          rate: voiceConfig.speechRate || 1.2,
          pitch: voiceConfig.speechPitch || 1.0,
          volume: 1.0,
          language: voiceConfig.language || 'en-US',
        },
        {
          onStart: () => {
            // TTS started speaking - stop STT to prevent user interruption
            if (sttServiceRef.current && sttServiceRef.current.isListening()) {
              wasListeningBeforeTTSRef.current = true
              sttServiceRef.current.stop()
              console.log('STT stopped: AI is speaking')
            }
            // Notify that TTS is speaking
            onTTSSpeak?.(true)
          },
          onEnd: () => {
            // Notify that TTS finished speaking
            onTTSSpeak?.(false)
            
            // TTS finished speaking - resume STT if conversation mode is still active
            if (sttServiceRef.current && wasListeningBeforeTTSRef.current) {
              // Wait a small delay before resuming to ensure TTS is completely finished
              setTimeout(() => {
                if (isAudioEnabled && isConversationMode && sttServiceRef.current) {
                  try {
                    sttServiceRef.current.start({
                      language: voiceConfig.language || 'en-US',
                      continuous: true,
                      interimResults: true,
                    })
                    wasListeningBeforeTTSRef.current = false
                    console.log('STT resumed: AI finished speaking')
                  } catch (error) {
                    console.error('Error resuming STT after TTS:', error)
                    wasListeningBeforeTTSRef.current = false
                  }
                } else {
                  wasListeningBeforeTTSRef.current = false
                }
              }, 500) // Increased delay to ensure TTS is completely finished
            }
          },
          onError: (error) => {
            // Only log actual errors, not expected operational events
            if (!error) return
            
            const errorLower = error.toLowerCase()
            if (errorLower.includes('interrupted') || errorLower.includes('canceled')) {
              // Silently ignore - these are expected operational events
              return
            }
            
            // Only log actual errors
            console.error('TTS Error:', error)
          },
        }
      )

      // Set the default voice in state if available and not already set
      if (defaultVoice && !selectedVoice) {
        setSelectedVoice(defaultVoice.voiceURI)
      }
    } else if (ttsServiceRef.current && availableVoices.length > 0) {
      // Update TTS service if it exists and voices are now available
      const defaultVoice = findDefaultVoice(availableVoices)

      if (defaultVoice && !ttsServiceRef.current.getCurrentVoice()) {
        ttsServiceRef.current.setVoice(defaultVoice.voiceURI)
        if (!selectedVoice) {
          setSelectedVoice(defaultVoice.voiceURI)
        }
      }
    }
  }, [availableVoices.length, voiceConfig.speechRate, voiceConfig.speechPitch, voiceConfig.language, voiceConfig.defaultVoiceName, setSelectedVoice, selectedVoice, isAudioEnabled, isConversationMode])

  // Update TTS service when voice changes or config changes
  useEffect(() => {
    if (ttsServiceRef.current) {
      if (selectedVoice) {
        ttsServiceRef.current.setVoice(selectedVoice)
      }
      ttsServiceRef.current.setRate(voiceConfig.speechRate || 1.2)
      ttsServiceRef.current.setPitch(voiceConfig.speechPitch || 1.0)
      ttsServiceRef.current.setLanguage(voiceConfig.language || 'en-US')
    }
  }, [selectedVoice, voiceConfig.speechRate, voiceConfig.speechPitch, voiceConfig.language])

  // Cleanup TTS service on unmount
  useEffect(() => {
    return () => {
      if (ttsServiceRef.current) {
        ttsServiceRef.current.destroy()
        ttsServiceRef.current = null
      }
    }
  }, [])

  // Expose speak function
  const speak = (text: string) => {
    if (ttsServiceRef.current) {
      ttsServiceRef.current.speak(text)
    } else {
      console.warn('TTS service not initialized when trying to speak')
    }
  }

  return {
    ttsService: ttsServiceRef.current,
    speak,
  }
}
