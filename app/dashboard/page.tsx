import { requireAuth, getSessionUserData } from "@/app/lib/session"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function Dashboard() {
  // This will automatically redirect if not authenticated
  await requireAuth()

  // Get user data using our session utility
  const user = await getSessionUserData()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-xl text-muted-foreground">
          Welcome back, {user.name}!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>User ID:</strong> {user.id}
            </div>
            <div>
              <strong>Role:</strong>
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                user.role === 'SUPERADMIN'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {user.role}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Navigate to different sections of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/dashboard/profile"
              className="block p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">View Profile</h4>
                  <p className="text-sm text-muted-foreground">Manage your account information</p>
                </div>
                <span className="text-muted-foreground">→</span>
              </div>
            </Link>
            <Link
              href="/dashboard/settings"
              className="block p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Settings</h4>
                  <p className="text-sm text-muted-foreground">Configure your preferences</p>
                </div>
                <span className="text-muted-foreground">→</span>
              </div>
            </Link>
            {user.role === 'SUPERADMIN' && (
              <Link
                href="/dashboard/admin"
                className="block p-3 border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors border-red-200 hover:border-red-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-600">Admin Panel</h4>
                    <p className="text-sm text-muted-foreground">Manage users and system settings</p>
                  </div>
                  <span className="text-muted-foreground">→</span>
                </div>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
