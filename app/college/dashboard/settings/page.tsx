"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RefreshCw } from "lucide-react"
import {
  ProfileSettings,
  SecuritySettings,
  BillingSettings
} from "./_components"

export default function SettingsPage() {
  const handleSaveSettings = () => {
    // Simulate saving settings
    console.log("Saving settings...")
  }

  const handleResetSettings = () => {
    // Simulate resetting to defaults
    console.log("Resetting settings to defaults...")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">College Settings</h1>
          <p className="text-muted-foreground">
            Manage your college profile, security settings, and billing information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleResetSettings}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button size="sm" onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
