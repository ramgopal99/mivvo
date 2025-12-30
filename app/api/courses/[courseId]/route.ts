import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ courseId: string }>;
}


export async function GET(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  try {
    // Get authenticated user (optional for course details)
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const course = await prisma.course.findUnique({
      where: { courseId: resolvedParams.courseId },
      include: {
        modules: {
          include: {
            topics: {
              orderBy: { order: 'asc' },
            },
            exercises: {
              include: {
                mcqQuestions: {
                  orderBy: { order: 'asc' },
                },
                codeQuestions: {
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
            formulas: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // If user is authenticated, check enrollment status for additional data
    if (userId) {
      const enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: course.id,
          },
        },
      });

      // Return course data with enrollment status
      return NextResponse.json({
        ...course,
        isEnrolled: !!enrollment && enrollment.isActive,
        enrollmentData: enrollment
      });
    }

    // For unauthenticated users, return basic course info
    return NextResponse.json({
      ...course,
      isEnrolled: false,
      enrollmentData: null
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  try {
    const body = await request.json();

    const course = await prisma.course.update({
      where: { courseId: resolvedParams.courseId },
      data: {
        title: body.title,
        displayName: body.displayName,
        description: body.description,
        image: body.image,
        headerTitle: body.headerTitle,
        completionPercentage: body.completionPercentage,
        monacoLanguage: body.monacoLanguage,
        codeDisplayName: body.codeDisplayName,
        defaultCode: body.defaultCode,
        executionLanguage: body.executionLanguage,
        executionVersion: body.executionVersion,
        aiAssistantName: body.aiAssistantName,
        aiAssistantDescription: body.aiAssistantDescription,
        aiAssistantPrompt: body.aiAssistantPrompt,
        showCodeEditor: body.showCodeEditor,
        showFormulas: body.showFormulas,
        defaultModule: body.defaultModule,
        autoSelectFirstTopic: body.autoSelectFirstTopic,
        showCourseSwitcher: body.showCourseSwitcher,
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

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  try {
    await prisma.course.delete({
      where: { courseId: resolvedParams.courseId },
    });

    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
