import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, Clock, Timer } from "lucide-react"

interface InterviewStatsProps {
  totalInterviews: number
  completedInterviews: number
  totalTimeAllowance?: number
  usedTimeMinutes?: number
}

export function InterviewStats({ totalInterviews, completedInterviews, totalTimeAllowance, usedTimeMinutes }: InterviewStatsProps) {
  const inProgressInterviews = totalInterviews - completedInterviews
  const remainingTime = totalTimeAllowance && usedTimeMinutes ? totalTimeAllowance - usedTimeMinutes : 0
  const timePercentage = totalTimeAllowance && usedTimeMinutes ? (usedTimeMinutes / totalTimeAllowance) * 100 : 0
  const isTimeLimitNear = timePercentage >= 80

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInterviews}</div>
          <p className="text-xs text-muted-foreground">Custom interviews created</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedInterviews}</div>
          <p className="text-xs text-muted-foreground">Successfully finished</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressInterviews}</div>
          <p className="text-xs text-muted-foreground">Currently active</p>
        </CardContent>
      </Card>

      {totalTimeAllowance && usedTimeMinutes !== undefined && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Usage</CardTitle>
            <Timer className={`h-4 w-4 ${isTimeLimitNear ? 'text-orange-500' : 'text-muted-foreground'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isTimeLimitNear ? 'text-orange-600' : ''}`}>
              {remainingTime}min
            </div>
            <p className="text-xs text-muted-foreground">
              {usedTimeMinutes}min used of {totalTimeAllowance}min
            </p>
            {isTimeLimitNear && (
              <p className="text-xs text-orange-600 mt-1">
                Time limit almost reached
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
