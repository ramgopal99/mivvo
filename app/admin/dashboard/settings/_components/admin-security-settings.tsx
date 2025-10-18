"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Key, AlertTriangle } from "lucide-react"
import { useState } from "react"

interface AdminSecuritySettingsProps {
  initialSettings?: {
    twoFactorRequired: boolean
    sessionTimeout: string
    passwordPolicy: string
    ipWhitelist: boolean
    auditLogging: boolean
    bruteForceProtection: boolean
  }
  onSettingsChange?: (settings: {
    twoFactorRequired: boolean
    sessionTimeout: string
    passwordPolicy: string
    ipWhitelist: boolean
    auditLogging: boolean
    bruteForceProtection: boolean
  }) => void
}

export function AdminSecuritySettings({
  initialSettings = {
    twoFactorRequired: false,
    sessionTimeout: "60",
    passwordPolicy: "strong",
    ipWhitelist: false,
    auditLogging: true,
    bruteForceProtection: true
  },
  onSettingsChange
}: AdminSecuritySettingsProps) {
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
            <Shield className="h-5 w-5" />
            Authentication Settings
          </CardTitle>
          <CardDescription>
            Configure authentication and access control policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Require Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Force all users to enable 2FA for enhanced security
              </p>
            </div>
            <Switch
              checked={settings.twoFactorRequired}
              onCheckedChange={(checked) => handleSettingChange('twoFactorRequired', checked)}
            />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Select
                value={settings.sessionTimeout}
                onValueChange={(value) => handleSettingChange('sessionTimeout', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="480">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-policy">Password Policy</Label>
              <Select
                value={settings.passwordPolicy}
                onValueChange={(value) => handleSettingChange('passwordPolicy', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (8+ chars)</SelectItem>
                  <SelectItem value="standard">Standard (8+ chars, mixed case)</SelectItem>
                  <SelectItem value="strong">Strong (12+ chars, complex)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (MFA required)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security Features
          </CardTitle>
          <CardDescription>
            Advanced security controls and threat prevention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">IP Whitelist</Label>
              <p className="text-sm text-muted-foreground">
                Restrict access to specific IP addresses only
              </p>
            </div>
            <Switch
              checked={settings.ipWhitelist}
              onCheckedChange={(checked) => handleSettingChange('ipWhitelist', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Audit Logging</Label>
              <p className="text-sm text-muted-foreground">
                Log all administrative actions for compliance
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              <Switch
                checked={settings.auditLogging}
                onCheckedChange={(checked) => handleSettingChange('auditLogging', checked)}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Brute Force Protection</Label>
              <p className="text-sm text-muted-foreground">
                Block accounts after multiple failed login attempts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Active</Badge>
              <Switch
                checked={settings.bruteForceProtection}
                onCheckedChange={(checked) => handleSettingChange('bruteForceProtection', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Security Tools
          </CardTitle>
          <CardDescription>
            Security management and monitoring tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="justify-start h-auto p-4">
              <Shield className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Security Audit</div>
                <div className="text-sm text-muted-foreground">Run comprehensive security check</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <AlertTriangle className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Failed Login Report</div>
                <div className="text-sm text-muted-foreground">View suspicious login attempts</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <Lock className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Password Reset</div>
                <div className="text-sm text-muted-foreground">Force password reset for users</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4">
              <Key className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">API Key Management</div>
                <div className="text-sm text-muted-foreground">Manage API access keys</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
