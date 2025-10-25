import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserRole } from "@prisma/client"
import { Shield, Mail, User, Calendar, GraduationCap } from "lucide-react"

interface ProfileDetailsProps {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: UserRole
    college?: {
      id: string
      name: string
      collegeId: string
    }
  }
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'SUPERADMIN':
        return <Shield className="h-4 w-4 text-primary" />
      case 'USER':
        return <User className="h-4 w-4 text-primary" />
      default:
        return <User className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className={`grid ${user.college ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
      {/* Account Information */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Account Information
          </CardTitle>
          <CardDescription>
            Your authentication and account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">User ID</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {user.id.slice(0, 8)}...{user.id.slice(-8)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Full Name</p>
                <p className="text-sm text-muted-foreground">{user.name || "Not set"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Account Status
          </CardTitle>
          <CardDescription>
            Your account permissions and status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Role</p>
                <div className="flex items-center gap-2 mt-1">
                  {getRoleIcon(user.role || UserRole.USER)}
                  <Badge variant={user.role === 'SUPERADMIN' ? 'destructive' : 'secondary'}>
                    {user.role === 'SUPERADMIN' ? 'Super Admin' : 'User'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Provider</p>
                <p className="text-sm text-muted-foreground">
                  {user.college ? "College Authentication" : "Google OAuth"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Account Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* College Information - Only show for college students */}
      {user.college && (
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              College Information
            </CardTitle>
            <CardDescription>
              Your college and academic details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">College Name</p>
                  <p className="text-sm text-muted-foreground">{user.college.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">College ID</p>
                  <p className="text-sm text-muted-foreground font-mono">{user.college.collegeId}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
