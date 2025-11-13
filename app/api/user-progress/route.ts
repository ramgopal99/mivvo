import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
  collegeId?: string;
  collegeName?: string;
  type?: string;
  iat?: number;
  exp?: number;
}

/**
 * Authenticate user from NextAuth session or JWT token
 * @param request - NextRequest object
 * @returns User ID if authenticated, null otherwise
 */
async function authenticateUser(request: NextRequest): Promise<string | null> {
  // First, try NextAuth session
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    return session.user.id;
  }

  // If no NextAuth session, try JWT token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || 'fallback-secret') as DecodedToken;
      if (decoded.userId) {
        return decoded.userId;
      }
    } catch (error) {
      console.error('JWT verification failed:', error);
    }
  }

  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const userId = searchParams.get('userId');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    // Try to authenticate user
    const currentUserId = userId || await authenticateUser(request);

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

    // Try to authenticate user
    const currentUserId = userId || await authenticateUser(request);

    if (!currentUserId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Process each progress item
    const results = await Promise.all(
      progressData.map(async (item: { itemKey: string; courseId: string; isCompleted: boolean }) => {
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
