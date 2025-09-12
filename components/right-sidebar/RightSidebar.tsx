"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, X } from "lucide-react"
import { UserProfileCard } from "./UserProfileCard"
import { WeeklyStreakCard } from "./WeeklyStreakCard"
import { courseProgressData } from "./dummy-data"

export function RightSidebar() {

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Close Details Button */}
      <div className="p-3 border-b border-gray-200 flex-shrink-0">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 text-xs">
          <X className="w-3.5 h-3.5 mr-1.5" />
          Close Details
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* User Profile Card */}
        <div className="p-4 border-b border-gray-200">
          <UserProfileCard />
        </div>

        {/* Weekly Streak Section */}
        <div className="p-4 border-b border-gray-200">
          <WeeklyStreakCard />
        </div>

        {/* Course Progress Summary */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <Card className="p-2 text-center bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <FileText className="w-3.5 h-3.5 text-blue-500 mx-auto mb-1" />
                <div className="text-xs font-semibold text-gray-900">{courseProgressData.inProgress.count} Courses</div>
                <div className="text-[10px] text-gray-500">{courseProgressData.inProgress.label}</div>
              </CardContent>
            </Card>
            <Card className="p-2 text-center bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <FileText className="w-3.5 h-3.5 text-green-500 mx-auto mb-1" />
                <div className="text-xs font-semibold text-gray-900">{courseProgressData.completed.count} Courses</div>
                <div className="text-[10px] text-gray-500">{courseProgressData.completed.label}</div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}
