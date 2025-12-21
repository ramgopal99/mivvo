const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function fixModule14Content() {
  try {
    console.log('🔧 Fixing Module 14 content...');

    // Get module 14
    const module14 = await prisma.courseModule.findFirst({
      where: {
        courseId: 'python',
        order: 14
      },
      include: {
        topics: true
      }
    });

    if (!module14) {
      console.log('❌ Module 14 not found');
      return;
    }

    console.log(`📝 Found ${module14.topics.length} topics in Module 14`);

    // Update each topic with content from the files
    for (const topic of module14.topics) {
      try {
        // Map topic ID to file name (14.1 -> topic-14.1.ts, etc.)
        const topicNumber = topic.id.split('.').pop();
        const fileName = `topic-14.${topicNumber}.ts`;
        const filePath = path.join(__dirname, 'app', 'test', 'modules', 'python', 'module14', 'topics', fileName);

        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');

          // Extract content between backticks
          const contentMatch = content.match(/content:\s*`([\s\S]*?)`,?\s*\};?\s*$/);
          const topicContent = contentMatch ? contentMatch[1] : null;

          if (topicContent) {
            await prisma.courseTopic.update({
              where: { id: topic.id },
              data: { content: topicContent }
            });
            console.log(`✅ Updated ${topic.title} (${topic.id}) - ${topicContent.length} chars`);
          } else {
            console.log(`⚠️ No content found in ${fileName}`);
          }
        } else {
          console.log(`⚠️ File not found: ${fileName}`);
        }
      } catch (error) {
        console.error(`❌ Error updating topic ${topic.id}:`, error);
      }
    }

    console.log('🎉 Module 14 content fix completed!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixModule14Content();
