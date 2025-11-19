/**
 * Script to give 1200 credits of free allocation to all existing users
 *
 * This script updates all users to give them 1200 credits of free interview allocation.
 * Credits are allocated today (current date) for fresh active credits.
 *
 * Usage: node scripts/give-free-time-to-existing-users.mjs
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function giveFreeTimeToExistingUsers() {
  try {
    console.log('🔄 Starting to give 1200 credits to all users (allocated today)...')

    // First, let's try a simple query to see if the field exists
    try {
      const testUser = await prisma.user.findFirst({
        select: {
          id: true,
          totalCreditAllocation: true
        }
      })
      console.log('✅ totalCreditAllocation field exists in database')
    } catch (error) {
      console.error('❌ totalCreditAllocation field does not exist in database yet')
      console.log('💡 Please run: npx prisma migrate dev --name update-credit-allocation-fields')
      return
    }

    // Count all users first
    const totalUsers = await prisma.user.count()
    console.log(`📊 Total users in database: ${totalUsers}`)

    // Update all users to have 1200 credits (this will work even if they already have credits)
    // Set allocation date to today for fresh credits
    const allocationDate = new Date()
    const result = await prisma.user.updateMany({
      data: {
        totalCreditAllocation: 1200,
        creditResetAt: allocationDate // Set the reset timestamp to Nov 11, 2025
      }
    })

    console.log(`✅ Successfully updated ${result.count} users with 1200 credits of free allocation`)

    // Verify the update
    const usersWithCredits = await prisma.user.count({
      where: {
        totalCreditAllocation: {
          gte: 1 // Any positive value
        }
      }
    })

    console.log(`📈 Users with credit allocation: ${usersWithCredits}/${totalUsers}`)

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
