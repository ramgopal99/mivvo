const fs = require('fs');
const content = fs.readFileSync('app/test/modules/python/module1/mcq/exercise-1.3.ts', 'utf-8');

function extractMCQQuestions(content) {
  const questions = [];

  try {
    // Look for mcqQuestions array in the content
    const mcqMatch = content.match(/mcqQuestions:\s*\[([\s\S]*?)\]/);

    if (mcqMatch) {
      const questionsStr = mcqMatch[1];
      console.log('Found mcqQuestions content, length:', questionsStr.length);

      // Split by the pattern that separates questions: "},\n    {"
      const questionBlocks = questionsStr.split(/\},\s*\n\s*\{/);
      console.log('Split into', questionBlocks.length, 'blocks');

      for (let i = 0; i < questionBlocks.length; i++) {
        let block = questionBlocks[i].trim();
        console.log(`Block ${i + 1} starts with:`, block.substring(0, 50));

        // Add back the opening brace if it's missing
        if (!block.startsWith('{')) {
          block = '{' + block;
        }

        // Extract question
        const questionMatch = block.match(/question:\s*"([^"]+)"/);
        const question = questionMatch ? questionMatch[1] : '';
        console.log(`Question ${i + 1}:`, question ? question.substring(0, 30) + '...' : 'NOT FOUND');

        // Extract options array
        const optionsMatch = block.match(/options:\s*\[([^\]]*)\]/);
        let options = [];
        if (optionsMatch) {
          const optionsStr = optionsMatch[1];
          console.log(`Options string: ${optionsStr.substring(0, 50)}...`);
          options = optionsStr.split(',').map(opt => {
            return opt.trim().replace(/^"|"$/g, '');
          });
          console.log(`Parsed ${options.length} options`);
        }

        // Extract correct answer
        const correctMatch = block.match(/correctAnswer:\s*(\d+)/);
        const correctAnswer = correctMatch ? parseInt(correctMatch[1]) : 0;

        // Extract explanation
        const explanationMatch = block.match(/explanation:\s*"([^"]+)"/);
        const explanation = explanationMatch ? explanationMatch[1] : '';

        if (question && options.length > 0) {
          questions.push({
            question,
            options,
            correctAnswer,
            explanation,
            order: i + 1,
          });
        }
      }
    } else {
      console.log('No mcqQuestions match found');
    }
  } catch (error) {
    console.error('Error extracting MCQ questions:', error);
  }

  return questions;
}

const questions = extractMCQQuestions(content);
console.log('Extracted', questions.length, 'questions');
if (questions.length > 0) {
  console.log('First question:', questions[0].question);
  console.log('Options:', questions[0].options);
}
