import { useState, useRef, useEffect } from 'react'

interface UseVoiceDetectionProps {
  stream: MediaStream | null
  isAudioEnabled: boolean
  isVoiceChatActive: boolean
}

export function useVoiceDetection({ stream, isAudioEnabled, isVoiceChatActive }: UseVoiceDetectionProps) {
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)

  useEffect(() => {
    if (!stream || !isAudioEnabled) {
      setIsUserSpeaking(false)
      return
    }

    const audioTracks = stream.getAudioTracks()
    if (audioTracks.length === 0) {
      setIsUserSpeaking(false)
      return
    }

    audioContextRef.current = new AudioContext()
    analyserRef.current = audioContextRef.current.createAnalyser()
    analyserRef.current.fftSize = 256
    analyserRef.current.smoothingTimeConstant = 0.8

    microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream)
    microphoneRef.current.connect(analyserRef.current)

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const detectVoice = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)

      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
      const normalizedLevel = average / 255

      const isCurrentlySpeaking = normalizedLevel > 0.1 && !isVoiceChatActive
      setIsUserSpeaking(isCurrentlySpeaking)

      requestAnimationFrame(detectVoice)
    }

    detectVoice()

    return () => {
      if (microphoneRef.current) {
        microphoneRef.current.disconnect()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stream, isAudioEnabled, isVoiceChatActive])

  return { isUserSpeaking }
}
