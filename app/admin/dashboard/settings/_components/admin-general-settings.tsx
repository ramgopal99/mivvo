"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Globe, Mail, Shield } from "lucide-react"
import { useState } from "react"

interface AdminGeneralSettingsProps {
  initialSettings?: {
    platformName: string
    platformDescription: string
    supportEmail: string
    maintenanceMode: boolean
    defaultLanguage: string
    timezone: string
  }
  onSettingsChange?: (settings: {
    platformName: string
    platformDescription: string
    supportEmail: string
    maintenanceMode: boolean
    defaultLanguage: string
    timezone: string
  }) => void
}

export function AdminGeneralSettings({
  initialSettings = {
    platformName: "InterviewPrep Pro",
    platformDescription: "Professional interview preparation platform for colleges and students",
    supportEmail: "support@interviewprep.com",
    maintenanceMode: false,
    defaultLanguage: "en",
    timezone: "UTC"
  },
  onSettingsChange
}: AdminGeneralSettingsProps) {
  const [settings, setSettings] = useState(initialSettings)

  const handleSettingChange = (key: keyof typeof settings, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSettingsChange?.(newSettings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Platform Configuration
          </CardTitle>
          <CardDescription>
            Basic platform settings and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input
                id="platform-name"
                value={settings.platformName}
                onChange={(e) => handleSettingChange('platformName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input
                id="support-email"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Platform Description</Label>
            <Textarea
              id="description"
              value={settings.platformDescription}
              onChange={(e) => handleSettingChange('platformDescription', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Localization Settings
          </CardTitle>
          <CardDescription>
            Default language and timezone settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="default-language">Default Language</Label>
              <Select
                value={settings.defaultLanguage}
                onValueChange={(value) => handleSettingChange('defaultLanguage', value)}
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
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Default Timezone</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) => handleSettingChange('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Controls
          </CardTitle>
          <CardDescription>
            Critical system settings and maintenance controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable maintenance mode to temporarily disable user access
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Quick Actions</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <Button variant="outline" className="justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Send System Notification
              </Button>
              <Button variant="outline" className="justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Clear System Cache
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
