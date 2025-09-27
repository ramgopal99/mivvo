'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import VoiceSettings from './voice-settings'

export default function TextToSpeech() {
  const [text, setText] = useState('')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>('')
  const [speechRate, setSpeechRate] = useState<number>(0.9)
  const [speechPitch, setSpeechPitch] = useState<number>(1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [autoListenAfterAI, setAutoListenAfterAI] = useState<boolean>(false)

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices()
      setVoices(availableVoices)
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].voiceURI)
      }
    }

    loadVoices()
    speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      speechSynthesis.onvoiceschanged = null
    }
  }, [selectedVoice])

  const handleSpeak = () => {
    if (!text.trim()) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = speechRate
    utterance.pitch = speechPitch

    const voice = voices.find(v => v.voiceURI === selectedVoice)
    if (voice) {
      utterance.voice = voice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }

  const handleStop = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Text to Speech</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">Enter text to speak:</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your text here..."
                className="min-h-[120px] resize-none"
              />
            </div>

            <VoiceSettings
              selectedVoice={selectedVoice}
              speechRate={speechRate}
              speechPitch={speechPitch}
              availableVoices={voices}
              autoListenAfterAI={autoListenAfterAI}
              onVoiceChange={setSelectedVoice}
              onRateChange={setSpeechRate}
              onPitchChange={setSpeechPitch}
              onTestVoice={() => handleSpeak()}
              onAutoListenChange={setAutoListenAfterAI}
              onReset={() => {
                setSpeechRate(0.9)
                setSpeechPitch(1)
                setAutoListenAfterAI(false)
                if (voices.length > 0) {
                  setSelectedVoice(voices[0].voiceURI)
                }
              }}
            />

            <div className="flex gap-3">
              <Button
                onClick={handleSpeak}
                disabled={!text.trim() || isSpeaking}
                className="flex-1"
              >
                {isSpeaking ? 'Speaking...' : 'Speak'}
              </Button>

              {isSpeaking && (
                <Button
                  onClick={handleStop}
                  variant="destructive"
                  className="flex-1"
                >
                  Stop
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
