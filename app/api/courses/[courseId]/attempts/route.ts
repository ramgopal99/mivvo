import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

interface RouteParams {
  params: { courseId: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const attempts = await prisma.courseAttempt.findMany({
      where: {
        userId: session.user.id,
        courseId: params.courseId,
      },
      include: {
        exercise: {
          include: {
            mcqQuestions: true,
            codeQuestions: true,
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    });

    return NextResponse.json(attempts);
  } catch (error) {
    console.error('Error fetching course attempts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course attempts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { courseExerciseId } = body;

    // Check if there's already an in-progress attempt for this exercise
    const existingAttempt = await prisma.courseAttempt.findFirst({
      where: {
        userId: session.user.id,
        courseExerciseId: courseExerciseId,
        status: 'IN_PROGRESS',
      },
    });

    if (existingAttempt) {
      return NextResponse.json(existingAttempt);
    }

    const attempt = await prisma.courseAttempt.create({
      data: {
        userId: session.user.id,
        courseId: params.courseId,
        courseExerciseId: courseExerciseId,
        status: 'IN_PROGRESS',
      },
      include: {
        exercise: {
          include: {
            mcqQuestions: true,
            codeQuestions: true,
          },
        },
      },
    });

    return NextResponse.json(attempt, { status: 201 });
  } catch (error) {
    console.error('Error creating course attempt:', error);
    return NextResponse.json(
      { error: 'Failed to create course attempt' },
      { status: 500 }
    );
  }
}
