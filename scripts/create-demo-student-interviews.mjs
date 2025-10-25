import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createDemoStudentInterviews() {
  try {
    // Find the demo student
    const demoStudent = await prisma.user.findFirst({
      where: {
        email: 'demostudent@demo.edu'
      }
    })

    if (!demoStudent) {
      console.log('Demo student not found')
      return
    }

    console.log('Found demo student:', demoStudent.id)

    // Create some demo mock interviews
    const mockInterviews = [
      {
        title: 'Frontend Developer Interview - Meta',
        companyName: 'Meta',
        position: 'Frontend Developer',
        interviewType: 'UI_INTERVIEW',
        status: 'COMPLETED',
        createdBy: demoStudent.id
      },
      {
        title: 'Full Stack Engineer - Google',
        companyName: 'Google',
        position: 'Full Stack Engineer',
        interviewType: 'CODING',
        status: 'COMPLETED',
        createdBy: demoStudent.id
      },
      {
        title: 'Software Engineer - Amazon',
        companyName: 'Amazon',
        position: 'Software Engineer',
        interviewType: 'TECHNICAL',
        status: 'COMPLETED',
        createdBy: demoStudent.id
      }
    ]

    for (const interviewData of mockInterviews) {
      const interview = await prisma.mockInterview.create({
        data: interviewData
      })

      console.log('Created interview:', interview.title)

      // Create some attempts for each interview
      const attempts = []
      for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
        const attempt = await prisma.interviewAttempt.create({
          data: {
            interviewId: interview.id,
            candidateId: demoStudent.id,
            status: 'COMPLETED',
            duration: Math.floor(Math.random() * 30) + 15 // 15-45 minutes
          }
        })

        attempts.push(attempt)

        // Create results for the attempt
        await prisma.interviewResult.create({
          data: {
            attemptId: attempt.id,
            overallScore: Math.floor(Math.random() * 30) + 70, // 70-100 score
            overallFeedback: `Good performance with room for improvement in ${i % 2 === 0 ? 'technical depth' : 'communication skills'}.`,
            strengths: ['Problem solving', 'Code structure', 'Basic concepts'],
            weaknesses: ['Advanced topics', 'Time management'],
            recommendations: ['Practice algorithms', 'Work on communication'],
            communication: Math.floor(Math.random() * 30) + 70,
            knowledge: Math.floor(Math.random() * 30) + 70,
            feedback: 'Solid foundation with growth potential'
          }
        })

        console.log(`Created attempt ${i + 1} for ${interview.title}`)
      }
    }

    console.log('Demo student interviews created successfully!')

  } catch (error) {
    console.error('Error creating demo student interviews:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createDemoStudentInterviews()
