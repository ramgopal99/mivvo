const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearMcqData() {
  try {
    console.log('🧹 Starting to clear all MCQ data...');

    // Delete in reverse order of dependencies to avoid foreign key constraint errors

    // 1. Delete MCQ overall results
    const mcqOverallResultsDeleted = await prisma.mcqOverallResult.deleteMany();
    console.log(`✅ Deleted ${mcqOverallResultsDeleted.count} MCQ overall results`);

    // 2. Delete MCQ individual results
    const mcqResultsDeleted = await prisma.mcqResult.deleteMany();
    console.log(`✅ Deleted ${mcqResultsDeleted.count} MCQ individual results`);

    // 3. Delete MCQ attempts
    const mcqAttemptsDeleted = await prisma.mcqAttempt.deleteMany();
    console.log(`✅ Deleted ${mcqAttemptsDeleted.count} MCQ attempts`);

    // 4. Delete MCQ questions
    const mcqQuestionsDeleted = await prisma.mcqQuestion.deleteMany();
    console.log(`✅ Deleted ${mcqQuestionsDeleted.count} MCQ questions`);

    // 5. Delete MCQ sessions (this should be last as other tables reference it)
    const mcqSessionsDeleted = await prisma.mcqSession.deleteMany();
    console.log(`✅ Deleted ${mcqSessionsDeleted.count} MCQ sessions`);

    // Also clean up any UserLevelProgress entries for MCQ skill type
    const progressDeleted = await prisma.userLevelProgress.deleteMany({
      where: {
        skillType: 'MCQ'
      }
    });
    console.log(`✅ Deleted ${progressDeleted.count} MCQ-related user level progress entries`);

    console.log('🎉 All MCQ data has been successfully cleared!');

  } catch (error) {
    console.error('❌ Error clearing MCQ data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  clearMcqData()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { clearMcqData };

