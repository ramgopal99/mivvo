import { useState, useEffect } from 'react'
import { VoiceConfig } from '../../types'
import { SUPPORTED_LANGUAGES } from '../utils'

export function useVoiceSettings(voiceConfig: VoiceConfig) {
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 5
    let retryTimeout: NodeJS.Timeout | null = null
    
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
      
      // If voices aren't loaded yet, retry with exponential backoff
      if (voices.length === 0 && retryCount < maxRetries) {
        retryCount++
        const delay = Math.min(100 * Math.pow(2, retryCount), 2000) // 200ms, 400ms, 800ms, 1600ms, 2000ms max
        console.log(`⏳ [useVoiceSettings] Voices not loaded yet, retrying in ${delay}ms (attempt ${retryCount}/${maxRetries})`)
        retryTimeout = setTimeout(loadVoices, delay)
        return
      }
      
      // Clear retry timeout if voices are loaded
      if (retryTimeout) {
        clearTimeout(retryTimeout)
        retryTimeout = null
      }
      
      setAvailableVoices(voices)

      const targetVoices = voices.filter(voice =>
        SUPPORTED_LANGUAGES.some(lang => voice.lang.startsWith(lang))
      )

      // Only set default voice if no voice is currently selected
      // This prevents overriding user's voice selection
      if (targetVoices.length > 0) {
        setSelectedVoice((currentVoice) => {
          // If a voice is already selected and it's still available, keep it
          if (currentVoice) {
            const stillAvailable = targetVoices.find(v => v.voiceURI === currentVoice)
            if (stillAvailable) {
              return currentVoice
            }
          }
          
          // Prefer the configured default voice name if specified
          if (voiceConfig.defaultVoiceName) {
            const defaultName = voiceConfig.defaultVoiceName.toLowerCase().trim()
            
            // Only log once when voices are actually loaded
            if (retryCount === 0 || voices.length > 0) {
              console.log('🔍 [useVoiceSettings] Searching for default voice:', voiceConfig.defaultVoiceName, `(${targetVoices.length} English voices available)`)
            }
            
            // Try exact match first (case-insensitive)
            let preferredVoice = targetVoices.find(v => 
              v.name.toLowerCase() === defaultName
            )
            
            // Try contains match if exact not found (voice name contains default name)
            if (!preferredVoice) {
              preferredVoice = targetVoices.find(v => {
                const voiceName = v.name.toLowerCase()
                return voiceName.includes(defaultName)
              })
              if (preferredVoice) {
                console.log('✅ [useVoiceSettings] Found voice using contains match:', preferredVoice.name)
              }
            }
            
            // Try reverse contains match
            if (!preferredVoice) {
              preferredVoice = targetVoices.find(v => {
                const voiceName = v.name.toLowerCase()
                return defaultName.includes(voiceName)
              })
              if (preferredVoice) {
                console.log('✅ [useVoiceSettings] Found voice using reverse contains match:', preferredVoice.name)
              }
            }
            
            // Try matching parts of the name
            if (!preferredVoice) {
              const nameParts = defaultName.split(/[-_\s]+/).filter(part => part.length > 2)
              preferredVoice = targetVoices.find(v => {
                const voiceName = v.name.toLowerCase()
                return nameParts.every(part => voiceName.includes(part)) || 
                       nameParts.some(part => part.length > 4 && voiceName.includes(part))
              })
              if (preferredVoice) {
                console.log('✅ [useVoiceSettings] Found voice using parts match:', preferredVoice.name)
              }
            }
            
            if (preferredVoice) {
              console.log('✅ [useVoiceSettings] Selected default voice:', preferredVoice.name)
              return preferredVoice.voiceURI
            } else if (voices.length > 0) {
              // Only warn if voices are actually loaded (not during retries)
              console.warn('⚠️ [useVoiceSettings] Default voice not found:', voiceConfig.defaultVoiceName)
              console.log('📋 [useVoiceSettings] Available English voices:', 
                targetVoices
                  .slice(0, 15)
                  .map(v => `"${v.name}"`)
                  .join(', ')
              )
            }
          }
          
          // Otherwise, find a voice matching the language config
          const targetVoice = targetVoices.find(v =>
            v.lang.startsWith(voiceConfig.language) ||
            v.lang.startsWith(voiceConfig.language.split('-')[0])
          )
          return targetVoice ? targetVoice.voiceURI : targetVoices[0].voiceURI
        })
      }
    }

    // Initial load
    loadVoices()
    
    // Listen for voice changes (this fires when voices are actually loaded)
    speechSynthesis.onvoiceschanged = () => {
      retryCount = 0 // Reset retry count when voices change event fires
      loadVoices()
    }

    return () => {
      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }
      speechSynthesis.onvoiceschanged = null
    }
  }, [voiceConfig.language, voiceConfig.defaultVoiceName])

  const testVoice = () => {
    if (!selectedVoice) {
      console.warn('No voice selected for testing')
      return
    }

    const utterance = new SpeechSynthesisUtterance("This is how your selected voice sounds.")
    utterance.rate = voiceConfig.speechRate || 1.2
    utterance.pitch = voiceConfig.speechPitch || 1.0
    utterance.lang = voiceConfig.language || 'en-US'

    const voice = availableVoices.find(v => v.voiceURI === selectedVoice)
    if (voice) {
      utterance.voice = voice
    } else {
      console.warn('Selected voice not found in available voices')
    }

    speechSynthesis.speak(utterance)
  }

  return {
    selectedVoice,
    setSelectedVoice,
    availableVoices,
    testVoice,
  }
}
