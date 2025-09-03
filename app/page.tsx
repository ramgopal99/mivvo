import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@/components/auth/sign-in-button"
import { getCurrentUser } from "@/app/lib/session"
import Link from "next/link"

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Mivvo</h1>
        <p className="text-xl text-muted-foreground">
          {user
            ? `Welcome back, ${user.name}!`
            : "A Next.js application with NextAuth, Prisma, and Google OAuth"
          }
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {user ? (
          // Authenticated user view
          <>
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Access</CardTitle>
                <CardDescription>
                  Access your personalized dashboard and account management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/dashboard">
                  <Button className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span>👤</span>
                    <span>Logged in as: {user.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span>📧</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Account</CardTitle>
                <CardDescription>
                  Manage your profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Profile Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Account Settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Security & Privacy</span>
                </div>
                {user.role === 'SUPERADMIN' && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Admin Panel Access</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          // Non-authenticated user view
          <>
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                  Sign in with your Google account to access protected features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignInButton />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>
                  This app demonstrates modern authentication patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>NextAuth.js integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Prisma ORM with MongoDB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Shadcn UI components</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Server Actions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Role-based Access Control</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Dark/Light Theme</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
