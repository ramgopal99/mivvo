import { useState, useEffect } from 'react'
import { VoiceConfig } from '../../types'

const SUPPORTED_LANGUAGES = ['hi', 'en', 'bn', 'ta', 'te', 'gu', 'kn', 'ml', 'mr', 'or', 'pa', 'as', 'ne']

export function useVoiceSettings(voiceConfig: VoiceConfig) {
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices()
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
            // Try case-insensitive matching first
            const preferredVoice = targetVoices.find(v => 
              v.name.toLowerCase().includes(voiceConfig.defaultVoiceName!.toLowerCase()) ||
              v.name.includes(voiceConfig.defaultVoiceName!)
            )
            if (preferredVoice) {
              console.log('Selected default voice:', preferredVoice.name, preferredVoice.voiceURI)
              return preferredVoice.voiceURI
            } else {
              console.log('Default voice not found:', voiceConfig.defaultVoiceName, 'Available voices:', targetVoices.map(v => v.name))
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

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices

    return () => {
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
