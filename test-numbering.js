const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const modules = await prisma.courseModule.findMany({
      where: { courseId: 'python' },
      include: {
        topics: { orderBy: { order: 'asc' } },
        exercises: { orderBy: { order: 'asc' } }
      },
      orderBy: { order: 'asc' }
    });

    modules.slice(0, 2).forEach(module => {
      console.log(`Module ${module.order}: ${module.title}`);
      console.log(`  Topics: ${module.topics.length} (${module.topics.map(t => `${module.order}.${t.order}`).join(', ')})`);
      console.log(`  Exercises: ${module.exercises.length} (${module.exercises.map(e => `${module.order}.${module.topics.length + e.order}`).join(', ')})`);
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();
