"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
} from "lucide-react"

// Dummy system health data
const systemStatus = {
  overall: {
    status: "healthy",
    uptime: "99.7%",
    lastIncident: "15 days ago"
  },
  services: [
    {
      name: "Web Application",
      status: "healthy",
      uptime: "99.9%",
      responseTime: "145ms",
      location: "US-East"
    },
    {
      name: "API Gateway",
      status: "healthy",
      uptime: "99.8%",
      responseTime: "89ms",
      location: "US-East"
    },
    {
      name: "Database",
      status: "healthy",
      uptime: "99.95%",
      responseTime: "23ms",
      location: "US-East"
    },
    {
      name: "File Storage",
      status: "warning",
      uptime: "98.2%",
      responseTime: "450ms",
      location: "US-West"
    },
    {
      name: "Email Service",
      status: "healthy",
      uptime: "99.1%",
      responseTime: "120ms",
      location: "EU-West"
    },
    {
      name: "Background Jobs",
      status: "healthy",
      uptime: "99.7%",
      responseTime: "N/A",
      location: "US-East"
    }
  ]
}

const resourceUsage = {
  cpu: { used: 45, total: 100, status: "normal" },
  memory: { used: 6.2, total: 16, status: "normal" },
  disk: { used: 234, total: 500, status: "normal" },
  bandwidth: { used: 2.1, total: 10, status: "normal" }
}

const recentAlerts = [
  {
    id: "1",
    type: "warning",
    title: "High Memory Usage",
    message: "Server-2 memory usage exceeded 85%",
    time: "2 hours ago",
    resolved: true
  },
  {
    id: "2",
    type: "info",
    title: "Scheduled Maintenance",
    message: "Database optimization completed successfully",
    time: "1 day ago",
    resolved: true
  },
  {
    id: "3",
    type: "error",
    title: "API Timeout",
    message: "External payment API timeout for 30 seconds",
    time: "2 days ago",
    resolved: true
  },
  {
    id: "4",
    type: "warning",
    title: "Disk Space Alert",
    message: "Storage server approaching 80% capacity",
    time: "3 days ago",
    resolved: false
  }
]

const performanceMetrics = {
  averageResponseTime: 145,
  requestsPerMinute: 1250,
  errorRate: 0.3,
  throughput: 98.5
}

export default function AdminHealthPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
          <p className="text-muted-foreground">
            Monitor system performance, services, and infrastructure health
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Overall Status */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Status</CardTitle>
            {getStatusIcon(systemStatus.overall.status)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{systemStatus.overall.status}</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStatus.overall.uptime}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.averageResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">
              Average across all services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.errorRate}%</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Health Tabs */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>
                Real-time status of all platform services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {systemStatus.services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{service.uptime} uptime</p>
                      <p className="text-xs text-muted-foreground">
                        {service.responseTime} response
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Server Resources</CardTitle>
                <CardDescription>
                  CPU, memory, and disk usage across servers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span className="font-medium">{resourceUsage.cpu.used}%</span>
                  </div>
                  <Progress value={resourceUsage.cpu.used} className="h-2" />
                  <p className="text-xs text-muted-foreground">4 cores, normal load</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span className="font-medium">{resourceUsage.memory.used}GB / {resourceUsage.memory.total}GB</span>
                  </div>
                  <Progress value={(resourceUsage.memory.used / resourceUsage.memory.total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">38% utilization</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Disk Usage</span>
                    <span className="font-medium">{resourceUsage.disk.used}GB / {resourceUsage.disk.total}GB</span>
                  </div>
                  <Progress value={(resourceUsage.disk.used / resourceUsage.disk.total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">47% utilization</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network & Bandwidth</CardTitle>
                <CardDescription>
                  Network performance and bandwidth usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bandwidth Usage</span>
                    <span className="font-medium">{resourceUsage.bandwidth.used}TB / {resourceUsage.bandwidth.total}TB</span>
                  </div>
                  <Progress value={(resourceUsage.bandwidth.used / resourceUsage.bandwidth.total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">21% of monthly limit</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {performanceMetrics.requestsPerMinute}
                    </div>
                    <div className="text-sm text-muted-foreground">Requests/min</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {performanceMetrics.throughput}%
                    </div>
                    <div className="text-sm text-muted-foreground">Throughput</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Alerts</CardTitle>
              <CardDescription>
                System notifications, warnings, and incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">
                      {alert.type === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                      {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {alert.type === 'info' && <CheckCircle className="h-5 w-5 text-blue-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{alert.title}</p>
                        {alert.resolved ? (
                          <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>API Performance</CardTitle>
                <CardDescription>
                  API response times and throughput
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {performanceMetrics.averageResponseTime}ms
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {performanceMetrics.requestsPerMinute}
                  </div>
                  <div className="text-sm text-muted-foreground">Requests/Minute</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Reliability</CardTitle>
                <CardDescription>
                  Uptime and error tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {systemStatus.overall.uptime}
                  </div>
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {performanceMetrics.errorRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">Error Rate</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Score</CardTitle>
                <CardDescription>
                  Overall system health rating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-green-600 mb-2">
                    {performanceMetrics.throughput}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">Health Score</div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${performanceMetrics.throughput}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Excellent performance</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
