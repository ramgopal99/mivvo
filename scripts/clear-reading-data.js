const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearReadingData() {
  try {
    console.log('🧹 Starting to clear all reading data...');

    // Delete in reverse order of dependencies to avoid foreign key constraint errors

    // 1. Delete comprehension results
    const comprehensionResultsDeleted = await prisma.readingComprehensionResult.deleteMany();
    console.log(`✅ Deleted ${comprehensionResultsDeleted.count} reading comprehension results`);

    // 2. Delete rearrange results
    const rearrangeResultsDeleted = await prisma.readingRearrangeResult.deleteMany();
    console.log(`✅ Deleted ${rearrangeResultsDeleted.count} reading rearrange results`);

    // 3. Delete overall results
    const overallResultsDeleted = await prisma.readingOverallResult.deleteMany();
    console.log(`✅ Deleted ${overallResultsDeleted.count} reading overall results`);

    // 4. Delete reading attempts
    const attemptsDeleted = await prisma.readingAttempt.deleteMany();
    console.log(`✅ Deleted ${attemptsDeleted.count} reading attempts`);

    // 5. Delete comprehension questions
    const comprehensionDeleted = await prisma.readingComprehension.deleteMany();
    console.log(`✅ Deleted ${comprehensionDeleted.count} reading comprehension questions`);

    // 6. Delete rearrange tasks
    const rearrangeDeleted = await prisma.readingRearrange.deleteMany();
    console.log(`✅ Deleted ${rearrangeDeleted.count} reading rearrange tasks`);

    // 7. Delete reading sessions (this should be last as other tables reference it)
    const sessionsDeleted = await prisma.readingSession.deleteMany();
    console.log(`✅ Deleted ${sessionsDeleted.count} reading sessions`);

    // Also clean up any UserLevelProgress entries for READING skill type
    const progressDeleted = await prisma.userLevelProgress.deleteMany({
      where: {
        skillType: 'READING'
      }
    });
    console.log(`✅ Deleted ${progressDeleted.count} reading-related user level progress entries`);

    console.log('🎉 All reading data has been successfully cleared!');

  } catch (error) {
    console.error('❌ Error clearing reading data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  clearReadingData()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { clearReadingData };