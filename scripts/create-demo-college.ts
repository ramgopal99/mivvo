import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createDemoCollegeAndAdmin(): Promise<void> {
  try {
    console.log('🌱 Creating Demo College and Admin...')

    // Check if data already exists
    const existingCollege = await prisma.college.findUnique({
      where: { collegeId: 'demo' }
    })

    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: 'demo@college.com',
        role: 'COLLEGE_ADMIN'
      }
    })

    if (existingCollege || existingAdmin) {
      console.log('⚠️  Demo College or Admin already exists. Skipping creation.')
      if (existingCollege) {
        console.log(`College: ${existingCollege.name} (ID: ${existingCollege.collegeId})`)
      }
      if (existingAdmin) {
        console.log(`Admin: ${existingAdmin.email}`)
      }
      console.log('🔐 Login credentials: demo@college.com / demo123')
      return
    }

    // Create the Demo college
    const college = await prisma.college.create({
      data: {
        collegeId: 'demo',
        name: 'Demo College',
        email: 'admin@democollege.edu',
        password: await bcrypt.hash('college123', 10),
        description: 'Demo College for Testing',
        location: 'Test Location',
        website: 'https://democollege.edu',
        phone: '+91-9876543210',
        establishedYear: 2020,
        maxStudents: 100,
        currentStudents: 0,
        monthlyRatePerUser: 150.0,
        billingCycle: 'monthly',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }
    })

    console.log(`✅ Created college: ${college.name} (ID: ${college.collegeId})`)

    // Create college admin user
    const adminUser = await prisma.user.create({
      data: {
        name: 'Demo Admin',
        email: 'demo@college.com',
        firstName: 'Demo',
        lastName: 'Admin',
        password: await bcrypt.hash('demo123', 10),
        role: 'COLLEGE_ADMIN',
        collegeId: college.id,
        phone: '+91-9876543210',
        jobTitle: 'College Administrator',
        bio: 'Administrator for Demo College'
      }
    })

    console.log(`✅ Created college admin: ${adminUser.name} (${adminUser.email})`)

    // Create demo student for the college
    const demoStudents = [
      {
        name: 'Demo Student',
        email: 'demostudent@demo.edu',
        firstName: 'Demo',
        lastName: 'Student',
        rollNumber: 'DEMO2024001',
        phone: '+1-555-0101',
        careerGoals: 'Become a software engineer',
        linkedIn: 'https://linkedin.com/in/demostudent',
        github: 'https://github.com/demostudent',
        totalTimeAllowance: 45,
        usedTimeMinutes: 12
      }
    ]

    const createdStudents = []
    for (const studentInfo of demoStudents) {
      const student = await prisma.user.create({
        data: {
          ...studentInfo,
          password: await bcrypt.hash('student123', 10),
          role: 'USER',
          collegeId: college.id
        }
      })
      createdStudents.push(student)
      console.log(`✅ Created student: ${student.name} (${student.rollNumber})`)
    }

    // Update college student count
    await prisma.college.update({
      where: { id: college.id },
      data: { currentStudents: createdStudents.length }
    })

    console.log('\n🎉 Demo College, Admin, and Students created successfully!')
    console.log(`📊 Summary:`)
    console.log(`   • 1 College created (ID: demo)`)
    console.log(`   • 1 College Admin created`)
    console.log(`   • ${createdStudents.length} Demo Students created`)

    console.log('\n🔐 Login Credentials:')
    console.log(`College Admin: demo@college.com / demo123`)
    console.log(`Demo Student: demostudent@demo.edu / student123`)

  } catch (error) {
    console.error('❌ Error during creation:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the creation function
createDemoCollegeAndAdmin()
  .catch((e) => {
    console.error('❌ Creation failed:', e)
    process.exit(1)
  })
