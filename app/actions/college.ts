"use server"

import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"
import bcrypt from "bcryptjs"

export async function createCollegeWithAdmin(data: {
  collegeName: string
  collegeId: string
  description?: string
  location?: string
  website?: string
  phone?: string
  establishedYear?: number
  monthlyRatePerUser: number
  adminName: string
  adminEmail: string
  adminPassword: string
}) {
  try {
    // Check if college ID already exists
    const existingCollege = await prisma.college.findUnique({
      where: { collegeId: data.collegeId }
    })

    if (existingCollege) {
      return { success: false, error: "College ID already exists" }
    }

    // Check if admin email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.adminEmail }
    })

    if (existingUser) {
      return { success: false, error: "Admin email already exists" }
    }

    // Hash the admin password
    const hashedPassword = await bcrypt.hash(data.adminPassword, 10)

    // Create college and admin user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the college
      const college = await tx.college.create({
        data: {
          collegeId: data.collegeId,
          name: data.collegeName,
          description: data.description,
          location: data.location,
          website: data.website,
          phone: data.phone,
          establishedYear: data.establishedYear,
          isActive: true,
          monthlyRatePerUser: data.monthlyRatePerUser,
          billingCycle: "monthly",
          nextBillingDate: null, // Will be set when college makes first payment
          lastBillingAmount: 0,
        }
      })

      // Create the college admin user
      const adminUser = await tx.user.create({
        data: {
          name: data.adminName,
          email: data.adminEmail,
          password: hashedPassword, // Keep regular password for potential future use
          collegeAdminPassword: hashedPassword, // Store in collegeAdminPassword for auth
          role: UserRole.COLLEGE_ADMIN,
          status: 'ACTIVE',
          collegeId: college.id, // Associate admin with the college
          collegeName: data.collegeName,
          collegeAdminId: data.collegeId,
          emailVerified: new Date(),
        }
      })

      return { college, adminUser }
    })

    return {
      success: true,
      data: {
        college: result.college,
        adminUser: result.adminUser
      }
    }
  } catch (error) {
    console.error('Error creating college with admin:', error)
    return { success: false, error: "Failed to create college and admin user" }
  }
}

export async function getAllColleges() {
  try {
    const colleges = await prisma.college.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            emailVerified: true,
            createdAt: true,
            studentEnrollment: {
              select: {
                isActive: true,
                expirationDate: true,
                enrollmentMonths: true,
                paymentStatus: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, data: colleges }
  } catch (error) {
    console.error('Error fetching colleges:', error)
    return { success: false, error: "Failed to fetch colleges" }
  }
}

export async function updateCollege(collegeId: string, data: {
  collegeName: string
  collegeId: string
  description?: string
  location?: string
  website?: string
  phone?: string
  establishedYear?: number
  monthlyRatePerUser: number
}) {
  try {
    // Check if the new college ID already exists (if changed)
    if (data.collegeId !== collegeId) {
      const existingCollege = await prisma.college.findUnique({
        where: { collegeId: data.collegeId }
      })

      if (existingCollege) {
        return { success: false, error: "College ID already exists" }
      }
    }

    // Update the college
    const updatedCollege = await prisma.college.update({
      where: { id: collegeId },
      data: {
        collegeId: data.collegeId,
        name: data.collegeName,
        description: data.description,
        location: data.location,
        website: data.website,
        phone: data.phone,
        establishedYear: data.establishedYear,
        monthlyRatePerUser: data.monthlyRatePerUser,
        updatedAt: new Date(),
      }
    })

    return { success: true, data: updatedCollege }
  } catch (error) {
    console.error('Error updating college:', error)
    return { success: false, error: "Failed to update college" }
  }
}

export async function getCollegeById(collegeId: string) {
  try {
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            emailVerified: true,
            createdAt: true,
          }
        }
      }
    })

    if (!college) {
      return { success: false, error: "College not found" }
    }

    return { success: true, data: college }
  } catch (error) {
    console.error('Error fetching college:', error)
    return { success: false, error: "Failed to fetch college" }
  }
}

export async function deleteCollege(collegeId: string) {
  try {
    // First check if college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      include: {
        users: true
      }
    })

    if (!college) {
      return { success: false, error: "College not found" }
    }

    // Delete college and all associated users
    await prisma.$transaction(async (tx) => {
      // Delete all users associated with this college
      await tx.user.deleteMany({
        where: { collegeId: collegeId }
      })

      // Delete the college
      await tx.college.delete({
        where: { id: collegeId }
      })
    })

    return {
      success: true,
      message: `College and ${college.users.length} associated users deleted successfully`
    }
  } catch (error) {
    console.error('Error deleting college:', error)
    return { success: false, error: "Failed to delete college" }
  }
}
