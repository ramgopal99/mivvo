import * as fs from 'fs';

// Helper function to parse exercise data
function parseExerciseData(content: string) {
  try {
    console.log('🔍 Parsing exercise content...');
    // Extract the object content from TypeScript export
    const objectMatch = content.match(/export\s+const\s+[^=]+=\s*\{([\s\S]*)\}\s*;?\s*$/);
    if (!objectMatch) {
      console.error('Could not find export object in exercise file');
      return null;
    }

    const objectContent = objectMatch[1];

    const idMatch = objectContent.match(/id:\s*['"]([^'"]+)['"]/);
    const titleMatch = objectContent.match(/title:\s*['"]([^'"]+)['"]/);
    const statusMatch = objectContent.match(/status:\s*['"]([^'"]+)['"]/);
    const typeMatch = objectContent.match(/type:\s*['"]([^'"]+)['"]/);

    console.log(`📋 Found: id=${idMatch?.[1]}, title=${titleMatch?.[1]}, type=${typeMatch?.[1]}`);

    if (!idMatch || !titleMatch || !statusMatch) {
      console.error('Missing required fields in exercise file');
      return null;
    }

    // Extract MCQ questions if they exist
    const mcqQuestions: any[] = [];
    const mcqMatches = objectContent.match(/mcqQuestions:\s*\[([\s\S]*?)\]/);

    console.log(`🔍 mcqMatches found: ${!!mcqMatches}`);
    if (mcqMatches) {
      console.log(`🔍 mcqMatches content length: ${mcqMatches[1].length}`);
      console.log(`🔍 mcqMatches content preview: ${mcqMatches[1].substring(0, 200)}...`);

      const mcqContent = mcqMatches[1];
      // Split by question objects (look for opening braces)
      const questionBlocks = mcqContent.split(/},\s*{/).map((block, index, arr) => {
        if (index > 0) block = '{' + block;
        if (index < arr.length - 1) block = block + '}';
        return block.trim();
      });

      console.log(`🔍 Found ${questionBlocks.length} question blocks`);

      for (let i = 0; i < Math.min(questionBlocks.length, 2); i++) {
        const questionBlock = questionBlocks[i];
        console.log(`🔍 Question block ${i + 1}: ${questionBlock.substring(0, 100)}...`);

        const questionMatch = questionBlock.match(/question:\s*['"]([^'"]*)['"]/);
        const optionsMatch = questionBlock.match(/options:\s*\[([\s\S]*?)\]/);
        const correctAnswerMatch = questionBlock.match(/correctAnswer:\s*(\d+)/);

        console.log(`  - questionMatch: ${!!questionMatch} - "${questionMatch?.[1]?.substring(0, 50)}..."`);
        console.log(`  - optionsMatch: ${!!optionsMatch} - length: ${optionsMatch?.[1]?.length}`);
        console.log(`  - correctAnswerMatch: ${!!correctAnswerMatch} - value: ${correctAnswerMatch?.[1]}`);

        if (optionsMatch) {
          console.log(`  - options content: "${optionsMatch[1].substring(0, 100)}..."`);
        }
      }
    }

    // Extract CODE questions if they exist
    const codeQuestions: any[] = [];
    const codeMatches = objectContent.match(/codeQuestions:\s*\[([\s\S]*?)\]/);

    console.log(`🔍 codeMatches found: ${!!codeMatches}`);
    if (codeMatches) {
      console.log(`🔍 codeMatches content length: ${codeMatches[1].length}`);
    }

    return {
      id: idMatch[1],
      title: titleMatch[1],
      status: statusMatch[1],
      type: typeMatch ? typeMatch[1] : undefined,
      mcqQuestions: mcqQuestions,
      codeQuestions: codeQuestions
    };
  } catch (error) {
    console.error('Failed to parse exercise data:', error);
    return null;
  }
}

// Test with the actual file
const content = fs.readFileSync('app/test/modules/python/module2/mcq/excercise-2.8.ts', 'utf-8');
console.log('File content length:', content.length);
console.log('File content preview:', content.substring(0, 300) + '...');

const result = parseExerciseData(content);
console.log('Parse result:', result);
