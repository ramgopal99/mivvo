import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { COURSES } from '../app/test/config/courses';

const prisma = new PrismaClient();

interface ModuleInfo {
  id: number;
  title: string;
  hasDemo: boolean;
  isExpanded: boolean;
  isActive: boolean;
}

interface SubLesson {
  id: string;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
}

interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface CodeQuestion {
  id: string;
  question: string;
  solution: string;
}

interface Exercise {
  id: string;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
  type?: 'mcq' | 'code';
  mcqQuestions?: MCQQuestion[];
  codeQuestions?: CodeQuestion[];
}

// Helper function to parse module info
function parseModuleInfo(content: string): ModuleInfo | null {
  try {
    // Extract the object content from TypeScript export
    const objectMatch = content.match(/export\s+const\s+\w+\s*=\s*\{([\s\S]*?)\};?\s*$/);
    if (!objectMatch) {
      console.error('Could not find export object in module-info.ts');
      return null;
    }

    const objectContent = objectMatch[1];

    const idMatch = objectContent.match(/id:\s*(\d+)/);
    const titleMatch = objectContent.match(/title:\s*['"]([^'"]+)['"]/);
    const hasDemoMatch = objectContent.match(/hasDemo:\s*(true|false)/);
    const isExpandedMatch = objectContent.match(/isExpanded:\s*(true|false)/);
    const isActiveMatch = objectContent.match(/isActive:\s*(true|false)/);

    if (!idMatch || !titleMatch || !hasDemoMatch || !isExpandedMatch || !isActiveMatch) {
      console.error('Missing required fields in module-info.ts:', { idMatch, titleMatch, hasDemoMatch, isExpandedMatch, isActiveMatch });
      return null;
    }

    return {
      id: parseInt(idMatch[1]),
      title: titleMatch[1],
      hasDemo: hasDemoMatch[1] === 'true',
      isExpanded: isExpandedMatch[1] === 'true',
      isActive: isActiveMatch[1] === 'true'
    };
  } catch (error) {
    console.error('Failed to parse module info:', error);
    return null;
  }
}

// Helper function to parse topic data
function parseTopicData(contentStr: string): SubLesson | null {
  try {
    // Extract the object content from TypeScript export
    const objectMatch = contentStr.match(/export\s+const\s+[^=]+=\s*\{([\s\S]*)\}\s*;?\s*$/);
    if (!objectMatch) {
      console.error('Could not find export object in topic file');
      return null;
    }

    const objectContent = objectMatch[1];

    const idMatch = objectContent.match(/id:\s*['"]([^'"]+)['"]/);
    const titleMatch = objectContent.match(/title:\s*['"]([^'"]+)['"]/);
    const statusMatch = objectContent.match(/status:\s*['"]([^'"]+)['"]/);

    if (!idMatch || !titleMatch || !statusMatch) {
      console.error('Missing required fields in topic file');
      return null;
    }

    // Extract content (multiline string in backticks) - find the matching closing backtick
    const contentFieldMatch = objectContent.match(/content:\s*`/);
    let content = '';

    if (contentFieldMatch) {
      const contentStart = contentFieldMatch.index! + contentFieldMatch[0].length;
      let i = contentStart;

      // Find the matching closing backtick
      while (i < objectContent.length) {
        const char = objectContent[i];

        if (char === '`') {
          // Check if this backtick is escaped
          let escapeCount = 0;
          let j = i - 1;
          while (j >= contentStart && objectContent[j] === '\\') {
            escapeCount++;
            j--;
          }

          if (escapeCount % 2 === 0) {
            // Not escaped, this is the closing backtick
            content = objectContent.substring(contentStart, i);
            break;
          }
        }

        i++;
      }
    }

    if (!content) {
      console.warn('No content found in topic file');
    }

    return {
      id: idMatch[1],
      title: titleMatch[1],
      status: statusMatch[1] as 'demo' | 'locked' | 'completed',
      content: content
    };
  } catch (error) {
    console.error('❌ Failed to parse topic data:', error);
    return null;
  }
}

// Helper function to parse exercise data
function parseExerciseData(content: string): Exercise | null {
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

    // Extract content
    const contentMatch = objectContent.match(/content:\s*`([\s\S]*?)`/);
    const exerciseContent = contentMatch ? contentMatch[1] : undefined;

    // Extract MCQ questions if they exist
    const mcqQuestions: MCQQuestion[] = [];

    // Use regex to extract mcqQuestions array content
    const mcqRegex = /mcqQuestions:\s*\[([\s\S]*)\]/;
    const mcqMatch = objectContent.match(mcqRegex);
    const mcqContent = mcqMatch ? mcqMatch[1] : '';

    console.log(`🔍 mcqContent found: ${mcqContent.length > 0}, length: ${mcqContent.length}`);

    console.log(`🔍 mcqContent found: ${mcqContent.length > 0}, length: ${mcqContent.length}`);
    if (mcqContent) {
      // Split by question objects (look for opening braces)
      const questionBlocks = mcqContent.split(/},\s*{/).map((block, index, arr) => {
        if (index > 0) block = '{' + block;
        if (index < arr.length - 1) block = block + '}';
        return block.trim();
      });

      for (const questionBlock of questionBlocks) {
        if (questionBlock.trim()) {
          // Parse question - properly handle quotes (single or double) with matching closing quote
          let question = '';
          const questionFieldMatch = questionBlock.match(/question:\s*([`'"])/);
          if (questionFieldMatch) {
            const quoteChar = questionFieldMatch[1];
            const questionStart = questionFieldMatch.index! + questionFieldMatch[0].length;
            let i = questionStart;

            // Find the matching closing quote (not escaped)
            while (i < questionBlock.length) {
              const char = questionBlock[i];

              if (char === quoteChar) {
                // Check if this quote is escaped
                let escapeCount = 0;
                let j = i - 1;
                while (j >= questionStart && questionBlock[j] === '\\') {
                  escapeCount++;
                  j--;
                }

                if (escapeCount % 2 === 0) {
                  // Not escaped, this is the closing quote
                  question = questionBlock.substring(questionStart, i);
                  break;
                }
              }

              i++;
            }
          }

          // Parse options array - need to find matching closing bracket, not just first ]
          let optionsStr = '';
          const optionsArrayMatch = questionBlock.match(/options:\s*\[/);
          if (optionsArrayMatch) {
            const arrayStart = optionsArrayMatch.index! + optionsArrayMatch[0].length;
            let i = arrayStart;
            let bracketDepth = 1; // We're inside the opening bracket
            let inString = false;
            let stringQuote: string | null = null;

            while (i < questionBlock.length && bracketDepth > 0) {
              const char = questionBlock[i];

              if (!inString) {
                if (char === '[') {
                  bracketDepth++;
                } else if (char === ']') {
                  bracketDepth--;
                  if (bracketDepth === 0) {
                    // Found the matching closing bracket
                    optionsStr = questionBlock.substring(arrayStart, i);
                    break;
                  }
                } else if (char === '"' || char === "'") {
                  inString = true;
                  stringQuote = char;
                }
              } else {
                // We're inside a string
                if (char === stringQuote) {
                  // Check if this quote is escaped
                  let escapeCount = 0;
                  let j = i - 1;
                  while (j >= arrayStart && questionBlock[j] === '\\') {
                    escapeCount++;
                    j--;
                  }

                  if (escapeCount % 2 === 0) {
                    // Not escaped, this is the closing quote
                    inString = false;
                    stringQuote = null;
                  }
                }
              }

              i++;
            }
          }

          const correctAnswerMatch = questionBlock.match(/correctAnswer:\s*(\d+)/);

          // Parse explanation - properly handle quotes
          let explanation: string | undefined = '';
          const explanationFieldMatch = questionBlock.match(/explanation:\s*([`'"])/);
          if (explanationFieldMatch) {
            const quoteChar = explanationFieldMatch[1];
            const explanationStart = explanationFieldMatch.index! + explanationFieldMatch[0].length;
            let i = explanationStart;

            // Find the matching closing quote (not escaped)
            while (i < questionBlock.length) {
              const char = questionBlock[i];

              if (char === quoteChar) {
                // Check if this quote is escaped
                let escapeCount = 0;
                let j = i - 1;
                while (j >= explanationStart && questionBlock[j] === '\\') {
                  escapeCount++;
                  j--;
                }

                if (escapeCount % 2 === 0) {
                  // Not escaped, this is the closing quote
                  explanation = questionBlock.substring(explanationStart, i);
                  break;
                }
              }

              i++;
            }
          }

          if (question && optionsStr && correctAnswerMatch !== null) {
            // Parse options array - properly handle quotes in option strings
            const options: string[] = [];
            let i = 0;

            while (i < optionsStr.length) {
              // Skip whitespace and commas
              while (i < optionsStr.length && (optionsStr[i] === ' ' || optionsStr[i] === '\t' || optionsStr[i] === '\n' || optionsStr[i] === ',')) {
                i++;
              }

              if (i >= optionsStr.length) break;

              // Check if we have a quoted string
              const quoteChar = optionsStr[i];
              if (quoteChar === '"' || quoteChar === "'") {
                const optionStart = i + 1;
                i++;

                // Find the matching closing quote (not escaped)
                while (i < optionsStr.length) {
                  if (optionsStr[i] === quoteChar) {
                    // Check if this quote is escaped
                    let escapeCount = 0;
                    let j = i - 1;
                    while (j >= optionStart && optionsStr[j] === '\\') {
                      escapeCount++;
                      j--;
                    }

                    if (escapeCount % 2 === 0) {
                      // Not escaped, this is the closing quote
                      const option = optionsStr.substring(optionStart, i);
                      options.push(option.replace(/\\n/g, '\n'));
                      i++;
                      break;
                    }
                  }
                  i++;
                }
              } else {
                // Not a quoted string, skip to next comma or end
                while (i < optionsStr.length && optionsStr[i] !== ',') {
                  i++;
                }
              }
            }

            // Unescape newlines in question and explanation
            question = question.replace(/\\n/g, '\n');
            explanation = explanation ? explanation.replace(/\\n/g, '\n') : undefined;

            mcqQuestions.push({
              id: `q${mcqQuestions.length + 1}`,
              question: question,
              options: options,
              correctAnswer: parseInt(correctAnswerMatch[1]),
              explanation: explanation || undefined
            });
          }
        }
      }
    }

    // Extract CODE questions if they exist
    const codeQuestions: CodeQuestion[] = [];

    // Use regex to extract codeQuestions array content
    const codeRegex = /codeQuestions:\s*\[([\s\S]*)\]/;
    const codeMatch = objectContent.match(codeRegex);
    const codeContent = codeMatch ? codeMatch[1] : '';

    console.log(`🔍 codeContent found: ${codeContent.length > 0}, length: ${codeContent.length}`);
    if (codeContent) {
      // Parse question objects more robustly by finding object boundaries
      const questionBlocks: string[] = [];
      let currentBlock = '';
      let braceDepth = 0;
      let inString = false;
      let stringChar: string | null = null;
      let i = 0;

      while (i < codeContent.length) {
        const char = codeContent[i];
        const prevChar = i > 0 ? codeContent[i - 1] : null;

        // Handle string literals
        if (!inString && (char === '"' || char === "'" || char === '`')) {
          inString = true;
          stringChar = char;
        } else if (inString && char === stringChar && prevChar !== '\\') {
          inString = false;
          stringChar = null;
        }

        // Only count braces when not inside strings
        if (!inString) {
          if (char === '{') {
            braceDepth++;
            if (braceDepth === 1) {
              // Start of a new object
              currentBlock = '';
            }
          } else if (char === '}') {
            braceDepth--;
            if (braceDepth === 0) {
              // End of current object
              questionBlocks.push(currentBlock.trim());
              currentBlock = '';
            }
          }
        }

        // Add character to current block if we're inside an object
        if (braceDepth > 0) {
          currentBlock += char;
        }

        i++;
      }

      // Remove the outer braces from each block
      const cleanedBlocks = questionBlocks.map(block => {
        return block.replace(/^\s*{\s*/, '').replace(/\s*}\s*$/, '');
      });

      for (const questionBlock of cleanedBlocks) {
        if (questionBlock.trim()) {
          // Parse question - properly handle quotes (single or double) with matching closing quote
          let question = '';
          const questionFieldMatch = questionBlock.match(/question:\s*([`'"])/);
          if (questionFieldMatch) {
            const quoteChar = questionFieldMatch[1];
            const questionStart = questionFieldMatch.index! + questionFieldMatch[0].length;
            let i = questionStart;

            // Find the matching closing quote (not escaped)
            while (i < questionBlock.length) {
              const char = questionBlock[i];

              if (char === quoteChar) {
                // Check if this quote is escaped
                let escapeCount = 0;
                let j = i - 1;
                while (j >= questionStart && questionBlock[j] === '\\') {
                  escapeCount++;
                  j--;
                }

                if (escapeCount % 2 === 0) {
                  // Not escaped, this is the closing quote
                  question = questionBlock.substring(questionStart, i);
                  break;
                }
              }

              i++;
            }
          }

          // Parse solution - properly handle template literals with matching backticks
          let solution = '';
          const solutionFieldMatch = questionBlock.match(/solution:\s*`/);
          if (solutionFieldMatch) {
            const solutionStart = solutionFieldMatch.index! + solutionFieldMatch[0].length;
            let i = solutionStart;

            // Find the matching closing backtick (not escaped)
            while (i < questionBlock.length) {
              const char = questionBlock[i];

              if (char === '`') {
                // Check if this backtick is escaped
                let escapeCount = 0;
                let j = i - 1;
                while (j >= solutionStart && questionBlock[j] === '\\') {
                  escapeCount++;
                  j--;
                }

                if (escapeCount % 2 === 0) {
                  // Not escaped, this is the closing backtick
                  solution = questionBlock.substring(solutionStart, i);
                  break;
                }
              }

              i++;
            }
          }

          if (question && solution) {
            // Unescape newlines in question
            question = question.replace(/\\n/g, '\n');
            codeQuestions.push({
              id: `ex${codeQuestions.length + 1}`,
              question: question,
              solution: solution
            });
            console.log(`  ✅ Parsed code question ${codeQuestions.length}: "${question.substring(0, 50)}${question.length > 50 ? '...' : ''}"`);
            console.log(`     Solution length: ${solution.length} chars, preview: "${solution.substring(0, 80).replace(/\n/g, '\\n')}${solution.length > 80 ? '...' : ''}"`);
          } else {
            console.log(`  ⚠️  Failed to parse code question block:`);
            console.log(`     question: ${question.length > 0 ? `"${question.substring(0, 30)}..."` : 'NOT FOUND'}`);
            console.log(`     solution: ${solution.length > 0 ? `${solution.length} chars` : 'NOT FOUND'}`);
          }
        }
      }
    }

    return {
      id: idMatch[1],
      title: titleMatch[1],
      status: statusMatch[1] as 'demo' | 'locked' | 'completed',
      content: exerciseContent,
      type: typeMatch ? typeMatch[1] as 'mcq' | 'code' : undefined,
      mcqQuestions: mcqQuestions.length > 0 ? mcqQuestions : undefined,
      codeQuestions: codeQuestions.length > 0 ? codeQuestions : undefined
    };
  } catch (error) {
    console.error('Failed to parse exercise data:', error);
    return null;
  }
}

async function uploadLogicalCourseData() {
  try {
    console.log('🚀 Starting Logical Reasoning course data upload...');
    console.log('⚠️  This process may take several minutes. Please do not interrupt.\n');

    // First, ensure the Logical course exists
    const courseId = 'logical';
    let course = await prisma.course.findUnique({
      where: { courseId }
    });

    if (!course) {
      console.log('📚 Creating Logical Reasoning course...');
      const logicalConfig = COURSES.logical;

      course = await prisma.course.create({
        data: {
          courseId: logicalConfig.id,
          title: logicalConfig.displayName,
          displayName: logicalConfig.displayName,
          description: 'Master logical reasoning skills for competitive exams and analytical thinking',
          headerTitle: logicalConfig.headerData.title,
          completionPercentage: logicalConfig.headerData.completionPercentage,
          showCodeEditor: logicalConfig.showCodeEditor,
          defaultModule: logicalConfig.defaultModule,
          autoSelectFirstTopic: logicalConfig.autoSelectFirstTopic,
          showCourseSwitcher: logicalConfig.showCourseSwitcher,
          monacoLanguage: logicalConfig.codeEditor?.monacoLanguage || null,
          codeDisplayName: logicalConfig.codeEditor?.displayName || null,
          defaultCode: logicalConfig.codeEditor?.defaultCode || null,
          executionLanguage: logicalConfig.codeEditor?.executionLanguage || null,
          executionVersion: logicalConfig.codeEditor?.executionVersion || null,
          aiAssistantName: logicalConfig.aiAssistant.name,
          aiAssistantDescription: logicalConfig.aiAssistant.description,
          aiAssistantPrompt: logicalConfig.aiAssistant.systemPrompt
        }
      });
      console.log('✅ Created Logical Reasoning course');
    } else {
      console.log('✅ Logical Reasoning course already exists');
    }

    // Get all module directories
    const modulesPath = path.join(process.cwd(), 'app', 'test', 'modules', 'logical');
    const moduleDirs = fs.readdirSync(modulesPath)
      .filter(dir => fs.statSync(path.join(modulesPath, dir)).isDirectory())
      .filter(dir => dir.startsWith('module'))
      .sort((a, b) => {
        const aNum = parseInt(a.replace('module', ''));
        const bNum = parseInt(b.replace('module', ''));
        return aNum - bNum;
      });

    console.log(`📂 Found ${moduleDirs.length} modules: ${moduleDirs.join(', ')}`);
    console.log(`\n🔄 Processing modules in batches to prevent timeouts...\n`);

    // Process modules in batches of 3 to prevent timeouts
    const batchSize = 3;
    let processedCount = 0;

    for (let batchStart = 0; batchStart < moduleDirs.length; batchStart += batchSize) {
      const batchEnd = Math.min(batchStart + batchSize, moduleDirs.length);
      const batch = moduleDirs.slice(batchStart, batchEnd);

      console.log(`📦 Processing batch ${Math.floor(batchStart / batchSize) + 1}/${Math.ceil(moduleDirs.length / batchSize)}: ${batch.join(', ')}`);

      for (const moduleDir of batch) {
        try {
          const moduleNumber = parseInt(moduleDir.replace('module', ''));
          const modulePath = path.join(modulesPath, moduleDir);

          console.log(`  📖 Processing ${moduleDir} (${++processedCount}/${moduleDirs.length})...`);

          // Read module info
          const moduleInfoPath = path.join(modulePath, 'module-info.ts');
          if (!fs.existsSync(moduleInfoPath)) {
            console.log(`  ⚠️  Skipping ${moduleDir} - no module-info.ts found`);
            continue;
          }

          const moduleInfoContent = fs.readFileSync(moduleInfoPath, 'utf-8');
          const moduleInfo = parseModuleInfo(moduleInfoContent);

          if (!moduleInfo) {
            console.log(`  ⚠️  Skipping ${moduleDir} - failed to parse module-info.ts`);
            continue;
          }

          // Create or update module
          let courseModule = await prisma.courseModule.findFirst({
            where: {
              courseId: courseId,
              order: moduleNumber
            }
          });

          if (!courseModule) {
            courseModule = await prisma.courseModule.create({
              data: {
                courseId: courseId,
                title: moduleInfo.title,
                order: moduleNumber,
                hasDemo: moduleInfo.hasDemo,
                isExpanded: moduleInfo.isExpanded,
                isActive: moduleInfo.isActive
              }
            });
            console.log(`  ✅ Created module: ${moduleInfo.title}`);
          } else {
            console.log(`  ✅ Module ${moduleInfo.title} already exists`);
          }

          // Process topics
          const topicsPath = path.join(modulePath, 'topics');
          if (fs.existsSync(topicsPath)) {
            const topicFiles = fs.readdirSync(topicsPath)
              .filter(file => file.endsWith('.ts'))
              .sort();

            console.log(`  📝 Processing ${topicFiles.length} topics...`);

            for (let i = 0; i < topicFiles.length; i++) {
              const topicFile = topicFiles[i];
              const topicPath = path.join(topicsPath, topicFile);
              const topicContent = fs.readFileSync(topicPath, 'utf-8');

              const topicData = parseTopicData(topicContent);
              if (!topicData) {
                console.log(`  ⚠️  Skipping topic ${topicFile} - failed to parse`);
                continue;
              }

              // Map status to LessonStatus enum
              const statusMap: { [key: string]: 'DEMO' | 'LOCKED' | 'COMPLETED' } = {
                'demo': 'DEMO',
                'locked': 'LOCKED',
                'completed': 'COMPLETED'
              };

              let courseTopic = await prisma.courseTopic.findFirst({
                where: {
                  courseModuleId: courseModule.id,
                  order: i + 1
                }
              });

              if (!courseTopic) {
                courseTopic = await prisma.courseTopic.create({
                  data: {
                    courseModuleId: courseModule.id,
                    title: topicData.title,
                    order: i + 1,
                    status: statusMap[topicData.status] || 'LOCKED',
                    content: topicData.content
                  }
                });
                console.log(`  ✅ Created topic: ${topicData.title}`);
              } else {
                console.log(`  ✅ Topic ${topicData.title} already exists`);
              }
            }
          }

          // Process exercises
          const mcqPath = path.join(modulePath, 'mcq');
          if (fs.existsSync(mcqPath)) {
            const exerciseFiles = fs.readdirSync(mcqPath)
              .filter(file => file.endsWith('.ts'))
              .sort();

            console.log(`  ❓ Processing ${exerciseFiles.length} exercises...`);

            for (let i = 0; i < exerciseFiles.length; i++) {
              try {
                const exerciseFile = exerciseFiles[i];
                const exercisePath = path.join(mcqPath, exerciseFile);
                const exerciseContent = fs.readFileSync(exercisePath, 'utf-8');

                const exerciseData = parseExerciseData(exerciseContent);
                if (!exerciseData) {
                  console.log(`  ⚠️  Skipping exercise ${exerciseFile} - failed to parse`);
                  continue;
                }

                console.log(`  📊 Parsed exercise ${exerciseFile}: type=${exerciseData.type}, mcqQuestions=${exerciseData.mcqQuestions?.length || 0}, codeQuestions=${exerciseData.codeQuestions?.length || 0}`);

                // Map status to LessonStatus enum
                const statusMap: { [key: string]: 'DEMO' | 'LOCKED' | 'COMPLETED' } = {
                  'demo': 'DEMO',
                  'locked': 'LOCKED',
                  'completed': 'COMPLETED'
                };

                let courseExercise = await prisma.courseExercise.findFirst({
                  where: {
                    courseModuleId: courseModule.id,
                    order: i + 1
                  }
                });

                // Determine exercise type
                const exerciseType = exerciseData.type?.toUpperCase() === 'CODE' ? 'CODE' : 'MCQ';

                if (!courseExercise) {
                  courseExercise = await prisma.courseExercise.create({
                    data: {
                      courseModuleId: courseModule.id,
                      title: exerciseData.title,
                      order: i + 1,
                      status: statusMap[exerciseData.status] || 'LOCKED',
                      content: exerciseData.content,
                      type: exerciseType
                    }
                  });
                  console.log(`  ✅ Created ${exerciseType} exercise: ${exerciseData.title}`);
                } else {
                  console.log(`  ✅ Exercise ${exerciseData.title} already exists`);
                }

                // Add questions (unified for both MCQ and CODE)
                const allQuestions = [
                  ...(exerciseData.mcqQuestions || []).map(q => ({ ...q, questionType: 'MCQ' as const })),
                  ...(exerciseData.codeQuestions || []).map(q => ({ ...q, questionType: 'CODE' as const }))
                ];

                if (allQuestions.length > 0) {
                  console.log(`  📋 Adding ${allQuestions.length} questions (${exerciseData.mcqQuestions?.length || 0} MCQ, ${exerciseData.codeQuestions?.length || 0} CODE)...`);

                  for (let j = 0; j < allQuestions.length; j++) {
                    const question = allQuestions[j];

                    // Check if question already exists (different check based on type)
                    let existingQuestion;
                    if (question.questionType === 'MCQ') {
                      existingQuestion = await prisma.courseMcqQuestion.findFirst({
                        where: {
                          courseExerciseId: courseExercise.id,
                          order: j + 1
                        }
                      });
                    } else {
                      existingQuestion = await prisma.courseCodeQuestion.findFirst({
                        where: {
                          courseExerciseId: courseExercise.id,
                          order: j + 1
                        }
                      });
                    }

                    if (!existingQuestion) {
                      if (question.questionType === 'MCQ') {
                        await prisma.courseMcqQuestion.create({
                          data: {
                            courseExerciseId: courseExercise.id,
                            question: question.question,
                            options: question.options,
                            correctAnswer: question.correctAnswer,
                            explanation: question.explanation,
                            order: j + 1
                          }
                        });
                      } else if (question.questionType === 'CODE') {
                        await prisma.courseCodeQuestion.create({
                          data: {
                            courseExerciseId: courseExercise.id,
                            question: question.question,
                            solution: question.solution,
                            order: j + 1
                          }
                        });
                      }
                    }
                  }
                }
              } catch (exerciseError) {
                console.error(`  ❌ Error processing exercise ${i + 1} in ${moduleDir}:`, exerciseError);
                // Continue with next exercise instead of failing completely
              }
            }
          }

          console.log(`  ✅ Completed processing ${moduleDir}`);

        } catch (moduleError) {
          console.error(`❌ Error processing module ${moduleDir}:`, moduleError);
          // Continue with next module instead of failing completely
        }
      }

      console.log(`✅ Completed batch ${Math.floor(batchStart / batchSize) + 1}/${Math.ceil(moduleDirs.length / batchSize)}\n`);
    }

    console.log('\n🎉 Logical Reasoning course data upload completed successfully!');
    console.log('✅ All modules, topics, exercises, and questions have been processed.');
  } catch (error) {
    console.error('❌ Error uploading Logical Reasoning course data:', error);
    console.log('⚠️  The upload may be incomplete. You can run the script again to resume from where it left off.');
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
uploadLogicalCourseData()
  .then(() => {
    console.log('✅ Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
