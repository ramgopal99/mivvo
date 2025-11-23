"use server"

import { prisma } from "@/lib/prisma"
import { requireRole, getSessionUserData } from "@/lib/session"
import { UserRole, Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

interface ServerActionResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

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
        status: true,
        emailVerified: true,
        createdAt: true,
        image: true,
        collegeName: true,
        collegeAdminId: true,
        suspendedAt: true,
        suspendedBy: true,
        suspendReason: true,
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

      // Use database status with fallback to activity-based logic
      let status: 'active' | 'inactive' | 'suspended' = 'inactive'

      if (user.status === 'SUSPENDED') {
        status = 'suspended'
      } else if (user.status === 'ACTIVE') {
        status = 'active'
      } else {
        // Fallback to activity-based logic for legacy data
        const now = new Date()
        const lastActivity = user.sessions.length > 0
          ? new Date(user.sessions[0].expires)
          : new Date(user.createdAt || now)

        const daysSinceActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
        const isRecentlyActive = daysSinceActivity <= 30
        status = isRecentlyActive ? 'active' : 'inactive'
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
        collegeAdminId: user.collegeAdminId || undefined,
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

export async function getAdminUsersStats() {
  // Only SUPERADMIN can view user stats
  await requireRole(UserRole.SUPERADMIN)

  try {
    // Get counts for each status using activity-based logic
    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      suspendedUsers,
      superAdmins
    ] = await Promise.all([
      // Total users count
      prisma.user.count(),

      // Active users (status = ACTIVE or recently active based on sessions)
      prisma.user.count({
        where: {
          OR: [
            { status: 'ACTIVE' },
            {
              status: { not: 'SUSPENDED' },
              sessions: {
                some: {
                  expires: {
                    gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
                  }
                }
              }
            }
          ]
        }
      }),

      // Inactive users (not suspended, not active, no recent activity)
      prisma.user.count({
        where: {
          AND: [
            { status: { not: 'SUSPENDED' } },
            { status: { not: 'ACTIVE' } },
            {
              OR: [
                { sessions: { none: {} } },
                {
                  sessions: {
                    every: {
                      expires: {
                        lte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      }),

      // Suspended users
      prisma.user.count({
        where: {
          status: 'SUSPENDED'
        }
      }),

      // Super admins count
      prisma.user.count({
        where: {
          role: 'SUPERADMIN'
        }
      })
    ])

    return {
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        suspendedUsers,
        superAdmins
      }
    }
  } catch (error) {
    console.error('Error fetching admin users stats:', error)
    return { success: false, error: "Failed to fetch user stats" }
  }
}

export async function createCollegeAdmin(data: {
  name: string
  email: string
  collegeAdminId: string
  password: string
  collegeName?: string
  collegeId?: string
}) {
  // Only SUPERADMIN can create college admins
  await requireRole(UserRole.SUPERADMIN)

  try {
    // Check if collegeAdminId is unique
    const existingAdmin = await prisma.user.findFirst({
      where: { collegeAdminId: data.collegeAdminId }
    })

    if (existingAdmin) {
      return { success: false, error: "College Admin ID already exists" }
    }

    // Check if email is unique
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return { success: false, error: "Email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)

    const collegeAdmin = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: UserRole.COLLEGE_ADMIN,
        collegeAdminId: data.collegeAdminId,
        collegeAdminPassword: hashedPassword,
        collegeName: data.collegeName,
        collegeId: data.collegeId,
        emailVerified: new Date(), // Auto-verify college admin emails
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        collegeAdminId: true,
        collegeName: true,
        createdAt: true,
      },
    })

    revalidatePath("/admin/dashboard/users")
    return { success: true, user: collegeAdmin }
  } catch (error) {
    console.error('Error creating college admin:', error)
    return { success: false, error: "Failed to create college admin" }
  }
}

export async function updateCollegeAdmin(userId: string, data: {
  name?: string
  email?: string
  collegeAdminId?: string
  password?: string
  collegeName?: string
  collegeId?: string
}) {
  // Only SUPERADMIN can update college admins
  await requireRole(UserRole.SUPERADMIN)

  try {
    // Create update data (using any for custom fields that exist in schema but not in generated types)
    const updateData: Prisma.UserUpdateInput & {
      collegeId?: string
      collegeAdminPassword?: string
    } = {}

    if (data.name) updateData.name = data.name
    if (data.email) updateData.email = data.email
    if (data.collegeAdminId) updateData.collegeAdminId = data.collegeAdminId
    if (data.collegeName) updateData.collegeName = data.collegeName
    if (data.collegeId) updateData.collegeId = data.collegeId

    // Hash password if provided
    if (data.password) {
      updateData.collegeAdminPassword = await bcrypt.hash(data.password, 12)
    }

    // Check uniqueness constraints if email or collegeAdminId are being updated
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: userId }
        }
      })
      if (existingUser) {
        return { success: false, error: "Email already exists" }
      }
    }

    if (data.collegeAdminId) {
      const existingAdmin = await prisma.user.findFirst({
        where: {
          collegeAdminId: data.collegeAdminId,
          id: { not: userId }
        }
      })
      if (existingAdmin) {
        return { success: false, error: "College Admin ID already exists" }
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData as Prisma.UserUpdateInput,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        collegeAdminId: true,
        collegeName: true,
        createdAt: true,
      },
    })

    revalidatePath("/admin/dashboard/users")
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Error updating college admin:', error)
    return { success: false, error: "Failed to update college admin" }
  }
}

export async function getCollegeAdmins() {
  // Only SUPERADMIN can view college admins
  await requireRole(UserRole.SUPERADMIN)

  try {
    const collegeAdmins = await prisma.user.findMany({
      where: { role: UserRole.COLLEGE_ADMIN },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        collegeAdminId: true,
        collegeName: true,
        collegeId: true,
        emailVerified: true,
        createdAt: true,
        college: {
          select: {
            id: true,
            collegeId: true,
            name: true,
            isActive: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return { success: true, users: collegeAdmins }
  } catch (error) {
    console.error('Error fetching college admins:', error)
    return { success: false, error: "Failed to fetch college admins" }
  }
}

export async function getFilteredAdminUsers(filters: {
  searchTerm?: string
  role?: string
  status?: string
  college?: string
  page?: number
  limit?: number
}) {
  // Only SUPERADMIN can view all users
  await requireRole(UserRole.SUPERADMIN)

  try {
    const {
      searchTerm = "",
      role = "all",
      status = "all",
      college = "all",
      page = 1,
      limit = 50
    } = filters

    const skip = (page - 1) * limit

    // Build where clause for efficient database filtering
    const where: Prisma.UserWhereInput = {}

    // Always exclude COLLEGE_ADMIN and COLLEGE_STUDENT roles from admin users view
    where.role = {
      in: [UserRole.USER, UserRole.SUPERADMIN]
    }

    // Role filter with proper mapping (only for USER and SUPERADMIN roles)
    if (role !== "all") {
      let dbRole: UserRole
      switch (role) {
        case "super_admin":
          dbRole = UserRole.SUPERADMIN
          break
        case "user":
          dbRole = UserRole.USER
          break
        default:
          dbRole = UserRole.USER
      }
      where.role = dbRole
    }

    // Search filter (name or email)
    if (searchTerm.trim()) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } }
      ]
    }

    // Status filter using activity-based logic (last 30 days)
    if (status !== "all") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      if (status === "active") {
        // Active: either explicitly ACTIVE status OR recent session activity
        const existingOR = Array.isArray(where.OR) ? where.OR : []
        where.OR = [
          ...existingOR,
          { status: 'ACTIVE' },
          {
            sessions: {
              some: {
                expires: {
                  gt: thirtyDaysAgo
                }
              }
            }
          }
        ]
      } else if (status === "inactive") {
        // Inactive: not suspended AND no recent activity AND not explicitly ACTIVE
        const existingAND = Array.isArray(where.AND) ? where.AND : []
        where.AND = [
          ...existingAND,
          { status: { not: 'SUSPENDED' } },
          { status: { not: 'ACTIVE' } },
          {
            OR: [
              { sessions: { none: {} } },
              {
                sessions: {
                  every: {
                    expires: {
                      lte: thirtyDaysAgo
                    }
                  }
                }
              }
            ]
          }
        ]
      } else if (status === "suspended") {
        where.status = 'SUSPENDED'
      }
    }

    // College filter
    if (college !== "all") {
      where.collegeName = { contains: college, mode: 'insensitive' }
    }

    // Get total count for pagination
    const totalCount = await prisma.user.count({ where })

    // Get filtered users with pagination
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        image: true,
        collegeName: true,
        collegeAdminId: true,
        suspendedAt: true,
        suspendedBy: true,
        suspendReason: true,
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
      skip,
      take: limit,
    })

    // Transform to AdminUser format
    const adminUsers = users.map(user => {
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

      // Use database status with fallback to activity-based logic
      let status: 'active' | 'inactive' | 'suspended' = 'inactive'

      if (user.status === 'SUSPENDED') {
        status = 'suspended'
      } else if (user.status === 'ACTIVE') {
        status = 'active'
      } else {
        // Fallback to activity-based logic for legacy data
        const now = new Date()
        const lastActivity = user.sessions.length > 0
          ? new Date(user.sessions[0].expires)
          : new Date(user.createdAt || now)

        const daysSinceActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
        const isRecentlyActive = daysSinceActivity <= 30
        status = isRecentlyActive ? 'active' : 'inactive'
      }

      // Get last login from most recent session
      const lastLogin = user.sessions.length > 0
        ? user.sessions[0].expires.toISOString()
        : user.createdAt?.toISOString() || new Date().toISOString()

      // Calculate total logins (number of sessions)
      const totalLogins = user.sessions.length

      return {
        id: user.id,
        name: user.name || user.email.split('@')[0],
        email: user.email,
        avatar: user.image || undefined,
        role,
        status,
        collegeName: user.collegeName || undefined,
        collegeAdminId: user.collegeAdminId || undefined,
        lastLogin,
        createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
        totalLogins,
      }
    })

    return {
      success: true,
      users: adminUsers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page * limit < totalCount,
        hasPrevPage: page > 1,
      }
    }
  } catch (error) {
    console.error('Error fetching filtered admin users:', error)
    return { success: false, error: "Failed to fetch users" }
  }
}

export async function exportUsersToCSV(filters: {
  searchTerm?: string
  role?: string
  status?: string
  college?: string
}) {
  // Only SUPERADMIN can export users
  await requireRole(UserRole.SUPERADMIN)

  try {
    const {
      searchTerm = "",
      role = "all",
      status = "all",
      college = "all"
    } = filters

    // Build where clause for database filtering
    const where: Prisma.UserWhereInput = {}

    // Role filter with proper mapping
    if (role !== "all") {
      let dbRole: UserRole
      switch (role) {
        case "super_admin":
          dbRole = UserRole.SUPERADMIN
          break
        case "college_admin":
          dbRole = UserRole.COLLEGE_ADMIN
          break
        case "user":
          dbRole = UserRole.USER
          break
        default:
          dbRole = UserRole.USER
      }
      where.role = dbRole
    }

    // Search filter (name or email)
    if (searchTerm.trim()) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } }
      ]
    }

    // College filter
    if (college !== "all") {
      where.collegeName = { contains: college, mode: 'insensitive' }
    }

    // Status filter using activity-based logic (last 30 days)
    if (status !== "all") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      if (status === "active") {
        // Active: either explicitly ACTIVE status OR recent session activity
        const existingOR = Array.isArray(where.OR) ? where.OR : []
        where.OR = [
          ...existingOR,
          { status: 'ACTIVE' },
          {
            sessions: {
              some: {
                expires: {
                  gt: thirtyDaysAgo
                }
              }
            }
          }
        ]
      } else if (status === "inactive") {
        // Inactive: not suspended AND no recent activity AND not explicitly ACTIVE
        const existingAND = Array.isArray(where.AND) ? where.AND : []
        where.AND = [
          ...existingAND,
          { status: { not: 'SUSPENDED' } },
          { status: { not: 'ACTIVE' } },
          {
            OR: [
              { sessions: { none: {} } },
              {
                sessions: {
                  every: {
                    expires: {
                      lte: thirtyDaysAgo
                    }
                  }
                }
              }
            ]
          }
        ]
      } else if (status === "suspended") {
        where.status = 'SUSPENDED'
      }
    }

    // College filter
    if (college !== "all") {
      where.collegeName = { contains: college, mode: 'insensitive' }
    }

    // Get all filtered users (no pagination for export)
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        collegeName: true,
        collegeAdminId: true,
        suspendedAt: true,
        suspendedBy: true,
        suspendReason: true,
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

    // Transform to CSV format
    const csvData = users.map(user => {
      // Map database role to UI role format
      let roleDisplay = 'User'
      switch (user.role) {
        case UserRole.SUPERADMIN:
          roleDisplay = 'Super Admin'
          break
        case UserRole.COLLEGE_ADMIN:
          roleDisplay = 'College Admin'
          break
        case UserRole.USER:
          roleDisplay = 'User'
          break
        case UserRole.COLLEGE_STUDENT:
          roleDisplay = 'College Student'
          break
      }

      // Determine status using database status field
      let status = 'Inactive'
      if (user.status === 'SUSPENDED') {
        status = 'Suspended'
      } else if (user.status === 'ACTIVE') {
        status = 'Active'
      } else {
        // Fallback to activity-based logic for legacy data
        const now = new Date()
        const lastActivity = user.sessions.length > 0
          ? new Date(user.sessions[0].expires)
          : new Date(user.createdAt || now)

        const daysSinceActivity = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
        const isRecentlyActive = daysSinceActivity <= 30
        status = isRecentlyActive ? 'Active' : 'Inactive'
      }

      // Get last login
      const lastLogin = user.sessions.length > 0
        ? user.sessions[0].expires.toISOString()
        : user.createdAt?.toISOString() || ''

      // Calculate total logins
      const totalLogins = user.sessions.length

      return {
        'User ID': user.id,
        'Name': user.name || '',
        'Email': user.email,
        'Role': roleDisplay,
        'Status': status,
        'College Name': user.collegeName || '',
        'College Admin ID': user.collegeAdminId || '',
        'Last Login': lastLogin,
        'Total Logins': totalLogins,
        'Created At': user.createdAt?.toISOString() || '',
      }
    })

    return {
      success: true,
      data: csvData,
      totalCount: users.length
    }
  } catch (error) {
    console.error('Error exporting users to CSV:', error)
    return { success: false, error: "Failed to export users" }
  }
}

export async function getCollegeFilterOptions() {
  // Only SUPERADMIN can access this
  await requireRole(UserRole.SUPERADMIN)

  try {
    // Get unique college names from users
    const colleges = await prisma.user.findMany({
      where: {
        collegeName: { not: null }
      },
      select: {
        collegeName: true,
      },
      distinct: ['collegeName'],
      orderBy: {
        collegeName: 'asc',
      },
    })

    const collegeOptions = colleges
      .map(college => college.collegeName)
      .filter((name): name is string => name !== null && name.trim() !== '')
      .map(name => ({
        value: name.toLowerCase().replace(/\s+/g, '-'),
        label: name
      }))

    return {
      success: true,
      colleges: collegeOptions
    }
  } catch (error) {
    console.error('Error fetching college options:', error)
    return { success: false, error: "Failed to fetch college options" }
  }
}

export async function createUser(data: {
  name: string
  email: string
  role: UserRole
  password?: string
  collegeName?: string
  collegeId?: string
  collegeAdminId?: string
  collegeAdminPassword?: string
}) {
  // Only SUPERADMIN can create users
  await requireRole(UserRole.SUPERADMIN)

  try {
    // Check if email is unique
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return { success: false, error: "Email already exists" }
    }

    // For college admins, check if collegeAdminId is unique
    if (data.role === UserRole.COLLEGE_ADMIN && data.collegeAdminId) {
      const existingAdmin = await prisma.user.findFirst({
        where: { collegeAdminId: data.collegeAdminId }
      })

      if (existingAdmin) {
        return { success: false, error: "College Admin ID already exists" }
      }
    }

    // Prepare user data (using any for custom fields that exist in schema but not in generated types)
    const userData: Prisma.UserCreateInput & {
      collegeAdminPassword?: string
      collegeAdminId?: string
      collegeName?: string
      collegeId?: string
    } = {
      name: data.name,
      email: data.email,
      role: data.role,
    }

    // Add college-related fields if provided
    if (data.collegeName) userData.collegeName = data.collegeName
    if (data.collegeId) userData.collegeId = data.collegeId

    // For college admins, add admin-specific fields
    if (data.role === UserRole.COLLEGE_ADMIN) {
      if (data.collegeAdminId) userData.collegeAdminId = data.collegeAdminId
      if (data.collegeAdminPassword) {
        userData.collegeAdminPassword = await bcrypt.hash(data.collegeAdminPassword, 12)
      }
    } else if (data.password) {
      // For regular users, hash the password
      userData.password = await bcrypt.hash(data.password, 12)
    }

    // Auto-verify emails for created users
    userData.emailVerified = new Date()

    const user = await prisma.user.create({
      data: userData as Prisma.UserCreateInput,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        collegeName: true,
        collegeAdminId: true,
        createdAt: true,
      },
    })

    revalidatePath("/admin/dashboard/users")
    return { success: true, user }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: "Failed to create user" }
  }
}

export async function suspendUser(userId: string, reason?: string): Promise<ServerActionResponse> {
  // Only SUPERADMIN can suspend users
  await requireRole(UserRole.SUPERADMIN)

  try {
    const admin = await getSessionUserData()

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: 'SUSPENDED',
        suspendedAt: new Date(),
        suspendedBy: admin.id,
        suspendReason: reason || null
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        suspendedAt: true,
        suspendedBy: true,
        suspendReason: true
      }
    })

    revalidatePath("/admin/dashboard/users")
    return {
      success: true,
      data: updatedUser,
      message: "User suspended successfully"
    }
  } catch (error) {
    console.error("Error suspending user:", error)
    return {
      success: false,
      error: "Failed to suspend user"
    }
  }
}

export async function activateUser(userId: string): Promise<ServerActionResponse> {
  // Only SUPERADMIN can activate suspended users
  await requireRole(UserRole.SUPERADMIN)

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: 'ACTIVE',
        suspendedAt: null,
        suspendedBy: null,
        suspendReason: null
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true
      }
    })

    revalidatePath("/admin/dashboard/users")
    return {
      success: true,
      data: updatedUser,
      message: "User activated successfully"
    }
  } catch (error) {
    console.error("Error activating user:", error)
    return {
      success: false,
      error: "Failed to activate user"
    }
  }
}
