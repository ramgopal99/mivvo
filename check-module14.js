const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkModule14() {
  try {
    const course = await prisma.course.findUnique({
      where: { courseId: 'python' },
      include: {
        modules: {
          where: { order: 14 },
          include: {
            topics: true,
            exercises: true
          }
        }
      }
    });

    if (!course) {
      console.log('❌ No Python course found');
      return;
    }

    const module14 = course.modules[0];
    if (!module14) {
      console.log('❌ Module 14 not found in database');
      return;
    }

    console.log('✅ Module 14 found:', module14.title);
    console.log('📊 Topics:', module14.topics.length);
    console.log('📊 Exercises:', module14.exercises.length);

    module14.topics.forEach(topic => {
      console.log(`  Topic: ${topic.title} (id: ${topic.id}) - content length: ${topic.content?.length || 0}`);
    });

    module14.exercises.forEach(exercise => {
      console.log(`  Exercise: ${exercise.title} (id: ${exercise.id}) - content length: ${exercise.content?.length || 0}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkModule14();
