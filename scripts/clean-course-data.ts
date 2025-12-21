import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function cleanCourseData() {
  try {
    console.log('🧹 Starting course data cleanup...');

    // Delete in reverse order of dependencies to avoid foreign key constraints

    // 1. Delete course user progress (no dependencies)
    console.log('🗑️ Deleting course user progress...');
    const deletedProgress = await prisma.courseUserProgress.deleteMany({});
    console.log(`✅ Deleted ${deletedProgress.count} user progress records`);

    // 2. Delete MCQ questions (depend on course exercises)
    console.log('🗑️ Deleting MCQ questions...');
    const deletedMcqQuestions = await prisma.courseMcqQuestion.deleteMany({});
    console.log(`✅ Deleted ${deletedMcqQuestions.count} MCQ questions`);

    // 3. Delete code questions (depend on course exercises)
    console.log('🗑️ Deleting code questions...');
    const deletedCodeQuestions = await prisma.courseCodeQuestion.deleteMany({});
    console.log(`✅ Deleted ${deletedCodeQuestions.count} code questions`);

    // 4. Delete formulas (depend on course modules)
    console.log('🗑️ Deleting course formulas...');
    const deletedFormulas = await prisma.courseFormula.deleteMany({});
    console.log(`✅ Deleted ${deletedFormulas.count} formulas`);

    // 5. Delete course exercises (depend on course modules)
    console.log('🗑️ Deleting course exercises...');
    const deletedExercises = await prisma.courseExercise.deleteMany({});
    console.log(`✅ Deleted ${deletedExercises.count} exercises`);

    // 6. Delete course topics (depend on course modules)
    console.log('🗑️ Deleting course topics...');
    const deletedTopics = await prisma.courseTopic.deleteMany({});
    console.log(`✅ Deleted ${deletedTopics.count} topics`);

    // 7. Delete course modules (depend on courses)
    console.log('🗑️ Deleting course modules...');
    const deletedModules = await prisma.courseModule.deleteMany({});
    console.log(`✅ Deleted ${deletedModules.count} modules`);

    // 8. Delete courses (no remaining dependencies)
    console.log('🗑️ Deleting courses...');
    const deletedCourses = await prisma.course.deleteMany({});
    console.log(`✅ Deleted ${deletedCourses.count} courses`);

    console.log('\n🎉 Course data cleanup completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${deletedCourses.count} Courses deleted`);
    console.log(`   - ${deletedModules.count} Modules deleted`);
    console.log(`   - ${deletedTopics.count} Topics deleted`);
    console.log(`   - ${deletedExercises.count} Exercises deleted`);
    console.log(`   - ${deletedMcqQuestions.count} MCQ questions deleted`);
    console.log(`   - ${deletedCodeQuestions.count} Code questions deleted`);
    console.log(`   - ${deletedFormulas.count} Formulas deleted`);
    console.log(`   - ${deletedProgress.count} User progress records deleted`);

  } catch (error) {
    console.error('❌ Error during course data cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup script
cleanCourseData();