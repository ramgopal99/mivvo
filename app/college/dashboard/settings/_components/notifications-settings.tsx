"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell } from "lucide-react"
import { useState } from "react"

interface NotificationsSettingsProps {
  initialNotifications?: {
    emailAlerts: boolean
    studentProgress: boolean
    systemUpdates: boolean
    weeklyReports: boolean
  }
  onNotificationsChange?: (notifications: {
    emailAlerts: boolean
    studentProgress: boolean
    systemUpdates: boolean
    weeklyReports: boolean
  }) => void
}

export function NotificationsSettings({
  initialNotifications = {
    emailAlerts: true,
    studentProgress: true,
    systemUpdates: false,
    weeklyReports: true
  },
  onNotificationsChange
}: NotificationsSettingsProps) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    const newNotifications = { ...notifications, [key]: value }
    setNotifications(newNotifications)
    onNotificationsChange?.(newNotifications)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Configure how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Email Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Receive important system alerts via email
            </p>
          </div>
          <Switch
            checked={notifications.emailAlerts}
            onCheckedChange={(checked) =>
              handleNotificationChange('emailAlerts', checked)
            }
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Student Progress Updates</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about significant student progress changes
            </p>
          </div>
          <Switch
            checked={notifications.studentProgress}
            onCheckedChange={(checked) =>
              handleNotificationChange('studentProgress', checked)
            }
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">System Updates</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications about system maintenance and updates
            </p>
          </div>
          <Switch
            checked={notifications.systemUpdates}
            onCheckedChange={(checked) =>
              handleNotificationChange('systemUpdates', checked)
            }
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Weekly Reports</Label>
            <p className="text-sm text-muted-foreground">
              Get weekly summary reports via email
            </p>
          </div>
          <Switch
            checked={notifications.weeklyReports}
            onCheckedChange={(checked) =>
              handleNotificationChange('weeklyReports', checked)
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
