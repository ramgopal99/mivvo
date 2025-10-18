"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, Settings, TestTube } from "lucide-react"
import { useState } from "react"

interface AdminEmailSettingsProps {
  initialSettings?: {
    smtpHost: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
    enableTLS: boolean
    emailProvider: string
  }
  onSettingsChange?: (settings: {
    smtpHost: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
    enableTLS: boolean
    emailProvider: string
  }) => void
}

export function AdminEmailSettings({
  initialSettings = {
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    fromEmail: "noreply@interviewprep.com",
    fromName: "InterviewPrep Pro",
    enableTLS: true,
    emailProvider: "gmail"
  },
  onSettingsChange
}: AdminEmailSettingsProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [showPassword, setShowPassword] = useState(false)

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
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
          <CardDescription>
            Configure SMTP settings for sending emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email-provider">Email Provider</Label>
            <Select
              value={settings.emailProvider}
              onValueChange={(value) => handleSettingChange('emailProvider', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmail">Gmail</SelectItem>
                <SelectItem value="outlook">Outlook</SelectItem>
                <SelectItem value="sendgrid">SendGrid</SelectItem>
                <SelectItem value="mailgun">Mailgun</SelectItem>
                <SelectItem value="custom">Custom SMTP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                value={settings.smtpHost}
                onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
                placeholder="smtp.example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                value={settings.smtpPort}
                onChange={(e) => handleSettingChange('smtpPort', e.target.value)}
                placeholder="587"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="smtp-username">SMTP Username</Label>
            <Input
              id="smtp-username"
              value={settings.smtpUsername}
              onChange={(e) => handleSettingChange('smtpUsername', e.target.value)}
              placeholder="your-email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="smtp-password">SMTP Password</Label>
            <Input
              id="smtp-password"
              type={showPassword ? "text" : "password"}
              value={settings.smtpPassword}
              onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
              placeholder="Your SMTP password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs"
            >
              {showPassword ? "Hide" : "Show"} Password
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable TLS</Label>
              <p className="text-sm text-muted-foreground">
                Use TLS encryption for secure email transmission
              </p>
            </div>
            <Switch
              checked={settings.enableTLS}
              onCheckedChange={(checked) => handleSettingChange('enableTLS', checked)}
            />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input
                id="from-email"
                type="email"
                value={settings.fromEmail}
                onChange={(e) => handleSettingChange('fromEmail', e.target.value)}
                placeholder="noreply@yourdomain.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input
                id="from-name"
                value={settings.fromName}
                onChange={(e) => handleSettingChange('fromName', e.target.value)}
                placeholder="Your App Name"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Email Testing
          </CardTitle>
          <CardDescription>
            Test your email configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="test-email">Test Email Address</Label>
              <Input
                id="test-email"
                type="email"
                placeholder="test@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="test-subject">Test Subject</Label>
              <Input
                id="test-subject"
                defaultValue="Test Email from InterviewPrep Pro"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="test-message">Test Message</Label>
            <Textarea
              id="test-message"
              defaultValue="This is a test email to verify your SMTP configuration is working correctly."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Test Email
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Check Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>
            Manage email templates for different scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Welcome Email</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Password Reset</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Interview Results</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Payment Confirmation</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">System Notifications</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Custom Templates</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
