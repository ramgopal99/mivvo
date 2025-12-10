import { PrismaClient } from '@prisma/client';

async function migrateCourses(sourceUrl: string, targetUrl: string) {
  console.log('🚀 Starting course data migration (without user progress)...');
  console.log(`📤 Source Database: ${sourceUrl}`);
  console.log(`📥 Target Database: ${targetUrl}`);

  // Create Prisma clients for both databases
  const sourcePrisma = new PrismaClient({
    datasourceUrl: sourceUrl,
  });

  const targetPrisma = new PrismaClient({
    datasourceUrl: targetUrl,
  });

  let coursesMigrated = 0;
  let modulesMigrated = 0;
  let subLessonsMigrated = 0;
  let exercisesMigrated = 0;
  let mcqQuestionsMigrated = 0;
  let codeQuestionsMigrated = 0;
  let codeTemplatesMigrated = 0;

  try {
    // Step 1: Export all course data from source database
    console.log('\n📤 Exporting data from source database...');

    const courses = await sourcePrisma.course.findMany({
      include: {
        modules: {
          include: {
            subLessons: true,
            exercises: {
              include: {
                mcqQuestions: true,
                codeQuestions: true,
              },
            },
          },
        },
        codeTemplates: true,
      },
    });

    console.log(`📊 Found ${courses.length} courses to migrate`);

    // Step 2: Import data to target database
    console.log('\n📥 Importing data to target database...');

    for (const course of courses) {
      console.log(`\n📚 Migrating course: ${course.title}`);

      // Create course in target database (skip if already exists)
      try {
        await targetPrisma.course.create({
          data: {
            id: course.id,
            title: course.title,
            description: course.description,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
          },
        });
        coursesMigrated++;
        console.log(`📚 Created course: ${course.title}`);
      } catch (error: unknown) {
        const prismaError = error as { code?: string };
        if (prismaError.code === 'P2002') {
          console.log(`⚠️  Course "${course.title}" already exists, skipping...`);
          continue; // Skip this course and its modules
        }
        throw error;
      }

      // Get the course from target database (whether it was just created or already existed)
      const targetCourse = await targetPrisma.course.findUnique({
        where: { id: course.id }
      });

      if (!targetCourse) {
        console.log(`❌ Error: Could not find course ${course.id} in target database`);
        continue;
      }

      // Migrate modules
      for (const moduleData of course.modules) {
        try {
          const createdModule = await targetPrisma.module.create({
            data: {
              id: moduleData.id,
              title: moduleData.title,
              courseId: targetCourse.id,
              order: moduleData.order,
              hasDemo: moduleData.hasDemo,
              isExpanded: moduleData.isExpanded,
              isActive: moduleData.isActive,
              createdAt: moduleData.createdAt,
              updatedAt: moduleData.updatedAt,
            },
          });
          modulesMigrated++;
          console.log(`    📖 Created module: ${moduleData.title}`);

          // Migrate sub-lessons
          for (const subLesson of moduleData.subLessons) {
            try {
              await targetPrisma.subLesson.create({
                data: {
                  id: subLesson.id,
                  title: subLesson.title,
                  moduleId: createdModule.id,
                  order: subLesson.order,
                  status: subLesson.status as 'DEMO' | 'LOCKED' | 'COMPLETED',
                  content: subLesson.content,
                  createdAt: subLesson.createdAt,
                  updatedAt: subLesson.updatedAt,
                },
              });
              subLessonsMigrated++;
            } catch (error: unknown) {
              const prismaError = error as { code?: string };
              if (prismaError.code !== 'P2002') {
                throw error;
              }
            }
          }

          // Migrate exercises
          for (const exercise of moduleData.exercises) {
            try {
              const createdExercise = await targetPrisma.exercise.create({
                data: {
                  id: exercise.id,
                  title: exercise.title,
                  moduleId: createdModule.id,
                  order: exercise.order,
                  status: exercise.status as 'DEMO' | 'LOCKED' | 'COMPLETED',
                  content: exercise.content,
                  type: exercise.type as 'MCQ' | 'CODE' | null,
                  createdAt: exercise.createdAt,
                  updatedAt: exercise.updatedAt,
                },
              });
              exercisesMigrated++;

              // Migrate MCQ questions
              for (const mcqQuestion of exercise.mcqQuestions) {
                try {
                  await targetPrisma.mCQQuestion.create({
                    data: {
                      id: mcqQuestion.id,
                      exerciseId: createdExercise.id,
                      question: mcqQuestion.question,
                      options: mcqQuestion.options,
                      correctAnswer: mcqQuestion.correctAnswer,
                      explanation: mcqQuestion.explanation,
                      order: mcqQuestion.order,
                      createdAt: mcqQuestion.createdAt,
                      updatedAt: mcqQuestion.updatedAt,
                    },
                  });
                  mcqQuestionsMigrated++;
                } catch (error: unknown) {
                  const prismaError = error as { code?: string };
                  if (prismaError.code !== 'P2002') {
                    throw error;
                  }
                }
              }

              // Migrate code questions
              for (const codeQuestion of exercise.codeQuestions) {
                try {
                  await targetPrisma.codeQuestion.create({
                    data: {
                      id: codeQuestion.id,
                      exerciseId: createdExercise.id,
                      question: codeQuestion.question,
                      solution: codeQuestion.solution,
                      order: codeQuestion.order,
                      createdAt: codeQuestion.createdAt,
                      updatedAt: codeQuestion.updatedAt,
                    },
                  });
                  codeQuestionsMigrated++;
                } catch (error: unknown) {
                  const prismaError = error as { code?: string };
                  if (prismaError.code !== 'P2002') {
                    throw error;
                  }
                }
              }
            } catch (error: unknown) {
              const prismaError = error as { code?: string };
              if (prismaError.code !== 'P2002') {
                throw error;
              }
            }
          }
        } catch (error: unknown) {
          const prismaError = error as { code?: string };
          if (prismaError.code === 'P2002') {
            console.log(`    ⚠️  Module "${moduleData.title}" already exists, skipping...`);
            continue; // Skip this module and its content
          }
          throw error;
        }
      }

      // Migrate code templates
      for (const template of course.codeTemplates) {
        try {
          await targetPrisma.codeTemplate.create({
            data: {
              id: template.id,
              courseId: targetCourse.id,
              language: template.language,
              code: template.code,
              description: template.description,
              isActive: template.isActive,
              createdAt: template.createdAt,
              updatedAt: template.updatedAt,
            },
          });
          codeTemplatesMigrated++;
        } catch (error: unknown) {
          const prismaError = error as { code?: string };
          if (prismaError.code !== 'P2002') {
            throw error;
          }
        }
      }
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('📊 Migration Summary:');
    console.log(`   - Courses migrated: ${coursesMigrated}`);
    console.log(`   - Modules migrated: ${modulesMigrated}`);
    console.log(`   - Sub-lessons migrated: ${subLessonsMigrated}`);
    console.log(`   - Exercises migrated: ${exercisesMigrated}`);
    console.log(`   - MCQ questions migrated: ${mcqQuestionsMigrated}`);
    console.log(`   - Code questions migrated: ${codeQuestionsMigrated}`);
    console.log(`   - Code templates migrated: ${codeTemplatesMigrated}`);

    const totalRecords = coursesMigrated + modulesMigrated + subLessonsMigrated +
                        exercisesMigrated + mcqQuestionsMigrated + codeQuestionsMigrated +
                        codeTemplatesMigrated;

    console.log(`   - Total records migrated: ${totalRecords}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await sourcePrisma.$disconnect();
    await targetPrisma.$disconnect();
  }
}

// Database URLs - Update these variables with your source and target database URLs
const SOURCE_DATABASE_URL = "mongodb+srv://ramgopalbagh009:QimdC2sghuanK40R@anva.wbnny.mongodb.net/meetai"; // Replace with your source database URL
const TARGET_DATABASE_URL = "mongodb+srv://ramgopalbagh009:QimdC2sghuanK40R@anva.wbnny.mongodb.net/meetai2"; // Replace with your target database URL

// Run migration with the specified URLs
migrateCourses(SOURCE_DATABASE_URL, TARGET_DATABASE_URL)
  .then(() => {
    console.log('✅ Migration script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
  });
