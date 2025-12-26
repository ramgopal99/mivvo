import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkCodeSolution() {
  try {
    console.log('🔍 Checking CODE question solution formatting...\n');

    const mongoUrl = process.env.DATABASE_URL;
    if (!mongoUrl) {
      console.log('❌ DATABASE_URL not found');
      return;
    }

    const mongoClient = new MongoClient(mongoUrl);
    await mongoClient.connect();
    const db = mongoClient.db();

    // Find a CODE question
    const question = await db.collection('course_questions').findOne({
      type: 'CODE'
    });

    if (!question) {
      console.log('❌ No CODE questions found!');
      await mongoClient.close();
      return;
    }

    console.log('✅ Found CODE question:');
    console.log(`Question: ${question.question}`);
    console.log(`Type: ${question.type}`);

    if (question.data && question.data.solution) {
      console.log('\n📝 Solution (raw):');
      console.log(`"${question.data.solution}"`);

      console.log('\n📝 Solution (formatted):');
      console.log(question.data.solution);

      console.log('\n📊 Analysis:');
      console.log(`Length: ${question.data.solution.length}`);
      console.log(`Contains \\n: ${question.data.solution.includes('\\n')}`);
      console.log(`Contains actual newlines: ${question.data.solution.includes('\n')}`);

      // Check for common escape sequences
      const escapePatterns = ['\\n', '\\t', '\\r', '\\"', "\\'"];
      escapePatterns.forEach(pattern => {
        if (question.data.solution.includes(pattern)) {
          console.log(`Contains ${pattern}: YES`);
        }
      });
    } else {
      console.log('❌ Solution data is missing!');
    }

    await mongoClient.close();

  } catch (error) {
    console.error('❌ Error checking solution:', error);
  }
}

checkCodeSolution();


