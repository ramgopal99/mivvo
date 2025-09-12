"use server"

import { prisma } from "../../lib/prisma"
import { requireRole } from "../lib/session"
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
