import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { redirect } from "next/navigation"
import { prisma } from "./prisma"
import { UserRole } from "@prisma/client"

export async function getCurrentUser() {
  try {
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
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function requireAuth() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    // Instead of redirecting, just return null to allow guest access
    return null
  }

  return session
}

export async function getSessionUserData() {
  const user = await getCurrentUser()

  if (!user) {
    // Return a guest user object for non-authenticated users
    return {
      id: "guest",
      name: "Guest User",
      email: null,
      image: null,
      role: "GUEST"
    }
  }

  return user
}

export async function requireRole(requiredRole: UserRole) {
  const user = await getSessionUserData()

  if (user.role !== requiredRole) {
    // For guest users, don't redirect, just return the guest user
    if (user.role === "GUEST") {
      return user
    }
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

export async function isGuest() {
  const user = await getSessionUserData()
  return user.role === "GUEST"
}

export async function getCollegeToken(): Promise<string | null> {
  // For server-side, we need to get the token from cookies or headers
  // Since college tokens are stored in localStorage on client side,
  // we'll need to pass them via headers in API calls
  // This function is mainly used in server components that make API calls
  return null // Will be overridden by client-side headers
}