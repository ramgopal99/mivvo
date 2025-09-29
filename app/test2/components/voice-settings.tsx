'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, ChevronDown, ChevronUp, Volume2, Gauge, Waves } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

interface VoiceSettingsProps {
  selectedVoice: string
  availableVoices: SpeechSynthesisVoice[]
  onVoiceChange: (voiceURI: string) => void
  onTestVoice: () => void
  speechRate?: number
  speechPitch?: number
  onRateChange?: (rate: number) => void
  onPitchChange?: (pitch: number) => void
}

export default function VoiceSettings({
  selectedVoice,
  availableVoices,
  onVoiceChange,
  onTestVoice,
  speechRate = 0.9,
  speechPitch = 1,
  onRateChange,
  onPitchChange
}: VoiceSettingsProps) {
  const [showSettings, setShowSettings] = useState(false)

  // Filter Indian and US voices
  const allVoices = availableVoices.filter(voice =>
    voice.lang.startsWith('hi') || voice.lang.startsWith('en') ||
    voice.lang.startsWith('bn') || voice.lang.startsWith('ta') ||
    voice.lang.startsWith('te') || voice.lang.startsWith('gu') ||
    voice.lang.startsWith('kn') || voice.lang.startsWith('ml') ||
    voice.lang.startsWith('mr') || voice.lang.startsWith('or') ||
    voice.lang.startsWith('pa') || voice.lang.startsWith('as') ||
    voice.lang.startsWith('ne')
  )


  return (
    <Card className="w-full max-w-lg shadow-2xl border-0 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-md rounded-xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Voice Settings
              </CardTitle>
              <Badge variant="secondary" className="text-xs mt-1 bg-primary/10 text-primary border-primary/20">
                {allVoices.length} voices available
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-8 w-8 p-0 rounded-full hover:bg-primary/10 transition-all duration-200"
          >
            {showSettings ? (
              <ChevronUp className="w-4 h-4 text-primary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-primary" />
            )}
          </Button>
        </div>
      </CardHeader>

      {showSettings && (
        <CardContent className="pt-6 px-6">
          <div className="space-y-6">
            {/* Voice Selection Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-accent/10">
                  <Volume2 className="w-4 h-4 text-accent-foreground" />
                </div>
                <Label className="text-sm font-medium text-foreground">
                  Voice Selection
                </Label>
              </div>
              <Select value={selectedVoice} onValueChange={onVoiceChange}>
                <SelectTrigger className="h-10 bg-background/50 border-2 border-input hover:border-primary/30 transition-colors">
                  <SelectValue placeholder="Choose your voice" />
                </SelectTrigger>
                <SelectContent className="max-h-52">
                  {allVoices.map((voice, index) => {
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
                        const words = voiceName.split(' ');
                        if (words.length >= 2) {
                          const characterName = words[1];

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

                          return characterName;
                        }
                      }

                      // Handle other voices
                      const words = voiceName.split(' ');
                      if (words.length >= 2) {
                        return words[1];
                      }

                      return voiceName.split(' ')[0] || voiceName;
                    };

                    const displayName = getDisplayName(voice.name);

                    return (
                      <SelectItem key={`${voice.voiceURI}-${index}`} value={voice.voiceURI}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{displayName}</span>
                          <Badge variant="outline" className="text-xs">
                            {voice.lang.startsWith('hi') ? 'हिंदी' :
                             voice.lang.startsWith('en') ? 'EN' :
                             voice.lang.substring(0, 2).toUpperCase()}
                          </Badge>
                        </div>
                      </SelectItem>
                    );
                  })}

                  {allVoices.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">
                      <Volume2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No voices available</p>
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Audio Controls Section */}
            <div className="space-y-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-accent/10">
                  <Waves className="w-4 h-4 text-accent-foreground" />
                </div>
                <Label className="text-sm font-medium text-foreground">
                  Audio Settings
                </Label>
              </div>

              {/* Speed Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">Speed</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground min-w-[2.5rem] text-right">
                      {speechRate.toFixed(1)}x
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <Slider
                    value={[speechRate]}
                    onValueChange={(value) => onRateChange?.(value[0])}
                    min={0.1}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>

              {/* Pitch Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">Pitch</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground min-w-[2.5rem] text-right">
                      {speechPitch.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <Slider
                    value={[speechPitch]}
                    onValueChange={(value) => onPitchChange?.(value[0])}
                    min={0}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Voice Button */}
            <Button
              onClick={onTestVoice}
              className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Test Voice Settings
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
