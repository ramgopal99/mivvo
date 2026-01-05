import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserDetails {
  id: string
  name: string
  email: string
  role: string
  status: string
  userType: string
  totalLogins: number
  collegeName?: string
  createdAt: string
  lastLogin: string
}

interface UserBasicInfoProps {
  userDetails: UserDetails
}

export function UserBasicInfo({ userDetails }: UserBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-sm">{userDetails.name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-sm">{userDetails.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Role</label>
            <Badge variant={userDetails.role === 'super_admin' ? 'destructive' : 'secondary'}>
              {userDetails.role.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <Badge variant={userDetails.status === 'active' ? 'default' : 'secondary'}>
              {userDetails.status}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">User Type</label>
            <Badge variant={userDetails.userType === 'PRO' ? 'default' : 'outline'}>
              {userDetails.userType}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Total Logins</label>
            <p className="text-sm">{userDetails.totalLogins || 0}</p>
          </div>
        </div>
        {userDetails.collegeName && (
          <div>
            <label className="text-sm font-medium text-gray-500">College</label>
            <p className="text-sm">{userDetails.collegeName}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Created At</label>
            <p className="text-sm">{new Date(userDetails.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Last Login</label>
            <p className="text-sm">{new Date(userDetails.lastLogin).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
