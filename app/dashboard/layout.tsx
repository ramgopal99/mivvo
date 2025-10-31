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
    role?: string;
    firstName?: string;
    lastName?: string;
    rollNumber?: string;
    college?: {
      id: string;
      name: string;
      collegeId: string;
    };
  } | null>(null)
  const [authCheckComplete, setAuthCheckComplete] = useState(false)
  const [authAttempted, setAuthAttempted] = useState(false)

  useEffect(() => {
    setAuthAttempted(false) // Reset auth attempt when dependencies change
    const loadUserData = async () => {
      try {
        // Check for JWT tokens (college students) - updated to match new token storage
        const token = localStorage.getItem('token') ||
                     localStorage.getItem('student_token') ||
                     localStorage.getItem('college_token')
        if (token) {
          try {
            console.log('Dashboard: Checking JWT token for college student authentication')
            const response = await fetch('/api/auth/session', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })

            console.log('Dashboard: Session API response status:', response.status)

            if (response.ok) {
              const sessionData = await response.json()
              console.log('Dashboard: Session data:', sessionData)

              if (sessionData.authenticated && sessionData.user) {
                setUserData({
                  id: sessionData.user.id,
                  name: sessionData.user.name,
                  email: sessionData.user.email,
                  role: sessionData.user.role,
                  firstName: sessionData.user.name?.split(' ')[0] || '',
                  lastName: sessionData.user.name?.split(' ').slice(1).join(' ') || '',
                  rollNumber: sessionData.user.rollNumber,
                  college: sessionData.user.collegeId ? {
                    id: sessionData.user.collegeId,
                    name: sessionData.user.collegeName,
                    collegeId: sessionData.user.collegeId
                  } : undefined
                })
                console.log('Dashboard: College student authenticated successfully')
                return
              } else {
                console.log('Dashboard: Session not authenticated')
              }
            } else {
              console.log('Dashboard: Session API failed')
            }
          } catch (error) {
            console.error('Dashboard: Error checking college student session:', error)
          }
        } else {
          console.log('Dashboard: No JWT tokens found')
        }

        if (status === 'authenticated' && session?.user) {
          setUserData({
            id: session.user.id || 'unknown',
            name: session.user.name || 'User',
            email: session.user.email || '',
            role: (session.user as { role?: string })?.role || 'USER',
            firstName: session.user.name?.split(' ')[0] || '',
            lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
            rollNumber: undefined,
            college: undefined
          })
          return
        }

        setUserData(null)
      } catch (error) {
        console.error('Error loading user data:', error)
        setUserData(null)
      } finally {
        setAuthAttempted(true)
      }
    }

    loadUserData()

    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === 'token' || e.key === 'student_token' || e.key === 'college_token') && !e.newValue) {
        console.log('Dashboard: Auth token removed, redirecting to signin')
        window.location.href = '/auth/signin'
      } else {
        loadUserData()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
    }, [session, status])

    // Mark authentication check as complete after useEffect runs
    useEffect(() => {
      if (status !== 'loading') {
        setAuthCheckComplete(true)
      }
    }, [status])

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

  if ((status === 'authenticated' || status === 'unauthenticated') && authCheckComplete && authAttempted) {
    const hasNextAuthSession = status === 'authenticated' && !!session?.user
    const nextAuthRole = hasNextAuthSession ? (session?.user as { role?: string })?.role : undefined

    // Check for JWT authentication (college students) - updated token names
    const hasCollegeAuth = !!userData && (
      !!localStorage.getItem('token') ||
      !!localStorage.getItem('student_token') ||
      !!localStorage.getItem('college_token')
    )
    const collegeRole = hasCollegeAuth ? userData?.role : undefined

    const isAuthenticated = hasNextAuthSession || hasCollegeAuth
    const effectiveRole = collegeRole || nextAuthRole

    const validRoles = ['USER', 'COLLEGE_STUDENT']
    const hasValidRole = effectiveRole && validRoles.includes(effectiveRole)

    if (!isAuthenticated || !hasValidRole) {
      if (typeof window !== 'undefined') {
        console.log('Dashboard: Not authenticated or invalid role, redirecting to signin', {
          isAuthenticated,
          effectiveRole,
          hasValidRole,
          hasNextAuthSession,
          hasCollegeAuth
        })
        localStorage.removeItem('token')
        localStorage.removeItem('student_token')
        localStorage.removeItem('college_token')
        window.location.href = '/auth/signin'
      }
      return (
        <LoadingCompound
          text="Redirecting to login..."
          size="lg"
          variant="spinner"
          className="min-h-screen bg-gray-50"
        />
      )
    }

    // Additional check: College admins should NOT access regular dashboard - redirect them to college dashboard
    if (effectiveRole === 'COLLEGE_ADMIN') {
      if (typeof window !== 'undefined') {
        window.location.href = '/college/dashboard'
      }
      return (
        <LoadingCompound
          text="Redirecting to college dashboard..."
          size="lg"
          variant="spinner"
          className="min-h-screen bg-gray-50"
        />
      )
    }

    // College students can access the regular dashboard (no redirect needed)
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
