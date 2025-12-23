import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkQuestion15() {
  try {
    console.log('🔍 Checking MCQ Question 15: "Which of these creates a list of squares from 0 to 4?"\n');

    const mongoUrl = process.env.DATABASE_URL;
    if (!mongoUrl) {
      console.log('❌ DATABASE_URL not found');
      return;
    }

    const mongoClient = new MongoClient(mongoUrl);
    await mongoClient.connect();
    const db = mongoClient.db();

    // Find the MCQ exercise in module 2
    const exercise = await db.collection('course_exercises').findOne({
      courseModuleId: {
        $in: await db.collection('course_modules').find({
          courseId: 'python',
          order: 2
        }).project({ _id: 1 }).map(doc => doc._id).toArray()
      },
      type: 'MCQ'
    });

    if (!exercise) {
      console.log('❌ MCQ exercise not found in Module 2!');
      await mongoClient.close();
      return;
    }

    console.log('✅ Found MCQ exercise in Module 2');

    // Find question 15
    const question = await db.collection('course_questions').findOne({
      courseExerciseId: exercise._id,
      type: 'MCQ',
      order: 15
    });

    if (!question) {
      console.log('❌ Question 15 not found!');
      await mongoClient.close();
      return;
    }

    console.log('✅ Found Question 15:');
    console.log(`Question: ${question.question}`);
    console.log(`Type: ${question.type}`);
    console.log(`Order: ${question.order}`);

    if (question.data) {
      console.log('\n📋 Options:');
      if (question.data.options && Array.isArray(question.data.options)) {
        question.data.options.forEach((option: string, index: number) => {
          const marker = index === question.data.correctAnswer ? '✅' : '  ';
          console.log(`   ${marker} ${index}: "${option}"`);
        });
      } else {
        console.log('❌ Options array is missing or not an array!');
        console.log('Raw data:', question.data);
      }

      if (question.data.explanation) {
        console.log(`\n💡 Explanation: ${question.data.explanation}`);
      }

      console.log(`\n🎯 Correct Answer Index: ${question.data.correctAnswer}`);
    } else {
      console.log('❌ Question data is missing!');
    }

    await mongoClient.close();

  } catch (error) {
    console.error('❌ Error checking question:', error);
  }
}

checkQuestion15();
