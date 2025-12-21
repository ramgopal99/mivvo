import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
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

    return NextResponse.json(courses);
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
