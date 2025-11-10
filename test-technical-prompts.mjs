// Test script to verify technical role prompt selection
import * as technicalPrompts from './app/api/custom-interviews/prompts/technical/index.js';

// Type for technical prompt generator functions
type TechnicalPromptGenerator = (jdDetails: string, title: string, cvText?: string) => string;

/**
 * Get specific technical role prompt generator function if available
 * @param role - The role value (e.g., 'python-developer')
 * @returns The prompt generator function or null if not found
 */
function getTechnicalRolePromptGenerator(role: string): TechnicalPromptGenerator | null {
  // Map role values to their corresponding prompt generator function names
  const roleToPromptFunction: Record<string, string> = {
    'frontend-developer': 'generateFrontendDeveloperPrompt',
    'backend-developer': 'generateBackendDeveloperPrompt',
    'fullstack-developer': 'generateFullStackDeveloperPrompt',
    'react-developer': 'generateReactDeveloperPrompt',
    'nodejs-developer': 'generateNodeJsDeveloperPrompt',
    'python-developer': 'generatePythonDeveloperPrompt'
  }

  const functionName = roleToPromptFunction[role]
  if (functionName && typeof (technicalPrompts as Record<string, unknown>)[functionName] === 'function') {
    return (technicalPrompts as Record<string, TechnicalPromptGenerator>)[functionName]
  }

  return null
}

// Test cases
console.log('🔍 Testing Technical Role Prompt Selection...\n');

// Test 1: Python developer (should find specific prompt)
const pythonRole = 'python-developer';
const pythonGenerator = getTechnicalRolePromptGenerator(pythonRole);
if (pythonGenerator) {
  console.log(`✅ Found specific prompt for ${pythonRole}`);
  const samplePrompt = pythonGenerator('Sample JD', 'Python Developer Interview');
  console.log(`   Generated prompt length: ${samplePrompt.length} characters`);
  console.log(`   Contains Python-specific content: ${samplePrompt.includes('Python')}`);
} else {
  console.log(`❌ No specific prompt found for ${pythonRole}`);
}

// Test 2: Frontend developer (should find specific prompt)
const frontendRole = 'frontend-developer';
const frontendGenerator = getTechnicalRolePromptGenerator(frontendRole);
if (frontendGenerator) {
  console.log(`✅ Found specific prompt for ${frontendRole}`);
  const samplePrompt = frontendGenerator('Sample JD', 'Frontend Developer Interview');
  console.log(`   Generated prompt length: ${samplePrompt.length} characters`);
} else {
  console.log(`❌ No specific prompt found for ${frontendRole}`);
}

// Test 3: Non-existent role (should return null)
const fakeRole = 'non-existent-developer';
const fakeGenerator = getTechnicalRolePromptGenerator(fakeRole);
if (!fakeGenerator) {
  console.log(`✅ Correctly returned null for non-existent role: ${fakeRole}`);
} else {
  console.log(`❌ Incorrectly found prompt for non-existent role: ${fakeRole}`);
}

console.log('\n🎉 Test completed!');





