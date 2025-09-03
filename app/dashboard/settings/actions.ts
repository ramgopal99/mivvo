"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { UserData, ServerActionResponse } from "./types"
import { getSessionUserData } from "@/app/lib/session"

export async function getUserDetails(): Promise<ServerActionResponse<UserData>> {
  try {
    const user = await getSessionUserData()

    // Get additional user profile data from database
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        // Add additional fields if they exist in your schema
        // firstName: true,
        // lastName: true,
        // phone: true,
        // dateOfBirth: true,
        // jobTitle: true,
        // company: true,
        // location: true,
        // bio: true
      }
    })

    if (!userProfile) {
      return {
        success: false,
        error: "User profile not found"
      }
    }

    const userData: UserData = {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      image: userProfile.image,
      createdAt: userProfile.createdAt || new Date(), // Fallback for existing users without createdAt
      firstName: null, // Add these fields to your Prisma schema if needed
      lastName: null,
      phone: null,
      dateOfBirth: null,
      jobTitle: null,
      company: null,
      location: null,
      bio: null
    }

    return {
      success: true,
      data: userData
    }
  } catch (error) {
    console.error("Error fetching user details:", error)
    return {
      success: false,
      error: "Failed to fetch user details"
    }
  }
}

export async function updateUserDetails(formData: FormData): Promise<ServerActionResponse<UserData>> {
  try {
    const user = await getSessionUserData()

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = formData.get("phone") as string
    const dateOfBirth = formData.get("dateOfBirth") as string
    const jobTitle = formData.get("jobTitle") as string
    const company = formData.get("company") as string
    const location = formData.get("location") as string
    const bio = formData.get("bio") as string

    // Update user profile data in database
    // Note: You'll need to add these fields to your Prisma schema first
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: `${firstName || ""} ${lastName || ""}`.trim() || user.name,
        // Add these fields to your Prisma schema if you want to store them:
        // firstName,
        // lastName,
        // phone,
        // dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        // jobTitle,
        // company,
        // location,
        // bio
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      }
    })

    const userData: UserData = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      createdAt: updatedUser.createdAt,
      firstName: firstName || null,
      lastName: lastName || null,
      phone: phone || null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      jobTitle: jobTitle || null,
      company: company || null,
      location: location || null,
      bio: bio || null
    }

    revalidatePath("/dashboard/settings")

    return {
      success: true,
      data: userData
    }
  } catch (error) {
    console.error("Error updating user details:", error)
    return {
      success: false,
      error: "Failed to update user details"
    }
  }
}

export async function updatePassword(formData: FormData): Promise<ServerActionResponse> {
  try {
    const user = await getSessionUserData()

    // Note: OAuth users (like Google) don't have passwords
    // This function is here for compatibility but won't work for OAuth users
    // You might want to implement email/password change for non-OAuth users

    revalidatePath("/dashboard/settings")

    return {
      success: false,
      error: "Password change not supported for OAuth accounts. Please use your OAuth provider to manage your password."
    }
  } catch (error) {
    console.error("Error updating password:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update password"
    }
  }
}

export async function deleteAccount(): Promise<ServerActionResponse> {
  try {
    const user = await getSessionUserData()

    // Delete user account and all related data
    await prisma.user.delete({
      where: { id: user.id }
    })

    return {
      success: true,
      message: "Account deleted successfully"
    }
  } catch (error) {
    console.error("Error deleting account:", error)
    return {
      success: false,
      error: "Failed to delete account"
    }
  }
} 