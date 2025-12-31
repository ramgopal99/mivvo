import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { UserDetailsPage } from "./_components/user-details-page"

interface PageProps {
  params: {
    userId: string
  }
}

export default async function UserDetailsRoute({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  const { userId } = await params

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN')) {
    notFound()
  }

  return <UserDetailsPage userId={userId} />
}
