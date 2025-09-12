"use client"

import { Search, Grid3X3, MessageCircle, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

interface DashboardHeaderProps {
  isCourseDetailPage?: boolean
  isMockInterviewPage?: boolean
}

export function DashboardHeader({ 
  isCourseDetailPage = false, 
  isMockInterviewPage = false 
}: DashboardHeaderProps) {
  const { data: session } = useSession()

  if (isCourseDetailPage || isMockInterviewPage) {
    return null
  }

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-64 right-0 z-30">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search here..."
            className="pl-10 pr-4 py-1.5 w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
      
      {/* Right Header Controls */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <Grid3X3 className="h-4 w-4 text-gray-600" />
        </Button>
        <Button variant="ghost" size="sm" className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <MessageCircle className="h-4 w-4 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] bg-red-500 text-white rounded-full">
            6
          </Badge>
        </Button>
        <Button variant="ghost" size="sm" className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="h-4 w-4 text-gray-600" />
        </Button>
        <Avatar className="h-7 w-7 cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all">
          <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
          <AvatarFallback className="bg-orange-500 text-white">
            <User className="h-3.5 w-3.5" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
