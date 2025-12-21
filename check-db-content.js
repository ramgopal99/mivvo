const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const exercises = await prisma.courseExercise.findMany({
      include: {
        mcqQuestions: true,
        codeQuestions: true
      }
    });
    console.log('Total exercises:', exercises.length);

    if (exercises.length > 0) {
      console.log('First exercise:', {
        id: exercises[0].id,
        title: exercises[0].title,
        type: exercises[0].type,
        mcqQuestions: exercises[0].mcqQuestions.length,
        codeQuestions: exercises[0].codeQuestions.length
      });
    }

    const mcqQuestions = await prisma.courseMcqQuestion.findMany();
    console.log('Total MCQ questions:', mcqQuestions.length);

    if (mcqQuestions.length > 0) {
      console.log('Sample MCQ question:', {
        question: mcqQuestions[0].question.substring(0, 50) + '...',
        options: mcqQuestions[0].options.length
      });
    }

    // Check a specific exercise with its questions
    const exerciseWithQuestions = await prisma.courseExercise.findFirst({
      include: {
        mcqQuestions: true,
        codeQuestions: true
      }
    });

    if (exerciseWithQuestions) {
      console.log('Exercise with questions:', {
        title: exerciseWithQuestions.title,
        type: exerciseWithQuestions.type,
        mcqCount: exerciseWithQuestions.mcqQuestions.length,
        codeCount: exerciseWithQuestions.codeQuestions.length
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();
