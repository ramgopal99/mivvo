import {
  Home,
  Users,
  Building2,
  BarChart3,
  Settings,
  HelpCircle,
  Shield,
  UserCheck,
  TrendingUp
} from "lucide-react"

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

export interface AdminSidebarConfig {
  sections: NavigationSection[]
  general: {
    title: string
    items: NavigationItem[]
  }
}

export const adminSidebarConfig: AdminSidebarConfig = {
  sections: [
    {
      title: "OVERVIEW",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: Home,
          description: "Admin overview and key metrics"
        },
        {
          title: "Users",
          url: "/admin/dashboard/users",
          icon: Users,
          description: "Manage all users and accounts"
        },
        {
          title: "Colleges",
          url: "/admin/dashboard/colleges",
          icon: Building2,
          description: "Manage colleges and institutions"
        }
      ]
    },
    {
      title: "ANALYTICS",
      items: [
        {
          title: "Platform Analytics",
          url: "/admin/dashboard/analytics",
          icon: BarChart3,
          description: "Platform-wide analytics and insights"
        },
        {
          title: "Growth Metrics",
          url: "/admin/dashboard/growth",
          icon: TrendingUp,
          description: "User growth and engagement metrics"
        }
      ]
    },
    {
      title: "SYSTEM",
      items: [
        {
          title: "User Permissions",
          url: "/admin/dashboard/permissions",
          icon: UserCheck,
          description: "Manage user roles and permissions"
        },
        {
          title: "System Health",
          url: "/admin/dashboard/health",
          icon: Shield,
          description: "Monitor system status and health"
        }
      ]
    }
  ],
  general: {
    title: "GENERAL",
    items: [
      {
        title: "Settings",
        url: "/admin/dashboard/settings",
        icon: Settings,
        description: "System-wide settings"
      }
    ]
  }
}
