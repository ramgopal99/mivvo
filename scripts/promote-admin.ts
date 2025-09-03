import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function promoteFirstUserToAdmin() {
  try {
    // Get the first user in the database
    const firstUser = await prisma.user.findFirst({
      orderBy: {
        createdAt: "asc",
      },
    })

    if (!firstUser) {
      console.log("No users found in the database")
      return
    }

    // Update the user to SUPERADMIN
    const updatedUser = await prisma.user.update({
      where: {
        id: firstUser.id,
      },
      data: {
        role: "SUPERADMIN",
      },
    })

    console.log(`✅ Promoted user ${updatedUser.email} to SUPERADMIN`)
    console.log(`User ID: ${updatedUser.id}`)
    console.log(`Name: ${updatedUser.name}`)
  } catch (error) {
    console.error("Error promoting user:", error)
  } finally {
    await prisma.$disconnect()
  }
}

promoteFirstUserToAdmin()
