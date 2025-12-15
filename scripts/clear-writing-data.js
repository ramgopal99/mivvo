const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearWritingData() {
  try {
    console.log('🧹 Starting to clear all writing data...');

    // Delete in reverse order of dependencies to avoid foreign key constraint errors

    // 1. Delete writing topic results
    const topicResultsDeleted = await prisma.writingTopicResult.deleteMany();
    console.log(`✅ Deleted ${topicResultsDeleted.count} writing topic results`);

    // 2. Delete writing chat results
    const chatResultsDeleted = await prisma.writingChatResult.deleteMany();
    console.log(`✅ Deleted ${chatResultsDeleted.count} writing chat results`);

    // 3. Delete writing overall results
    const overallResultsDeleted = await prisma.writingOverallResult.deleteMany();
    console.log(`✅ Deleted ${overallResultsDeleted.count} writing overall results`);

    // 4. Delete writing attempts
    const attemptsDeleted = await prisma.writingAttempt.deleteMany();
    console.log(`✅ Deleted ${attemptsDeleted.count} writing attempts`);

    // 5. Delete writing topics
    const topicsDeleted = await prisma.writingTopic.deleteMany();
    console.log(`✅ Deleted ${topicsDeleted.count} writing topics`);

    // 6. Delete writing chat scenarios
    const chatScenariosDeleted = await prisma.writingChatScenario.deleteMany();
    console.log(`✅ Deleted ${chatScenariosDeleted.count} writing chat scenarios`);

    // 7. Delete writing sessions (this should be last as other tables reference it)
    const sessionsDeleted = await prisma.writingSession.deleteMany();
    console.log(`✅ Deleted ${sessionsDeleted.count} writing sessions`);

    // Also clean up any UserLevelProgress entries for WRITING skill type
    const progressDeleted = await prisma.userLevelProgress.deleteMany({
      where: {
        skillType: 'WRITING'
      }
    });
    console.log(`✅ Deleted ${progressDeleted.count} writing-related user level progress entries`);

    console.log('🎉 All writing data has been successfully cleared!');

  } catch (error) {
    console.error('❌ Error clearing writing data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  clearWritingData()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { clearWritingData };