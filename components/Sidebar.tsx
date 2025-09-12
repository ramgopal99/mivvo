"use client"

import * as React from "react"
import { navigationData } from "@/lib/navigation-data"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { UserRole } from "@prisma/client"

// Type for session user with role
type SessionUserWithRole = {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: UserRole
}

export function AppSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [mounted, setMounted] = React.useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isSuperAdmin = (session?.user as SessionUserWithRole)?.role === UserRole.SUPERADMIN

    if (!mounted) {
        return null
    }
    
    return (
        <div className="h-full bg-white flex flex-col">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-orange-500 text-white shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                        <span className="font-bold text-xl">F</span>
                    </div>
                    <div className="flex-1 text-left">
                        <span className="text-xl font-bold text-gray-900">
                            Focotech
                        </span>
                    </div>
                </Link>
            </div>

            {/* Navigation Section - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="mb-6">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">MENU</h3>
                    <nav className="space-y-2">
                        {navigationData.main.map((item) => (
                            <Link
                                key={item.title}
                                href={item.url}
                                className={cn(
                                    "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                                    pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))
                                        ? "bg-orange-100 text-orange-700 font-medium"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 shrink-0",
                                    pathname === item.url || (item.url !== "/dashboard" && pathname.startsWith(item.url))
                                        ? "text-orange-600"
                                        : "text-gray-500 group-hover:text-gray-700"
                                )} />
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        ))}

                        {/* Admin Navigation - Only show for SUPERADMIN */}
                        {isSuperAdmin && navigationData.admin.map((item) => (
                            <Link
                                key={item.title}
                                href={item.url}
                                className={cn(
                                    "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                                    pathname === item.url
                                        ? "bg-orange-100 text-orange-700 font-medium"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 shrink-0",
                                    pathname === item.url
                                        ? "text-orange-600"
                                        : "text-gray-500 group-hover:text-gray-700"
                                )} />
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Premium Promotion Section */}
            <div className="p-6 border-t border-gray-200 flex-shrink-0">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">!</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Get Premium Now!</h4>
                            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                                Reach our special feature by subscribe our plan.
                            </p>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1">
                                <span>Upgrade Now</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
