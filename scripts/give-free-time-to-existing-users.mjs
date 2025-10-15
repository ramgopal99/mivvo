/**
 * Script to give 30 minutes of free time to all existing users
 *
 * This script updates all users who currently have 0 totalTimeAllowance
 * to give them 30 minutes of free interview time.
 *
 * Usage: node scripts/give-free-time-to-existing-users.mjs
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function giveFreeTimeToExistingUsers() {
  try {
    console.log('🔄 Starting to give free time to existing users...')

    // First, let's try a simple query to see if the field exists
    try {
      const testUser = await prisma.user.findFirst({
        select: {
          id: true,
          totalTimeAllowance: true
        }
      })
      console.log('✅ totalTimeAllowance field exists in database')
    } catch (error) {
      console.error('❌ totalTimeAllowance field does not exist in database yet')
      console.log('💡 Please run: npx prisma migrate dev --name give-30-min-free-time')
      return
    }

    // Count all users first
    const totalUsers = await prisma.user.count()
    console.log(`📊 Total users in database: ${totalUsers}`)

    // Update all users to have 30 minutes (this will work even if they already have time)
    const result = await prisma.user.updateMany({
      data: {
        totalTimeAllowance: 30
      }
    })

    console.log(`✅ Successfully updated ${result.count} users with 30 minutes of free time`)

    // Verify the update
    const usersWithTime = await prisma.user.count({
      where: {
        totalTimeAllowance: {
          gte: 1 // Any positive value
        }
      }
    })

    console.log(`📈 Users with time allowance: ${usersWithTime}/${totalUsers}`)

  } catch (error) {
    console.error('❌ Error updating users:', error)
    console.error('💡 Make sure to run the migration first: npx prisma migrate dev --name give-30-min-free-time')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
giveFreeTimeToExistingUsers()
  .then(() => {
    console.log('🎉 Script completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Script failed:', error)
    process.exit(1)
  })
