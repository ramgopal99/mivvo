import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

async function debugDatabase() {
  try {
    const mongoUrl = process.env.DATABASE_URL;
    if (!mongoUrl) {
      console.log('❌ DATABASE_URL not found');
      return;
    }

    const mongoClient = new MongoClient(mongoUrl);
    await mongoClient.connect();
    const db = mongoClient.db();

    console.log('🔍 Checking database collections...\n');

    // List all collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c: any) => c.name);
    console.log('📋 All collections:', collectionNames.sort());

    // Check specific collections
    const courseCollections = [
      'courses',
      'course_modules',
      'course_topics',
      'course_exercises',
      'course_questions',
      'course_mcq_questions',
      'course_code_questions'
    ];

    console.log('\n📊 Course-related collections:');
    for (const collName of courseCollections) {
      if (collectionNames.includes(collName)) {
        const count = await db.collection(collName).countDocuments();
        console.log(`   ✅ ${collName}: ${count} documents`);
      } else {
        console.log(`   ❌ ${collName}: collection not found`);
      }
    }

    // Check course_questions content if it exists
    if (collectionNames.includes('course_questions')) {
      console.log('\n📝 Sample course_questions documents:');
      const questions = await db.collection('course_questions').find({}).limit(3).toArray();
      questions.forEach((q, i) => {
        console.log(`\n${i + 1}. Question: ${q.question?.substring(0, 50)}...`);
        console.log(`   Type: ${q.type}`);
        console.log(`   Data keys: ${Object.keys(q.data || {})}`);
      });
    }

    await mongoClient.close();

  } catch (error) {
    console.error('❌ Error debugging database:', error);
  }
}

debugDatabase();
