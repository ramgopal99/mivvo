import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface LogEntryProps {
  title: string
  message: string
  time: string
  type: "info" | "warning" | "error"
  level?: string
}

export function LogEntry({ title, message, time, type, level }: LogEntryProps) {
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'info':
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getLogLevelColor = (level?: string) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-600 text-white'
      case 'WARN':
        return 'bg-yellow-600 text-white'
      case 'INFO':
        return 'bg-blue-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <div className="flex-shrink-0 mt-0.5">
        {getLogIcon(type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium">{title}</p>
          {level && (
            <Badge className={`text-xs ${getLogLevelColor(level)}`}>
              {level}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}
