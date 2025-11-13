import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanCourseData() {
  console.log('🧹 Starting cleanup of all course-related data...');

  try {
    // Delete in reverse order of dependencies to avoid foreign key constraints

    console.log('🗑️  Deleting MCQ questions...');
    const mcqQuestionsDeleted = await prisma.mCQQuestion.deleteMany();
    console.log(`✅ Deleted ${mcqQuestionsDeleted.count} MCQ questions`);

    console.log('🗑️  Deleting code questions...');
    const codeQuestionsDeleted = await prisma.codeQuestion.deleteMany();
    console.log(`✅ Deleted ${codeQuestionsDeleted.count} code questions`);

    console.log('🗑️  Deleting exercises...');
    const exercisesDeleted = await prisma.exercise.deleteMany();
    console.log(`✅ Deleted ${exercisesDeleted.count} exercises`);

    console.log('🗑️  Deleting sub-lessons...');
    const subLessonsDeleted = await prisma.subLesson.deleteMany();
    console.log(`✅ Deleted ${subLessonsDeleted.count} sub-lessons`);

    console.log('🗑️  Deleting modules...');
    const modulesDeleted = await prisma.module.deleteMany();
    console.log(`✅ Deleted ${modulesDeleted.count} modules`);

    console.log('🗑️  Deleting courses...');
    const coursesDeleted = await prisma.course.deleteMany();
    console.log(`✅ Deleted ${coursesDeleted.count} courses`);

    console.log('\n🎉 Database cleanup completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Courses deleted: ${coursesDeleted.count}`);
    console.log(`   - Modules deleted: ${modulesDeleted.count}`);
    console.log(`   - Sub-lessons deleted: ${subLessonsDeleted.count}`);
    console.log(`   - Exercises deleted: ${exercisesDeleted.count}`);
    console.log(`   - MCQ questions deleted: ${mcqQuestionsDeleted.count}`);
    console.log(`   - Code questions deleted: ${codeQuestionsDeleted.count}`);

    const totalDeleted = coursesDeleted.count + modulesDeleted.count +
                        subLessonsDeleted.count + exercisesDeleted.count +
                        mcqQuestionsDeleted.count + codeQuestionsDeleted.count;

    console.log(`   - Total records deleted: ${totalDeleted}`);

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
cleanCourseData()
  .then(() => {
    console.log('✅ Cleanup script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Cleanup script failed:', error);
    process.exit(1);
  });
