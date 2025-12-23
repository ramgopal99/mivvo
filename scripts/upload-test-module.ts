import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { COURSES } from '../app/test/config/courses';

const prisma = new PrismaClient();

async function uploadTestModule() {
  try {
    console.log('🚀 Starting test module upload (Module 2 only)...');

    // Create Python course if it doesn't exist
    const courseId = 'python';
    let course = await prisma.course.findUnique({
      where: { courseId }
    });

    if (!course) {
      console.log('📚 Creating Python course...');
      const pythonConfig = COURSES.python;
      course = await prisma.course.create({
        data: {
          courseId: pythonConfig.id,
          title: pythonConfig.displayName,
          displayName: pythonConfig.displayName,
          description: 'Learn Python programming from basics to advanced concepts',
          headerTitle: pythonConfig.headerData.title,
          completionPercentage: pythonConfig.headerData.completionPercentage,
          showCodeEditor: pythonConfig.showCodeEditor,
          defaultModule: pythonConfig.defaultModule,
          autoSelectFirstTopic: pythonConfig.autoSelectFirstTopic,
          showCourseSwitcher: pythonConfig.showCourseSwitcher,
          monacoLanguage: pythonConfig.codeEditor?.monacoLanguage || 'python',
          codeDisplayName: pythonConfig.codeEditor?.displayName || 'Python',
          defaultCode: pythonConfig.codeEditor?.defaultCode || '# Write your Python code here\nprint("Hello, World!")',
          executionLanguage: pythonConfig.codeEditor?.executionLanguage || 'python3',
          executionVersion: pythonConfig.codeEditor?.executionVersion || '3.10.0',
          aiAssistantName: pythonConfig.aiAssistant.name,
          aiAssistantDescription: pythonConfig.aiAssistant.description,
          aiAssistantPrompt: pythonConfig.aiAssistant.systemPrompt
        }
      });
      console.log('✅ Created Python course');
    }

    // Process only Module 2
    const moduleNumber = 2;
    const modulesPath = path.join(process.cwd(), 'app', 'test', 'modules', 'python');
    const moduleDir = `module${moduleNumber}`;
    const modulePath = path.join(modulesPath, moduleDir);

    console.log(`\n📖 Processing ${moduleDir}...`);

    // Read module info
    const moduleInfoPath = path.join(modulePath, 'module-info.ts');
    if (!fs.existsSync(moduleInfoPath)) {
      console.log(`⚠️  Skipping ${moduleDir} - no module-info.ts found`);
      return;
    }

    const moduleInfoContent = fs.readFileSync(moduleInfoPath, 'utf-8');
    const moduleInfo = parseModuleInfo(moduleInfoContent);

    if (!moduleInfo) {
      console.log(`⚠️  Skipping ${moduleDir} - failed to parse module-info.ts`);
      return;
    }

    // Create module
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
      console.log(`✅ Created module: ${moduleInfo.title}`);
    }

    // Process topics
    const topicsPath = path.join(modulePath, 'topics');
    if (fs.existsSync(topicsPath)) {
      const topicFiles = fs.readdirSync(topicsPath)
        .filter(file => file.endsWith('.ts'))
        .sort();

      console.log(`📝 Processing ${topicFiles.length} topics...`);

      for (let i = 0; i < topicFiles.length; i++) {
        const topicFile = topicFiles[i];
        const topicPath = path.join(topicsPath, topicFile);
        const topicContent = fs.readFileSync(topicPath, 'utf-8');

        const topicData = parseTopicData(topicContent);
        if (!topicData) {
          console.log(`⚠️  Skipping topic ${topicFile} - failed to parse`);
          continue;
        }

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
          console.log(`✅ Created topic: ${topicData.title}`);
        }
      }
    }

    // Process exercises
    const mcqPath = path.join(modulePath, 'mcq');
    if (fs.existsSync(mcqPath)) {
      const exerciseFiles = fs.readdirSync(mcqPath)
        .filter(file => file.endsWith('.ts'))
        .sort();

      console.log(`❓ Processing ${exerciseFiles.length} exercises...`);

      for (let i = 0; i < exerciseFiles.length; i++) {
        const exerciseFile = exerciseFiles[i];
        const exercisePath = path.join(mcqPath, exerciseFile);
        const exerciseContent = fs.readFileSync(exercisePath, 'utf-8');

        const exerciseData = parseExerciseData(exerciseContent);
        if (!exerciseData) {
          console.log(`⚠️  Skipping exercise ${exerciseFile} - failed to parse`);
          continue;
        }

        const statusMap: { [key: string]: 'DEMO' | 'LOCKED' | 'COMPLETED' } = {
          'demo': 'DEMO',
          'locked': 'LOCKED',
          'completed': 'COMPLETED'
        };

        const exerciseType = exerciseData.type?.toUpperCase() === 'CODE' ? 'CODE' : 'MCQ';

        let courseExercise = await prisma.courseExercise.findFirst({
          where: {
            courseModuleId: courseModule.id,
            order: i + 1
          }
        });

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
          console.log(`✅ Created ${exerciseType} exercise: ${exerciseData.title}`);
        }

        // Add questions (same logic as main script)
        const allQuestions = [
          ...(exerciseData.mcqQuestions || []).map(q => ({ ...q, questionType: 'MCQ' as const })),
          ...(exerciseData.codeQuestions || []).map(q => ({ ...q, questionType: 'CODE' as const }))
        ];

        if (allQuestions.length > 0) {
          console.log(`📋 Adding ${allQuestions.length} questions (${exerciseData.mcqQuestions?.length || 0} MCQ, ${exerciseData.codeQuestions?.length || 0} CODE)...`);

          for (let j = 0; j < allQuestions.length; j++) {
            const question = allQuestions[j];

            const existingQuestion = await prisma.courseMcqQuestion.findFirst({
              where: {
                courseExerciseId: courseExercise.id,
                order: j + 1
              }
            });

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
      }
    }

    console.log('\n🎉 Test module upload completed!');

  } catch (error) {
    console.error('❌ Error uploading test module:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Include the parsing functions from the main script
function parseModuleInfo(content: string) {
  try {
    const objectMatch = content.match(/export\s+const\s+\w+\s*=\s*\{([\s\S]*?)\};?\s*$/);
    if (!objectMatch) return null;

    const objectContent = objectMatch[1];

    const idMatch = objectContent.match(/id:\s*(\d+)/);
    const titleMatch = objectContent.match(/title:\s*['"]([^'"]+)['"]/);
    const hasDemoMatch = objectContent.match(/hasDemo:\s*(true|false)/);
    const isExpandedMatch = objectContent.match(/isExpanded:\s*(true|false)/);
    const isActiveMatch = objectContent.match(/isActive:\s*(true|false)/);

    if (!idMatch || !titleMatch || !hasDemoMatch || !isExpandedMatch || !isActiveMatch) {
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

function parseTopicData(contentStr: string) {
  try {
    const objectMatch = contentStr.match(/export\s+const\s+[^=]+=\s*\{([\s\S]*)\}\s*;?\s*$/);
    if (!objectMatch) return null;

    const objectContent = objectMatch[1];

    const idMatch = objectContent.match(/id:\s*['"]([^'"]+)['"]/);
    const titleMatch = objectContent.match(/title:\s*['"]([^'"]+)['"]/);
    const statusMatch = objectContent.match(/status:\s*['"]([^'"]+)['"]/);

    if (!idMatch || !titleMatch || !statusMatch) return null;

    const contentFieldMatch = objectContent.match(/content:\s*`/);
    let content = '';

    if (contentFieldMatch) {
      const contentStart = contentFieldMatch.index! + contentFieldMatch[0].length;
      let i = contentStart;

      while (i < objectContent.length) {
        const char = objectContent[i];

        if (char === '`') {
          let escapeCount = 0;
          let j = i - 1;
          while (j >= contentStart && objectContent[j] === '\\') {
            escapeCount++;
            j--;
          }

          if (escapeCount % 2 === 0) {
            content = objectContent.substring(contentStart, i);
            break;
          }
        }

        i++;
      }
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

function parseExerciseData(content: string): Exercise | null {
  try {
    console.log('🔍 Parsing exercise content...');
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

    const exerciseContent = '';

    const mcqQuestions: MCQQuestion[] = [];
    const codeRegex = /codeQuestions:\s*\[([\s\S]*)\]/;
    const codeMatch = objectContent.match(codeRegex);
    const codeContent = codeMatch ? codeMatch[1] : '';

    console.log(`🔍 codeContent found: ${codeContent.length > 0}, length: ${codeContent.length}`);

    // Extract MCQ questions
    const mcqRegex = /mcqQuestions:\s*\[([\s\S]*)\]/;
    const mcqMatch = objectContent.match(mcqRegex);
    const mcqContent = mcqMatch ? mcqMatch[1] : '';

    console.log(`🔍 mcqContent found: ${mcqContent.length > 0}, length: ${mcqContent.length}`);

    // Process MCQ questions
    if (mcqContent) {
      const questionBlocks = mcqContent.split(/},\s*{/).map((block, index, arr) => {
        if (index > 0) block = '{' + block;
        if (index < arr.length - 1) block = block + '}';
        return block.trim();
      });

      for (let i = 0; i < questionBlocks.length; i++) {
        const questionBlock = questionBlocks[i];
        if (questionBlock.trim()) {
          console.log(`  Processing MCQ question block ${i + 1}/${questionBlocks.length} (length: ${questionBlock.length})`);

          const questionMatch = questionBlock.match(/question:\s*['"]([^'"]*)['"]/);
          const optionsMatch = questionBlock.match(/options:\s*\[([\s\S]*?)\]/);
          const correctAnswerMatch = questionBlock.match(/correctAnswer:\s*(\d+)/);
          const explanationMatch = questionBlock.match(/explanation:\s*['"]([^'"]*)['"]/);

          console.log(`    Question match: ${!!questionMatch}`);
          console.log(`    Options match: ${!!optionsMatch}`);
          console.log(`    Correct answer match: ${correctAnswerMatch !== null}`);

          if (questionMatch && optionsMatch && correctAnswerMatch !== null) {
            const optionsStr = optionsMatch[1];
            const options = optionsStr
              .split(/['"],\s*['"]/)
              .map(opt => opt.replace(/^['"]|['"]$/g, '').trim())
              .filter(opt => opt.length > 0);

            console.log(`    ✅ Adding MCQ question: "${questionMatch[1].substring(0, 50)}..." (${options.length} options)`);
            mcqQuestions.push({
              id: `q${mcqQuestions.length + 1}`,
              question: questionMatch[1],
              options: options,
              correctAnswer: parseInt(correctAnswerMatch[1]),
              explanation: explanationMatch ? explanationMatch[1] : undefined
            });
          } else {
            console.log(`    ❌ Skipping MCQ question block ${i + 1} - missing matches`);
          }
        }
      }
    }

    // Process CODE questions
    const codeQuestions: CodeQuestion[] = [];
    if (codeContent) {
      const questionBlocks = codeContent.split(/},\s*{/).map((block, index, arr) => {
        if (index > 0) block = '{' + block;
        if (index < arr.length - 1) block = block + '}';
        return block.trim();
      });

      for (let i = 0; i < questionBlocks.length; i++) {
        const questionBlock = questionBlocks[i];
        if (questionBlock.trim()) {
          console.log(`  Processing question block ${i + 1}/${questionBlocks.length} (length: ${questionBlock.length})`);

          const questionMatch = questionBlock.match(/question:\s*['"]([^'"]*)['"]/);
          const solutionMatch = questionBlock.match(/solution:\s*`([\s\S]*)`/);

          console.log(`    Question match: ${!!questionMatch}`);
          console.log(`    Solution match: ${!!solutionMatch}`);

          if (questionMatch && solutionMatch) {
            console.log(`    ✅ Adding question: "${questionMatch[1].substring(0, 50)}..."`);
            codeQuestions.push({
              id: `ex${codeQuestions.length + 1}`,
              question: questionMatch[1],
              solution: solutionMatch[1]
            });
          } else {
            console.log(`    ❌ Skipping question block ${i + 1} - missing matches`);
          }
        }
      }
    }

    console.log(`📊 Parsed exercise: type=${typeMatch?.[1]}, mcqQuestions=${mcqQuestions.length}, codeQuestions=${codeQuestions.length}`);

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
    console.error('❌ Failed to parse exercise data:', error);
    return null;
  }
}

uploadTestModule();
