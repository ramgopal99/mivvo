import { redirect } from "next/navigation"
import { getAdminUsers } from "@/app/actions/user"
import { AdminUsersClient } from "./_components/client"

export default async function AdminUsersPage() {
  // Fetch users from database
  const result = await getAdminUsers()

  if (!result.success) {
    // If not authorized or error, redirect to dashboard
    redirect("/dashboard")
  }

  const users = result.users || []

  return <AdminUsersClient initialUsers={users} />
}
