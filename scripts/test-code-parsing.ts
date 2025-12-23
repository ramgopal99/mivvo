import * as fs from 'fs';
import * as path from 'path';

function testCodeParsing() {
  const exercisePath = path.join(process.cwd(), 'app', 'test', 'modules', 'python', 'module3', 'mcq', 'exercise-3.8.ts');

  if (!fs.existsSync(exercisePath)) {
    console.error('Exercise file not found:', exercisePath);
    return;
  }

  const content = fs.readFileSync(exercisePath, 'utf-8');

  // Extract the object content from TypeScript export
  const objectMatch = content.match(/export\s+const\s+[^=]+=\s*\{([\s\S]*)\}\s*;?\s*$/);
  if (!objectMatch) {
    console.error('Could not find export object');
    return;
  }

  const objectContent = objectMatch[1];

  // Extract CODE questions if they exist
  const codeRegex = /codeQuestions:\s*\[([\s\S]*?)\]/;
  const codeMatch = objectContent.match(codeRegex);
  const codeContent = codeMatch ? codeMatch[1] : '';

  console.log('🔍 codeContent found:', codeContent.length > 0, 'length:', codeContent.length);
  console.log('📝 Full codeContent:');
  console.log(`"${codeContent}"`);
  console.log('📝 codeContent length:', codeContent.length);

  // Also test with a more specific regex that looks for the closing bracket at the end
  const codeRegex2 = /codeQuestions:\s*\[([\s\S]*)\]/;
  const codeMatch2 = objectContent.match(codeRegex2);
  const codeContent2 = codeMatch2 ? codeMatch2[1] : '';

  console.log('\n🔍 With greedy regex:');
  console.log('codeContent2 length:', codeContent2.length);
  console.log('Ends with }:', codeContent2.trim().endsWith('}'));

  if (codeContent) {
    console.log('\n🔍 Raw codeContent:');
    console.log('---START---');
    console.log(codeContent);
    console.log('---END---');

    // Split by question objects (look for opening braces)
    const questionBlocks = codeContent.split(/},\s*{/).map((block, index, arr) => {
      if (index > 0) block = '{' + block;
      if (index < arr.length - 1) block = block + '}';
      return block.trim();
    });

    console.log(`\n📋 Found ${questionBlocks.length} code question blocks`);

    for (let i = 0; i < questionBlocks.length; i++) {
      const questionBlock = questionBlocks[i];
      if (questionBlock.trim()) {
        console.log(`\n  Block ${i + 1} (length: ${questionBlock.length}):`);
        console.log('  ---BLOCK START---');
        console.log(questionBlock);
        console.log('  ---BLOCK END---');

        const questionMatch = questionBlock.match(/question:\s*['"]([^'"]*)['"]/);
        const solutionMatch = questionBlock.match(/solution:\s*`([\s\S]*?)`/);

        console.log(`    questionMatch: ${questionMatch ? 'YES' : 'NO'}`);
        console.log(`    solutionMatch: ${solutionMatch ? 'YES' : 'NO'}`);

        if (questionMatch) {
          console.log(`    Question: "${questionMatch[1].substring(0, 50)}..."`);
        }
        if (solutionMatch) {
          console.log(`    Solution length: ${solutionMatch[1].length}`);
          console.log(`    Solution preview: "${solutionMatch[1].substring(0, 50)}..."`);
        } else {
          // Debug why solutionMatch failed
          const solutionIndex = questionBlock.indexOf('solution:');
          if (solutionIndex !== -1) {
            const aroundSolution = questionBlock.substring(Math.max(0, solutionIndex - 10), Math.min(questionBlock.length, solutionIndex + 50));
            console.log(`    Around solution: "...${aroundSolution}..."`);
          }
        }
      }
    }
  }
}

testCodeParsing();
