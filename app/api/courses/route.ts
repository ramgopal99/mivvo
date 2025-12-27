import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface CourseWithProgress {
  id: string;
  courseId: string;
  title: string;
  displayName: string;
  description: string | null;
  headerTitle: string | null;
  completionPercentage: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  modules?: Array<{
    id: string;
    title: string;
    hasDemo: boolean;
    isExpanded: boolean;
    isActive: boolean;
    order: number;
    topics?: Array<{
      id: string;
      title: string;
      order: number;
      status: 'DEMO' | 'LOCKED' | 'COMPLETED';
    }>;
    exercises?: Array<{
      id: string;
      title: string;
      status: 'DEMO' | 'LOCKED' | 'COMPLETED';
      order: number;
    }>;
  }>;
  _count?: {
    modules: number;
  };
  userProgress?: {
    completedItems: number;
    totalItems: number;
    progressPercentage: number;
    isEnrolled: boolean;
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const courses = await prisma.course.findMany({
      select: {
        id: true,
        courseId: true,
        title: true,
        displayName: true,
        description: true,
        price: true,
        headerTitle: true,
        completionPercentage: true,
        createdAt: true,
        updatedAt: true,
        modules: {
          select: {
            id: true,
            title: true,
            hasDemo: true,
            isExpanded: true,
            isActive: true,
            order: true,
            topics: {
              select: {
                id: true,
                title: true,
                order: true,
                status: true,
              },
            },
            exercises: {
              select: {
                id: true,
                title: true,
                status: true,
                order: true,
              },
            },
          },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            modules: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Add progress tracking and enrollment status for authenticated users
    let coursesWithProgress: CourseWithProgress[] = courses;
    if (userId) {
      coursesWithProgress = await Promise.all(
        courses.map(async (course: CourseWithProgress) => {
          // Check if user is enrolled in this course
          const enrollment = await prisma.courseEnrollment.findUnique({
            where: {
              userId_courseId: {
                userId: userId,
                courseId: course.id,
              },
            },
          });


          // Get user's progress for this course
          const progressRecords = await prisma.courseUserProgress.findMany({
            where: {
              userId: userId,
              courseId: course.id,
              isCompleted: true,
            },
          });

          // Calculate total items in course
          let totalItems = 0;
          course.modules?.forEach((module) => {
            totalItems += module.topics?.length || 0;
            totalItems += module.exercises?.length || 0;
          });

          // Calculate completion percentage
          const completedItems = progressRecords.length;
          const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

          // Set hasDemo based on enrollment status
          // If enrolled (enrollment exists and is active), hasDemo = false
          // If not enrolled, hasDemo = true (default behavior for demo access)
          const isEnrolled = enrollment?.isActive ?? false;


          return {
            ...course,
            userProgress: {
              completedItems,
              totalItems,
              progressPercentage,
              isEnrolled,
            },
            // Override module hasDemo based on enrollment AND module active status
            modules: course.modules?.map(module => ({
              ...module,
              hasDemo: !(isEnrolled && module.isActive), // If enrolled AND module is active, hasDemo = false; otherwise hasDemo = true
            })),
          };
        })
      );
    }

    // Transform the response to match the Course interface (convert status to lowercase)
    const transformedCourses = coursesWithProgress.map(course => ({
      ...course,
      modules: course.modules?.map(module => ({
        ...module,
        topics: module.topics?.map(topic => ({
          ...topic,
          status: topic.status.toLowerCase() as 'demo' | 'locked' | 'completed'
        })),
        exercises: module.exercises?.map(exercise => ({
          ...exercise,
          status: exercise.status.toLowerCase() as 'demo' | 'locked' | 'completed'
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const course = await prisma.course.create({
      data: {
        courseId: body.courseId,
        title: body.title,
        displayName: body.displayName,
        description: body.description,
        headerTitle: body.headerTitle,
        completionPercentage: body.completionPercentage || '0% Completed',
        monacoLanguage: body.monacoLanguage,
        codeDisplayName: body.codeDisplayName,
        defaultCode: body.defaultCode,
        executionLanguage: body.executionLanguage,
        executionVersion: body.executionVersion,
        aiAssistantName: body.aiAssistantName,
        aiAssistantDescription: body.aiAssistantDescription,
        aiAssistantPrompt: body.aiAssistantPrompt,
        showCodeEditor: body.showCodeEditor ?? false,
        defaultModule: body.defaultModule ?? 1,
        autoSelectFirstTopic: body.autoSelectFirstTopic ?? true,
        showCourseSwitcher: body.showCourseSwitcher ?? true,
      },
      include: {
        modules: {
          include: {
            topics: true,
            exercises: {
              include: {
                mcqQuestions: true,
                codeQuestions: true,
              },
            },
            formulas: true,
          },
        },
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
