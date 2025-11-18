import { PrismaClient } from '@prisma/client';
import { loadModules } from '../utils/moduleLoader';
import { SubLesson, Exercise, MCQQuestion, CodeQuestion } from '../app/dashboard/courses/[courseId]/data/lessonsData';

const prisma = new PrismaClient();

// Interface for transformed exercise data
interface TransformedExercise {
  title: string;
  status: 'DEMO' | 'LOCKED' | 'COMPLETED';
  content?: string;
  type: 'MCQ' | 'CODE';
  order: number;
  mcqQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    order: number;
  }[];
  codeQuestions: {
    question: string;
    solution: string;
    order: number;
  }[];
}

// Transform functions to match database schema
const transformLessonStatus = (status: string): 'DEMO' | 'LOCKED' | 'COMPLETED' => {
  switch (status) {
    case 'demo': return 'DEMO';
    case 'locked': return 'LOCKED';
    case 'completed': return 'COMPLETED';
    default: return 'LOCKED';
  }
};

const transformExerciseType = (type: string): 'MCQ' | 'CODE' => {
  switch (type) {
    case 'mcq': return 'MCQ';
    case 'code': return 'CODE';
    default: return 'MCQ';
  }
};

async function migrateModulesToDatabase() {
  console.log('🚀 Starting migration of test modules to database...');

  try {
    // Load modules using the existing moduleLoader utility
    console.log('📖 Loading modules from static imports...');
    const staticModules = await loadModules();
    console.log(`📁 Found ${staticModules.length} modules to migrate`);

    // Create a course to hold all modules
    const course = await prisma.course.upsert({
      where: { id: 'python-programming-course' },
      update: {},
      create: {
        id: 'python-programming-course',
        title: 'Complete Python Programming Course',
        description: 'Comprehensive Python programming course with modules, lessons, and exercises'
      }
    });

    console.log('📚 Created/Updated course:', course.title);

    for (let moduleIndex = 0; moduleIndex < staticModules.length; moduleIndex++) {
      const staticModule = staticModules[moduleIndex];
      console.log(`\n📖 Processing Module ${staticModule.id}: ${staticModule.title}...`);

      // Transform sub-lessons
      const subLessons = staticModule.subLessons.map((lesson: SubLesson, index: number) => ({
        title: lesson.title,
        status: transformLessonStatus(lesson.status),
        content: lesson.content,
        order: index
      }));

      // Transform exercises
      const exercises: TransformedExercise[] = staticModule.exercises.map((exercise: Exercise, index: number) => ({
        title: exercise.title,
        status: transformLessonStatus(exercise.status),
        content: exercise.content,
        type: transformExerciseType(exercise.type || 'mcq'),
        order: index,
        mcqQuestions: exercise.mcqQuestions ? exercise.mcqQuestions.map((q: MCQQuestion, qIndex: number) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          order: qIndex
        })) : [],
        codeQuestions: exercise.codeQuestions ? exercise.codeQuestions.map((q: CodeQuestion, qIndex: number) => ({
          question: q.question,
          solution: q.solution,
          order: qIndex
        })) : []
      }));

      // Create/update module in database
      await prisma.module.upsert({
        where: {
          id: `module-${staticModule.id}`
        },
        update: {
          title: staticModule.title,
          hasDemo: staticModule.hasDemo,
          isExpanded: staticModule.isExpanded,
          isActive: staticModule.isActive,
          order: moduleIndex,
          subLessons: {
            deleteMany: {},
            create: subLessons
          },
          exercises: {
            deleteMany: {},
            create: exercises.map((ex: TransformedExercise) => ({
              ...ex,
              mcqQuestions: ex.mcqQuestions.length > 0 ? {
                create: ex.mcqQuestions
              } : undefined,
              codeQuestions: ex.codeQuestions.length > 0 ? {
                create: ex.codeQuestions
              } : undefined
            }))
          }
        },
        create: {
          id: `module-${staticModule.id}`,
          title: staticModule.title,
          courseId: course.id,
          hasDemo: staticModule.hasDemo,
          isExpanded: staticModule.isExpanded,
          isActive: staticModule.isActive,
          order: moduleIndex,
          subLessons: {
            create: subLessons
          },
          exercises: {
            create: exercises.map((ex: TransformedExercise) => ({
              ...ex,
              mcqQuestions: ex.mcqQuestions.length > 0 ? {
                create: ex.mcqQuestions
              } : undefined,
              codeQuestions: ex.codeQuestions.length > 0 ? {
                create: ex.codeQuestions
              } : undefined
            }))
          }
        }
      });

      console.log(`✅ Migrated Module ${staticModule.id}: ${subLessons.length} lessons, ${exercises.length} exercises`);
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Course: ${course.title}`);
    console.log(`   - Modules processed: ${staticModules.length}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateModulesToDatabase()
  .then(() => {
    console.log('✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
  });
