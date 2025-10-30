import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { UserRole } from "@prisma/client"

interface ProfileHeaderProps {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: UserRole
  }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPERADMIN:
        return 'destructive'
      case UserRole.COLLEGE_ADMIN:
        return 'default'
      case UserRole.COLLEGE_ADMIN_STUDENT:
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPERADMIN:
        return 'Super Admin'
      case UserRole.COLLEGE_ADMIN:
        return 'College'
      case UserRole.COLLEGE_ADMIN_STUDENT:
        return 'College Student'
      default:
        return role
    }
  }

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Avatar */}
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-medium">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user.name || "User"}
              </h1>
              <p className="text-muted-foreground">
                {user.email}
              </p>
            </div>

            {/* Role Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge variant={getRoleBadgeVariant(user.role || UserRole.USER)}>
                {getRoleLabel(user.role || UserRole.USER)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
