import {
  Home,
  Settings,
  Shield,
  MessageSquare,
  HelpCircle,
  Headphones,
  BookOpen
} from "lucide-react"
import { siteConfig } from "./site"

export interface NavigationItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

export interface SidebarConfig {
  sections: NavigationSection[]
  general: {
    title: string
    items: NavigationItem[]
  }
}

export const sidebarConfig: SidebarConfig = {
  sections: [
    {
      title: "MENU",
      items: [
        {
          title: "Home",
          url: "/dashboard",
          icon: Home,
          description: "View your overview and statistics"
        },
        {
          title: "Custom Interviews",
          url: "/dashboard/custominterview",
          icon: MessageSquare,
          description: "custom interview"
        },
        ...(siteConfig.enableCourses ? [{
          title: "Courses",
          url: "/dashboard/courses",
          icon: BookOpen,
          description: "Access programming courses"
        }] : [])
      ]
    }
  ],
  general: {
    title: "GENERAL",
    items: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        description: "Configure your preferences"
      },
      {
        title: "Support",
        url: "/dashboard/support",
        icon: Headphones,
        description: "Raise queries and get support"
      },
      {
        title: "Help",
        url: "/dashboard/help",
        icon: HelpCircle,
        description: "Get help and support"
      }
    ]
  }
}

// Admin navigation items (only shown for SUPERADMIN)
export const adminNavigation: NavigationItem[] = [
  {
    title: "Admin Panel",
    url: "/dashboard/admin",
    icon: Shield,
    description: "Manage users and system settings"
  }
]
