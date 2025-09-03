"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { Separator } from "@/components/ui/separator"
import { DynamicPageTitle } from "@/components/DynamicPageTitle"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Client-side authentication check
    if (status === "loading") {
      // Still loading, don't redirect yet
      return
    }

    if (status === "unauthenticated" || !session) {
      redirect("/")
    }
  }, [session, status])

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = (path: string) => {
    const segments = path.split('/').filter(Boolean)
    const breadcrumbs = []

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      const href = '/' + segments.slice(0, i + 1).join('/')
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')

      breadcrumbs.push({
        label,
        href,
        isLast: i === segments.length - 1
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs(pathname)

  // Check if we're on a specific course detail page to conditionally hide sidebar
  const isCourseDetailPage = pathname.match(/\/course\/[^\/]+$/)

  return (
    <SidebarProvider>
      {!isCourseDetailPage && <AppSidebar />}
      <SidebarInset>
        {!isCourseDetailPage && (
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center">
                      {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                      <BreadcrumbItem>
                        {crumb.isLast ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={crumb.href}>
                            {crumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto px-4">
              <DynamicPageTitle />
            </div>
          </header>
        )}
        <div className={`flex flex-1 flex-col gap-4 ${isCourseDetailPage ? '' : 'p-4 pt-0'}`}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
