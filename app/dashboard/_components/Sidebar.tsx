"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { sidebarConfig, adminNavigation } from "@/config/sidebar-config"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { UserRole } from "@prisma/client"
import Image from "next/image"
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

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
    const [userRole, setUserRole] = useState<UserRole | undefined>()

    // Check current session and user role
    useEffect(() => {
        const checkSession = async () => {
            try {
                // Always check session API first for comprehensive session validation
                const token = localStorage.getItem('token') ||
                             localStorage.getItem('student_token') ||
                             localStorage.getItem('college_token')
                console.log('Checking JWT token:', !!token)
                if (token) {
                    console.log('Making session API call...')
                    const response = await fetch('/api/auth/session', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    console.log('Session API response status:', response.status)
                    if (response.ok) {
                        const sessionData = await response.json()
                        console.log('Session API response:', sessionData)
                        if (sessionData.authenticated && sessionData.user) {
                            console.log('Setting user role:', sessionData.user.role)
                            setUserRole(sessionData.user.role)
                            return
                        }
                    } else {
                        console.log('Session API call failed')
                        const errorData = await response.json()
                        console.log('Error response:', errorData)
                    }
                } else {
                    console.log('No student token found in localStorage')
                }

                // If no college student token or API failed, check NextAuth session
                if (session?.user) {
                    setUserRole((session.user as SessionUserWithRole).role)
                    return
                }

                // No valid session found
                setUserRole(undefined)
            } catch (error) {
                console.error('Error checking session:', error)
                setUserRole(undefined)
            }
        }

        checkSession()
    }, [session])


    const isSuperAdmin = userRole === UserRole.SUPERADMIN

    const isItemActive = (itemUrl: string) => {
        return pathname === itemUrl || (itemUrl !== "/dashboard" && pathname.startsWith(itemUrl))
    }
    
    return (
        <SidebarPrimitive collapsible="icon" className="overflow-hidden">
            {/* Logo Section */}
            <SidebarHeader className="border-b border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg" className="w-full">
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-gray-900 shrink-0">
                                    <Image
                                        src={siteConfig.logo}
                                        alt={siteConfig.name}
                                        width={20}
                                        height={20}
                                        className="size-5"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                                    <span className="truncate font-semibold">{siteConfig.name}</span>
                                    <span className="truncate text-xs">Dashboard</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

                {/* Navigation Content */}
                <SidebarContent className="overflow-hidden">
                    {/* Primary Navigation Section */}
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-2">
                            Primary
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebarConfig.sections.map((section) =>
                                    section.items.map((item) => {
                                        const isActive = isItemActive(item.url)
                                        const badgeValue = item.badge
                                        const showBadge = badgeValue !== undefined && Number(badgeValue) > 0
                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="w-full">
                                                    <Link href={item.url} className="flex items-center gap-2 w-full min-w-0">
                                                        <item.icon className="size-4 shrink-0" />
                                                        <span className="truncate">{item.title}</span>
                                                        {showBadge && (
                                                            <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                                                {badgeValue}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Admin Section - Only show for SUPERADMIN */}
                    {isSuperAdmin && (
                        <>
                            <SidebarSeparator className="my-2" />
                            <SidebarGroup>
                                <SidebarGroupLabel className="text-xs font-semibold text-red-600 uppercase tracking-wider px-2">
                                    Admin
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {adminNavigation.map((item) => {
                                            const isActive = isItemActive(item.url)
                                            return (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="w-full">
                                                        <Link href={item.url} className="flex items-center gap-2 w-full min-w-0">
                                                            <item.icon className="size-4 shrink-0" />
                                                            <span className="truncate">{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            )
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </>
                    )}

                    {/* Separator before General section */}
                    <SidebarSeparator className="my-2" />

                    {/* General/Secondary Section */}
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-2">
                            General
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebarConfig.general.items.map((item) => {
                                    const isActive = isItemActive(item.url)

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="w-full">
                                                <Link href={item.url} className="flex items-center gap-2 w-full min-w-0">
                                                    <item.icon className="size-4 shrink-0" />
                                                    <span className="truncate">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

            </SidebarPrimitive>
    )
}