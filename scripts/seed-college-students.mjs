import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seedCollegeAndStudents() {
  try {
    console.log('🌱 Starting college and students seeding...')

    // Dummy student data
    const studentData = [
      {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@techuniversity.edu',
        firstName: 'Rahul',
        lastName: 'Sharma',
        rollNumber: 'TU2024001',
        phone: '+91-9876543211',
        collegeName: 'Tech University',
        password: await bcrypt.hash('student123', 10),
        careerGoals: 'Become a full-stack developer',
        linkedIn: 'https://linkedin.com/in/rahulsharma',
        github: 'https://github.com/rahulsharma',
        userType: 'FREE',
        totalCreditAllocation: 180,
        usedCredits: 0
      },
      {
        name: 'Priya Patel',
        email: 'priya.patel@techuniversity.edu',
        firstName: 'Priya',
        lastName: 'Patel',
        rollNumber: 'TU2024002',
        phone: '+91-9876543212',
        collegeName: 'Tech University',
        password: await bcrypt.hash('student123', 10),
        careerGoals: 'Pursue data science career',
        linkedIn: 'https://linkedin.com/in/priyapatel',
        github: 'https://github.com/priyapatel',
        userType: 'FREE',
        totalCreditAllocation: 180,
        usedCredits: 0
      },
      {
        name: 'Amit Kumar',
        email: 'amit.kumar@techuniversity.edu',
        firstName: 'Amit',
        lastName: 'Kumar',
        rollNumber: 'TU2024003',
        phone: '+91-9876543213',
        collegeName: 'Tech University',
        password: await bcrypt.hash('student123', 10),
        careerGoals: 'Mobile app development specialist',
        linkedIn: 'https://linkedin.com/in/amitkumar',
        github: 'https://github.com/amitkumar',
        userType: 'FREE',
        totalCreditAllocation: 180,
        usedCredits: 0
      },
      {
        name: 'Sneha Reddy',
        email: 'sneha.reddy@techuniversity.edu',
        firstName: 'Sneha',
        lastName: 'Reddy',
        rollNumber: 'TU2024004',
        phone: '+91-9876543214',
        collegeName: 'Tech University',
        password: await bcrypt.hash('student123', 10),
        careerGoals: 'UI/UX design and frontend development',
        linkedIn: 'https://linkedin.com/in/snehareddy',
        github: 'https://github.com/snehareddy',
        totalCreditAllocation: 45,
        usedCredits: 31
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@techuniversity.edu',
        firstName: 'Vikram',
        lastName: 'Singh',
        rollNumber: 'TU2024005',
        phone: '+91-9876543215',
        collegeName: 'Tech University',
        password: await bcrypt.hash('student123', 10),
        careerGoals: 'DevOps and cloud engineering',
        linkedIn: 'https://linkedin.com/in/vikramsingh',
        github: 'https://github.com/vikramsingh',
        totalCreditAllocation: 45,
        usedCredits: 19
      }
    ]

    // Check if data already exists
    const existingCollege = await prisma.college.findUnique({
      where: { collegeId: 'TECH_UNIV_001' }
    })

    const existingStudents = await prisma.user.findMany({
      where: {
        email: {
          in: studentData.map(s => s.email)
        }
      }
    })

    if (existingCollege || existingStudents.length > 0) {
      console.log('⚠️  Data already exists. Skipping seeding to avoid duplicates.')
      console.log('🔐 Existing login credentials:')
      console.log('College Admin: TECH_UNIV_001 / college123')
      console.log('Students: [student-email] / student123')
      console.log('\n💡 To re-seed, first clean the database or use different email addresses.')
      return
    }

    // Create a college
    const college = await prisma.college.create({
      data: {
        collegeId: 'TECH_UNIV_001',
        name: 'Tech University',
        email: 'admin@techuniversity.edu',
        password: await bcrypt.hash('college123', 10),
        description: 'Leading technical university focused on innovation and research',
        location: 'Mumbai, Maharashtra',
        website: 'https://techuniversity.edu',
        phone: '+91-9876543210',
        establishedYear: 2005,
        maxStudents: 500,
        currentStudents: 5,
        monthlyRatePerUser: 150.0,
        billingCycle: 'monthly',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }
    })

    console.log(`✅ Created college: ${college.name} (ID: ${college.collegeId})`)

    // Create students
    const createdStudents = []
    for (const studentInfo of studentData) {
      const student = await prisma.user.create({
        data: {
          ...studentInfo,
          role: 'USER',
          collegeId: college.id
        }
      })
      createdStudents.push(student)
      console.log(`✅ Created student: ${student.name} (${student.rollNumber})`)
    }

    // Interview templates for each student
    const interviewTemplates = [
      {
        title: 'Technical Interview - Software Development',
        companyName: 'TechCorp Solutions',
        position: 'Junior Software Developer',
        interviewType: 'TECHNICAL',
        experienceLevel: 'Entry Level',
        timeLimitMinutes: 45,
        prompts: [
          'Can you explain the difference between var, let, and const in JavaScript?'
        ]
      },
      {
        title: 'HR Interview - Behavioral Questions',
        companyName: 'InnovateTech',
        position: 'Software Engineer',
        interviewType: 'HR_INTERVIEW',
        experienceLevel: 'Mid Level',
        timeLimitMinutes: 30,
        prompts: [
          'Tell me about a challenging project you worked on and how you overcame the difficulties.'
        ]
      }
    ]

    // Create interviews for each student
    for (const student of createdStudents) {
      for (const [index, interviewTemplate] of interviewTemplates.entries()) {
        // Prepare prompts data for nested create
        const promptsData = interviewTemplate.prompts.map(promptText => ({
          promptText,
          isActive: true
        }))

        // Create mock interview with nested prompts
        const mockInterview = await prisma.mockInterview.create({
          data: {
            title: interviewTemplate.title,
            companyName: interviewTemplate.companyName,
            position: interviewTemplate.position,
            interviewType: interviewTemplate.interviewType,
            experienceLevel: interviewTemplate.experienceLevel,
            timeLimitMinutes: interviewTemplate.timeLimitMinutes,
            createdBy: student.id,
            companyDescription: `${interviewTemplate.companyName} is a leading technology company specializing in innovative solutions.`,
            jobDescription: `We are looking for a talented ${interviewTemplate.position} to join our dynamic team.`,
            prompts: {
              create: promptsData
            }
          }
        })

        console.log(`✅ Created interview "${mockInterview.title}" for ${student.name}`)

        // Create a completed interview attempt with results
        const interviewAttempt = await prisma.interviewAttempt.create({
          data: {
            interviewId: mockInterview.id,
            candidateId: student.id,
            status: 'COMPLETED',
            duration: interviewTemplate.timeLimitMinutes,
            startedAt: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000), // Days ago
            completedAt: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000 + interviewTemplate.timeLimitMinutes * 60 * 1000)
          }
        })

        // Create interview results
        await prisma.interviewResult.create({
          data: {
            overallScore: Math.floor(Math.random() * 30) + 70, // 70-100 score
            overallFeedback: `Great performance! ${student.firstName} showed strong technical skills and good communication.`,
            strengths: ['Technical knowledge', 'Problem solving', 'Communication skills'],
            weaknesses: ['Could improve time management'],
            recommendations: ['Practice more coding challenges', 'Work on system design'],
            communication: Math.floor(Math.random() * 20) + 80,
            knowledge: Math.floor(Math.random() * 20) + 75,
            attemptId: interviewAttempt.id,
            duration: interviewTemplate.timeLimitMinutes,
            feedback: `Interview completed successfully. ${student.firstName} demonstrated good understanding of the concepts.`,
            vocabularyComplexity: Math.floor(Math.random() * 20) + 70,
            emotionalTone: 'Confident and professional',
            wordCountAnalysis: 'Used appropriate technical vocabulary',
            questionAnsweringQuality: Math.floor(Math.random() * 20) + 75,
            followUpHandling: Math.random() > 0.5,
            answerStructure: 'Well structured responses',
            exampleUsage: Math.random() > 0.3,
            relevantTopicAnswer: Math.random() > 0.2
          }
        })

        // Create interview conversation
        await prisma.interviewConversation.create({
          data: {
            attemptId: interviewAttempt.id,
            transcript: `Interview transcript for ${student.firstName} ${student.lastName} - ${interviewTemplate.title}. The candidate provided detailed answers showing good technical knowledge and communication skills.`,
            messages: JSON.stringify([
              {
                role: 'interviewer',
                content: interviewTemplate.prompts[0],
                timestamp: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000 + 1 * 60 * 1000)
              },
              {
                role: 'candidate',
                content: `I can explain this clearly. ${interviewTemplate.prompts[0]} Let me break this down for you...`,
                timestamp: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000 + 2 * 60 * 1000)
              },
              {
                role: 'interviewer',
                content: 'Thank you for the detailed explanation. Can you provide a practical example?',
                timestamp: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000 + 3 * 60 * 1000)
              },
              {
                role: 'candidate',
                content: 'Certainly! Let me give you a real-world example...',
                timestamp: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000 + 4 * 60 * 1000)
              }
            ]),
            duration: interviewTemplate.timeLimitMinutes
          }
        })

      }
    }

    console.log('\n🎉 Seeding completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   • 1 College created`)
    console.log(`   • 5 Students created`)
    console.log(`   • 10 Mock interviews created (2 per student)`)
    console.log(`   • 10 Interview prompts created (1 per interview)`)
    console.log(`   • 10 Interview attempts with results created`)
    console.log(`   • 10 Interview conversations created (1 per attempt)`)

    console.log('\n🔐 Login Credentials:')
    console.log(`College Admin: ${college.collegeId} / college123`)
    console.log('Students: [student-email] / student123')

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding function
seedCollegeAndStudents()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
