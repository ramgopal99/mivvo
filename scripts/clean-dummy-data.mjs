import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanDummyData() {
  try {
    console.log('🧹 Starting dummy data cleanup...')

    // Delete in reverse order of dependencies to avoid foreign key constraint errors

    // 1. Delete InterviewConversation records
    const deletedConversations = await prisma.interviewConversation.deleteMany({})
    console.log(`🗑️  Deleted ${deletedConversations.count} interview conversations`)

    // 2. Delete InterviewResult records
    const deletedResults = await prisma.interviewResult.deleteMany({})
    console.log(`🗑️  Deleted ${deletedResults.count} interview results`)

    // 3. Delete InterviewAttempt records
    const deletedAttempts = await prisma.interviewAttempt.deleteMany({})
    console.log(`🗑️  Deleted ${deletedAttempts.count} interview attempts`)

    // 4. Delete InterviewPrompt records
    const deletedPrompts = await prisma.interviewPrompt.deleteMany({})
    console.log(`🗑️  Deleted ${deletedPrompts.count} interview prompts`)

    // 5. Delete MockInterview records
    const deletedInterviews = await prisma.mockInterview.deleteMany({})
    console.log(`🗑️  Deleted ${deletedInterviews.count} mock interviews`)

    // 6. Delete User records (dummy students)
    // Only delete users that match our dummy data emails
    const dummyEmails = [
      'rahul.sharma@techuniversity.edu',
      'priya.patel@techuniversity.edu',
      'amit.kumar@techuniversity.edu',
      'sneha.reddy@techuniversity.edu',
      'vikram.singh@techuniversity.edu'
    ]

    const deletedUsers = await prisma.user.deleteMany({
      where: {
        email: {
          in: dummyEmails
        }
      }
    })
    console.log(`🗑️  Deleted ${deletedUsers.count} dummy users`)

    // 7. Delete College records (dummy college)
    const deletedColleges = await prisma.college.deleteMany({
      where: {
        collegeId: 'TECH_UNIV_001'
      }
    })
    console.log(`🗑️  Deleted ${deletedColleges.count} dummy colleges`)

    // Optional: Delete any orphaned Account and Session records
    const deletedAccounts = await prisma.account.deleteMany({
      where: {
        userId: {
          in: [] // This will be empty since we deleted the users
        }
      }
    })

    const deletedSessions = await prisma.session.deleteMany({
      where: {
        userId: {
          in: [] // This will be empty since we deleted the users
        }
      }
    })

    console.log(`🗑️  Deleted ${deletedAccounts.count} orphaned accounts`)
    console.log(`🗑️  Deleted ${deletedSessions.count} orphaned sessions`)

    console.log('\n🎉 Dummy data cleanup completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   • ${deletedConversations.count} Interview conversations removed`)
    console.log(`   • ${deletedResults.count} Interview results removed`)
    console.log(`   • ${deletedAttempts.count} Interview attempts removed`)
    console.log(`   • ${deletedPrompts.count} Interview prompts removed`)
    console.log(`   • ${deletedInterviews.count} Mock interviews removed`)
    console.log(`   • ${deletedUsers.count} Dummy users removed`)
    console.log(`   • ${deletedColleges.count} Dummy colleges removed`)
    console.log(`   • ${deletedAccounts.count} Orphaned accounts removed`)
    console.log(`   • ${deletedSessions.count} Orphaned sessions removed`)

    const totalDeleted = deletedConversations.count + deletedResults.count +
                        deletedAttempts.count + deletedPrompts.count +
                        deletedInterviews.count + deletedUsers.count +
                        deletedColleges.count + deletedAccounts.count +
                        deletedSessions.count

    console.log(`\n💡 Total records removed: ${totalDeleted}`)
    console.log('✅ Database is now clean and ready for fresh seeding!')

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the cleanup function
cleanDummyData()
  .catch((e) => {
    console.error('❌ Cleanup failed:', e)
    process.exit(1)
  })
