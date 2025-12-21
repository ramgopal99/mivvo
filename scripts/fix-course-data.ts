import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function fixCourseData() {
  try {
    console.log('🔧 Fixing course data issues...');

    // Get MongoDB connection string from environment
    const mongoUrl = process.env.DATABASE_URL;
    if (!mongoUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Connect to MongoDB directly
    const client = new MongoClient(mongoUrl);
    await client.connect();

    const db = client.db();
    const coursesCollection = db.collection('courses');

    // Find courses with null or empty courseId
    const coursesWithNullCourseId = await coursesCollection.find({
      $or: [
        { courseId: null },
        { courseId: { $exists: false } },
        { courseId: '' }
      ]
    }).toArray();

    console.log(`Found ${coursesWithNullCourseId.length} courses with null/empty courseId`);

    if (coursesWithNullCourseId.length > 0) {
      console.log('🗑️ Deleting courses with null/empty courseId...');

      // Delete courses with null/empty courseId
      const deleteResult = await coursesCollection.deleteMany({
        $or: [
          { courseId: null },
          { courseId: { $exists: false } },
          { courseId: '' }
        ]
      });

      console.log(`✅ Deleted ${deleteResult.deletedCount} problematic course records`);
    }

    // Verify all remaining courses have valid courseId
    const allCourses = await coursesCollection.find(
      {},
      {
        projection: {
          _id: 1,
          courseId: 1,
          displayName: 1
        }
      }
    ).toArray();

    console.log(`\n📊 Remaining courses:`);
    allCourses.forEach(course => {
      console.log(`  - ${course.courseId}: ${course.displayName} (${course._id})`);
    });

    console.log('\n✅ Course data fix completed!');
    await client.close();

  } catch (error) {
    console.error('❌ Error fixing course data:', error);
  }
}

// Run the fix script
fixCourseData();
