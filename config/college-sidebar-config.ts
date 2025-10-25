import {
  Home,
  Users,
  TrendingUp,
  BarChart3,
  Settings,
  HelpCircle,
  GraduationCap,
  Target,
  Clock,
  Award
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

export interface CollegeSidebarConfig {
  sections: NavigationSection[]
  general: {
    title: string
    items: NavigationItem[]
  }
}

export const collegeSidebarConfig: CollegeSidebarConfig = {
  sections: [
    {
      title: "OVERVIEW",
      items: [
        {
          title: "Dashboard",
          url: "/college/dashboard",
          icon: Home,
          description: "College overview and key metrics"
        },
        {
          title: "Students",
          url: "/college/dashboard/students",
          icon: Users,
          description: "View all students and their progress"
        }
      ]
    },
    {
      title: "ANALYTICS",
      items: [
        {
          title: "Progress Tracking",
          url: "/college/dashboard/progress",
          icon: Target,
          description: "Monitor individual student progress"
        },
        {
          title: "Reports",
          url: "/college/dashboard/reports",
          icon: BarChart3,
          description: "Detailed reports and statistics"
        },

      ]
    },
    {
      title: "ACADEMICS",
      items: [
        {
          title: "Time Analytics",
          url: "/college/dashboard/time",
          icon: Clock,
          description: "Time spent on different activities"
        },
        {
          title: "Achievements",
          url: "/college/dashboard/achievements",
          icon: Award,
          description: "Student achievements and milestones"
        }
      ]
    }
  ],
  general: {
    title: "GENERAL",
    items: [
      {
        title: "Settings",
        url: "/college/dashboard/settings",
        icon: Settings,
        description: "College settings and preferences"
      },
      {
        title: "Help",
        url: "/college/dashboard/help",
        icon: HelpCircle,
        description: "Get help and support"
      }
    ]
  }
}
