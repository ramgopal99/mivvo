interface LogEntry {
  id: string
  type: 'info' | 'warning' | 'error'
  title: string
  message: string
  time: string
  level: string
  source?: string
}

class Logger {
  private logs: LogEntry[] = []
  private maxLogs = 1000

  constructor() {
    // Override console methods to capture logs
    this.captureConsoleLogs()
  }

  private captureConsoleLogs() {
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn

    console.log = (...args: any[]) => {
      this.addLog('info', 'Application Log', args.join(' '), 'INFO')
      originalLog.apply(console, args)
    }

    console.error = (...args: any[]) => {
      this.addLog('error', 'Application Error', args.join(' '), 'ERROR')
      originalError.apply(console, args)
    }

    console.warn = (...args: any[]) => {
      this.addLog('warning', 'Application Warning', args.join(' '), 'WARN')
      originalWarn.apply(console, args)
    }
  }

  private addLog(type: 'info' | 'warning' | 'error', title: string, message: string, level: string, source?: string) {
    const log: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      time: new Date().toISOString(),
      level,
      source
    }

    this.logs.push(log)

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }
  }

  getRecentLogs(limit: number = 50): LogEntry[] {
    return this.logs.slice(-limit).reverse() // Most recent first
  }

  log(type: 'info' | 'warning' | 'error', title: string, message: string, source?: string) {
    const level = type.toUpperCase()
    this.addLog(type, title, message, level, source)
  }

  info(title: string, message: string, source?: string) {
    this.log('info', title, message, source)
  }

  warn(title: string, message: string, source?: string) {
    this.log('warning', title, message, source)
  }

  error(title: string, message: string, source?: string) {
    this.log('error', title, message, source)
  }
}

// Export singleton instance
export const logger = new Logger()
