import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyParsing() {
  try {
    console.log('🔍 Verifying MCQ parsing for Module 3...\n');

    // Get the first few MCQ questions from module 3
    const mcqQuestions = await prisma.courseMcqQuestion.findMany({
      where: {
        exercise: {
          module: {
            courseId: 'python',
            order: 3
          },
          type: 'MCQ'
        }
      },
      select: {
        question: true,
        options: true,
        correctAnswer: true,
        order: true
      },
      orderBy: {
        order: 'asc'
      },
      take: 3
    });

    console.log(`Found ${mcqQuestions.length} MCQ questions in Module 3:\n`);

    mcqQuestions.forEach((q, index) => {
      console.log(`${index + 1}. ${q.question}`);
      console.log(`   Options (${q.options.length}):`);
      q.options.forEach((option, i) => {
        const marker = i === q.correctAnswer ? '✅' : '  ';
        console.log(`   ${marker} ${i}: "${option}"`);
      });
      console.log('');
    });

    // Also check code questions
    console.log('🔍 Verifying Code Exercise parsing for Module 3...\n');

    const codeQuestions = await prisma.courseCodeQuestion.findMany({
      where: {
        exercise: {
          module: {
            courseId: 'python',
            order: 3
          },
          type: 'CODE'
        }
      },
      select: {
        question: true,
        order: true
      },
      orderBy: {
        order: 'asc'
      },
      take: 2
    });

    console.log(`Found ${codeQuestions.length} Code questions in Module 3:\n`);

    codeQuestions.forEach((q, index) => {
      console.log(`${index + 1}. Question (length: ${q.question.length} chars)`);
      console.log(`   Preview: ${q.question.substring(0, 100)}...`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error verifying parsing:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyParsing();
