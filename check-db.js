const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            topics: true,
            exercises: true
          }
        }
      }
    });
    console.log('Courses found:', courses.length);
    if (courses.length > 0) {
      console.log('First course:', {
        id: courses[0].id,
        courseId: courses[0].courseId,
        displayName: courses[0].displayName,
        modules: courses[0].modules.length,
        topics: courses[0].modules.reduce((acc, m) => acc + m.topics.length, 0),
        exercises: courses[0].modules.reduce((acc, m) => acc + m.exercises.length, 0)
      });
    }

    // Check modules separately
    const modules = await prisma.courseModule.findMany({
      include: {
        topics: true,
        exercises: true
      }
    });
    console.log('Total modules in database:', modules.length);

    if (modules.length > 0) {
      console.log('First module:', {
        id: modules[0].id,
        title: modules[0].title,
        order: modules[0].order,
        courseId: modules[0].courseId,
        topics: modules[0].topics.length,
        exercises: modules[0].exercises.length
      });
    }

    // Check topics separately
    const topics = await prisma.courseTopic.findMany();
    console.log('Total topics in database:', topics.length);

    // Check exercises separately
    const exercises = await prisma.courseExercise.findMany();
    console.log('Total exercises in database:', exercises.length);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();
