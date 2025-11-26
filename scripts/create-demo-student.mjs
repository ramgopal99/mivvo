#!/usr/bin/env node

/**
 * Script to create a demo student with specified credits
 * Usage: node scripts/create-demo-student.mjs
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createDemoStudent() {
  try {
    console.log('🌱 Creating demo student with 5000 credits and associating with ANU College...')

    // Check if ANU College exists, create if not
    let college = await prisma.college.findUnique({
      where: { collegeId: 'ANU_COLLEGE' }
    })

    if (!college) {
      console.log('📚 ANU College not found. Creating ANU College...')
      college = await prisma.college.create({
        data: {
          collegeId: 'ANU_COLLEGE',
          name: 'ANU College',
          description: 'Leading educational institution focused on innovation and excellence',
          location: 'New Delhi, India',
          website: 'https://anu.edu',
          phone: '+91-9876543210',
          establishedYear: 1995,
          monthlyRatePerUser: 150.0,
          billingCycle: 'monthly',
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        }
      })
      console.log('✅ Created ANU College')
    } else {
      console.log('✅ ANU College already exists')
    }

    // Demo student data
    const studentData = {
      name: 'Demo Student',
      email: 'demostudent@demo.edu',
      firstName: 'Demo',
      lastName: 'Student',
      rollNumber: 'ANU001',
      phone: '+91-9999999999',
      collegeName: 'ANU College',
      password: await bcrypt.hash('student123', 10),
      careerGoals: 'Become a professional software developer',
      linkedIn: 'https://linkedin.com/in/demostudent',
      github: 'https://github.com/demostudent',
      userType: 'PRO',
      totalCreditAllocation: 5000, // 5000 credits as requested
      usedCredits: 0,
      collegeId: college.id
    }

    // Check if demo student already exists
    const existingStudent = await prisma.user.findUnique({
      where: { email: studentData.email }
    })

    if (existingStudent) {
      console.log('⚠️  Demo student already exists. Updating credits and college association...')
      await prisma.user.update({
        where: { id: existingStudent.id },
        data: {
          totalCreditAllocation: 5000,
          usedCredits: 0,
          userType: 'PRO',
          collegeId: college.id
        }
      })
      console.log('✅ Updated existing demo student with 5000 credits and associated with ANU College')
      console.log('🔐 Login credentials:')
      console.log(`Email: ${studentData.email}`)
      console.log('Password: student123')
      console.log('Credits: 5000')
      console.log(`College: ${college.name}`)
      return
    }

    // Create the demo student
    const student = await prisma.user.create({
      data: {
        ...studentData,
        role: 'USER'
      }
    })

    console.log('✅ Created demo student successfully!')
    console.log(`📊 Student Details:`)
    console.log(`   • Name: ${student.name}`)
    console.log(`   • Email: ${student.email}`)
    console.log(`   • Roll Number: ${student.rollNumber}`)
    console.log(`   • Credits: ${student.totalCreditAllocation}`)
    console.log(`   • Used Credits: ${student.usedCredits}`)
    console.log(`   • College: ${college.name}`)

    console.log('\n🔐 Login Credentials:')
    console.log(`Email: ${studentData.email}`)
    console.log('Password: student123')
    console.log('Credits: 5000')
    console.log(`College: ${college.name}`)

  } catch (error) {
    console.error('❌ Error creating demo student:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
createDemoStudent()
  .catch((e) => {
    console.error('❌ Script failed:', e)
    process.exit(1)
  })
