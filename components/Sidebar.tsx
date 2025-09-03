"use client"

import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Brain,
    Sparkles,
    User,
    Shield} from "lucide-react"
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <Sidebar
            variant="inset"
            collapsible="icon"
            className="overflow-hidden border-r bg-gradient-to-b from-background to-muted/20"
            {...props}
        >
            <SidebarHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-primary/10 transition-colors">
                            <Link href="/" className="flex items-center w-full group">
                                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                                    <Brain className="size-5" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight min-w-0 ml-3 [&[data-collapsed=true]]:hidden">
                                    <span className="truncate font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                        MeetAI
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <Sparkles className="size-3" />
                                        AI-Powered Platform
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="overflow-x-hidden px-2 py-4">
                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {navigationData.main.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        className="hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg group"
                                    >
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                "flex items-center w-full min-w-0 px-3 py-2 rounded-md transition-colors [&[data-collapsed=true]]:justify-center",
                                                pathname === item.url
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className={cn(
                                                "size-4 shrink-0 transition-transform [&[data-collapsed=true]]:mx-auto",
                                                pathname === item.url
                                                    ? "text-primary"
                                                    : "group-hover:scale-110"
                                            )} />
                                            <span className="truncate ml-3 [&[data-collapsed=true]]:hidden">{item.title}</span>
                                            {item.badge && (
                                                <Badge
                                                    variant="secondary"
                                                    className={cn(
                                                        "ml-auto shrink-0 text-xs px-2 py-0.5 [&[data-collapsed=true]]:hidden",
                                                        pathname === item.url
                                                            ? "bg-primary/20 text-primary border-primary/30"
                                                            : "bg-muted text-muted-foreground"
                                                    )}
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* Admin Navigation - Only show for SUPERADMIN */}
                            {isSuperAdmin && (
                                <>
                                    <div className="px-3 py-2 [&[data-collapsed=true]]:hidden">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            <Shield className="size-3" />
                                            Admin
                                        </div>
                                    </div>
                                    {navigationData.admin.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={item.title}
                                                className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 transition-all duration-200 rounded-lg group"
                                            >
                                                <Link
                                                    href={item.url}
                                                    className={cn(
                                                        "flex items-center w-full min-w-0 px-3 py-2 rounded-md transition-colors [&[data-collapsed=true]]:justify-center",
                                                        pathname === item.url
                                                            ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400 font-medium"
                                                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                                    )}
                                                >
                                                    <item.icon className={cn(
                                                        "size-4 shrink-0 transition-transform [&[data-collapsed=true]]:mx-auto",
                                                        pathname === item.url
                                                            ? "text-red-600 dark:text-red-400"
                                                            : "group-hover:scale-110"
                                                    )} />
                                                    <span className="truncate ml-3 [&[data-collapsed=true]]:hidden">{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


            </SidebarContent>

            <SidebarFooter className="border-t bg-gradient-to-r from-muted/20 to-muted/10 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="hover:bg-primary/10 transition-colors rounded-lg [&[data-collapsed=true]]:justify-center"
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                <AvatarFallback>
                                    <User className="h-8 w-8" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight min-w-0 ml-2 [&[data-collapsed=true]]:hidden">
                                <span className="truncate font-semibold">
                                    {session?.user?.name || "User"}
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {session?.user?.email || "user@example.com"}
                                </span>
                                {(session?.user as SessionUserWithRole)?.role && (
                                    <Badge
                                        variant={(session?.user as SessionUserWithRole)?.role === UserRole.SUPERADMIN ? "destructive" : "secondary"}
                                        className="w-fit mt-1 text-xs"
                                    >
                                        {(session?.user as SessionUserWithRole)?.role}
                                    </Badge>
                                )}
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
