"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Crown } from "lucide-react"

interface AdminUsersStatsProps {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  adminUsers: number
}

export function AdminUsersStats({
  totalUsers,
  activeUsers,
  inactiveUsers,
  adminUsers
}: AdminUsersStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            All registered users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Logged in this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inactiveUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            30+ days since login
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
          <Crown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{adminUsers}</div>
          <p className="text-xs text-muted-foreground">
            Super admin accounts
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
