const { PrismaClient } = require('@prisma/client');

async function checkProgress() {
  const prisma = new PrismaClient();

  try {
    // Get all progress records for the logical course
    const progressRecords = await prisma.courseUserProgress.findMany({
      where: {
        courseId: 'cmjofs44s0002tri80mx2hsf2', // Course ID from logs
      },
      select: {
        itemKey: true,
        isCompleted: true,
        itemType: true,
        userId: true,
        createdAt: true
      }
    });

    console.log('All progress records for logical course:');
    progressRecords.forEach(record => {
      console.log(`${record.itemKey}: ${record.isCompleted} (${record.itemType})`);
    });

    // Check specifically for module-1-topic-1
    const firstTopicRecord = progressRecords.find(r => r.itemKey === 'module-1-topic-1');
    console.log('\nFirst topic record:', firstTopicRecord);

    // Check if there are any records starting with module-1-topic
    const module1Records = progressRecords.filter(r => r.itemKey.startsWith('module-1-topic'));
    console.log('\nModule 1 topic records:', module1Records);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProgress();
