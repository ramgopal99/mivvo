import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkQuestions() {
  try {
    console.log('🔍 Checking course questions in database...\n');

    // First check if exercises exist
    const exercises = await prisma.courseExercise.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        module: {
          select: {
            title: true,
            order: true
          }
        }
      }
    });

    console.log(`📊 Found ${exercises.length} exercises\n`);

    // Get all questions
    const allQuestions = await (prisma as any).courseQuestion.findMany({
      select: {
        id: true,
        question: true,
        type: true,
        order: true,
        data: true,
        exercise: {
          select: {
            title: true,
            type: true,
            module: {
              select: {
                title: true,
                order: true
              }
            }
          }
        }
      },
      orderBy: {
        exercise: {
          module: {
            order: 'asc'
          }
        }
      }
    });

    console.log(`📊 Found ${allQuestions.length} total questions\n`);

    if (allQuestions.length === 0) {
      console.log('❌ No questions found. Checking if courseQuestion table exists...\n');

      // Try to get the raw count from MongoDB
      const mongoUrl = process.env.DATABASE_URL;
      if (mongoUrl) {
        const { MongoClient } = require('mongodb');
        const mongoClient = new MongoClient(mongoUrl);
        try {
          await mongoClient.connect();
          const db = mongoClient.db();
          const collections = await db.listCollections().toArray();
          const collectionNames = collections.map((c: any) => c.name);
          console.log('📋 Available collections:', collectionNames);

          if (collectionNames.includes('course_questions')) {
            const count = await db.collection('course_questions').countDocuments();
            console.log(`📊 course_questions collection has ${count} documents`);
          } else {
            console.log('❌ course_questions collection does not exist');
          }
        } catch (error) {
          console.error('❌ MongoDB check failed:', error);
        } finally {
          await mongoClient.close();
        }
      }
      return;
    }

    // Group by module and type
    const byModule: Record<string, { mcq: number; code: number; total: number }> = {};

    allQuestions.forEach(q => {
      const moduleName = `Module ${q.exercise.module.order}: ${q.exercise.module.title}`;
      if (!byModule[moduleName]) {
        byModule[moduleName] = { mcq: 0, code: 0, total: 0 };
      }
      byModule[moduleName].total++;
      if (q.type === 'MCQ') {
        byModule[moduleName].mcq++;
      } else if (q.type === 'CODE') {
        byModule[moduleName].code++;
      }
    });

    console.log('📈 Questions by Module:');
    Object.entries(byModule).forEach(([module, counts]) => {
      console.log(`   ${module}:`);
      console.log(`     - MCQ: ${counts.mcq}`);
      console.log(`     - CODE: ${counts.code}`);
      console.log(`     - Total: ${counts.total}`);
      console.log('');
    });

    // Show first few questions as examples
    console.log('📝 Sample Questions:');
    const mcqSample = allQuestions.find(q => q.type === 'MCQ');
    const codeSample = allQuestions.find(q => q.type === 'CODE');

    if (mcqSample) {
      console.log('\n🎯 MCQ Example:');
      console.log(`   Module: ${mcqSample.exercise.module.title}`);
      console.log(`   Question: ${mcqSample.question.substring(0, 80)}...`);
      console.log(`   Data:`, JSON.stringify(mcqSample.data, null, 2));
    }

    if (codeSample) {
      console.log('\n💻 CODE Example:');
      console.log(`   Module: ${codeSample.exercise.module.title}`);
      console.log(`   Question: ${codeSample.question.substring(0, 80)}...`);
      console.log(`   Data:`, JSON.stringify(codeSample.data, null, 2));
    }

  } catch (error) {
    console.error('❌ Error checking questions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkQuestions();
