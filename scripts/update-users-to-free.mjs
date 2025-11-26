/**
 * Script to update all existing users to FREE type with 180 credits
 */

import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env' })
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function updateUsersToFree() {
  try {
    console.log('🔄 Updating all users to FREE type with 180 credits...')

    const result = await prisma.user.updateMany({
      data: {
        userType: 'FREE',
        totalCreditAllocation: 180,
        usedCredits: 0,
        creditResetAt: new Date() // Set reset date to now
      }
    })

    console.log(`✅ Updated ${result.count} users to FREE type`)

    // Verify the updates
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        userType: true,
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true
      },
      take: 3 // Show first 3 users
    })

    console.log('📋 Sample updated users:')
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}: ${user.userType} - ${user.totalCreditAllocation} credits`)
    })

  } catch (error) {
    console.error('❌ Error updating users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateUsersToFree()
