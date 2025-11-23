import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LucideIcon } from "lucide-react"

interface ResourceCardProps {
  title: string
  description: string
  resources: Array<{
    label: string
    used: number | string
    total?: number | string
    unit?: string
    icon?: LucideIcon
    description?: string
  }>
}

export function ResourceCard({ title, description, resources }: ResourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {resources.map((resource, index) => {
          const Icon = resource.icon
          const usage = typeof resource.used === 'number' && resource.total
            ? (resource.used / Number(resource.total)) * 100
            : 0

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  {resource.label}
                </span>
                <span className="font-medium">
                  {resource.used}{resource.unit || ''}
                  {resource.total && ` / ${resource.total}${resource.unit || ''}`}
                </span>
              </div>
              {typeof resource.used === 'number' && resource.total && (
                <Progress value={usage} className="h-2" />
              )}
              {resource.description && (
                <p className="text-xs text-muted-foreground">{resource.description}</p>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
