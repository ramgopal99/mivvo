"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Bug, ChevronDown, ChevronUp, X } from 'lucide-react'
import { InterviewData } from '@/app/dashboard/custominterview/_components/InterviewCard'
import { getDisplayJd } from '@/app/dashboard/custominterview/_components/utils/interview-utils'

// Default: show in development or when NEXT_PUBLIC_SHOW_DEBUG=true. Override with showDebug prop from siteConfig.
const DEFAULT_SHOW_DEBUG = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SHOW_DEBUG === 'true'

interface AssistantDetails {
  id?: string
  name?: string
  role?: string
  industry?: string
  experienceLevel?: string
  hasVoiceEnabled?: boolean
}

interface InterviewDebugPanelProps {
  interviewData: InterviewData | null
  assistantDetails?: AssistantDetails
  storedPrompt: string | null
  interviewDataForRoom: {
    id?: string
    title?: string
    customPrompt?: string
    jd?: string
    interviewType?: string
    foreignLanguageSubType?: string | null
  }
  sttAvailable: boolean | null
  ttsAvailable: boolean | null
  hasVideoPermission: boolean
  hasAudioPermission: boolean
  /** When false, debug panel is hidden. When true, shown. When undefined, uses default (dev or NEXT_PUBLIC_SHOW_DEBUG). */
  showDebug?: boolean
}

export function InterviewDebugPanel({
  interviewData,
  assistantDetails,
  storedPrompt,
  interviewDataForRoom,
  sttAvailable,
  ttsAvailable,
  hasVideoPermission,
  hasAudioPermission,
  showDebug,
}: InterviewDebugPanelProps) {
  const showDebugInfo = showDebug !== undefined ? showDebug : DEFAULT_SHOW_DEBUG
  const [showDebugPanel, setShowDebugPanel] = useState(false)
  const [debugExpanded, setDebugExpanded] = useState(false)
  
  // Voice information state for debug
  const [voiceInfo, setVoiceInfo] = useState<{
    availableVoices: number
    currentVoice: string | null
    defaultVoiceName: string
    speechRate: number
    speechPitch: number
    language: string
    allEnglishVoices: Array<{ name: string; lang: string }>
  } | null>(null)
  
  // Load voice information for debug
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoiceInfo = () => {
        const voices = speechSynthesis.getVoices()
        const defaultVoiceConfig = {
          defaultVoiceName: 'WilliamMu1-tiIingual',
          speechRate: 1.2,
          speechPitch: 1.0,
          language: 'en-US'
        }
        
        // Try to find current voice using the same logic as the app
        let currentVoice: string | null = null
        
        // Priority 1: Look for configured default voice
        const defaultVoice = voices.find(v => 
          v.name.toLowerCase().includes(defaultVoiceConfig.defaultVoiceName.toLowerCase()) ||
          v.name.includes(defaultVoiceConfig.defaultVoiceName)
        )
        
        if (defaultVoice) {
          currentVoice = defaultVoice.name
        } else {
          // Priority 2: Google/Microsoft English voices
          const preferredEnglish = voices.find(v => 
            v.lang.startsWith('en') && 
            (v.name.includes('Google') || v.name.includes('Microsoft'))
          )
          
          if (preferredEnglish) {
            currentVoice = preferredEnglish.name
          } else {
            // Priority 3: Any English voice
            const englishVoice = voices.find(v => v.lang.startsWith('en'))
            if (englishVoice) {
              currentVoice = englishVoice.name
            } else if (voices.length > 0) {
              // Fallback: First available voice
              currentVoice = voices[0].name
            }
          }
        }
        
        // Get all English voices for display
        const englishVoices = voices
          .filter(v => v.lang.startsWith('en'))
          .map(v => ({ name: v.name, lang: v.lang }))
          .slice(0, 20) // Limit to first 20 for display
        
        setVoiceInfo({
          availableVoices: voices.length,
          currentVoice: currentVoice || 'Not detected',
          defaultVoiceName: defaultVoiceConfig.defaultVoiceName,
          speechRate: defaultVoiceConfig.speechRate,
          speechPitch: defaultVoiceConfig.speechPitch,
          language: defaultVoiceConfig.language,
          allEnglishVoices: englishVoices
        })
      }
      
      // Load immediately and on voices changed
      loadVoiceInfo()
      if (speechSynthesis.onvoiceschanged !== null) {
        speechSynthesis.onvoiceschanged = loadVoiceInfo
      }
      
      // Also try loading after a delay in case voices aren't loaded yet
      const timeout = setTimeout(loadVoiceInfo, 1000)
      
      return () => {
        clearTimeout(timeout)
        if (speechSynthesis.onvoiceschanged === loadVoiceInfo) {
          speechSynthesis.onvoiceschanged = null
        }
      }
    }
  }, [])

  if (!showDebugInfo) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      {showDebugPanel ? (
        <div className="bg-gray-900 text-white rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          {/* Debug Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4 text-yellow-400" />
              <span className="font-semibold text-sm">Debug Info</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDebugExpanded(!debugExpanded)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                {debugExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDebugPanel(false)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Debug Content */}
          {debugExpanded && (
            <div className="p-4 max-h-[70vh] overflow-y-auto text-xs space-y-4">
              {/* Interview Basic Info */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Interview Details</h4>
                <div className="space-y-1 text-gray-300">
                  <div><span className="text-gray-500">ID:</span> {interviewData?.id || 'N/A'}</div>
                  <div><span className="text-gray-500">Title:</span> {interviewData?.title || 'N/A'}</div>
                  <div><span className="text-gray-500">Company:</span> {interviewData?.company || 'N/A'}</div>
                  <div><span className="text-gray-500">Status:</span> {interviewData?.status || 'N/A'}</div>
                  <div><span className="text-gray-500">Created:</span> {interviewData?.createdAt ? new Date(interviewData.createdAt).toLocaleString() : 'N/A'}</div>
                  <div><span className="text-gray-500">Interview Type:</span> {interviewData?.interviewType || 'N/A'}</div>
                  <div><span className="text-gray-500">Foreign Language:</span> {interviewData?.foreignLanguageSubType || 'N/A'}</div>
                  <div><span className="text-gray-500">Screen Share:</span> {interviewData?.screenShareEnabled ? 'Enabled' : 'Disabled'}</div>
                </div>
              </div>

              {/* Assistant Details */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Assistant Details</h4>
                <div className="space-y-1 text-gray-300">
                  <div><span className="text-gray-500">Name:</span> {assistantDetails?.name || 'N/A'}</div>
                  <div><span className="text-gray-500">Role:</span> {assistantDetails?.role || 'N/A'}</div>
                  <div><span className="text-gray-500">Industry:</span> {assistantDetails?.industry || 'N/A'}</div>
                  <div><span className="text-gray-500">Experience:</span> {assistantDetails?.experienceLevel || 'N/A'}</div>
                </div>
              </div>

              {/* Prompt Information */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Prompt Information</h4>
                <div className="space-y-2 text-gray-300">
                  <div>
                    <span className="text-gray-500">Stored Prompt (from DB):</span>
                    <div className="mt-1 p-2 bg-gray-800 rounded text-xs font-mono overflow-x-auto max-h-32 overflow-y-auto">
                      {storedPrompt ? (
                        <pre className="whitespace-pre-wrap break-words">{storedPrompt.substring(0, 500)}{storedPrompt.length > 500 ? '...' : ''}</pre>
                      ) : (
                        <span className="text-gray-500">No stored prompt found</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Custom Prompt (fallback):</span>
                    <div className="mt-1 p-2 bg-gray-800 rounded text-xs font-mono overflow-x-auto max-h-32 overflow-y-auto">
                      {interviewData?.customPrompt ? (
                        <pre className="whitespace-pre-wrap break-words">{interviewData.customPrompt.substring(0, 500)}{interviewData.customPrompt.length > 500 ? '...' : ''}</pre>
                      ) : (
                        <span className="text-gray-500">No custom prompt</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Prompt Used:</span>
                    <div className="mt-1 p-2 bg-gray-800 rounded text-xs font-mono overflow-x-auto max-h-32 overflow-y-auto">
                      {interviewDataForRoom.customPrompt ? (
                        <pre className="whitespace-pre-wrap break-words">{interviewDataForRoom.customPrompt.substring(0, 500)}{interviewDataForRoom.customPrompt.length > 500 ? '...' : ''}</pre>
                      ) : (
                        <span className="text-gray-500">Using JD as fallback</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">All Prompts in DB:</span>
                    <div className="mt-1 space-y-1">
                      {interviewData?.prompts && interviewData.prompts.length > 0 ? (
                        interviewData.prompts.map((prompt, idx) => (
                          <div key={prompt.id} className="p-2 bg-gray-800 rounded text-xs">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-gray-500">Prompt #{idx + 1}</span>
                              {prompt.isActive && (
                                <span className="px-1.5 py-0.5 bg-green-600 text-white rounded text-xs">Active</span>
                              )}
                            </div>
                            <pre className="whitespace-pre-wrap break-words text-xs">{prompt.promptText.substring(0, 200)}{prompt.promptText.length > 200 ? '...' : ''}</pre>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-500">No prompts in database</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Job Description</h4>
                <div className="p-2 bg-gray-800 rounded text-xs font-mono overflow-x-auto max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap break-words text-gray-300">
                    {interviewData?.jd ? (() => {
                      const displayJd = getDisplayJd(interviewData.jd)
                      return (
                        <>
                          {displayJd.substring(0, 500)}
                          {displayJd.length > 500 && '...'}
                        </>
                      )
                    })() : (
                      <span className="text-gray-500">No job description</span>
                    )}
                  </pre>
                </div>
              </div>

              {/* Data Passed to MeetTestRoom */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Data Passed to MeetTestRoom</h4>
                <div className="p-2 bg-gray-800 rounded text-xs font-mono overflow-x-auto max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap break-words text-gray-300">
                    {JSON.stringify(interviewDataForRoom, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Browser Capabilities */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">Browser Capabilities</h4>
                <div className="space-y-1 text-gray-300">
                  <div>
                    <span className="text-gray-500">STT Available:</span>{' '}
                    {sttAvailable === true ? '✅ Yes' : sttAvailable === false ? '❌ No' : '⏳ Checking...'}
                  </div>
                  <div>
                    <span className="text-gray-500">TTS Available:</span>{' '}
                    {ttsAvailable === true ? '✅ Yes' : ttsAvailable === false ? '❌ No' : '⏳ Checking...'}
                  </div>
                  <div>
                    <span className="text-gray-500">Video Permission:</span>{' '}
                    {hasVideoPermission ? '✅ Granted' : '❌ Not Granted'}
                  </div>
                  <div>
                    <span className="text-gray-500">Audio Permission:</span>{' '}
                    {hasAudioPermission ? '✅ Granted' : '❌ Not Granted'}
                  </div>
                </div>
              </div>

              {/* TTS Voice Information */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">TTS Voice Information</h4>
                <div className="space-y-1 text-gray-300">
                  <div>
                    <span className="text-gray-500">Default Voice Name (Config):</span>{' '}
                    <span className="text-blue-400">{voiceInfo?.defaultVoiceName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Current Voice (Detected):</span>{' '}
                    <span className="text-green-400 font-semibold">{voiceInfo?.currentVoice || 'Not detected'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Available Voices:</span>{' '}
                    <span className="text-yellow-400">{voiceInfo?.availableVoices || 0}</span> voices in browser
                  </div>
                  <div>
                    <span className="text-gray-500">Language:</span>{' '}
                    {voiceInfo?.language || 'N/A'}
                  </div>
                  <div>
                    <span className="text-gray-500">Speech Rate:</span>{' '}
                    {voiceInfo?.speechRate || 'N/A'}x
                  </div>
                  <div>
                    <span className="text-gray-500">Speech Pitch:</span>{' '}
                    {voiceInfo?.speechPitch || 'N/A'}
                  </div>
                  {voiceInfo && (
                    <>
                      <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
                        <div className="text-gray-500 mb-1 font-semibold">Voice Selection Priority:</div>
                        <div className="text-gray-400 text-xs space-y-0.5">
                          <div>1️⃣ Looks for: <span className="text-blue-400">&quot;{voiceInfo.defaultVoiceName}&quot;</span></div>
                          <div>2️⃣ Falls back to: <span className="text-yellow-400">Google/Microsoft English voices</span></div>
                          <div>3️⃣ Then: <span className="text-yellow-400">Any English voice</span></div>
                          <div>4️⃣ Finally: <span className="text-yellow-400">First available voice</span></div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-700 text-gray-500 text-xs">
                          💡 Check browser console for &quot;TTS Speaking with voice:&quot; to see actual voice used
                        </div>
                      </div>
                      
                      {/* Available English Voices List */}
                      {voiceInfo.allEnglishVoices && voiceInfo.allEnglishVoices.length > 0 && (
                        <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
                          <div className="text-gray-500 mb-2 font-semibold">Available English Voices ({voiceInfo.allEnglishVoices.length} shown):</div>
                          <div className="max-h-32 overflow-y-auto space-y-1">
                            {voiceInfo.allEnglishVoices.map((voice, idx) => (
                              <div 
                                key={idx} 
                                className={`text-xs p-1 rounded ${
                                  voice.name === voiceInfo.currentVoice 
                                    ? 'bg-green-900 text-green-300 font-semibold' 
                                    : 'text-gray-400'
                                }`}
                              >
                                {voice.name === voiceInfo.currentVoice && '▶ '}
                                {voice.name} <span className="text-gray-600">({voice.lang})</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-700 text-gray-500 text-xs">
                            💡 To use a different voice, update &quot;defaultVoiceName&quot; in defaultConfigs.ts to match one of the voices above
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={() => setShowDebugPanel(true)}
          className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 shadow-lg"
          size="sm"
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug
        </Button>
      )}
    </div>
  )
}
