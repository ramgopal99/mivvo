"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyDetailsTab } from "./components/my-details-tab"
import { ProfileTab } from "./components/profile-tab"
import { PlanTab } from "./components/plan-tab"
import { BillingTab } from "./components/billing-tab"
import { NotificationsTab } from "./components/notifications-tab"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="my-details" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="my-details" className="text-base">
            My Details
          </TabsTrigger>
          <TabsTrigger value="profile" className="text-base">
            Profile
          </TabsTrigger>
          <TabsTrigger value="plan" className="text-base">
            Plan
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-base">
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-base">
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-details">
          <MyDetailsTab />
        </TabsContent>
        
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        
        <TabsContent value="plan">
          <PlanTab />
        </TabsContent>
        
        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
