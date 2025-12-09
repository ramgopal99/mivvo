import { redirect } from "next/navigation"
import { getFilteredAdminUsers } from "@/app/actions/user"
import { AdminUsersClient } from "./_components/client"

// Force dynamic rendering since this page uses server actions with authentication
export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  // Fetch initial users from database with pagination
  const result = await getFilteredAdminUsers({
    page: 1,
    limit: 5
  })

  if (!result.success) {
    // If not authorized or error, redirect to dashboard
    redirect("/dashboard")
  }

  const users = result.users || []

  return <AdminUsersClient initialUsers={users} />
}
