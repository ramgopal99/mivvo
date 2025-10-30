"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { CollegeSidebar } from "@/app/college/_components/CollegeSidebar"
import { LoadingCompound } from "@/components/loading-compound"
import { LogoutDialog } from "@/components/logout-dialog"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ChevronDown, LogOut } from "lucide-react"
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

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function CollegeDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const [collegeData, setCollegeData] = useState<{
    id: string
    name: string
    collegeId: string
    maxStudents: number
    currentStudents: number
    isActive: boolean
  } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [authCheckComplete, setAuthCheckComplete] = useState(false)

  // Check authentication and load college data
  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      console.log('College dashboard: Starting authentication check')

      // Check NextAuth session first
      if (session?.user) {
        console.log('College dashboard: NextAuth session found, setting authenticated')
        setIsAuthenticated(true)
        setUserRole((session.user as { role?: string })?.role || 'USER')
        setAuthCheckComplete(true)
        return
      }

      // Check for college student or admin JWT token via API
      const studentToken = localStorage.getItem('student_token')
      const collegeToken = localStorage.getItem('college_token')

      console.log('College dashboard: Checking tokens', {
        hasStudentToken: !!studentToken,
        hasCollegeToken: !!collegeToken
      })

      const token = studentToken || collegeToken

      if (token) {
        try {
          console.log('College dashboard: Validating token with session API')
          const response = await fetch('/api/auth/session', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          console.log('College dashboard: Session API response status:', response.status)

          if (response.ok) {
            const sessionData = await response.json()
            console.log('College dashboard: Session API response:', sessionData)

            setIsAuthenticated(sessionData.authenticated || false)
            setUserRole(sessionData.user?.role || null)

            // Load college data if authenticated
            if (sessionData.authenticated) {
              const storedCollegeData = localStorage.getItem('college_data')
              if (storedCollegeData) {
                try {
                  const college = JSON.parse(storedCollegeData)
                  setCollegeData(college)
                  console.log('College dashboard: College data loaded', college)
                } catch (error) {
                  console.error('Error parsing college data:', error)
                }
              } else {
                console.log('College dashboard: No stored college data found')
              }
            }
          } else {
            console.log('College dashboard: Session API returned error')
            const errorData = await response.json()
            console.log('College dashboard: Error data:', errorData)
            setIsAuthenticated(false)
            setUserRole(null)
          }
        } catch (error) {
          console.error('College dashboard: Error checking college authentication:', error)
          setIsAuthenticated(false)
          setUserRole(null)
        }
      } else {
        console.log('College dashboard: No tokens found')
        setIsAuthenticated(false)
        setUserRole(null)
      }

      // Mark authentication check as complete
      setAuthCheckComplete(true)
      console.log('College dashboard: Authentication check completed')
    }

    if (status !== 'loading') {
      checkAuthAndLoadData()
    }

    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === 'student_token' || e.key === 'college_token') && !e.newValue) {
        console.log('Auth token cleared from storage, redirecting to login')
        window.location.href = '/auth/signin'
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [session, status])

  // Wait for authentication check to complete before allowing access
  if (status === 'loading' || !authCheckComplete) {
    return (
      <LoadingCompound
        text="Loading College Dashboard"
        size="lg"
        variant="spinner"
        className="min-h-screen bg-gray-50"
      />
    )
  }

  // Check if user is authenticated with proper college role (only college users)
  const validCollegeRoles = ['COLLEGE_STUDENT', 'COLLEGE_ADMIN']
  const hasValidCollegeRole = userRole && validCollegeRoles.includes(userRole)

  // Ensure college admins have their college data loaded
  if (userRole === 'COLLEGE_ADMIN' && !collegeData) {
    return (
      <LoadingCompound
        text="Loading College Data..."
        size="lg"
        variant="spinner"
        className="min-h-screen bg-gray-50"
      />
    )
  }

  if (!isAuthenticated || !hasValidCollegeRole) {
    // Redirect to login if not authenticated or doesn't have college role
    if (typeof window !== 'undefined') {
      console.log('College dashboard: Not authenticated or invalid role, redirecting to login', {
        isAuthenticated,
        userRole,
        hasValidCollegeRole,
        authCheckComplete
      })

      // Clear any remaining session data before redirect
      localStorage.removeItem('user_data')
      localStorage.removeItem('student_token')
      localStorage.removeItem('college_data')
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
  )
}
