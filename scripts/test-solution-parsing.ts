function testSolutionParsing() {
  // Test string with backticks inside the solution
  const testBlock = `{
      id: "ex1",
      question: "Create a program that creates a list",
      solution: \`# Create a list of student names
students = ["Alice", "Bob", "Charlie"]
# This comment has \`backticks\` in it
for student in students:
    print(f"Hello {student}")
\`
    }`;

  console.log('Testing solution parsing...');
  console.log('Input block:');
  console.log(testBlock);
  console.log('');

  // Test the regex
  const solutionMatch = testBlock.match(/solution:\s*`([\s\S]*)`/);
  console.log('Solution match found:', !!solutionMatch);

  if (solutionMatch) {
    console.log('Extracted solution:');
    console.log(`"${solutionMatch[1]}"`);
    console.log('Solution contains backticks:', solutionMatch[1].includes('`'));
    console.log('Solution ends with newline:', solutionMatch[1].endsWith('\n'));
  }
}

testSolutionParsing();






