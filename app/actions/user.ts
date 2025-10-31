"use server"

import { prisma } from "../../lib/prisma"
import { requireRole } from "../../lib/session"
import { UserRole } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateUserRole(userId: string, role: UserRole) {
  // Only SUPERADMIN can update roles
  await requireRole(UserRole.SUPERADMIN)

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    revalidatePath("/dashboard/admin")
    return { success: true, user: updatedUser }
  } catch {
    return { success: false, error: "Failed to update user role" }
  }
}

export async function getAllUsers() {
  // Only SUPERADMIN can view all users
  await requireRole(UserRole.SUPERADMIN)

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        image: true,
        collegeName: true,
        sessions: {
          select: {
            expires: true,
          },
          orderBy: {
            expires: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, users }
  } catch {
    return { success: false, error: "Failed to fetch users" }
  }
}

export async function getAdminUsers() {
  // Only SUPERADMIN can view all users
  await requireRole(UserRole.SUPERADMIN)

  try {
    const dbUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        image: true,
        collegeName: true,
        sessions: {
          select: {
            expires: true,
          },
          orderBy: {
            expires: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transform database users to AdminUser format
    const adminUsers = dbUsers.map(user => {
      // Map database role to UI role format
      let role: 'user' | 'college_admin' | 'super_admin' = 'user'
      switch (user.role) {
        case UserRole.SUPERADMIN:
          role = 'super_admin'
          break
        case UserRole.COLLEGE_ADMIN:
          role = 'college_admin'
          break
        case UserRole.USER:
        case UserRole.COLLEGE_STUDENT:
          role = 'user'
          break
      }

      // Determine status based on email verification and activity
      let status: 'active' | 'inactive' | 'suspended' = 'inactive'
      if (user.emailVerified) {
        status = 'active' // Consider verified users as active
      }

      // Get last login from most recent session
      const lastLogin = user.sessions.length > 0
        ? user.sessions[0].expires.toISOString()
        : user.createdAt?.toISOString() || new Date().toISOString()

      // Calculate total logins (number of sessions)
      const totalLogins = user.sessions.length

      return {
        id: user.id,
        name: user.name || user.email.split('@')[0], // Use email prefix if no name
        email: user.email,
        avatar: user.image || undefined,
        role,
        status,
        collegeName: user.collegeName || undefined,
        lastLogin,
        createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
        totalLogins,
      }
    })

    return { success: true, users: adminUsers }
  } catch (error) {
    console.error('Error fetching admin users:', error)
    return { success: false, error: "Failed to fetch users" }
  }
}
