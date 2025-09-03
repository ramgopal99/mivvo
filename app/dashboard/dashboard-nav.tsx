"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { UserRole } from "@prisma/client"

export function DashboardNav() {
  const { data: session } = useSession()
  const isSuperAdmin = session?.user?.role === UserRole.SUPERADMIN

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
          Mivvo
        </Link>
        <span className="text-muted-foreground">|</span>
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="text-sm hover:underline transition-colors">
          Overview
        </Link>
        <Link href="/dashboard/profile" className="text-sm hover:underline transition-colors">
          Profile
        </Link>
        <Link href="/dashboard/settings" className="text-sm hover:underline transition-colors">
          Settings
        </Link>
        {isSuperAdmin && (
          <Link href="/dashboard/admin" className="text-sm hover:underline transition-colors text-red-600">
            Admin
          </Link>
        )}
      </div>
    </nav>
  )
}
