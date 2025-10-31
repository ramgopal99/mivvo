/**
 * Migration script to create college admin users from existing colleges
 *
 * Since schema changes have already been applied, this script:
 * 1. Finds all existing colleges
 * 2. Creates college admin users with generated credentials
 * 3. Links them to their respective colleges
 */

import { PrismaClient } from '@prisma/client'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function migrateCollegeAdmins() {
  console.log('Starting college admin migration...')

  // Get MongoDB connection string from environment
  const mongoUri = process.env.DATABASE_URL
  if (!mongoUri) {
    throw new Error('DATABASE_URL environment variable is required')
  }

  let mongoClient
  try {
    // Connect directly to MongoDB to access raw documents
    mongoClient = new MongoClient(mongoUri)
    await mongoClient.connect()

    const db = mongoClient.db()
    const collegesCollection = db.collection('colleges')

    // Find all colleges with the old email/password fields
    const collegesWithAuth = await collegesCollection.find({
      email: { $exists: true, $ne: null },
      password: { $exists: true, $ne: null }
    }).toArray()

    console.log(`Found ${collegesWithAuth.length} colleges with old authentication data`)

    let createdCount = 0
    let skippedCount = 0

    for (const collegeDoc of collegesWithAuth) {
      console.log(`Processing college: ${collegeDoc.name} (${collegeDoc.collegeId})`)

      try {
        // Check if a college admin user already exists for this college
        const existingAdmin = await prisma.user.findFirst({
          where: {
            collegeAdminId: collegeDoc.collegeId
          }
        })

        if (existingAdmin) {
          console.log(`  Skipping - admin already exists for ${collegeDoc.name}`)
          skippedCount++
          continue
        }

        // Use the existing email and hashed password from the college
        const email = collegeDoc.email
        const existingHashedPassword = collegeDoc.password

        // Create new college admin user with existing credentials
        const collegeAdmin = await prisma.user.create({
          data: {
            name: `${collegeDoc.name} Administrator`,
            email: email,
            role: 'COLLEGE_ADMIN',
            collegeAdminId: collegeDoc.collegeId,
            collegeAdminPassword: existingHashedPassword, // Keep the existing hashed password
            collegeName: collegeDoc.name,
            collegeId: collegeDoc._id.toString(),
            emailVerified: new Date(), // Auto-verify existing college admins
          }
        })

        console.log(`  ✓ Migrated college admin: ${collegeAdmin.name}`)
        console.log(`    - College Admin ID: ${collegeAdmin.collegeAdminId}`)
        console.log(`    - Email: ${collegeAdmin.email}`)
        console.log(`    - Password: (preserved from college record)`)
        createdCount++

      } catch (error) {
        console.error(`  ✗ Error migrating college ${collegeDoc.name}:`, error.message)
      }
    }

    console.log('\nMigration completed successfully!')
    console.log(`- Created: ${createdCount} college admin users`)
    console.log(`- Skipped: ${skippedCount} existing admins`)

    if (createdCount > 0) {
      console.log('\n✅ College admins have been successfully migrated!')
      console.log('   They can continue using their existing login credentials.')
      console.log('   Login credentials:')
      console.log('   - College Admin ID: demo')
      console.log('   - Password: (same as before)')
    }

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    if (mongoClient) {
      await mongoClient.close()
    }
    await prisma.$disconnect()
  }
}

// Run the migration
migrateCollegeAdmins()
  .then(() => {
    console.log('Migration script finished')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })
