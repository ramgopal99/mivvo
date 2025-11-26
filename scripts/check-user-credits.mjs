/**
 * Script to check current credit values for all users
 */

import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env' })
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function checkUserCredits() {
  try {
    console.log('🔄 Checking user credits in database...')

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true
      }
    })

    console.log(`📊 Found ${users.length} users:`)
    console.log('─'.repeat(80))

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || 'Unknown'} (${user.email})`)
      console.log(`   Total Credits: ${user.totalCreditAllocation || 0}`)
      console.log(`   Used Credits: ${user.usedCredits || 0}`)
      console.log(`   Remaining: ${(user.totalCreditAllocation || 0) - (user.usedCredits || 0)}`)
      console.log(`   Reset At: ${user.creditResetAt ? new Date(user.creditResetAt).toLocaleString() : 'Not set'}`)
      console.log('')
    })

  } catch (error) {
    console.error('❌ Error checking user credits:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUserCredits()
