"use client"

import * as React from "react"
import { collegeSidebarConfig } from "@/config/college-sidebar-config"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

export function CollegeSidebar() {
    const pathname = usePathname()

    const isItemActive = (itemUrl: string) => {
        return pathname === itemUrl || (itemUrl !== "/college/dashboard" && pathname.startsWith(itemUrl))
    }

    return (
        <SidebarPrimitive collapsible="icon" className="overflow-hidden">
            {/* Logo Section */}
            <SidebarHeader className="border-b border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg" className="w-full">
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
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
                                    <span className="truncate text-xs">College Portal</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Navigation Content */}
            <SidebarContent className="overflow-hidden">
                {/* Navigation Sections */}
                {collegeSidebarConfig.sections.map((section, sectionIndex) => (
                    <React.Fragment key={section.title}>
                        {sectionIndex > 0 && <SidebarSeparator className="my-2" />}
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-2">
                                {section.title}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {section.items.map((item) => {
                                        const isActive = isItemActive(item.url)
                                        return (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title} className="w-full">
                                                    <Link href={item.url} className="flex items-center gap-2 w-full min-w-0">
                                                        <item.icon className="size-4 shrink-0" />
                                                        <span className="truncate">{item.title}</span>
                                                        {item.badge && (
                                                            <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        )
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </React.Fragment>
                ))}

                {/* Separator before General section */}
                <SidebarSeparator className="my-2" />

                {/* General Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider px-2">
                        {collegeSidebarConfig.general.title}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {collegeSidebarConfig.general.items.map((item) => {
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
