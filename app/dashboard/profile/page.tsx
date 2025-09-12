import { getSessionUserData } from "@/app/lib/session"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const user = await getSessionUserData()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Your profile avatar
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || ""} alt={user.name || ""} />
              <AvatarFallback className="text-lg">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>
              Your account information from Google OAuth
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">User ID:</span>
              <span className="text-sm text-muted-foreground font-mono">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Email:</span>
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Name:</span>
              <span className="text-sm text-muted-foreground">{user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Provider:</span>
              <span className="text-sm text-muted-foreground">Google OAuth</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Role:</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                user.role === 'SUPERADMIN'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {user.role}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
