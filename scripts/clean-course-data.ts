import { PrismaClient } from '@prisma/client';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function cleanCourseData() {
  try {
    console.log('🧹 Starting course data cleanup...');
    console.log('⚠️  WARNING: This will delete ALL course-related data from the database!');
    console.log('');

    // Delete in reverse order of dependencies to avoid foreign key constraints

    // 1. Delete course user progress (depends on Course, CourseModule, User)
    console.log('🗑️ Deleting course user progress...');
    const deletedProgress = await prisma.courseUserProgress.deleteMany({});
    console.log(`✅ Deleted ${deletedProgress.count} user progress records`);


    // 3. Delete MCQ questions (depend on course exercises)
    console.log('🗑️ Deleting MCQ questions...');
    const deletedMcqQuestions = await prisma.courseMcqQuestion.deleteMany({});
    console.log(`✅ Deleted ${deletedMcqQuestions.count} MCQ questions`);

    // 4. Delete code questions (depend on course exercises)
    console.log('🗑️ Deleting code questions...');
    const deletedCodeQuestions = await prisma.courseCodeQuestion.deleteMany({});
    console.log(`✅ Deleted ${deletedCodeQuestions.count} code questions`);

    // 5. Delete formulas (depend on course modules)
    console.log('🗑️ Deleting course formulas...');
    const deletedFormulas = await prisma.courseFormula.deleteMany({});
    console.log(`✅ Deleted ${deletedFormulas.count} formulas`);

    // 6. Delete course exercises (depend on course modules)
    console.log('🗑️ Deleting course exercises...');
    const deletedExercises = await prisma.courseExercise.deleteMany({});
    console.log(`✅ Deleted ${deletedExercises.count} exercises`);

    // 7. Delete course topics (depend on course modules)
    console.log('🗑️ Deleting course topics...');
    const deletedTopics = await prisma.courseTopic.deleteMany({});
    console.log(`✅ Deleted ${deletedTopics.count} topics`);

    // 8. Delete course modules (depend on courses)
    console.log('🗑️ Deleting course modules...');
    const deletedModules = await prisma.courseModule.deleteMany({});
    console.log(`✅ Deleted ${deletedModules.count} modules`);

    // 9. Delete courses (no remaining dependencies)
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

    const totalDeleted = deletedCourses.count + deletedModules.count + deletedTopics.count +
                         deletedExercises.count + deletedMcqQuestions.count + deletedCodeQuestions.count +
                         deletedFormulas.count + deletedProgress.count;
    console.log(`\n📈 Total records deleted: ${totalDeleted}`);

    // Now drop the collections themselves using MongoDB native client
    console.log('\n🗑️ Dropping course-related collections...');
    
    const mongoUrl = process.env.DATABASE_URL;
    if (!mongoUrl) {
      console.log('⚠️  DATABASE_URL not found, skipping collection drops');
    } else {
      const mongoClient = new MongoClient(mongoUrl);
      try {
        await mongoClient.connect();
        const db = mongoClient.db();
        
        const collectionsToDrop = [
          'course_user_progress',
          'course_mcq_questions',
          'course_code_questions',
          'course_formulas',
          'course_exercises',
          'course_topics',
          'course_modules',
          'courses'
        ];

        for (const collectionName of collectionsToDrop) {
          try {
            const collection = db.collection(collectionName);
            await collection.drop();
            console.log(`✅ Dropped collection: ${collectionName}`);
          } catch (error: any) {
            // Collection might not exist, which is fine
            const errorMsg = error.message || String(error);
            if (errorMsg.includes('ns not found') || 
                errorMsg.includes('does not exist') ||
                errorMsg.includes('not found') ||
                errorMsg.includes('collection not found')) {
              console.log(`ℹ️  Collection ${collectionName} does not exist (skipping)`);
            } else {
              console.error(`❌ Error dropping collection ${collectionName}:`, errorMsg);
            }
          }
        }

        console.log('\n🎉 All course collections dropped successfully!');
        await mongoClient.close();
      } catch (error: any) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        await mongoClient.close();
      }
    }

  } catch (error) {
    console.error('❌ Error during course data cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup script
cleanCourseData();