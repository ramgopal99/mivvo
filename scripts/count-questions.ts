import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function countQuestions() {
  try {
    console.log('🔍 Counting MCQ and CODE questions by module...\n');

    // Get all MCQ questions with module info
    const mcqQuestions = await prisma.courseMcqQuestion.findMany({
      select: {
        id: true,
        exercise: {
          select: {
            module: {
              select: {
                title: true,
                order: true
              }
            }
          }
        }
      }
    });

    // Get all CODE questions with module info
    const codeQuestions = await prisma.courseCodeQuestion.findMany({
      select: {
        id: true,
        exercise: {
          select: {
            module: {
              select: {
                title: true,
                order: true
              }
            }
          }
        }
      }
    });

    console.log(`📊 Total MCQ questions: ${mcqQuestions.length}`);
    console.log(`📊 Total CODE questions: ${codeQuestions.length}`);
    console.log(`📊 Total questions: ${mcqQuestions.length + codeQuestions.length}\n`);

    // Group by module
    const mcqByModule: Record<string, number> = {};
    const codeByModule: Record<string, number> = {};

    mcqQuestions.forEach(q => {
      const moduleKey = `Module ${q.exercise.module.order}: ${q.exercise.module.title}`;
      mcqByModule[moduleKey] = (mcqByModule[moduleKey] || 0) + 1;
    });

    codeQuestions.forEach(q => {
      const moduleKey = `Module ${q.exercise.module.order}: ${q.exercise.module.title}`;
      codeByModule[moduleKey] = (codeByModule[moduleKey] || 0) + 1;
    });

    console.log('📈 Questions by Module:');
    const allModules = new Set([...Object.keys(mcqByModule), ...Object.keys(codeByModule)]);

    Array.from(allModules).sort((a, b) => {
      const aOrder = parseInt(a.match(/Module (\d+):/)?.[1] || '0');
      const bOrder = parseInt(b.match(/Module (\d+):/)?.[1] || '0');
      return aOrder - bOrder;
    }).forEach(module => {
      const mcq = mcqByModule[module] || 0;
      const code = codeByModule[module] || 0;
      console.log(`   ${module}:`);
      console.log(`     - MCQ: ${mcq}`);
      console.log(`     - CODE: ${code}`);
      console.log(`     - Total: ${mcq + code}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error counting questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

countQuestions();






