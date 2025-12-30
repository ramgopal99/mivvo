import * as fs from 'fs';
import * as path from 'path';

// Test the formula parsing
function testFormulaParsing() {
  const formulaPath = path.join(process.cwd(), 'app', 'test', 'modules', 'aptitude', 'module2', 'formulas', 'index.ts');

  if (!fs.existsSync(formulaPath)) {
    console.log('Formula file not found');
    return;
  }

  const content = fs.readFileSync(formulaPath, 'utf-8');

  // Extract just the array part
  const arrayStart = content.indexOf('[');
  const arrayEnd = content.lastIndexOf(']');

  if (arrayStart === -1 || arrayEnd === -1) {
    console.log('Could not find array boundaries');
    return;
  }

  const arrayContent = content.substring(arrayStart, arrayEnd + 1);
  console.log('Array content length:', arrayContent.length);

  // Count opening braces at top level (each formula object)
  let formulaCount = 0;
  let braceCount = 0;
  let inString = false;
  let stringChar: string | null = null;

  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    const prevChar = i > 0 ? arrayContent[i - 1] : null;

    // Handle strings
    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && prevChar !== '\\') {
      inString = false;
      stringChar = null;
    }

    if (!inString) {
      if (char === '{') {
        braceCount++;
        if (braceCount === 1) {
          formulaCount++;
        }
      } else if (char === '}') {
        braceCount--;
      }
    }
  }

  console.log('Number of formulas found:', formulaCount);

  // Try to extract first formula
  const firstObjStart = arrayContent.indexOf('{');
  if (firstObjStart !== -1) {
    let objBraceCount = 0;
    let objEnd = -1;

    for (let i = firstObjStart; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar && (i > 0 ? arrayContent[i - 1] : null) !== '\\') {
        inString = false;
        stringChar = null;
      }

      if (!inString) {
        if (char === '{') {
          objBraceCount++;
        } else if (char === '}') {
          objBraceCount--;
          if (objBraceCount === 0) {
            objEnd = i;
            break;
          }
        }
      }
    }

    if (objEnd !== -1) {
      const firstObj = arrayContent.substring(firstObjStart, objEnd + 1);
      console.log('First formula object:');
      console.log(firstObj.substring(0, 500) + (firstObj.length > 500 ? '...' : ''));
    }
  }
}

testFormulaParsing();
