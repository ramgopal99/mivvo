import * as fs from 'fs';
import * as path from 'path';

function debugParsing() {
  const exercisePath = path.join(process.cwd(), 'app', 'test', 'modules', 'python', 'module4', 'mcq', 'exercise-4.7.ts');

  if (!fs.existsSync(exercisePath)) {
    console.error('Exercise file not found:', exercisePath);
    return;
  }

  const content = fs.readFileSync(exercisePath, 'utf-8');
  console.log('📄 Full file content:');
  console.log(content.substring(0, 500) + '...');

  // Extract the object content from TypeScript export
  const objectMatch = content.match(/export\s+const\s+[^=]+=\s*\{([\s\S]*)\}\s*;?\s*$/);
  if (!objectMatch) {
    console.error('Could not find export object');
    return;
  }

  const objectContent = objectMatch[1];
  console.log('\n🔍 Object content (first 1000 chars):');
  console.log(objectContent.substring(0, 1000) + '...');

  // Check for mcqQuestions
  const mcqStart = objectContent.indexOf('mcqQuestions: [');
  console.log(`\n🔍 mcqQuestions search:`);
  console.log(`- indexOf('mcqQuestions: ['): ${mcqStart}`);
  console.log(`- Content around position ${mcqStart}:`);
  if (mcqStart !== -1) {
    console.log(objectContent.substring(Math.max(0, mcqStart - 20), Math.min(objectContent.length, mcqStart + 50)));
  }

  // Check if the content contains mcqQuestions at all
  const hasMcq = objectContent.includes('mcqQuestions');
  console.log(`- Contains 'mcqQuestions': ${hasMcq}`);

  if (hasMcq) {
    const mcqMatch = objectContent.match(/mcqQuestions:\s*\[/);
    console.log(`- mcqQuestions regex match: ${mcqMatch}`);
  }

  // Test the new regex approach
  console.log('\n🔍 Testing new regex approach...');
  const mcqRegex = /mcqQuestions:\s*\[([\s\S]*?)\](?=\s*,?\s*(?:codeQuestions|content|\}|\s*$))/;
  const mcqMatch = objectContent.match(mcqRegex);
  const mcqContent = mcqMatch ? mcqMatch[1] : '';

  console.log(`📊 Regex mcqContent length: ${mcqContent.length}`);
  if (mcqContent.length > 0) {
    console.log('📝 First 200 chars of regex mcqContent:');
    console.log(mcqContent.substring(0, 200) + '...');

    // Test parsing individual questions
    const questionBlocks = mcqContent.split(/},\s*{/).map((block, index, arr) => {
      if (index > 0) block = '{' + block;
      if (index < arr.length - 1) block = block + '}';
      return block.trim();
    });

    console.log(`\n📋 Found ${questionBlocks.length} question blocks`);
    if (questionBlocks.length > 0) {
      console.log('📝 First question block:');
      console.log(questionBlocks[0].substring(0, 150) + '...');
    }
  }
}

debugParsing();
