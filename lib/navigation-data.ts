import {
  Home,
  Settings,
  Shield,
  Video,
  Book} from "lucide-react"

export interface NavigationItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  description?: string
}

export interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

export const navigationData = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      description: "View your overview and statistics"
    },
    {
      title: "Courses",
      url: "/dashboard/course",
      icon: Book,
      description: "View your courses"
    },
    {
      title: "Mock Interviews",
      url: "/dashboard/mockinterview",
      icon: Video,
      description: "View your mock interviews"
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      description: "Configure your preferences"
    },
 
  ] as NavigationItem[],

  admin: [
    {
      title: "Admin Panel",
      url: "/dashboard/admin",
      icon: Shield,
      description: "Manage users and system settings"
    }
  ] as NavigationItem[]
}

export function getPageTitle(pathname: string): string {
  const allItems = [...navigationData.main, ...navigationData.admin]

  const item = allItems.find(item => {
    if (item.url === pathname) return true
    if (pathname.startsWith(item.url) && item.url !== '/dashboard') return true
    return false
  })

  if (item) return item.title

  // Default titles for specific routes
  const routeTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/profile': 'Profile',
    '/dashboard/settings': 'Settings',
    '/dashboard/admin': 'Admin Panel',
    '/dashboard/meet': 'Mock Interviews',
    '/': 'Home'
  }

  return routeTitles[pathname] || 'Mivvo'
}
