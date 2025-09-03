"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"

export function SoundLevelMeter() {
  const [soundLevel, setSoundLevel] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      const microphone = audioContext.createMediaStreamSource(stream)
      
      analyser.smoothingTimeConstant = 0.8
      analyser.fftSize = 1024
      
      microphone.connect(analyser)
      
      audioContextRef.current = audioContext
      analyserRef.current = analyser
      setIsListening(true)
      
      updateSoundLevel()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopListening = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close()
    }
    setIsListening(false)
    setSoundLevel(0)
  }

  const updateSoundLevel = () => {
    if (!analyserRef.current) return
    
    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserRef.current.getByteFrequencyData(dataArray)
    
    let sum = 0
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i]
    }
    const average = sum / bufferLength
    setSoundLevel(average)
    
    animationFrameRef.current = requestAnimationFrame(updateSoundLevel)
  }

  useEffect(() => {
    return () => {
      stopListening()
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Microphone Level</span>
        </div>
        <div className="text-sm font-mono text-muted-foreground">
          {Math.round((soundLevel / 255) * 100)}%
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <div className="h-3 bg-muted rounded-full overflow-hidden border border-border/50">
            <div 
              className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-100 rounded-full"
              style={{ width: `${Math.min((soundLevel / 255) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        <Button
          variant={isListening ? "destructive" : "default"}
          size="sm"
          onClick={isListening ? stopListening : startListening}
          className="w-full"
        >
          {isListening ? (
            <>
              <div className="w-2 h-2 bg-white rounded-full mr-2" />
              Stop Test
            </>
          ) : (
            "Test Microphone"
          )}
        </Button>
      </div>
    </div>
  )
} 