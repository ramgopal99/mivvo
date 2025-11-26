#!/usr/bin/env node

/**
 * Script to update credits for all users
 * Usage: node scripts/update-user-credits.mjs
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Credit package configuration (in minutes)
const CREDIT_PACKAGE_MINUTES = {
  FREE: 15, // 15 minutes free for new users
  PRO: 360, // 6 hours (360 minutes) for pro users
}

async function updateUserCredits() {
  console.log('🔄 Starting credit update for all users...')

  try {
    // Get all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        totalCreditAllocation: true,
        usedCredits: true,
        name: true
      }
    })

    console.log(`📊 Found ${users.length} users`)

    let updatedCount = 0
    let skippedCount = 0

    for (const user of users) {
      // Set default FREE tier credits (15 minutes) for all users
      const defaultCredits = CREDIT_PACKAGE_MINUTES.FREE

      // Update user credits
      await prisma.user.update({
        where: { id: user.id },
        data: {
          totalCreditAllocation: defaultCredits,
          usedCredits: 0, // Reset used credits
          creditResetAt: new Date() // Reset the allocation timestamp
        }
      })

      console.log(`✅ Updated credits for ${user.email || user.name || user.id}: ${defaultCredits} minutes`)
      updatedCount++
    }

    console.log(`\n🎉 Credit update completed!`)
    console.log(`📈 Updated: ${updatedCount} users`)
    console.log(`⏭️  Skipped: ${skippedCount} users`)
    console.log(`💰 Each user now has: ${CREDIT_PACKAGE_MINUTES.FREE} minutes (${CREDIT_PACKAGE_MINUTES.FREE * 12} credits)`)

  } catch (error) {
    console.error('❌ Error updating user credits:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
updateUserCredits()
