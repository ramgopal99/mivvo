import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CommissionData {
  id: string
  affiliate: {
    user: {
      name: string | null
      email: string
    }
  }
  amount: number
  status: string
  courseTitle: string | null
  createdAt: string
}

interface RecentCommissionsListProps {
  commissions: CommissionData[]
}

export function RecentCommissionsList({ commissions }: RecentCommissionsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Commissions</CardTitle>
        <CardDescription>
          Latest commission earnings (last 10)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {commissions.map((commission) => (
            <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">
                  {commission.affiliate.user.name || 'Anonymous'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {commission.courseTitle || 'Course Purchase'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(commission.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right space-y-1">
                <div className="text-lg font-bold text-green-600">
                  ₹{commission.amount.toFixed(2)}
                </div>
                <Badge
                  variant={
                    commission.status === 'PAID' ? 'default' :
                    commission.status === 'PENDING' ? 'secondary' : 'destructive'
                  }
                  className="text-xs"
                >
                  {commission.status}
                </Badge>
              </div>
            </div>
          ))}

          {commissions.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No recent commissions
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
