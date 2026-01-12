'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, ChevronDown, ChevronUp, Volume2, X } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '../utils/defaultConfigs'

interface VoiceSettingsProps {
  selectedVoice: string
  availableVoices: SpeechSynthesisVoice[]
  onVoiceChange: (voiceURI: string) => void
  onTestVoice: () => void
  onClose?: () => void
}

export function VoiceSettings({
  selectedVoice,
  availableVoices,
  onVoiceChange,
  onTestVoice,
  onClose
}: VoiceSettingsProps) {
  const [showSettings, setShowSettings] = useState(false)

  // Filter voices based on supported languages from config
  const allVoices = availableVoices.filter(voice =>
    SUPPORTED_LANGUAGES.some(lang => voice.lang.startsWith(lang))
  )

  // Create shorter, more user-friendly names
  const getDisplayName = (voiceName: string) => {
    // Handle Google voices with specific patterns
    if (voiceName === 'Google US English') return 'US English';
    if (voiceName === 'Google UK English Female') return 'UK Female';
    if (voiceName === 'Google UK English Male') return 'UK Male';
    if (voiceName.startsWith('Google') && voiceName.includes('US English')) {
      return voiceName.replace('Google US English ', '').replace(' (en-US)', '');
    }
    if (voiceName.startsWith('Google') && voiceName.includes('UK English')) {
      return voiceName.includes('Female') ? 'UK Female' : 'UK Male';
    }

    // Handle Microsoft voices
    if (voiceName.includes('Microsoft')) {
      // Split by spaces and get the second word (character name after "Microsoft")
      const words = voiceName.split(' ');
      if (words.length >= 2) {
        const characterName = words[1]; // Second word is the character name

        // Extract character name from technical voice name
        if (characterName.includes('Ravi')) return 'Ravi';
        if (characterName.includes('Priya')) return 'Priya';
        if (characterName.includes('Amit')) return 'Amit';
        if (characterName.includes('Ananya')) return 'Ananya';
        if (characterName.includes('Arjun')) return 'Arjun';
        if (characterName.includes('Kavya')) return 'Kavya';
        if (characterName.includes('Vikram')) return 'Vikram';
        if (characterName.includes('Meera')) return 'Meera';
        if (characterName.includes('Rahul')) return 'Rahul';
        if (characterName.includes('Sneha')) return 'Sneha';
        if (characterName.includes('Madhur')) return 'Madhur';

        return characterName; // Return the second word as-is
      }
    }

    // Handle other voices - take first meaningful word
    const words = voiceName.split(' ');
    if (words.length >= 2) {
      return words[1]; // Take second word for most cases
    }

    return voiceName.split(' ')[0] || voiceName;
  };

  // Get current voice name for display
  const getCurrentVoiceName = () => {
    if (!selectedVoice) return 'No voice selected'
    const currentVoice = allVoices.find(voice => voice.voiceURI === selectedVoice)
    if (!currentVoice) return 'Voice not found'
    return getDisplayName(currentVoice.name)
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0 bg-background/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <div className="flex flex-col">
              <CardTitle className="text-sm font-medium">Voice Settings</CardTitle>
              <p className="text-xs text-muted-foreground">
                Current: {getCurrentVoiceName()}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {allVoices.length} voices
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="h-6 w-6 p-0"
            >
              {showSettings ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {showSettings && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Voice Selection and Test Button in One Row */}
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Label htmlFor="voice-select" className="text-xs font-medium text-foreground">
                  All Voices ({allVoices.length})
                </Label>
                <Select 
                  value={selectedVoice || undefined} 
                  onValueChange={(value) => {
                    if (value && value !== selectedVoice) {
                      onVoiceChange(value)
                    }
                  }}
                >
                  <SelectTrigger className="h-8 text-xs bg-background border-input mt-1">
                    <SelectValue placeholder={selectedVoice ? getCurrentVoiceName() : "Select voice"} />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    {allVoices.map((voice, index) => {
                      const displayName = getDisplayName(voice.name);

                      return (
                        <SelectItem key={`${voice.voiceURI}-${index}`} value={voice.voiceURI}>
                          <div className="flex items-center">
                            <span className="font-medium text-xs text-foreground">{displayName}</span>
                          </div>
                        </SelectItem>
                      );
                    })}

                    {allVoices.length === 0 && (
                      <div className="p-2 text-center text-muted-foreground text-xs">
                        No voices available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Test Voice Button */}
              <Button
                onClick={onTestVoice}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 h-8 text-xs hover:bg-accent hover:text-accent-foreground mb-1"
              >
                <Volume2 className="w-3 h-3" />
                Test Voice
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
