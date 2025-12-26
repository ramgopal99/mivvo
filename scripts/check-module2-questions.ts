import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkModule2Questions() {
  try {
    console.log('🔍 Checking all questions in Module 2...\n');

    const mongoUrl = process.env.DATABASE_URL;
    if (!mongoUrl) {
      console.log('❌ DATABASE_URL not found');
      return;
    }

    const mongoClient = new MongoClient(mongoUrl);
    await mongoClient.connect();
    const db = mongoClient.db();

    // Find module 2
    const module = await db.collection('course_modules').findOne({
      courseId: 'python',
      order: 2
    });

    if (!module) {
      console.log('❌ Module 2 not found!');
      await mongoClient.close();
      return;
    }

    console.log(`✅ Found Module 2: ${module.title}`);

    // Find all exercises in module 2
    const exercises = await db.collection('course_exercises').find({
      courseModuleId: module._id
    }).toArray();

    console.log(`📊 Found ${exercises.length} exercises in Module 2:\n`);

    for (const exercise of exercises) {
      console.log(`🎯 Exercise: ${exercise.title} (${exercise.type})`);

      // Find questions for this exercise
      const questions = await db.collection('course_questions').find({
        courseExerciseId: exercise._id
      }).sort({ order: 1 }).toArray();

      console.log(`   📋 Questions: ${questions.length}`);

      if (questions.length > 0) {
        questions.forEach((q, index) => {
          const qNum = index + 1;
          console.log(`      ${qNum}. ${q.question.substring(0, 60)}...`);
          if (q.type === 'MCQ' && q.data && q.data.options) {
            console.log(`         Options: ${q.data.options.length}`);
          }
        });
      }

      console.log('');
    }

    await mongoClient.close();

  } catch (error) {
    console.error('❌ Error checking module:', error);
  }
}

checkModule2Questions();


