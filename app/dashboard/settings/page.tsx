"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyDetailsTab } from "./components/my-details-tab"
import { PlanTab } from "./components/plan-tab"
import { BillingTab } from "./components/billing-tab"

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
        <TabsList className="mb-6 w-full grid grid-cols-3">
          <TabsTrigger value="my-details" className="text-base cursor-pointer">
            My Details
          </TabsTrigger>
          <TabsTrigger value="plan" className="text-base cursor-pointer">
            Plan
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-base cursor-pointer">
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-details">
          <MyDetailsTab />
        </TabsContent>

        <TabsContent value="plan">
          <PlanTab />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
