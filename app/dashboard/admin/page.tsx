import { getAllUsers } from "@/app/actions/user"
import { requireRole } from "@/app/lib/session"
import { UserRole } from "@prisma/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserManagement } from "./user-management"

export default async function AdminPage() {
  // This will redirect if not SUPERADMIN
  await requireRole(UserRole.SUPERADMIN)

  const result = await getAllUsers()

  if (!result.success) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-red-600">Error loading users: {result.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage users and system settings
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View and manage all registered users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.users?.map((user) => (
                  <Card key={user.id} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold truncate">{user.name || "No name"}</h4>
                        <Badge
                          variant={user.role === UserRole.SUPERADMIN ? "destructive" : "default"}
                          className="text-xs"
                        >
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      <div className="text-xs text-muted-foreground">
                        Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                      </div>
                      <div className="flex items-center text-xs">
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          user.emailVerified ? "bg-green-500" : "bg-yellow-500"
                        }`} />
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <UserManagement users={result.users || []} />
      </div>
    </div>
  )
}
