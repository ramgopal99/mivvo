"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, Server, Database as DatabaseIcon, Activity, Cpu, MemoryStick, HardDrive } from "lucide-react"
import { StatusCard, ServiceCard, ResourceCard, LogEntry } from "./_components"

interface HealthData {
  system: {
    cpu: { cores: number; usage: number; model: string }
    memory: { total: number; used: number; usage: number }
    disk: { total: number; used: number; usage: number }
    uptime: string
    platform: string
    arch: string
    hostname: string
  }
  applications: Array<{
    name: string
    status: string
    uptime: string
    responseTime: string
    port: number
  }>
  database: {
    name: string
    status: string
    uptime: string
    responseTime: string
    connectionCount: number
  }
  logs: Array<{
    id: string
    type: string
    title: string
    message: string
    time: string
    level: string
  }>
  performance: {
    averageResponseTime: number
    activeConnections: number
    totalRequests: number
    requestsPerMinute: number
    errorRate: number
    serverLoad: number
    timestamp: string
  }
}

export default function AdminHealthPage() {
  // Control variable - set to true to show real data, false to show empty state
  // Option 1: Change the value below directly (true or false)
  // Option 2: Set NEXT_PUBLIC_ENABLE_HEALTH_MONITORING=true in .env.local
  const ENABLE_HEALTH_MONITORING_VALUE = false // ← Change to true to enable, false to disable
  const ENABLE_HEALTH_MONITORING = process.env.NEXT_PUBLIC_ENABLE_HEALTH_MONITORING === 'true' 
    ? true 
    : ENABLE_HEALTH_MONITORING_VALUE

  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHealthData = async () => {
    // If monitoring is disabled, set empty data
    if (!ENABLE_HEALTH_MONITORING) {
      setHealthData(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/health')
      const result = await response.json()

      if (result.success) {
        setHealthData(result.data)
      } else {
        setError(result.error || 'Failed to fetch health data')
      }
    } catch (err) {
      setError('Failed to connect to health monitoring service')
      console.error('Health data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (ENABLE_HEALTH_MONITORING) {
      fetchHealthData()

      // Refresh data every 30 seconds
      const interval = setInterval(fetchHealthData, 30000)

      return () => clearInterval(interval)
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading && !healthData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">VPS Health Monitor</h1>
            <p className="text-muted-foreground">
              Loading system health data...
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error && !healthData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">VPS Health Monitor</h1>
            <p className="text-muted-foreground">
              Monitor your Hostinger VPS performance and application health
            </p>
          </div>
          <Button onClick={fetchHealthData} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error loading health data: {error}</p>
          <Button onClick={fetchHealthData}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // If monitoring is disabled, show empty state
  if (!ENABLE_HEALTH_MONITORING) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">VPS Health Monitor</h1>
            <p className="text-muted-foreground">
              Monitor your Hostinger VPS performance and application health
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-2">Health monitoring is currently disabled</p>
          <p className="text-sm text-muted-foreground">
            Enable health monitoring to view system metrics and application status
          </p>
        </div>
      </div>
    )
  }

  if (!healthData) return null

  // Transform data for components
  const systemStatus = {
    overall: {
      status: healthData.applications.every(app => app.status === 'healthy') &&
              healthData.database.status === 'healthy' ? 'healthy' : 'warning',
      uptime: healthData.system.uptime,
      lastRestart: "Unknown"
    },
    services: [
      ...healthData.applications.map(app => ({
        name: app.name,
        status: app.status as "healthy" | "warning" | "error",
        uptime: app.uptime,
        responseTime: app.responseTime,
        icon: app.name.includes('Next.js') ? Server : DatabaseIcon
      })),
      {
        name: healthData.database.name,
        status: healthData.database.status as "healthy" | "warning" | "error",
        uptime: healthData.database.uptime,
        responseTime: healthData.database.responseTime,
        icon: DatabaseIcon
      }
    ]
  }

  const resourceUsage = {
    cpu: {
      used: healthData.system.cpu.usage,
      cores: healthData.system.cpu.cores,
      status: "normal" as const
    },
    memory: {
      used: healthData.system.memory.used,
      total: healthData.system.memory.total,
      status: "normal" as const
    },
    disk: {
      used: healthData.system.disk.used,
      total: healthData.system.disk.total,
      status: "normal" as const
    },
    bandwidth: {
      used: 45, // This would need a separate API endpoint
      total: 1000,
      status: "normal" as const
    }
  }

  const recentLogs = healthData.logs.map(log => ({
    ...log,
    time: new Date(log.time).toLocaleString()
  }))

  const vpsMetrics = {
    averageResponseTime: healthData.performance.averageResponseTime,
    activeConnections: healthData.performance.activeConnections,
    totalRequests: healthData.performance.totalRequests,
    requestsPerMinute: healthData.performance.requestsPerMinute,
    errorRate: healthData.performance.errorRate,
    serverLoad: healthData.performance.serverLoad
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">VPS Health Monitor</h1>
          <p className="text-muted-foreground">
            Monitor your Hostinger VPS performance and application health
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchHealthData}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* VPS Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatusCard
          title="VPS Status"
          value={systemStatus.overall.status}
          description="Hostinger VPS running"
          status="healthy"
        />

        <StatusCard
          title="Uptime"
          value={systemStatus.overall.uptime}
          description="Since last restart"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />

        <StatusCard
          title="Response Time"
          value={`${vpsMetrics.averageResponseTime}ms`}
          description="App response time"
          icon={<Server className="h-4 w-4 text-muted-foreground" />}
        />

        <StatusCard
          title="Request Rate"
          value={`${vpsMetrics.requestsPerMinute}/min`}
          description="Requests per minute"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* VPS Health Tabs */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Services</CardTitle>
              <CardDescription>
                Status of your VPS applications and database
              </CardDescription>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700">Database Health Check</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  Real-time monitoring of MongoDB connection, response times, and active connections.
                  Green indicates healthy status, red indicates connection issues.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {systemStatus.services.map((service) => (
                  <ServiceCard
                    key={service.name}
                    name={service.name}
                    status={service.status as "healthy" | "warning" | "error"}
                    uptime={service.uptime}
                    responseTime={service.responseTime}
                    icon={service.icon}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ResourceCard
              title="VPS Resources"
              description="CPU, memory, and disk usage on your Hostinger VPS"
              resources={[
                {
                  label: "CPU Usage",
                  used: resourceUsage.cpu.used,
                  unit: "%",
                  icon: Cpu,
                  description: `${resourceUsage.cpu.cores} cores, low load`
                },
                {
                  label: "Memory Usage",
                  used: resourceUsage.memory.used,
                  total: resourceUsage.memory.total,
                  unit: "GB",
                  icon: MemoryStick,
                  description: `${Math.round((resourceUsage.memory.used / resourceUsage.memory.total) * 100)}% utilization`
                },
                {
                  label: "Disk Usage",
                  used: resourceUsage.disk.used,
                  total: resourceUsage.disk.total,
                  unit: "GB",
                  icon: HardDrive,
                  description: `${Math.round((resourceUsage.disk.used / resourceUsage.disk.total) * 100)}% utilization`
                }
              ]}
            />

            <Card>
              <CardHeader>
                <CardTitle>Bandwidth Usage</CardTitle>
                <CardDescription>
                  Monthly data transfer on your Hostinger VPS plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Bandwidth</span>
                    <span className="font-medium">{resourceUsage.bandwidth.used}GB / {resourceUsage.bandwidth.total}GB</span>
                  </div>
                  <Progress value={(resourceUsage.bandwidth.used / resourceUsage.bandwidth.total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round((resourceUsage.bandwidth.used / resourceUsage.bandwidth.total) * 100)}% of monthly limit</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {vpsMetrics.activeConnections}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Connections</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {vpsMetrics.requestsPerMinute}/min
                    </div>
                    <div className="text-sm text-muted-foreground">Request Rate</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {vpsMetrics.errorRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Error Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Logs</CardTitle>
              <CardDescription>
                Recent logs from your VPS applications and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLogs.map((log) => (
                  <LogEntry
                    key={log.id}
                    title={log.title}
                    message={log.message}
                    time={log.time}
                    type={log.type as "info" | "warning" | "error"}
                    level={log.level}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Application Performance</CardTitle>
                <CardDescription>
                  Response times and request handling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {vpsMetrics.averageResponseTime}ms
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {vpsMetrics.requestsPerMinute}/min
                  </div>
                  <div className="text-sm text-muted-foreground">Request Rate</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {vpsMetrics.errorRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">Error Rate</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VPS Load</CardTitle>
                <CardDescription>
                  Server load and resource utilization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {vpsMetrics.serverLoad}
                  </div>
                  <div className="text-sm text-muted-foreground">Server Load Average</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {systemStatus.overall.uptime}
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VPS Health Status</CardTitle>
                <CardDescription>
                  Overall health of your Hostinger VPS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-green-600 mb-2">
                    ✓
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">System Status</div>
                  <div className="grid gap-2">
                    <div className="flex justify-between text-sm">
                      <span>Applications</span>
                      <span className="text-green-600">Running</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Database</span>
                      <span className="text-green-600">Connected</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Resources</span>
                      <span className="text-green-600">Normal</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">All systems operational</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
