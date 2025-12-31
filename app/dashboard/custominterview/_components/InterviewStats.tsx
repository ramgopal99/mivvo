import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, TrendingUp, Coins } from "lucide-react"
import { CreditUsageInfo, formatCredits, formatRemainingCredits } from "@/lib/credit-converter"

interface InterviewStatsProps {
  totalInterviews: number
  timeSpent: number
  averageScore: number
  totalAttempts: number
  creditUsage?: CreditUsageInfo | null
}

export function InterviewStats({ totalInterviews, timeSpent, averageScore, totalAttempts, creditUsage }: InterviewStatsProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  // Get credit usage information
  const creditInfo = creditUsage ? formatRemainingCredits(creditUsage) : null

  // Show credit usage card if creditUsage exists (even with 0 credits)
  const showCreditUsage = creditUsage !== null

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
          <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
          <p className="text-xs text-muted-foreground">Total interview time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore}</div>
          <p className="text-xs text-muted-foreground">
            {totalAttempts} attempts
          </p>
        </CardContent>
      </Card>

      {showCreditUsage && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Usage</CardTitle>
            <Coins className={`h-4 w-4 ${
              creditInfo?.statusColor === 'danger' ? 'text-red-500' :
              creditInfo?.statusColor === 'warning' ? 'text-orange-500' :
              'text-muted-foreground'
            }`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              creditInfo?.statusColor === 'danger' ? 'text-red-600' :
              creditInfo?.statusColor === 'warning' ? 'text-orange-600' :
              ''
            }`}>
              {creditInfo?.text || formatCredits(creditUsage!.remainingCredits)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCredits(creditUsage!.usedCredits)} used of {formatCredits(creditUsage!.totalCredits)}
            </p>
            {creditInfo?.isNearLimit && (
              <p className={`text-xs mt-1 ${
                creditInfo.statusColor === 'danger' ? 'text-red-600' : 'text-orange-600'
              }`}>
                {creditInfo.statusColor === 'danger' ? 'Critical: Credits almost depleted' : 'Low credits remaining'}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
