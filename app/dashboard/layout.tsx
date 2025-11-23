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
    status?: string;
    suspendedAt?: string;
    suspendReason?: string;
  } | null | undefined>(undefined)
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
          try {
            // Fetch user profile to check suspension status
            const response = await fetch('/api/user/profile')
            if (response.ok) {
              const profileData = await response.json()
              if (profileData.success && profileData.data) {
                const userProfile = profileData.data

                setUserData({
                  id: session.user.id || 'unknown',
                  name: session.user.name || 'User',
                  email: session.user.email || '',
                  role: (session.user as { role?: string })?.role || 'USER',
                  firstName: session.user.name?.split(' ')[0] || '',
                  lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
                  rollNumber: undefined,
                  college: undefined,
                  status: userProfile.status,
                  suspendedAt: userProfile.suspendedAt,
                  suspendReason: userProfile.suspendReason
                })
                console.log('Dashboard: User profile loaded, status:', userProfile.status)
                return
              }
            }
          } catch (error) {
            console.error('Error fetching user profile:', error)
          }

          // Fallback if profile fetch fails
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

  if (status === "loading" || userData === undefined) {
    return (
      <LoadingCompound
        text="Loading"
        size="lg"
        variant="spinner"
        className="min-h-screen bg-gray-50"
      />
    )
  }

  // Wait for both authentication and user data to be loaded before checking suspension
  if ((status === 'authenticated' || status === 'unauthenticated') && authCheckComplete && authAttempted && userData !== undefined) {
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

    const validRoles = ['USER', 'COLLEGE_STUDENT', 'SUPERADMIN', 'COLLEGE_ADMIN']
    const hasValidRole = effectiveRole && validRoles.includes(effectiveRole)

    // Check if user is suspended BEFORE allowing dashboard access
    // For NextAuth users, check userData.status directly (loaded synchronously)
    const isUserSuspended = userData?.status === 'SUSPENDED'
    console.log('Dashboard: Auth check:', {
      isAuthenticated,
      hasValidRole,
      isUserSuspended,
      userDataStatus: userData?.status,
      effectiveRole
    })

    if (isAuthenticated && hasValidRole && isUserSuspended) {
      console.log('Dashboard: User is suspended, showing suspension screen')
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Suspended</h1>
            <p className="text-gray-600 mb-4">
              Your account has been suspended by an administrator.
              {userData?.suspendReason && (
                <span className="block mt-2 text-sm text-primary font-medium">
                  Reason: {userData.suspendReason}
                </span>
              )}
              {userData?.suspendedAt && (
                <span className="block mt-1 text-xs text-gray-500">
                  Suspended on: {new Date(userData.suspendedAt).toLocaleDateString()}
                </span>
              )}
            </p>
          </div>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/contact'}
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Contact Us
              </button>
              <button
                onClick={() => {
                  localStorage.clear()
                  sessionStorage.clear()
                  window.location.href = '/auth/signin'
                }}
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )
    }

    if (!isAuthenticated || !hasValidRole) {
      if (typeof window !== 'undefined') {
        console.log('Dashboard: Not authenticated or invalid role, redirecting to signin', {
          isAuthenticated,
          effectiveRole,
          hasValidRole,
          hasNextAuthSession,
          hasCollegeAuth
        })
        // Clear all storage data comprehensively before redirect
        localStorage.removeItem('token')
        localStorage.removeItem('student_token')
        localStorage.removeItem('college_token')
        localStorage.removeItem('user_data')
        localStorage.removeItem('college_data')
        localStorage.removeItem('college_student_data')
        localStorage.removeItem('sidebar_state')

        // Clear sessionStorage
        sessionStorage.clear()

        // Clear sidebar cookie
        document.cookie = 'sidebar_state=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

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
  const isCourseDetailPage = pathname.match(/\/courses\/[^\/]+$/)
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
    <div className="flex flex-1 flex-col gap-4 p-0">
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
