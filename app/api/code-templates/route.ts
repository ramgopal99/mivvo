import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId parameter is required' },
        { status: 400 }
      );
    }

    const templates = await prisma.codeTemplate.findMany({
      where: {
        courseId,
        isActive: true
      },
      orderBy: {
        language: 'asc'
      }
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching code templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch code templates' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId parameter is required' },
        { status: 400 }
      );
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Parse request body for template data
    const body = await request.json();
    const { language, code, description } = body;

    if (!language || !code) {
      return NextResponse.json(
        { error: 'language and code are required' },
        { status: 400 }
      );
    }

    // Create or update template for the specific course
    const template = await prisma.codeTemplate.upsert({
      where: {
        courseId_language: {
          courseId,
          language
        }
      },
      update: {
        code,
        description,
        isActive: true
      },
      create: {
        courseId,
        language,
        code,
        description,
        isActive: true
      }
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error creating code template:', error);
    return NextResponse.json(
      { error: 'Failed to create code template' },
      { status: 500 }
    );
  }
}
