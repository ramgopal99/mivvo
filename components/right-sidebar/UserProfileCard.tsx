"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Flame, Target, Medal } from "lucide-react"
import { userProfileData } from "./dummy-data"

interface UserProfileCardProps {
  className?: string
}

export function UserProfileCard({ className = "" }: UserProfileCardProps) {
  const user = userProfileData

  return (
    <Card className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${className}`}>
      <CardContent className="p-0">
        {/* User Profile Section */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-orange-500">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-orange-500 text-white text-lg font-semibold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate">
              {user.name}
            </h3>
            <p className="text-xs text-gray-600 truncate">{user.title}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Trophy className="w-3 h-3 text-yellow-500" />
              <span className="text-xs font-semibold text-gray-900">{user.points} Points</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-sm font-bold text-gray-900">{user.stats.daysStreak}</div>
            <div className="text-[10px] text-gray-600">Days Streak</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Target className="w-4 h-4 text-pink-500" />
            </div>
            <div className="text-sm font-bold text-gray-900">{user.stats.goalsInMonth.toString().padStart(2, '0')}</div>
            <div className="text-[10px] text-gray-600">Goals in Month</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Medal className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-sm font-bold text-gray-900">{user.stats.secondPlace.toString().padStart(2, '0')}</div>
            <div className="text-[10px] text-gray-600">2nd Place</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
