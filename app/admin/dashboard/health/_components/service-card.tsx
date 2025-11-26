import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface ServiceCardProps {
  name: string
  status: "healthy" | "warning" | "error"
  uptime: string
  responseTime: string
  icon?: React.ComponentType<{ className?: string }>
}

export function ServiceCard({ name, status, uptime, responseTime, icon: Icon }: ServiceCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        {getStatusIcon(status)}
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">
            {Icon ? "Running on VPS" : "Service status"}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{uptime} uptime</p>
        <p className="text-xs text-muted-foreground">
          {responseTime} response
        </p>
      </div>
    </div>
  )
}
