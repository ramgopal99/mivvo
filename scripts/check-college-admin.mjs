/**
 * Check college admin setup in database
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function checkCollegeAdmin() {
  console.log('Checking college admin setup...')

  try {
    // Check existing college admin by collegeAdminId
    const collegeAdmin = await prisma.user.findFirst({
      where: { collegeAdminId: 'demo' },
      include: { college: true }
    })

    if (collegeAdmin) {
      console.log('✅ College admin found by collegeAdminId:')
      console.log('  - ID:', collegeAdmin.id)
      console.log('  - Name:', collegeAdmin.name)
      console.log('  - Email:', collegeAdmin.email)
      console.log('  - Role:', collegeAdmin.role)
      console.log('  - College Admin ID:', collegeAdmin.collegeAdminId)
      console.log('  - College ID:', collegeAdmin.collegeId)
      console.log('  - Has College:', !!collegeAdmin.college)

      if (collegeAdmin.college) {
        console.log('  - College Name:', collegeAdmin.college.name)
        console.log('  - College Active:', collegeAdmin.college.isActive)
      }

      // Check if password is set
      console.log('  - Has Password:', !!collegeAdmin.collegeAdminPassword)
    } else {
      console.log('❌ No college admin found with collegeAdminId: "demo"')

      // Check if there's a user with the email but no collegeAdminId
      const userByEmail = await prisma.user.findFirst({
        where: { email: 'demo@college.com' },
        include: { college: true }
      })

      if (userByEmail) {
        console.log('📧 Found user with email "demo@college.com":')
        console.log('  - ID:', userByEmail.id)
        console.log('  - Name:', userByEmail.name)
        console.log('  - Role:', userByEmail.role)
        console.log('  - College Admin ID:', userByEmail.collegeAdminId)
        console.log('  - College ID:', userByEmail.collegeId)

        // Update this user to be a proper college admin
        console.log('🔧 Updating user to be college admin...')
        const hashedPassword = await bcrypt.hash('college123', 12)

        // Get the demo college first
        const demoCollege = await prisma.college.findFirst({
          where: { collegeId: 'demo' }
        })

        const updatedUser = await prisma.user.update({
          where: { id: userByEmail.id },
          data: {
            collegeAdminId: 'demo',
            collegeAdminPassword: hashedPassword,
            collegeId: demoCollege?.id // Link to the demo college
          },
          include: { college: true }
        })

        console.log('✅ User updated to college admin:')
        console.log('  - College Admin ID:', updatedUser.collegeAdminId)
        console.log('  - Has Password:', !!updatedUser.collegeAdminPassword)
      } else {
        console.log('❌ No user found with email "demo@college.com" either')
      }
    }

    // Check colleges
    const colleges = await prisma.college.findMany()
    console.log(`\n📊 Found ${colleges.length} colleges:`)
    colleges.forEach(college => {
      console.log(`  - ${college.name} (${college.collegeId}) - Active: ${college.isActive}`)
    })

  } catch (error) {
    console.error('Error checking college admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the check
checkCollegeAdmin()
  .then(() => {
    console.log('\nCheck completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Check failed:', error)
    process.exit(1)
  })
