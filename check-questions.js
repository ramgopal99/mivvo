const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const questions = await prisma.courseMcqQuestion.findMany({
      take: 5,
      select: {
        question: true,
        options: true
      }
    });

    console.log('Sample MCQ Questions:');
    questions.forEach((q, i) => {
      console.log(`Q${i+1}: ${q.question.substring(0, 100)}...`);
      console.log('Options:', q.options.length);
      console.log('---');
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
})();
