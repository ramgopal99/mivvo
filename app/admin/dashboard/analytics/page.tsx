"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  DollarSign,
  Calendar,
  Download,
  Building2,
  Activity
} from "lucide-react"

// Dummy analytics data
const platformMetrics = {
  totalUsers: 1250,
  totalColleges: 45,
  monthlyRevenue: 56250,
  userGrowth: 15.3,
  collegeGrowth: 8.7,
  revenueGrowth: 22.1
}

const userGrowthData = [
  { month: "Jul", users: 980 },
  { month: "Aug", users: 1050 },
  { month: "Sep", users: 1120 },
  { month: "Oct", users: 1180 },
  { month: "Nov", users: 1220 },
  { month: "Dec", users: 1250 }
]

const revenueData = [
  { month: "Jul", revenue: 42000 },
  { month: "Aug", revenue: 44500 },
  { month: "Sep", revenue: 46800 },
  { month: "Oct", revenue: 49200 },
  { month: "Nov", revenue: 52800 },
  { month: "Dec", revenue: 56250 }
]

const topPerformingColleges = [
  { name: "Central University", users: 245, revenue: 14700, conversion: 94.2 },
  { name: "Tech Institute", users: 189, revenue: 11340, conversion: 91.8 },
  { name: "Global College", users: 156, revenue: 9360, conversion: 89.5 },
  { name: "Digital University", users: 203, revenue: 12180, conversion: 96.1 }
]

const systemHealth = {
  uptime: 99.7,
  responseTime: 145,
  errorRate: 0.3,
  activeSessions: 89
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into platform performance and growth
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
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
            <div className="text-2xl font-bold">{platformMetrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{platformMetrics.userGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Colleges</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalColleges}</div>
            <p className="text-xs text-muted-foreground">
              +{platformMetrics.collegeGrowth}% growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformMetrics.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{platformMetrics.revenueGrowth}% growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.uptime}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Growth Metrics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="colleges">College Analytics</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>
                  Monthly active user growth over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 flex items-end justify-between gap-2">
                    {userGrowthData.map((item) => (
                      <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div
                            className="bg-primary rounded-t w-full transition-all hover:bg-primary/80"
                            style={{ height: `${(item.users / 1400) * 200}px` }}
                          />
                          <span className="text-xs font-medium">{item.users}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>
                  Monthly recurring revenue trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 flex items-end justify-between gap-2">
                    {revenueData.map((item) => (
                      <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div
                            className="bg-green-500 rounded-t w-full transition-all hover:bg-green-600"
                            style={{ height: `${(item.revenue / 60000) * 200}px` }}
                          />
                          <span className="text-xs font-medium">${(item.revenue / 1000).toFixed(0)}k</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>
                  Average API response time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {systemHealth.responseTime}ms
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Target: &lt;200ms
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Performance</span>
                    <span className="font-medium">Good</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Rate</CardTitle>
                <CardDescription>
                  System error percentage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {systemHealth.errorRate}%
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Target: &lt;1%
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Reliability</span>
                    <span className="font-medium">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  Current active user sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {systemHealth.activeSessions}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Real-time count
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Capacity</span>
                    <span className="font-medium">Low</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="colleges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Colleges</CardTitle>
              <CardDescription>
                Colleges ranked by user engagement and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingColleges.map((college, index) => (
                  <div key={college.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{college.name}</p>
                        <p className="text-sm text-muted-foreground">{college.users} users</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${college.revenue.toLocaleString()}</p>
                      <Badge variant="secondary" className="text-xs">
                        {college.conversion}% conversion
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Current system health overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">File Storage</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Service</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>
                  System notifications and warnings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Email service latency increased</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Database backup completed</p>
                    <p className="text-xs text-muted-foreground">6 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">New college registration processed</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
