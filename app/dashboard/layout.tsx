"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { AppSidebar } from "@/components/Sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Client-side authentication check - allow guest access
    if (status === "loading") {
      // Still loading, don't redirect yet
      return
    }

    // Removed authentication check to allow guest access
    // Guest users can now access the dashboard
  }, [session, status])

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Check if we're on a specific course detail page to conditionally hide sidebar
  const isCourseDetailPage = pathname.match(/\/course\/[^\/]+$/)
  const isMockInterviewPage = pathname.match(/\/mockinterview\/[^\/]+$/)

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header Component */}
      <DashboardHeader 
        isCourseDetailPage={!!isCourseDetailPage} 
        isMockInterviewPage={!!isMockInterviewPage} 
      />

      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar */}
        {!isCourseDetailPage && !isMockInterviewPage && (
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 h-full z-10">
            <AppSidebar />
          </div>
        )}
        
        {/* Main Content Area */}
        <div className={`flex flex-col flex-1 bg-white ${!isCourseDetailPage && !isMockInterviewPage ? 'ml-64 mr-72 pt-14' : 'w-full'}`}>
          {/* Main Content - Scrollable */}
          <div className={`flex-1 overflow-y-auto ${isCourseDetailPage || isMockInterviewPage ? 'pt-0' : 'p-4'}`}>
            {children}
          </div>
        </div>
        
        {/* Right Sidebar */}
        {!isCourseDetailPage && !isMockInterviewPage && (
          <div className="w-72 bg-orange-50/50 border-l border-gray-200 flex flex-col fixed right-0 top-0 h-full z-10">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  )
}
