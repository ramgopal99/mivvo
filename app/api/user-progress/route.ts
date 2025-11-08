import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const userId = searchParams.get('userId');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    let currentUserId = userId;

    // Check for JWT token in authorization header (for college students)
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        currentUserId = decoded.userId;
      } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    if (!currentUserId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Get user progress for the course
    const progress = await prisma.userProgress.findMany({
      where: {
        userId: currentUserId,
        courseId: courseId,
        isCompleted: true,
      },
      select: {
        itemKey: true,
        completedAt: true,
      },
      orderBy: {
        completedAt: 'desc',
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { progressData, userId } = body;

    if (!progressData || !Array.isArray(progressData)) {
      return NextResponse.json({ error: 'Progress data is required' }, { status: 400 });
    }

    let currentUserId = userId;

    // Check for JWT token in authorization header (for college students)
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        currentUserId = decoded.userId;
      } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    if (!currentUserId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Process each progress item
    const results = await Promise.all(
      progressData.map(async (item: any) => {
        const { itemKey, courseId, isCompleted } = item;

        // Extract module, lesson/exercise info from itemKey
        // itemKey format: "module-{moduleId}-lesson-{lessonId}" or "module-{moduleId}-exercise-{exerciseId}"
        const parts = itemKey.split('-');
        if (parts.length < 4) return null;

        const moduleId = `module-${parts[1]}`;
        const itemType = parts[2]; // "lesson" or "exercise"

        try {
          // Upsert the progress record
          const progress = await prisma.userProgress.upsert({
            where: {
              userId_itemKey: {
                userId: currentUserId,
                itemKey: itemKey,
              },
            },
            update: {
              isCompleted: isCompleted,
              completedAt: isCompleted ? new Date() : null,
            },
            create: {
              userId: currentUserId,
              courseId: courseId,
              moduleId: moduleId,
              itemType: itemType,
              itemKey: itemKey,
              isCompleted: isCompleted,
              completedAt: isCompleted ? new Date() : null,
            },
          });

          return progress;
        } catch (error) {
          console.error(`Error saving progress for ${itemKey}:`, error);
          return null;
        }
      })
    );

    const successfulSaves = results.filter(result => result !== null);

    return NextResponse.json({
      message: `Saved ${successfulSaves.length} progress items`,
      saved: successfulSaves.length,
    });
  } catch (error) {
    console.error('Error saving user progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
