import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkExercises() {
  try {
    console.log('Checking exercises in Module 3...');

    const exercises = await prisma.courseExercise.findMany({
      where: {
        courseModule: {
          courseId: 'python',
          order: 3
        }
      },
      select: {
        title: true,
        type: true,
        order: true
      },
      orderBy: {
        order: 'asc'
      }
    });

    console.log('Exercises in Module 3:');
    exercises.forEach(exercise => {
      console.log(`- Title: "${exercise.title}", Type: ${exercise.type}, Order: ${exercise.order}`);
    });

  } catch (error) {
    console.error('Error checking exercises:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkExercises();




