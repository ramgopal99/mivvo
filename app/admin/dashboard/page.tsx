"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react"

// Dummy admin data
const adminStats = {
  totalUsers: 1250,
  totalColleges: 45,
  activeUsers: 892,
  monthlyRevenue: 18750,
  systemHealth: 98.5,
  pendingApprovals: 12
}

const recentActivities = [
  {
    id: "1",
    type: "user_registration",
    message: "New college registered: Tech University",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: "2",
    type: "payment",
    message: "Payment received from Central College ($49)",
    time: "15 minutes ago",
    status: "success"
  },
  {
    id: "3",
    type: "system_alert",
    message: "High CPU usage detected on server-2",
    time: "1 hour ago",
    status: "warning"
  },
  {
    id: "4",
    type: "user_action",
    message: "User account suspended: john.doe@spam.com",
    time: "2 hours ago",
    status: "info"
  }
]

const topColleges = [
  { name: "Central University", users: 245, revenue: 1470, growth: 12.5 },
  { name: "Tech Institute", users: 189, revenue: 1134, growth: 8.3 },
  { name: "Global College", users: 156, revenue: 936, growth: 15.2 },
  { name: "Metro University", users: 134, revenue: 804, growth: 6.7 },
  { name: "State College", users: 98, revenue: 588, growth: 4.1 }
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform overview and management tools
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" />
            System Status
          </Button>
          <Button size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.round(adminStats.totalUsers * 0.08)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Colleges</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalColleges}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.round(adminStats.totalColleges * 0.15)} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${adminStats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.round((adminStats.monthlyRevenue * 0.12) / adminStats.monthlyRevenue * 100)}% growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.systemHealth}%</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest platform events and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">
                      {activity.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {activity.status === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {activity.status === 'info' && <Clock className="h-5 w-5 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Colleges & Alerts */}
        <div className="space-y-6">
          {/* Pending Approvals Alert */}
          <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                {adminStats.pendingApprovals} colleges waiting for approval
              </p>
              <Button size="sm" className="w-full">
                Review Approvals
              </Button>
            </CardContent>
          </Card>

          {/* Top Colleges */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Colleges</CardTitle>
              <CardDescription>
                Colleges by user count and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topColleges.map((college, index) => (
                  <div key={college.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{college.name}</p>
                        <p className="text-xs text-muted-foreground">{college.users} users</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${college.revenue}</p>
                      <Badge variant="secondary" className="text-xs">
                        +{college.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Building2 className="h-6 w-6" />
              <span className="text-sm">College Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Activity className="h-6 w-6" />
              <span className="text-sm">System Health</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
