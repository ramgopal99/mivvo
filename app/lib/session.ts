import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { redirect } from "next/navigation"
import { prisma } from "../../lib/prisma"
import { UserRole } from "@prisma/client"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  // Get user with role from database
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  })

  if (!dbUser) {
    return null
  }

  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    image: dbUser.image,
    role: dbUser.role,
  }
}

export async function requireAuth() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/")
  }

  return session
}

export async function getSessionUserData() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  return user
}

export async function requireRole(requiredRole: UserRole) {
  const user = await getSessionUserData()

  if (user.role !== requiredRole) {
    redirect("/dashboard")
  }

  return user
}

export async function hasRole(requiredRole: UserRole) {
  try {
    const user = await getSessionUserData()
    return user.role === requiredRole
  } catch {
    return false
  }
}

export async function isSuperAdmin() {
  return hasRole(UserRole.SUPERADMIN)
}

export async function isUser() {
  return hasRole(UserRole.USER)
}
