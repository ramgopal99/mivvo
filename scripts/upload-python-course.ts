/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load Python configuration from test registry
function getPythonConfig() {
  const registryPath = path.join(__dirname, '..', 'app', 'test', 'config', 'courses', 'registry.ts');
  const registryContent = fs.readFileSync(registryPath, 'utf-8');

  // Extract Python configuration
  const pythonMatch = registryContent.match(/python:\s*(\{[\s\S]*?\n\s*\}),/);
  if (!pythonMatch) {
    throw new Error('Could not find Python configuration in test registry');
  }

  // Simple parsing - extract key values
  const pythonConfig = pythonMatch[1];

  return {
    courseId: 'python',
    displayName: pythonConfig.match(/displayName:\s*'([^']+)'/)?.[1] || 'Python Programming',
    headerTitle: pythonConfig.match(/title:\s*'([^']+)'/)?.[1] || 'Python Programming Course',
    completionPercentage: '0% Completed',
    monacoLanguage: pythonConfig.match(/monacoLanguage:\s*'([^']+)'/)?.[1] || 'python',
    codeDisplayName: pythonConfig.match(/displayName:\s*'([^']+)'\s*\}\s*,/)?.[1] || 'Python',
    defaultCode: pythonConfig.match(/defaultCode:\s*`([^`]*)`/)?.[1] || '# Python code',
    executionLanguage: pythonConfig.match(/executionLanguage:\s*'([^']+)'/)?.[1] || 'python',
    executionVersion: pythonConfig.match(/executionVersion:\s*'([^']+)'/)?.[1] || '3.12.0',
    aiAssistantName: pythonConfig.match(/name:\s*'([^']+)'/)?.[1] || 'Mivvo Python Assistant',
    aiAssistantDescription: pythonConfig.match(/description:\s*'([^']+)'/)?.[1] || 'Python Learning Assistant',
    aiAssistantPrompt: pythonConfig.match(/systemPrompt:\s*`([^`]*)`/)?.[1] || 'You are a Python assistant',
    showCodeEditor: pythonConfig.match(/showCodeEditor:\s*true/) !== null,
    defaultModule: 1,
    autoSelectFirstTopic: pythonConfig.match(/autoSelectFirstTopic:\s*true/) !== null,
    showCourseSwitcher: pythonConfig.match(/showCourseSwitcher:\s*true/) !== null,
  };
}

function loadModuleData(modulePath: string, moduleNumber: number) {
  try {
    const moduleInfoPath = path.join(modulePath, 'module-info.ts');
    const content = fs.readFileSync(moduleInfoPath, 'utf-8');

    // Simple extraction of key values
    const title = content.match(/title:\s*'([^']+)'/)?.[1] || `Module ${moduleNumber}`;
    const hasDemo = content.includes('hasDemo: true');
    const isExpanded = content.includes('isExpanded: true');
    const isActive = content.includes('isActive: true');

    return {
      title,
      hasDemo,
      isExpanded,
      isActive,
    };
  } catch (error) {
    console.error(`Error loading module ${moduleNumber}:`, error);
    return {
      title: `Module ${moduleNumber}`,
      hasDemo: moduleNumber === 1,
      isExpanded: moduleNumber === 1,
      isActive: moduleNumber === 1,
    };
  }
}

function loadTopicsForModule(modulePath: string, _moduleNumber: number) {
  const topicsPath = path.join(modulePath, 'topics');
  const topics: Array<{
    title: string;
    status: 'DEMO' | 'LOCKED' | 'COMPLETED';
    content: string | null;
    order: number;
  }> = [];

  if (!fs.existsSync(topicsPath)) {
    return topics;
  }

  const topicFiles = fs.readdirSync(topicsPath)
    .filter(file => file.endsWith('.ts'))
    .sort();

  for (let i = 0; i < topicFiles.length; i++) {
    try {
      const filePath = path.join(topicsPath, topicFiles[i]);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Extract basic info
      const title = content.match(/title:\s*'([^']+)'/)?.[1] || `Topic ${i + 1}`;
      const statusMatch = content.match(/status:\s*'([^']+)'/);
      const status = statusMatch ? statusMatch[1].toUpperCase() : 'LOCKED';

      // Extract content (everything between the content: ` markers)
      const contentMatch = content.match(/content:\s*`([\s\S]*?)`,?\s*\};?\s*$/);
      const topicContent = contentMatch ? contentMatch[1] : null;

      topics.push({
        title,
        status: status as 'DEMO' | 'LOCKED' | 'COMPLETED',
        content: topicContent,
        order: i + 1,
      });
    } catch (error) {
      console.error(`Error loading topic ${topicFiles[i]}:`, error);
    }
  }

  return topics;
}

function loadExercisesForModule(modulePath: string, _moduleNumber: number) {
  const mcqPath = path.join(modulePath, 'mcq');
  const exercises: Array<{
    title: string;
    status: 'DEMO' | 'LOCKED' | 'COMPLETED';
    type: 'MCQ' | 'CODE';
    content: string | null;
    order: number;
    mcqQuestions?: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
      explanation?: string;
      order: number;
    }>;
    codeQuestions?: Array<{
      id: string;
      question: string;
      solution: string;
      order: number;
    }>;
  }> = [];

  if (!fs.existsSync(mcqPath)) {
    return exercises;
  }

  const exerciseFiles = fs.readdirSync(mcqPath)
    .filter(file => file.endsWith('.ts'))
    .sort();

  for (let i = 0; i < exerciseFiles.length; i++) {
    try {
      const filePath = path.join(mcqPath, exerciseFiles[i]);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Use dynamic import approach or eval to parse the TypeScript object
      // Extract the object content between the export and the closing brace
      const objectMatch = content.match(/export const \w+:\s*\w+\s*=\s*({[\s\S]*});?\s*$/);
      if (!objectMatch) {
        console.error(`Could not parse exercise object in ${exerciseFiles[i]}`);
        continue;
      }

      // Create a safe evaluation context
      const objectStr = objectMatch[1];

      // Extract key properties using regex for safety
      const title = content.match(/title:\s*'([^']+)'/)?.[1] || `Exercise ${i + 1}`;
      const typeMatch = content.match(/type:\s*'([^']+)'/);
      const type = typeMatch ? typeMatch[1].toUpperCase() : 'MCQ';
      const statusMatch = content.match(/status:\s*'([^']+)'/);
      const status = statusMatch ? statusMatch[1].toUpperCase() : 'LOCKED';

      const exercise: {
        title: string;
        status: 'DEMO' | 'LOCKED' | 'COMPLETED';
        type: 'MCQ' | 'CODE';
        content: string | null;
        order: number;
        mcqQuestions?: Array<{
          question: string;
          options: string[];
          correctAnswer: number;
          explanation?: string;
          order: number;
        }>;
        codeQuestions?: Array<{
          id: string;
          question: string;
          solution: string;
          order: number;
        }>;
      } = {
        title,
        status: status as 'DEMO' | 'LOCKED' | 'COMPLETED',
        type: type as 'MCQ' | 'CODE',
        content: null,
        order: i + 1,
      };

      // Extract MCQ questions directly from the structured data
      if (type === 'MCQ') {
        const mcqQuestions = extractMCQQuestionsFromObject(content);
        if (mcqQuestions.length > 0) {
          exercise.mcqQuestions = mcqQuestions;
        }
      } else if (type === 'CODE') {
        const codeQuestions = extractCodeQuestionsFromObject(content);
        if (codeQuestions.length > 0) {
          exercise.codeQuestions = codeQuestions;
        }
      }

      exercises.push(exercise);
    } catch (error) {
      console.error(`Error loading exercise ${exerciseFiles[i]}:`, error);
    }
  }

  return exercises;
}

function extractMCQQuestionsFromObject(content: string) {
  const questions = [];

  try {
    // Extract the mcqQuestions array from the structured object
    const mcqMatch = content.match(/mcqQuestions:\s*\[([\s\S]*?)\](?=\s*,?\s*\};?\s*$)/);

    if (mcqMatch) {
      const questionsStr = mcqMatch[1];

      // Split by question objects - each starts with { and ends with }
      const questionBlocks = questionsStr.split(/},\s*(?=\{)/);

      for (let i = 0; i < questionBlocks.length; i++) {
        const block = questionBlocks[i].trim();
        if (!block.startsWith('{')) continue;

        // Extract question (handle both single and double quotes)
        const questionMatch = block.match(/question:\s*["']([^"']+)["']/);
        const question = questionMatch ? questionMatch[1] : '';

        // Extract options array (handle both single and double quotes)
        const optionsMatch = block.match(/options:\s*\[([^\]]*)\]/);
        let options: string[] = [];
        if (optionsMatch) {
          const optionsStr = optionsMatch[1];
          // Split by comma and clean up quotes
          options = optionsStr.split(',').map(opt => {
            return opt.trim().replace(/^["']|["']$/g, '');
          });
        }

        // Extract correct answer
        const correctMatch = block.match(/correctAnswer:\s*(\d+)/);
        const correctAnswer = correctMatch ? parseInt(correctMatch[1]) : 0;

        // Extract explanation (handle both single and double quotes)
        const explanationMatch = block.match(/explanation:\s*["']([^"']*)["']/);
        const explanation = explanationMatch ? explanationMatch[1] : '';

        if (question && options.length > 0) {
          questions.push({
            question,
            options,
            correctAnswer,
            explanation: explanation || undefined,
            order: i + 1,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error extracting MCQ questions from object:', error);
  }

  return questions;
}

function extractMCQQuestions(content: string) {
  const questions = [];

  try {
    // Look for mcqQuestions array in the content
    const mcqMatch = content.match(/mcqQuestions:\s*\[([\s\S]*?)\]/);

    if (mcqMatch) {
      const questionsStr = mcqMatch[1];

      // Split by question objects - each starts with { and ends with }
      const questionBlocks = questionsStr.split(/},\s*(?=\{)/);

      for (let i = 0; i < questionBlocks.length; i++) {
        const block = questionBlocks[i].trim();
        if (!block.startsWith('{')) continue;

        // Extract question
        const questionMatch = block.match(/question:\s*"([^"]+)"/);
        const question = questionMatch ? questionMatch[1] : '';

        // Extract options array
        const optionsMatch = block.match(/options:\s*\[([^\]]*)\]/);
        let options: string[] = [];
        if (optionsMatch) {
          // Parse the options string - handle quoted strings properly
          const optionsStr = optionsMatch[1];
          options = optionsStr.split(',').map(opt => {
            return opt.trim().replace(/^"|"$/g, '');
          });
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
    }
  } catch (error) {
    console.error('Error extracting MCQ questions:', error);
  }

  return questions;
}

function extractCodeQuestionsFromObject(content: string) {
  const questions = [];

  try {
    // Extract the codeQuestions array from the structured object
    const codeMatch = content.match(/codeQuestions:\s*\[([\s\S]*?)\](?=\s*,?\s*\};?\s*$)/);

    if (codeMatch) {
      const questionsStr = codeMatch[1];

      // Split by question objects - each starts with { and ends with }
      const questionBlocks = questionsStr.split(/},\s*(?=\{)/);

      for (let i = 0; i < questionBlocks.length; i++) {
        const block = questionBlocks[i].trim();
        if (!block.startsWith('{')) continue;

        // Extract id (handle both single and double quotes)
        const idMatch = block.match(/id:\s*["']([^"']+)["']/);
        const id = idMatch ? idMatch[1] : `ex${i + 1}`;

        // Extract question (backticks)
        const questionMatch = block.match(/question:\s*`([^`]*)`/);
        const question = questionMatch ? questionMatch[1] : '';

        // Extract solution (backticks)
        const solutionMatch = block.match(/solution:\s*`([^`]*)`/);
        const solution = solutionMatch ? solutionMatch[1] : '';

        if (question && solution) {
          questions.push({
            id,
            question,
            solution,
            order: i + 1,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error extracting CODE questions from object:', error);
  }

  return questions;
}

function extractCodeQuestions(content: string) {
  const questions = [];

  try {
    // Look for codeQuestions array in the content
    const codeMatch = content.match(/codeQuestions:\s*\[([\s\S]*?)\]/);

    if (codeMatch) {
      const questionsStr = codeMatch[1];

      // Split by question objects - each starts with { and ends with }
      const questionBlocks = questionsStr.split(/},\s*(?=\{)/);

      for (let i = 0; i < questionBlocks.length; i++) {
        const block = questionBlocks[i].trim();
        if (!block.startsWith('{')) continue;

        // Extract id
        const idMatch = block.match(/id:\s*"([^"]+)"/);
        const id = idMatch ? idMatch[1] : `ex${i + 1}`;

        // Extract question
        const questionMatch = block.match(/question:\s*`([^`]*)`/);
        const question = questionMatch ? questionMatch[1] : '';

        // Extract solution
        const solutionMatch = block.match(/solution:\s*`([^`]*)`/);
        const solution = solutionMatch ? solutionMatch[1] : '';

        if (question && solution) {
          questions.push({
            id,
            question,
            solution,
            order: i + 1,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error extracting CODE questions:', error);
  }

  return questions;
}

async function uploadPythonCourse() {
  try {
    console.log('🚀 Starting Python course upload from test data...');

    // Get Python configuration from test registry
    const pythonCourse = getPythonConfig();

    // Add additional course fields
    const fullPythonCourse = {
      ...pythonCourse,
      title: pythonCourse.displayName,
      description: 'Learn Python programming from basics to advanced concepts with interactive exercises.',
    };

    // Create the course
    console.log('📚 Creating Python course from test registry config...');
    const course = await prisma.course.upsert({
      where: { courseId: 'python' },
      update: fullPythonCourse,
      create: fullPythonCourse,
    });

    console.log('✅ Course created/updated:', course.id);

    // Load modules from the test directory
    const pythonModulesPath = path.join(__dirname, '..', 'app', 'test', 'modules', 'python');
    const moduleDirs = fs.readdirSync(pythonModulesPath)
      .filter(dir => dir.startsWith('module'))
      .sort((a, b) => {
        const aNum = parseInt(a.replace('module', ''));
        const bNum = parseInt(b.replace('module', ''));
        return aNum - bNum;
      });

    console.log(`📖 Found ${moduleDirs.length} modules to process from test data`);

    for (const moduleDir of moduleDirs) {
      const modulePath = path.join(pythonModulesPath, moduleDir);
      const moduleNumber = parseInt(moduleDir.replace('module', ''));

      try {
        console.log(`📖 Processing module ${moduleNumber}...`);

        // Load module data from test files
        const moduleData = loadModuleData(modulePath, moduleNumber);

        // Create module in database
        const courseModule = await prisma.courseModule.upsert({
          where: {
            courseId_order: {
              courseId: 'python',
              order: moduleNumber,
            },
          },
          update: moduleData,
          create: {
            ...moduleData,
            courseId: 'python',
            order: moduleNumber,
          },
        });

        console.log(`✅ Module ${moduleNumber} created: ${courseModule.title}`);

        // Load and create topics
        const topics = loadTopicsForModule(modulePath, moduleNumber);
        console.log(`📝 Found ${topics.length} topics for module ${moduleNumber}`);

        for (const topic of topics) {
          await prisma.courseTopic.create({
            data: {
              courseModuleId: courseModule.id,
              title: topic.title,
              status: topic.status,
              content: topic.content,
              order: topic.order,
            },
          });
        }

        // Load and create exercises
        const exercises = loadExercisesForModule(modulePath, moduleNumber);
        console.log(`🎯 Found ${exercises.length} exercises for module ${moduleNumber}`);

        for (const exercise of exercises) {
          const exerciseData = await prisma.courseExercise.create({
            data: {
              courseModuleId: courseModule.id,
              title: exercise.title,
              status: exercise.status,
              type: exercise.type,
              content: exercise.content,
              order: exercise.order,
            },
          });

          // Create questions for the exercise
          if (exercise.type === 'MCQ' && exercise.mcqQuestions) {
            for (const question of exercise.mcqQuestions) {
              await prisma.courseMcqQuestion.create({
                data: {
                  courseExerciseId: exerciseData.id,
                  question: question.question,
                  options: question.options,
                  correctAnswer: question.correctAnswer,
                  explanation: question.explanation,
                  order: question.order,
                },
              });
            }
          } else if (exercise.type === 'CODE' && exercise.codeQuestions) {
            for (const question of exercise.codeQuestions) {
              await prisma.courseCodeQuestion.create({
                data: {
                  courseExerciseId: exerciseData.id,
                  question: question.question,
                  solution: question.solution,
                  order: question.order,
                },
              });
            }
          }
        }

        console.log(`✅ Module ${moduleNumber} completed with ${topics.length} topics and ${exercises.length} exercises`);

      } catch (error) {
        console.error(`❌ Error processing module ${moduleNumber}:`, error);
      }
    }

    console.log('🎉 Python course upload completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - 1 Course created/updated`);
    console.log(`   - ${moduleDirs.length} Modules processed from test data`);
    console.log('   - All topics, exercises, and questions uploaded to database');

  } catch (error) {
    console.error('❌ Error uploading Python course:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the upload script
uploadPythonCourse();
