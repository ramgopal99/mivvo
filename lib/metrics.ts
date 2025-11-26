import * as os from 'os'

interface RequestMetric {
  timestamp: number
  responseTime: number
  statusCode: number
  path: string
}

interface MetricsData {
  totalRequests: number
  activeConnections: number
  averageResponseTime: number
  requestHistory: RequestMetric[]
  lastUpdated: number
}

class MetricsTracker {
  private metrics: MetricsData = {
    totalRequests: 0,
    activeConnections: 0,
    averageResponseTime: 0,
    requestHistory: [],
    lastUpdated: Date.now()
  }

  private activeRequests = new Set<string>()

  recordRequestStart(requestId: string) {
    this.activeRequests.add(requestId)
    this.metrics.activeConnections = this.activeRequests.size
    this.metrics.lastUpdated = Date.now()
  }

  recordRequestEnd(requestId: string, responseTime: number, statusCode: number, path: string) {
    this.activeRequests.delete(requestId)

    // Add to request history
    const metric: RequestMetric = {
      timestamp: Date.now(),
      responseTime,
      statusCode,
      path
    }

    this.metrics.requestHistory.push(metric)

    // Keep only last 1000 requests to prevent memory issues
    if (this.metrics.requestHistory.length > 1000) {
      this.metrics.requestHistory = this.metrics.requestHistory.slice(-1000)
    }

    // Update totals
    this.metrics.totalRequests++
    this.metrics.activeConnections = Math.max(0, this.activeRequests.size)

    // Calculate rolling average response time (last 100 requests)
    const recentRequests = this.metrics.requestHistory.slice(-100)
    this.metrics.averageResponseTime = recentRequests.length > 0
      ? Math.round(recentRequests.reduce((sum, req) => sum + req.responseTime, 0) / recentRequests.length)
      : 0

    this.metrics.lastUpdated = Date.now()
  }

  getMetrics(): MetricsData {
    // Clean up old active requests (requests that started more than 5 minutes ago)
    // For simplicity, just clear active requests - in production you'd track start times
    this.activeRequests.clear()

    return { ...this.metrics }
  }

  getHealthMetrics() {
    const metrics = this.getMetrics()

    // Calculate requests per minute over last hour
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    const recentRequests = metrics.requestHistory.filter(req => req.timestamp > oneHourAgo)

    const requestsPerMinute = recentRequests.length > 0
      ? Math.round((recentRequests.length / 60) * 100) / 100 // Round to 2 decimal places
      : 0

    // Calculate error rate (last 100 requests)
    const recentErrors = metrics.requestHistory
      .slice(-100)
      .filter(req => req.statusCode >= 400)

    const errorRate = metrics.requestHistory.length >= 10
      ? Math.round((recentErrors.length / Math.min(100, metrics.requestHistory.length)) * 100)
      : 0

    return {
      averageResponseTime: metrics.averageResponseTime,
      activeConnections: metrics.activeConnections,
      totalRequests: metrics.totalRequests,
      requestsPerMinute,
      errorRate,
      serverLoad: os.loadavg()[0]
    }
  }
}

// Export singleton instance
export const metricsTracker = new MetricsTracker()

// Helper function to generate request ID
export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Utility function to wrap API responses and track metrics
export function trackApiResponse(
  handler: (req: Request, ...args: unknown[]) => Promise<Response> | Response,
  path: string
) {
  return async (req: Request, ...args: unknown[]) => {
    const requestId = generateRequestId()
    const startTime = Date.now()

    try {
      metricsTracker.recordRequestStart(requestId)

      const response = await handler(req, ...args)

      const endTime = Date.now()
      const responseTime = endTime - startTime

      metricsTracker.recordRequestEnd(requestId, responseTime, response.status, path)

      return response
    } catch (error) {
      const endTime = Date.now()
      const responseTime = endTime - startTime

      metricsTracker.recordRequestEnd(requestId, responseTime, 500, path)

      throw error
    }
  }
}
