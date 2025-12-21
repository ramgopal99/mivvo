const fs = require('fs');
const content = fs.readFileSync('app/test/modules/python/module1/mcq/exercise-1.3.ts', 'utf-8');

function extractMCQQuestions(content) {
  const questions = [];

  try {
    const mcqMatch = content.match(/mcqQuestions:\s*\[([\s\S]*?)\]/);

    if (mcqMatch) {
      const questionsStr = mcqMatch[1];
      console.log('Found mcqQuestions content');
      console.log('Length:', questionsStr.length);

      // Simple pattern to extract question objects
      const questionMatches = questionsStr.match(/\{[\s\S]*?\}/g);
      console.log('Found', questionMatches ? questionMatches.length : 0, 'question objects');

      if (questionMatches) {
        for (let i = 0; i < questionMatches.length; i++) {
          const qStr = questionMatches[i];
          console.log('Processing question', i + 1);

          // Extract question
          const questionMatch = qStr.match(/question:\s*"([^"]+)"/);
          const question = questionMatch ? questionMatch[1] : '';

          // Extract options
          const optionsMatch = qStr.match(/options:\s*\[([^\]]*)\]/);
          const options = optionsMatch ?
            optionsMatch[1].split(',').map(opt => opt.trim().replace(/^"|"$/g, '')) : [];

          // Extract correct answer
          const correctMatch = qStr.match(/correctAnswer:\s*(\d+)/);
          const correctAnswer = correctMatch ? parseInt(correctMatch[1]) : 0;

          // Extract explanation
          const explanationMatch = qStr.match(/explanation:\s*"([^"]+)"/);
          const explanation = explanationMatch ? explanationMatch[1] : undefined;

          if (question && options.length > 0) {
            questions.push({ question, options, correctAnswer, explanation, order: i + 1 });
          }
        }
      }
    } else {
      console.log('No mcqQuestions match found');
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return questions;
}

const questions = extractMCQQuestions(content);
console.log('Extracted', questions.length, 'questions');
if (questions.length > 0) {
  console.log('First question:', questions[0].question.substring(0, 50) + '...');
  console.log('Options:', questions[0].options);
}
