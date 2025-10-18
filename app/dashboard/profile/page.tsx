import { getSessionUserData } from "@/lib/session"
import { ProfileHeader, ProfileDetails } from "./_components"
import { UserRole } from "@prisma/client"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const userData = await getSessionUserData()

  // Ensure role is always a UserRole enum value
  const user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: UserRole
  } = {
    ...userData,
    role: userData.role === "GUEST" ? UserRole.USER : userData.role as UserRole
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto space-y-8 py-8 px-4">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Profile
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View and manage your account information and preferences.
          </p>
        </div>

        {/* Profile Header Component */}
        <ProfileHeader user={user} />

        {/* Profile Details Component */}
        <ProfileDetails user={user} />
      </div>
    </div>
  )
}
