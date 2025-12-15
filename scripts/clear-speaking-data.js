const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearSpeakingData() {
  try {
    console.log('🧹 Starting to clear all speaking data...');

    // Delete in reverse order of dependencies to avoid foreign key constraint errors

    // 1. Delete speaking results
    const resultsDeleted = await prisma.speakingResult.deleteMany();
    console.log(`✅ Deleted ${resultsDeleted.count} speaking results`);

    // 2. Delete speaking overall results
    const overallResultsDeleted = await prisma.speakingOverallResult.deleteMany();
    console.log(`✅ Deleted ${overallResultsDeleted.count} speaking overall results`);

    // 3. Delete speaking attempts
    const attemptsDeleted = await prisma.speakingAttempt.deleteMany();
    console.log(`✅ Deleted ${attemptsDeleted.count} speaking attempts`);

    // 4. Delete speaking questions
    const questionsDeleted = await prisma.speakingQuestion.deleteMany();
    console.log(`✅ Deleted ${questionsDeleted.count} speaking questions`);

    // 5. Delete speaking sessions (this should be last as other tables reference it)
    const sessionsDeleted = await prisma.speakingSession.deleteMany();
    console.log(`✅ Deleted ${sessionsDeleted.count} speaking sessions`);

    // Also clean up any UserLevelProgress entries for SPEAKING skill type
    const progressDeleted = await prisma.userLevelProgress.deleteMany({
      where: {
        skillType: 'SPEAKING'
      }
    });
    console.log(`✅ Deleted ${progressDeleted.count} speaking-related user level progress entries`);

    console.log('🎉 All speaking data has been successfully cleared!');

  } catch (error) {
    console.error('❌ Error clearing speaking data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  clearSpeakingData()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { clearSpeakingData };
