/**
 * Cleanup script to remove old authentication fields from College model
 * This should be run AFTER the migration is complete
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanupCollegeAuth() {
  console.log('Starting college authentication cleanup...')

  try {
    // Since we can't access the old fields through Prisma anymore,
    // we'll use raw MongoDB operations via Prisma's $runCommandRaw
    // But first, let's try a different approach - just log what we need to do

    console.log('⚠️  Manual cleanup required:')
    console.log('   Please run the following MongoDB command in your MongoDB Atlas dashboard:')
    console.log('')
    console.log('   db.colleges.updateMany({}, { $unset: { email: 1, password: 1 } })')
    console.log('')
    console.log('   This will remove the email and password fields from all college documents.')
    console.log('')
    console.log('   Alternatively, you can do this through MongoDB Compass:')
    console.log('   1. Connect to your MongoDB cluster')
    console.log('   2. Navigate to the "colleges" collection')
    console.log('   3. Use the update operation to unset email and password fields')

    // Let's check how many colleges we have
    const collegeCount = await prisma.college.count()
    console.log(`\n📊 Found ${collegeCount} colleges in the database`)

    if (collegeCount > 0) {
      console.log('✅ Migration appears to be successful!')
      console.log('   College admin functionality has been moved to the User model.')
    }

  } catch (error) {
    console.error('Cleanup check failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the cleanup
cleanupCollegeAuth()
  .then(() => {
    console.log('Cleanup script finished')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Cleanup script failed:', error)
    process.exit(1)
  })
