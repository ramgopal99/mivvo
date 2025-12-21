"use client"

import { useState, useRef } from 'react'
import { Orb } from '../dashboard/custominterview/_components/_meet_components/ui/orb'
import { Mic, Square, RotateCcw } from 'lucide-react'

type TabType = 'orb' | 'stt'

interface TranscriptionResult {
  text: string
  duration?: number
  language?: string
  processingTime: number
  audioSize: number
  wordCount: number
  charCount: number
}

export default function TestPage() {
  const [activeTab, setActiveTab] = useState<TabType>('orb')
  const [agentState, setAgentState] = useState<'thinking' | 'listening' | 'talking' | null>(null)

  // STT Test State
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcription, setTranscription] = useState<TranscriptionResult | null>(null)
  const [error, setError] = useState<string>('')
  const [useWhisper, setUseWhisper] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const startTimeRef = useRef<number>(0)

  // STT Test Functions
  const startRecording = async () => {
    try {
      setError('')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      })

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      startTimeRef.current = Date.now()

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await processAudio(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      setError('Failed to start recording: ' + (err as Error).message)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true)
    const processingStart = Date.now()

    try {
      if (useWhisper) {
        // Use Whisper API
        const formData = new FormData()
        formData.append('file', audioBlob, 'audio.webm')
        formData.append('model', 'whisper-1')

        const response = await fetch('/api/whisper-transcribe', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Whisper API error: ${response.status}`)
        }

        const result = await response.json()
        const processingTime = Date.now() - processingStart

        setTranscription({
          text: result.text,
          duration: result.duration,
          language: result.language,
          processingTime,
          audioSize: audioBlob.size,
          wordCount: result.text.trim().split(/\s+/).length,
          charCount: result.text.length
        })
      } else {
        // Use Web Speech API (simulated)
        const processingTime = Date.now() - processingStart

        setTranscription({
          text: "[Web Speech API would transcribe here - actual implementation requires browser support]",
          duration: audioBlob.size / 16000, // Rough estimate
          language: 'en',
          processingTime,
          audioSize: audioBlob.size,
          wordCount: 0,
          charCount: 0
        })
      }
    } catch (err) {
      setError('Processing failed: ' + (err as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetTest = () => {
    setTranscription(null)
    setError('')
    setIsRecording(false)
    setIsProcessing(false)
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Component Test Suite</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('orb')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'orb'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Orb Component
            </button>
            <button
              onClick={() => setActiveTab('stt')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'stt'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              STT Testing
            </button>
          </div>
        </div>

        {/* Orb Tab */}
        {activeTab === 'orb' && (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">Orb Component Test</h2>

            {/* Orb Component */}
            <div className="mb-8">
              <Orb
                agentState={agentState}
                colors={["#CADCFC", "#A0B9D1"]}
                className="w-48 h-48 mx-auto"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <button
                onClick={() => setAgentState(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
              >
                Idle (Brain Icon)
              </button>
              <button
                onClick={() => setAgentState('thinking')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
              >
                Thinking
              </button>
              <button
                onClick={() => setAgentState('listening')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
              >
                Listening (User Speaking)
              </button>
              <button
                onClick={() => setAgentState('talking')}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition-colors"
              >
                Talking (AI Speaking)
              </button>
            </div>

            {/* Current State Display */}
            <div className="text-white">
              <p className="text-lg">Current State: <span className="font-bold text-blue-400">{agentState || 'Idle'}</span></p>
            </div>
          </div>
        )}

        {/* STT Tab */}
        {activeTab === 'stt' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Speech-to-Text Testing</h2>

            {/* STT Provider Toggle */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">STT Provider</h3>
                  <p className="text-gray-300 text-sm">
                    {useWhisper
                      ? 'Using OpenAI Whisper API (higher accuracy, requires internet)'
                      : 'Using Web Speech API (works offline, limited languages)'}
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useWhisper}
                    onChange={(e) => setUseWhisper(e.target.checked)}
                    className="sr-only"
                    disabled={isRecording || isProcessing}
                  />
                  <div className={`relative inline-block w-10 h-6 rounded-full transition-colors ${
                    useWhisper ? 'bg-purple-600' : 'bg-gray-600'
                  } ${isRecording || isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      useWhisper ? 'translate-x-4' : 'translate-x-0'
                    }`}></span>
                  </div>
                  <span className="ml-3 text-sm font-medium">
                    {useWhisper ? 'Whisper' : 'Web Speech'}
                  </span>
                </label>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-5 h-5" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      Start Recording
                    </>
                  )}
                </button>

                <button
                  onClick={resetTest}
                  disabled={isRecording || isProcessing}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>

              {/* Status */}
              <div className="text-center text-sm text-gray-300">
                {isRecording && <p className="text-red-400 animate-pulse">🔴 Recording...</p>}
                {isProcessing && <p className="text-yellow-400 animate-pulse">⏳ Processing audio...</p>}
                {!isRecording && !isProcessing && !transcription && !error && (
                  <p>Click &quot;Start Recording&quot; to begin testing STT</p>
                )}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-900 border border-red-600 rounded-lg p-4 mb-6">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {/* Results */}
            {transcription && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Transcription Results</h3>

                {/* Transcription Text */}
                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Transcribed Text:</h4>
                  <p className="text-white leading-relaxed">{transcription.text}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">{transcription.processingTime}ms</div>
                    <div className="text-xs text-gray-300">Processing Time</div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">{(transcription.audioSize / 1024).toFixed(1)}KB</div>
                    <div className="text-xs text-gray-300">Audio Size</div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">{transcription.wordCount}</div>
                    <div className="text-xs text-gray-300">Words</div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{transcription.charCount}</div>
                    <div className="text-xs text-gray-300">Characters</div>
                  </div>
                </div>

                {/* Additional Metrics for Whisper */}
                {useWhisper && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-indigo-400">{transcription.duration?.toFixed(1) || 'N/A'}s</div>
                      <div className="text-xs text-gray-300">Audio Duration</div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-pink-400">{transcription.language || 'N/A'}</div>
                      <div className="text-xs text-gray-300">Detected Language</div>
                    </div>
                  </div>
                )}

                {/* Cost Estimation (Whisper pricing: $0.006/minute) */}
                {useWhisper && (
                  <div className="mt-4 bg-purple-900/30 border border-purple-600 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-purple-300 mb-3">Cost Estimation (Whisper API):</h4>

                    {/* Duration and Cost */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-purple-900/50 rounded-lg p-3">
                        <div className="text-sm text-purple-300 mb-1">Audio Duration</div>
                        <div className="text-xl font-bold text-white">
                          {transcription.duration ? transcription.duration.toFixed(1) : '~' + (transcription.audioSize / 32000).toFixed(1)} seconds
                        </div>
                        <div className="text-xs text-purple-400">
                          ({((transcription.duration || transcription.audioSize / 32000) / 60).toFixed(3)} minutes)
                        </div>
                      </div>

                      <div className="bg-purple-900/50 rounded-lg p-3">
                        <div className="text-sm text-purple-300 mb-1">API Cost</div>
                        <div className="text-xl font-bold text-green-400">
                          ${(((transcription.duration || transcription.audioSize / 32000) / 60) * 0.006).toFixed(4)}
                        </div>
                        <div className="text-lg font-semibold text-green-300">
                          ₹{((((transcription.duration || transcription.audioSize / 32000) / 60) * 0.006) * 90).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Token Usage Estimates */}
                    <div className="border-t border-purple-600 pt-3">
                      <h5 className="text-xs font-medium text-purple-300 mb-2">Token Usage Estimates:</h5>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-purple-900/30 rounded p-2">
                          <div className="text-lg font-bold text-purple-400">
                            ~{Math.ceil(transcription.audioSize / 1000)}
                          </div>
                          <div className="text-xs text-purple-300">Audio Tokens</div>
                        </div>
                        <div className="bg-purple-900/30 rounded p-2">
                          <div className="text-lg font-bold text-purple-400">
                            ~{Math.ceil(transcription.charCount / 4)}
                          </div>
                          <div className="text-xs text-purple-300">Output Tokens</div>
                        </div>
                        <div className="bg-purple-900/30 rounded p-2">
                          <div className="text-lg font-bold text-purple-400">
                            ~{Math.ceil(transcription.audioSize / 1000) + Math.ceil(transcription.charCount / 4)}
                          </div>
                          <div className="text-xs text-purple-300">Total Tokens</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-purple-300">
                      <p>* Whisper pricing: $0.006 per minute of audio</p>
                      <p>* INR conversion: ~₹90 per USD (approximate)</p>
                      <p>* Token estimates for reference only. Actual costs based on audio duration.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
