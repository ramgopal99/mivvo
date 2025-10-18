"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { CollegeSidebar } from "@/app/college/_components/CollegeSidebar"
import { usePathname } from "next/navigation"
import { LoadingCompound } from "@/components/loading-compound"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ChevronDown, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationCompound } from "@/components/notification-compound"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function CollegeDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [collegeData, setCollegeData] = useState<{
    name: string;
    collegeId: string;
  } | null>(null)

  useEffect(() => {
    // Get college data from localStorage (set during login)
    const storedCollegeData = localStorage.getItem('college_data')
    if (storedCollegeData) {
      try {
        const college = JSON.parse(storedCollegeData)
        setCollegeData(college)
      } catch (error) {
        console.error('Error parsing college data:', error)
      }
    }

    if (status === "loading") {
      return
    }
  }, [session, status])

  if (status === "loading") {
    return (
      <LoadingCompound
        text="Loading College Dashboard"
        size="lg"
        variant="spinner"
        className="min-h-screen bg-gray-50"
      />
    )
  }

  return (
    <SidebarProvider>
      <CollegeSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {collegeData?.name || 'College Dashboard'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {collegeData?.collegeId || 'Loading...'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification Compound Component */}
            <NotificationCompound />

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={session?.user?.image || undefined}
                      alt={session?.user?.name || "College Admin"}
                    />
                    <AvatarFallback className="text-xs">
                      {session?.user?.name?.charAt(0)?.toUpperCase() || "C"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline">
                    {session?.user?.name || "College Admin"}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {collegeData?.name || "College Admin"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {collegeData?.collegeId || ""}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
