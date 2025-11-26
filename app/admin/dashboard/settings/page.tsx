"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "next-auth/react"
import { AdminGeneralSettings } from "./_components"

export default function AdminSettingsPage() {
  const { data: session } = useSession()


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
          <p className="text-muted-foreground">
            View administrator information and account details
          </p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <AdminGeneralSettings
            session={session || undefined}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
