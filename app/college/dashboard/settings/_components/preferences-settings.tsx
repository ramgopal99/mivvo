"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Palette } from "lucide-react"
import { useState } from "react"

interface PreferencesSettingsProps {
  initialPreferences?: {
    theme: string
    language: string
    timezone: string
    dateFormat: string
  }
  onPreferencesChange?: (preferences: {
    theme: string
    language: string
    timezone: string
    dateFormat: string
  }) => void
}

export function PreferencesSettings({
  initialPreferences = {
    theme: "system",
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY"
  },
  onPreferencesChange
}: PreferencesSettingsProps) {
  const [preferences, setPreferences] = useState(initialPreferences)

  const handlePreferenceChange = (key: keyof typeof preferences, value: string) => {
    const newPreferences = { ...preferences, [key]: value }
    setPreferences(newPreferences)
    onPreferencesChange?.(newPreferences)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Display Preferences
        </CardTitle>
        <CardDescription>
          Customize your dashboard appearance and regional settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base">Theme</Label>
          <RadioGroup
            value={preferences.theme}
            onValueChange={(value) => handlePreferenceChange('theme', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system">System</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            value={preferences.language}
            onValueChange={(value) => handlePreferenceChange('language', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select
            value={preferences.timezone}
            onValueChange={(value) => handlePreferenceChange('timezone', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
              <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
              <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
              <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
              <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
              <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateFormat">Date Format</Label>
          <Select
            value={preferences.dateFormat}
            onValueChange={(value) => handlePreferenceChange('dateFormat', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
