"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Save, RefreshCw } from "lucide-react"
import { useState } from "react"
import {
  AdminGeneralSettings,
  AdminSecuritySettings,
  AdminEmailSettings
} from "./_components"

export default function AdminSettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({})
  const [securitySettings, setSecuritySettings] = useState({})
  const [emailSettings, setEmailSettings] = useState({})

  const handleSaveSettings = () => {
    // Simulate saving all settings
    console.log("Saving admin settings...", {
      general: generalSettings,
      security: securitySettings,
      email: emailSettings
    })
  }

  const handleResetSettings = () => {
    // Simulate resetting to defaults
    console.log("Resetting admin settings to defaults...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">
            Configure global platform settings and system preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleResetSettings}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button size="sm" onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <AdminGeneralSettings
            onSettingsChange={setGeneralSettings}
          />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <AdminSecuritySettings
            onSettingsChange={setSecuritySettings}
          />
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <AdminEmailSettings
            onSettingsChange={setEmailSettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
