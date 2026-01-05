import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UserInterview {
  id: string
  title: string
  status: string
  attempts: number
}

interface UserDetails {
  interviews: UserInterview[]
  createdAt: string
  lastLogin: string
  totalLogins: number
}

interface UserActivityProps {
  userDetails: UserDetails
  interviews: UserInterview[]
}

export function UserActivity({ userDetails, interviews }: UserActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">User Activity</CardTitle>
        <CardDescription>
          Recent activity and engagement metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border rounded">
            <label className="text-sm font-medium text-gray-500">Total Interviews</label>
            <p className="text-2xl font-bold">{interviews?.length || 0}</p>
          </div>
          <div className="p-3 border rounded">
            <label className="text-sm font-medium text-gray-500">Account Age</label>
            <p className="text-lg font-medium">
              {Math.floor((Date.now() - new Date(userDetails.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium">Recent Activity</h4>
          <div className="text-sm text-gray-600">
            <p>• Account created: {new Date(userDetails.createdAt).toLocaleDateString()}</p>
            <p>• Last login: {new Date(userDetails.lastLogin).toLocaleDateString()}</p>
            <p>• Total logins: {userDetails.totalLogins || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
