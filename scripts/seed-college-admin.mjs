/**
 * Seed script to create a demo college admin user
 * This creates a college admin that can be used for testing the new system
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seedCollegeAdmin() {
  console.log('Creating demo college admin...')

  try {
    // Check if demo college admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { collegeAdminId: 'demo' }
    })

    if (existingAdmin) {
      console.log('Demo college admin already exists, skipping...')
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('college123', 12)

    // Create demo college admin
    const collegeAdmin = await prisma.user.create({
      data: {
        name: 'Demo College Admin',
        email: 'demo@college.com',
        role: 'COLLEGE_ADMIN',
        collegeAdminId: 'demo',
        collegeAdminPassword: hashedPassword,
        collegeName: 'Demo College',
        emailVerified: new Date(),
      }
    })

    console.log('Demo college admin created successfully!')
    console.log('College Admin ID: demo')
    console.log('Password: college123')
    console.log('Email: demo@college.com')

  } catch (error) {
    console.error('Failed to create demo college admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding
seedCollegeAdmin()
  .then(() => {
    console.log('Seeding completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })
