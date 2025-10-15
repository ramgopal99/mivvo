"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Play, Settings, Book } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks to help you prepare for interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <Button asChild className="justify-start h-auto p-4" variant="outline">
            <Link href="/dashboard/custominterview" className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">Create New Interview</div>
                <div className="text-sm text-muted-foreground">Set up a custom mock interview</div>
              </div>
            </Link>
          </Button>

          <Button asChild className="justify-start h-auto p-4" variant="outline">
            <Link href="/dashboard/custominterview" className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Play className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Resume Interview</div>
                <div className="text-sm text-muted-foreground">Continue your active session</div>
              </div>
            </Link>
          </Button>

          <Button asChild className="justify-start h-auto p-4" variant="outline">
            <Link href="/dashboard/settings" className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Settings className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Update Profile</div>
                <div className="text-sm text-muted-foreground">Improve your interview prep</div>
              </div>
            </Link>
          </Button>

          <Button asChild className="justify-start h-auto p-4" variant="outline">
            <Link href="/dashboard/help" className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Book className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Help & Resources</div>
                <div className="text-sm text-muted-foreground">Tips and interview guides</div>
              </div>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
