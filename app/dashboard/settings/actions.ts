"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { UserData, CollegeData, ServerActionResponse } from "./types"
import { getSessionUserData } from "@/lib/session"

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
        role: true,
        image: true,
        createdAt: true,
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        jobTitle: true,
        company: true,
        location: true,
        bio: true,
        careerGoals: true,
        linkedIn: true,
        github: true,
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true,
        userType: true,
        rollNumber: true,
        branch: true,
        course: true,
        courseDuration: true,
        year: true,
        // College relationship
        college: {
          select: {
            id: true,
            name: true,
            collegeId: true
          }
        }
      }
    })

    if (!userProfile) {
      return {
        success: false,
        error: "User profile not found"
      }
    }

    // Extract first and last name from Google session data if not stored in DB
    let firstName = userProfile.firstName
    let lastName = userProfile.lastName

    if (!firstName && !lastName && userProfile.name) {
      const fullName = userProfile.name.trim()
      const nameParts = fullName.split(' ')

      if (nameParts.length === 1) {
        firstName = nameParts[0]
        lastName = ""
      } else if (nameParts.length >= 2) {
        firstName = nameParts[0]
        lastName = nameParts.slice(1).join(' ')
      }
    }

    const userData: UserData = {
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
      image: userProfile.image,
      createdAt: userProfile.createdAt || new Date(),
      firstName,
      lastName,
      phone: userProfile.phone,
      dateOfBirth: userProfile.dateOfBirth,
      jobTitle: userProfile.jobTitle,
      company: userProfile.company,
      location: userProfile.location,
      bio: userProfile.bio,
      // SaaS platform fields
      careerGoals: userProfile.careerGoals,
      linkedIn: userProfile.linkedIn,
      github: userProfile.github,
      totalCreditAllocation: userProfile.totalCreditAllocation || undefined,
      usedCredits: userProfile.usedCredits,
      creditResetAt: userProfile.creditResetAt,
      userType: userProfile.userType,
      // Academic fields
      rollNumber: userProfile.rollNumber,
      branch: userProfile.branch,
      course: userProfile.course,
      courseDuration: userProfile.courseDuration,
      year: userProfile.year,
      // College information
      college: userProfile.college
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

export async function updateUserDetails(formData: FormData, userId?: string): Promise<ServerActionResponse<UserData>> {
  try {
    let user = null

    if (userId) {
      // For college students or when userId is explicitly provided
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true
        }
      })
    } else {
      // For regular NextAuth users
      user = await getSessionUserData()
    }

    if (!user || user.id === "guest") {
      return {
        success: false,
        error: "User not authenticated"
      }
    }

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = formData.get("phone") as string
    const dateOfBirth = formData.get("dateOfBirth") as string
    const jobTitle = formData.get("jobTitle") as string
    const company = formData.get("company") as string
    const location = formData.get("location") as string
    const bio = formData.get("bio") as string
    const careerGoals = formData.get("careerGoals") as string
    const linkedIn = formData.get("linkedIn") as string
    const github = formData.get("github") as string
    const rollNumber = formData.get("rollNumber") as string
    const branch = formData.get("branch") as string
    const course = formData.get("course") as string
    const courseDuration = formData.get("courseDuration") as string
    const year = formData.get("year") as string

    // Update user profile data in database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: `${firstName || ""} ${lastName || ""}`.trim() || user.name,
        firstName,
        lastName,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        jobTitle,
        company,
        location,
        bio,
        // SaaS platform fields
        careerGoals,
        linkedIn,
        github,
        // Academic fields
        rollNumber,
        branch,
        course,
        courseDuration,
        year
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        firstName: true,
        lastName: true,
        phone: true,
        dateOfBirth: true,
        jobTitle: true,
        company: true,
        location: true,
        bio: true,
        // SaaS platform fields
        careerGoals: true,
        linkedIn: true,
        github: true,
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true,
        // Academic fields
        rollNumber: true,
        branch: true,
        course: true,
        courseDuration: true,
        year: true,
        // College relationship
        college: {
          select: {
            id: true,
            name: true,
            collegeId: true
          }
        }
      }
    })

    const userData: UserData = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      createdAt: updatedUser.createdAt,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone,
      dateOfBirth: updatedUser.dateOfBirth,
      jobTitle: updatedUser.jobTitle,
      company: updatedUser.company,
      location: updatedUser.location,
      bio: updatedUser.bio,
      // SaaS platform fields
      careerGoals: updatedUser.careerGoals,
      linkedIn: updatedUser.linkedIn,
      github: updatedUser.github,
      totalCreditAllocation: updatedUser.totalCreditAllocation || undefined,
      usedCredits: updatedUser.usedCredits,
      creditResetAt: updatedUser.creditResetAt,
      // Academic fields
      rollNumber: updatedUser.rollNumber,
      branch: updatedUser.branch,
      course: updatedUser.course,
      courseDuration: updatedUser.courseDuration,
      year: updatedUser.year,
      // College information
      college: updatedUser.college
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

export async function updatePassword(): Promise<ServerActionResponse> {
  try {

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

export async function getAllColleges(): Promise<ServerActionResponse<CollegeData[]>> {
  try {
    const colleges = await prisma.college.findMany({
      select: {
        id: true,
        collegeId: true,
        name: true,
        description: true,
        location: true,
        website: true,
        phone: true,
        establishedYear: true,
        isActive: true,
        maxStudents: true,
        currentStudents: true,
        monthlyRatePerUser: true,
        billingCycle: true,
        nextBillingDate: true,
        lastBillingAmount: true,
        createdAt: true,
        updatedAt: true,
        // Include admin users (users with COLLEGE_ADMIN role)
        users: {
          where: {
            role: "COLLEGE_ADMIN"
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      success: true,
      data: colleges
    }
  } catch (error) {
    console.error("Error fetching colleges:", error)
    return {
      success: false,
      error: "Failed to fetch colleges"
    }
  }
} 