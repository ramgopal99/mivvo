"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Info } from "lucide-react"
import { weeklyStreakData } from "./dummy-data"

interface WeeklyStreakCardProps {
  className?: string
}

export function WeeklyStreakCard({ className = "" }: WeeklyStreakCardProps) {
  const streak = weeklyStreakData

  return (
    <Card className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-gray-900 flex items-center">
            Weekly Streak
            <Info className="w-3 h-3 ml-1 text-gray-400" />
          </h4>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-600 hover:bg-gray-100">
            <Calendar className="w-3 h-3 mr-1" />
            {streak.currentMonth}
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>

        {/* Streak Progress and Navigation */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-gray-600">{streak.weeksCompleted}/{streak.totalWeeks} Weeks</span>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-gray-100">
              <ChevronLeft className="w-3 h-3 text-gray-400" />
            </Button>
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 bg-orange-500 hover:bg-orange-600">
              <ChevronRight className="w-3 h-3 text-white" />
            </Button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-0.5 text-center mb-2">
          {streak.calendarDays.map((dayData) => (
            <div key={dayData.day} className="text-[10px] text-gray-500 font-medium">
              {dayData.day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {streak.calendarDays.map((dayData) => (
            <div 
              key={dayData.date} 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium ${
                dayData.completed 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {dayData.date}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
