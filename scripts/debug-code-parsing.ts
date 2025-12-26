import * as fs from 'fs';
import * as path from 'path';

function debugCodeParsing() {
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

  console.log('🔍 Checking codeQuestions regex...');

  // Current regex
  const codeRegex = /codeQuestions:\s*\[([\s\S]*?)\](?=\s*,?\s*(?:content|\}|\s*$))/;
  const codeMatch = objectContent.match(codeRegex);

  console.log('Current regex match:', codeMatch ? 'YES' : 'NO');
  if (codeMatch) {
    console.log('Captured content length:', codeMatch[1].length);
  }

  // Check if codeQuestions exists at all
  const hasCode = objectContent.includes('codeQuestions');
  console.log('Contains codeQuestions:', hasCode);

  // Find the position
  const codeStart = objectContent.indexOf('codeQuestions: [');
  console.log('codeQuestions position:', codeStart);

  if (codeStart !== -1) {
    // Show context around it
    const start = Math.max(0, codeStart - 50);
    const end = Math.min(objectContent.length, codeStart + 100);
    console.log('Context around codeQuestions:');
    console.log(objectContent.substring(start, end));
  }

  // Try a simpler regex
  const simpleRegex = /codeQuestions:\s*\[([\s\S]*?)\]/;
  const simpleMatch = objectContent.match(simpleRegex);
  console.log('Simple regex match:', simpleMatch ? 'YES' : 'NO');
  if (simpleMatch) {
    console.log('Simple regex content length:', simpleMatch[1].length);
  }

  // Check what comes after codeQuestions
  if (codeStart !== -1) {
    const afterCodeStart = codeStart + 'codeQuestions: ['.length;
    // Find the end of the array
    let bracketCount = 1;
    let pos = afterCodeStart;

    while (pos < objectContent.length && bracketCount > 0) {
      if (objectContent[pos] === '[') bracketCount++;
      if (objectContent[pos] === ']') bracketCount--;
      pos++;
    }

    const afterArray = objectContent.substring(pos - 1, Math.min(objectContent.length, pos + 50));
    console.log('What comes after codeQuestions array:');
    console.log('"' + afterArray + '"');
  }
}

debugCodeParsing();


