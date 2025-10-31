import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function RedirectPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  // Check user role and redirect accordingly
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  }).catch((error) => {
    console.error('Error checking user role for redirect:', error)
    return null
  })

  if (user?.role === 'SUPERADMIN') {
    redirect("/admin/dashboard")
  } else {
    redirect("/dashboard")
  }
}
