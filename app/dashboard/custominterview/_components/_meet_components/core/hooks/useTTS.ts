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

    // First priority: configured default voice name - try exact match first, then partial
    if (voiceConfig.defaultVoiceName) {
      const defaultName = voiceConfig.defaultVoiceName.toLowerCase().trim()
      
      console.log('🔍 Searching for default voice:', voiceConfig.defaultVoiceName)
      
      // Try exact match (case-insensitive)
      let defaultVoice = voices.find(voice => 
        voice.name.toLowerCase() === defaultName
      )
      
      // Try contains match if exact not found (voice name contains default name)
      if (!defaultVoice) {
        defaultVoice = voices.find(voice => {
          const voiceName = voice.name.toLowerCase()
          return voiceName.includes(defaultName)
        })
        if (defaultVoice) {
          console.log('✅ Found voice using contains match:', defaultVoice.name)
        }
      }
      
      // Try reverse contains match (default name contains voice name - for partial names)
      if (!defaultVoice) {
        defaultVoice = voices.find(voice => {
          const voiceName = voice.name.toLowerCase()
          return defaultName.includes(voiceName)
        })
        if (defaultVoice) {
          console.log('✅ Found voice using reverse contains match:', defaultVoice.name)
        }
      }
      
      // Try matching parts of the name (e.g., "WilliamMultilingual" -> "william", "multilingual")
      if (!defaultVoice) {
        const nameParts = defaultName.split(/[-_\s]+/).filter(part => part.length > 2)
        defaultVoice = voices.find(voice => {
          const voiceName = voice.name.toLowerCase()
          // Check if all significant parts are found in the voice name
          return nameParts.every(part => voiceName.includes(part)) || 
                 nameParts.some(part => part.length > 4 && voiceName.includes(part))
        })
        if (defaultVoice) {
          console.log('✅ Found voice using parts match:', defaultVoice.name)
        }
      }
      
      if (defaultVoice) {
        console.log('✅ Found configured default voice:', defaultVoice.name, 'URI:', defaultVoice.voiceURI)
        return defaultVoice
      } else {
        console.warn('⚠️ Default voice not found:', voiceConfig.defaultVoiceName)
        console.log('📋 Available English voices:', 
          voices
            .filter(v => v.lang.startsWith('en'))
            .slice(0, 15)
            .map(v => `"${v.name}"`)
            .join(', ')
        )
      }
    }

    // If default voice was configured but not found, return null
    // This allows the system to retry when voices are loaded
    if (voiceConfig.defaultVoiceName) {
      // Don't log warning here - voices might not be loaded yet
      // The warning will be logged when voices are actually available
      return null
    }

    // Second priority: Google/Microsoft English voices (only if no default configured)
    const preferredEnglish = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft'))
    )
    if (preferredEnglish) {
      console.log('Using fallback: Google/Microsoft English voice:', preferredEnglish.name)
      return preferredEnglish
    }

    // Third priority: Any English voice
    const englishVoice = voices.find(voice => voice.lang.startsWith('en'))
    if (englishVoice) {
      console.log('Using fallback: English voice:', englishVoice.name)
      return englishVoice
    }

    // Fallback: First available voice
    console.log('Using fallback: First available voice:', voices[0].name)
    return voices[0]
  }

  // Initialize TTS service with default voice
  useEffect(() => {
    // Initialize TTS service even if voices aren't loaded yet
    if (!ttsServiceRef.current) {
      const defaultVoice = findDefaultVoice(availableVoices)

      // Only log if voices are actually available (not during initial empty state)
      if (availableVoices.length > 0) {
        console.log('🎤 Initializing TTS service with voice:', defaultVoice?.name || 'default')
        if (voiceConfig.defaultVoiceName && !defaultVoice) {
          console.warn('⚠️ Default voice not found during initialization:', voiceConfig.defaultVoiceName)
        }
      } else {
        console.log('⏳ Initializing TTS service (voices loading...)')
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

      // IMMEDIATELY set the default voice in state and TTS service if available
      if (defaultVoice) {
        // Set in TTS service immediately
        if (ttsServiceRef.current) {
          ttsServiceRef.current.setVoice(defaultVoice.voiceURI)
          console.log('✅ Default voice set immediately during initialization:', defaultVoice.name)
        }
        // Set in state
        if (!selectedVoice) {
          setSelectedVoice(defaultVoice.voiceURI)
        }
      }
    } else if (ttsServiceRef.current && availableVoices.length > 0) {
      // Update TTS service if it exists and voices are now available
      const defaultVoice = findDefaultVoice(availableVoices)

      // ALWAYS force use default voice if configured and found, regardless of current voice
      // This ensures the default voice is always used when available
      if (defaultVoice && voiceConfig.defaultVoiceName) {
        const currentVoiceURI = ttsServiceRef.current.getCurrentVoice()
        const isDefaultVoice = defaultVoice.voiceURI === currentVoiceURI
        
        if (!isDefaultVoice) {
          const currentVoice = availableVoices.find(v => v.voiceURI === currentVoiceURI)
          console.log('🎯 IMMEDIATELY applying default voice:', defaultVoice.name, 'replacing:', currentVoice?.name || currentVoiceURI || 'unknown')
          
          // IMMEDIATELY apply the voice - don't wait for state updates
          ttsServiceRef.current.setVoice(defaultVoice.voiceURI)
          ttsServiceRef.current.setRate(voiceConfig.speechRate || 1.2)
          ttsServiceRef.current.setPitch(voiceConfig.speechPitch || 1.0)
          ttsServiceRef.current.setLanguage(voiceConfig.language || 'en-US')
          
          // Update state to keep it in sync
          setSelectedVoice(defaultVoice.voiceURI)
          
          console.log('✅ Default voice applied immediately:', defaultVoice.name)
        } else {
          console.log('✅ Default voice already active:', defaultVoice.name)
        }
      } else if (voiceConfig.defaultVoiceName && availableVoices.length > 0) {
        // Default voice not found - log warning with available voices
        console.warn('⚠️ Default voice not found:', voiceConfig.defaultVoiceName)
        console.log('📋 Available English voices:', 
          availableVoices
            .filter(v => v.lang.startsWith('en'))
            .slice(0, 15)
            .map(v => `"${v.name}"`)
            .join(', ')
        )
      }
    }
  }, [availableVoices, voiceConfig.speechRate, voiceConfig.speechPitch, voiceConfig.language, voiceConfig.defaultVoiceName, setSelectedVoice, selectedVoice, isAudioEnabled, isConversationMode])

  // Update TTS service when voice changes or config changes
  useEffect(() => {
    if (ttsServiceRef.current && availableVoices.length > 0) {
      // ALWAYS prioritize default voice if configured, regardless of selectedVoice
      if (voiceConfig.defaultVoiceName) {
        const defaultVoice = findDefaultVoice(availableVoices)
        if (defaultVoice) {
          const currentVoiceURI = ttsServiceRef.current.getCurrentVoice()
          const isCurrentlyDefault = defaultVoice.voiceURI === currentVoiceURI
          
          if (!isCurrentlyDefault) {
            const currentVoice = availableVoices.find(v => v.voiceURI === currentVoiceURI)
            console.log('🎯 IMMEDIATELY forcing default voice:', defaultVoice.name, 'replacing:', currentVoice?.name || currentVoiceURI || 'unknown')
            
            // IMMEDIATELY apply - don't wait for anything
            ttsServiceRef.current.setVoice(defaultVoice.voiceURI)
            ttsServiceRef.current.setRate(voiceConfig.speechRate || 1.2)
            ttsServiceRef.current.setPitch(voiceConfig.speechPitch || 1.0)
            ttsServiceRef.current.setLanguage(voiceConfig.language || 'en-US')
            
            // Update state to keep in sync
            setSelectedVoice(defaultVoice.voiceURI)
            
            console.log('✅ Default voice applied immediately in update effect')
            return // Exit early since we've set everything
          } else {
            // Voice is already correct, just update rate/pitch/language if needed
            ttsServiceRef.current.setRate(voiceConfig.speechRate || 1.2)
            ttsServiceRef.current.setPitch(voiceConfig.speechPitch || 1.0)
            ttsServiceRef.current.setLanguage(voiceConfig.language || 'en-US')
            return
          }
        }
      }
      
      // Use selected voice (only if no default configured or default not found)
      if (selectedVoice) {
        ttsServiceRef.current.setVoice(selectedVoice)
      }
      ttsServiceRef.current.setRate(voiceConfig.speechRate || 1.2)
      ttsServiceRef.current.setPitch(voiceConfig.speechPitch || 1.0)
      ttsServiceRef.current.setLanguage(voiceConfig.language || 'en-US')
    }
  }, [selectedVoice, voiceConfig.speechRate, voiceConfig.speechPitch, voiceConfig.language, voiceConfig.defaultVoiceName, availableVoices, setSelectedVoice])

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
