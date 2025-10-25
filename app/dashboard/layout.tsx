"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { AppSidebar } from "@/app/dashboard/_components/Sidebar"
import { usePathname } from "next/navigation"
import { LoadingCompound } from "@/components/loading-compound"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { User, ChevronDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutDialog } from "@/components/logout-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    rollNumber?: string;
    college?: {
      id: string;
      name: string;
      collegeId: string;
    };
  } | null>(null)

  // Load user data - prioritize NextAuth session over localStorage
  useEffect(() => {
    const loadUserData = () => {
      // If NextAuth session exists, use it (don't check localStorage for college students)
      if (status === 'authenticated' && session?.user) {
        setUserData({
          id: session.user.id || 'unknown',
          name: session.user.name || 'User',
          email: session.user.email || '',
          firstName: session.user.name?.split(' ')[0] || '',
          lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
          rollNumber: undefined,
          college: undefined
        })
        return
      }

      // Only check localStorage for college students if no NextAuth session
      if (status !== 'loading') {
        const storedUserData = localStorage.getItem('user_data')
        if (storedUserData) {
          try {
            const parsedUserData = JSON.parse(storedUserData)
            setUserData(parsedUserData)
          } catch (error) {
            console.error('Error parsing user data:', error)
            setUserData(null)
          }
        } else {
          setUserData(null)
        }
      }
    }

    loadUserData()

    // Listen for storage changes (in case user data is updated)
    const handleStorageChange = () => {
      loadUserData()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [session, status])

  if (status === "loading") {
    return (
      <LoadingCompound
        text="Loading"
        size="lg"
        variant="spinner"
        className="min-h-screen bg-gray-50"
      />
    )
  }

  // Get user display data (NextAuth session or college student data)
  const displayName = userData?.name || session?.user?.name || "User"
  const displayEmail = userData?.email || session?.user?.email || ""
  const displayImage = session?.user?.image || undefined // Only NextAuth provides image
  const displayInitial = displayName.charAt(0).toUpperCase()

  // Check if we're on a specific course detail page to conditionally hide sidebar
  const isCourseDetailPage = pathname.match(/\/course\/[^\/]+$/)
  const isMockInterviewPage = pathname.match(/\/mockinterview\/[^\/]+$/)
  const isCustomInterviewMeetPage = pathname.match(/\/custominterview\/meet\/[^\/]+$/)

  // Check if sidebar should be shown
  const showSidebar = !isCourseDetailPage && !isMockInterviewPage && !isCustomInterviewMeetPage

  return showSidebar ? (
    <SidebarProvider>
            <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
          </div>
          <div className="flex items-center gap-2">
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={displayImage}
                      alt={displayName}
                    />
                    <AvatarFallback className="text-xs">
                      {displayInitial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline">
                    {displayName}
                  </span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {displayName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {displayEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/dashboard/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutDialog>
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </LogoutDialog>
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
  ) : (
    <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
