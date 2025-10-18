"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { adminSidebarConfig } from "@/config/admin-sidebar-config"
import { ChevronLeft, LogOut } from "lucide-react"
import { useState } from "react"

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...")
  }

  return (
    <div className={cn(
      "flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform",
            collapsed && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {adminSidebarConfig.sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <li key={item.title}>
                    <Link href={item.url}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start h-10",
                          collapsed && "px-2",
                          isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                        )}
                      >
                        <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Button>
                    </Link>
                  </li>
                )
              })}
            </ul>
            {!collapsed && <Separator className="mt-4" />}
          </div>
        ))}

        {/* General Section */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {adminSidebarConfig.general.title}
            </h3>
          )}
          <ul className="space-y-1">
            {adminSidebarConfig.general.items.map((item) => {
              const isActive = pathname === item.url
              return (
                <li key={item.title}>
                  <Link href={item.url}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start h-10",
                        collapsed && "px-2",
                        isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Button>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed && "px-2"
          )}
        >
          <LogOut className={cn("h-4 w-4", !collapsed && "mr-3")} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
}