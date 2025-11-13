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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch course with its modules, sublessons, and exercises
    const course = await prisma.course.findUnique({
      where: { id },
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
      }
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Transform the data to match the frontend interface
    const transformedCourse = {
      id: course.id,
      title: course.title,
      description: course.description,
      hasDemo: course.modules.some(m => m.hasDemo),
      isExpanded: false,
      isActive: false,
      subLessons: [],
      exercises: [],
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
      })),
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString()
    };

    return NextResponse.json(transformedCourse);

  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

