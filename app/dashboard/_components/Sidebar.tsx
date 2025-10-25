"use client"

import * as React from "react"
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

    const isSuperAdmin = (session?.user as SessionUserWithRole)?.role === UserRole.SUPERADMIN

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