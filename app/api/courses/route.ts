import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Transform database enums to match frontend expectations
const transformLessonStatus = (status: string) => {
  switch (status) {
    case 'DEMO': return 'demo';
    case 'LOCKED': return 'locked';
    case 'COMPLETED': return 'completed';
    default: return 'locked';
  }
};

const transformExerciseType = (type: string | null) => {
  switch (type) {
    case 'MCQ': return 'mcq';
    case 'CODE': return 'code';
    default: return undefined;
  }
};

export async function GET() {
  try {
    // Fetch all courses with their modules, sublessons, and exercises
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            subLessons: {
              orderBy: { order: 'asc' }
            },
            exercises: {
              include: {
                mcqQuestions: {
                  orderBy: { order: 'asc' }
                },
                codeQuestions: {
                  orderBy: { order: 'asc' }
                }
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform the data to match the frontend interface
    const transformedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      hasDemo: false, // Will be calculated based on modules
      isExpanded: false,
      isActive: false,
      subLessons: [], // Will be populated from modules
      exercises: [], // Will be populated from modules
      modules: course.modules.map(module => ({
        id: module.id,
        title: module.title,
        hasDemo: module.hasDemo,
        isExpanded: module.isExpanded,
        isActive: module.isActive,
        subLessons: module.subLessons.map(subLesson => ({
          id: subLesson.id,
          title: subLesson.title,
          status: transformLessonStatus(subLesson.status),
          content: subLesson.content,
          order: subLesson.order
        })),
        exercises: module.exercises.map(exercise => ({
          id: exercise.id,
          title: exercise.title,
          status: transformLessonStatus(exercise.status),
          content: exercise.content,
          type: transformExerciseType(exercise.type),
          order: exercise.order,
          mcqQuestions: exercise.mcqQuestions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation
          })),
          codeQuestions: exercise.codeQuestions.map(q => ({
            id: q.id,
            question: q.question,
            solution: q.solution
          }))
        }))
      }))
    }));

    return NextResponse.json(transformedCourses);

  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST endpoint to create sample course data (for testing)
export async function POST() {
  try {
    // Create a sample course for testing
    const course = await prisma.course.create({
      data: {
        title: 'Sample Programming Course',
        description: 'A comprehensive programming course with Python',
        modules: {
          create: [
            {
              title: 'Introduction to Python',
              order: 1,
              hasDemo: true,
              subLessons: {
                create: [
                  {
                    title: 'What is Python?',
                    order: 1,
                    status: 'DEMO',
                    content: '# What is Python?\n\nPython is a high-level programming language...'
                  },
                  {
                    title: 'Setting up Python',
                    order: 2,
                    status: 'LOCKED',
                    content: '# Setting up Python\n\nLearn how to install Python on your system...'
                  }
                ]
              },
              exercises: {
                create: [
                  {
                    title: 'Basic Python Exercises',
                    order: 1,
                    status: 'LOCKED',
                    type: 'CODE',
                    codeQuestions: {
                      create: [
                        {
                          question: 'Write a Python function that prints "Hello, World!"',
                          solution: 'print("Hello, World!")',
                          order: 1
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      include: {
        modules: {
          include: {
            subLessons: true,
            exercises: {
              include: {
                mcqQuestions: true,
                codeQuestions: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(course);

  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
