"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"
import {
  ProfileSettings
} from "./_components"

export default function SettingsPage() {
  const [hasChanges, setHasChanges] = useState(false)

  const handleSaveSettings = () => {
    // Simulate saving settings
    console.log("Saving settings...")
    setHasChanges(false) // Reset after saving
  }

  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">College Settings</h1>
          <p className="text-muted-foreground">
            Manage your college profile, security settings, and billing information
          </p>
        </div>
        {hasChanges && (
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
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
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
              <p className="text-gray-600">Coming Soon</p>
              <p className="text-sm text-gray-500 mt-2">Security features will be available in a future update</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing Settings</h3>
              <p className="text-gray-600">Coming Soon</p>
              <p className="text-sm text-gray-500 mt-2">Billing management will be available in a future update</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
