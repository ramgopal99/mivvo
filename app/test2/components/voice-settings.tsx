'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Settings, ChevronDown, ChevronUp } from 'lucide-react'

interface VoiceSettingsProps {
  selectedVoice: string
  speechRate: number
  speechPitch: number
  availableVoices: SpeechSynthesisVoice[]
  autoListenAfterAI: boolean
  onVoiceChange: (voiceURI: string) => void
  onRateChange: (rate: number) => void
  onPitchChange: (pitch: number) => void
  onTestVoice: () => void
  onReset: () => void
  onAutoListenChange: (enabled: boolean) => void
}

export default function VoiceSettings({
  selectedVoice,
  speechRate,
  speechPitch,
  availableVoices,
  autoListenAfterAI,
  onVoiceChange,
  onRateChange,
  onPitchChange,
  onTestVoice,
  onReset,
  onAutoListenChange
}: VoiceSettingsProps) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="border rounded-lg p-4">
      <Button
        onClick={() => setShowSettings(!showSettings)}
        variant="ghost"
        className="w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Voice Settings
        </div>
        {showSettings ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>

      {showSettings && (
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="voice-select">Voice ({availableVoices.length} available)</Label>
            <Select value={selectedVoice} onValueChange={onVoiceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice, index) => (
                  <SelectItem key={`${voice.voiceURI}-${index}`} value={voice.voiceURI}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="auto-listen">Auto-listen after AI response</Label>
            <Switch
              id="auto-listen"
              checked={autoListenAfterAI}
              onCheckedChange={onAutoListenChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="speech-rate">Speech Rate: {speechRate.toFixed(1)}x</Label>
            <input
              id="speech-rate"
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={speechRate}
              onChange={(e) => onRateChange(parseFloat(e.target.value))}
              aria-label={`Speech rate: ${speechRate.toFixed(1)} times`}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Slower</span>
              <span>Faster</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="speech-pitch">Speech Pitch: {speechPitch.toFixed(1)}</Label>
            <input
              id="speech-pitch"
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={speechPitch}
              onChange={(e) => onPitchChange(parseFloat(e.target.value))}
              aria-label={`Speech pitch: ${speechPitch.toFixed(1)}`}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Lower</span>
              <span>Higher</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onTestVoice}
              variant="outline"
              size="sm"
            >
              Test Voice
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
