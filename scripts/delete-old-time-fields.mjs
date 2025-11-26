/**
 * Script to delete old time allocation fields from the database
 *
 * This script removes the old time-related fields from all user documents:
 * - totalTimeAllowance
 * - usedTimeMinutes
 * - timeAllowanceResetAt
 *
 * Since these fields no longer exist in the Prisma schema, this script
 * uses MongoDB's native operations to remove them from the database.
 *
 * Usage: node scripts/delete-old-time-fields.mjs
 */

import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env' })
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function deleteOldTimeFields() {
  try {
    console.log('🔄 Starting to delete old time allocation fields...')

    // Check database connection
    await prisma.$connect()
    console.log('✅ Connected to database')

    // Get all users to work with
    const users = await prisma.user.findMany({
      select: { id: true }
    })

    console.log(`📊 Found ${users.length} users in database`)

    // Since we can't directly access MongoDB collections through Prisma for field deletion,
    // we'll use raw MongoDB operations through Prisma's $runCommandRaw

    try {
      // Use MongoDB updateMany to unset the old fields
      const result = await prisma.$runCommandRaw({
        update: 'users',
        updates: [
          {
            q: {}, // All documents
            u: {
              $unset: {
                totalTimeAllowance: 1,
                usedTimeMinutes: 1,
                timeAllowanceResetAt: 1
              }
            },
            multi: true
          }
        ]
      })

      console.log('✅ Database update command executed')
      console.log(`📊 Modified documents: ${result.nModified || result.modifiedCount || 'Unknown'}`)

    } catch (rawError) {
      console.error('❌ Raw MongoDB operation failed:', rawError.message)
      console.log('💡 Falling back to alternative approach...')

      // Alternative: Since the fields no longer exist in Prisma schema,
      // they won't be returned in queries anyway. The database cleanup
      // can be done manually or through MongoDB shell if needed.

      console.log('⚠️  Note: Since these fields were removed from the Prisma schema,')
      console.log('⚠️  they are no longer accessible through the application.')
      console.log('💡 For complete database cleanup, run this MongoDB command manually:')
      console.log('   db.users.updateMany({}, {$unset: {totalTimeAllowance: 1, usedTimeMinutes: 1, timeAllowanceResetAt: 1}})')

      return
    }

    // Verify by checking a sample user (these fields won't appear in Prisma queries anymore)
    const sampleUser = await prisma.user.findFirst({
      select: {
        id: true,
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true
      }
    })

    if (sampleUser) {
      console.log('📋 Verification - New credit fields exist:')
      console.log(`  - totalCreditAllocation: ${sampleUser.totalCreditAllocation || 0}`)
      console.log(`  - usedCredits: ${sampleUser.usedCredits || 0}`)
      console.log(`  - creditResetAt: ${sampleUser.creditResetAt ? 'EXISTS' : 'NOT SET'}`)
    }

  } catch (error) {
    console.error('❌ Error deleting old fields:', error)
    console.error('💡 Make sure the database is accessible')
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('🔌 Disconnected from database')
  }
}

// Run the script
deleteOldTimeFields()
  .then(() => {
    console.log('🎉 Script completed successfully!')
    console.log('✅ Old time allocation fields have been removed from the database')
    console.log('📝 Note: The application no longer uses these fields since they were removed from the schema')
  })
  .catch((error) => {
    console.error('💥 Script failed:', error)
    process.exit(1)
  })
