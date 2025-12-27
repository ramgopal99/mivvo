import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Get course details
    const course = await prisma.course.findUnique({
      where: { courseId },
      select: {
        id: true,
        courseId: true,
        title: true,
        displayName: true,
        modules: {
          select: {
            id: true,
            title: true,
            order: true,
            topics: {
              select: {
                id: true,
                title: true,
                order: true,
              },
            },
            exercises: {
              select: {
                id: true,
                title: true,
                order: true,
              },
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

    // Get user's progress for this course
    const progressRecords = await prisma.courseUserProgress.findMany({
      where: {
        userId: userId,
        courseId: course.id,
      },
      select: {
        itemKey: true,
        isCompleted: true,
        completedAt: true,
        itemType: true,
      },
    });

    // Calculate total items and completed items by module
    const moduleProgress = course.modules?.map(module => {
      const moduleTopics = module.topics || [];
      const moduleExercises = module.exercises || [];

      const totalItems = moduleTopics.length + moduleExercises.length;

      // Find completed items for this module
      const completedTopics = moduleTopics.filter(topic =>
        progressRecords.some(record =>
          record.itemKey === `module-${module.order}-topic-${topic.order}` &&
          record.isCompleted
        )
      );

      const completedExercises = moduleExercises.filter(exercise =>
        progressRecords.some(record =>
          record.itemKey === `module-${module.order}-exercise-${exercise.order}` &&
          record.isCompleted
        )
      );

      const completedItems = completedTopics.length + completedExercises.length;
      const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

      return {
        moduleId: module.id,
        moduleTitle: module.title,
        moduleOrder: module.order,
        totalItems,
        completedItems,
        progressPercentage,
        topics: moduleTopics.map(topic => ({
          id: topic.id,
          title: topic.title,
          order: topic.order,
          isCompleted: progressRecords.some(record =>
            record.itemKey === `module-${module.order}-topic-${topic.order}` &&
            record.isCompleted
          ),
        })),
        exercises: moduleExercises.map(exercise => ({
          id: exercise.id,
          title: exercise.title,
          order: exercise.order,
          isCompleted: progressRecords.some(record =>
            record.itemKey === `module-${module.order}-exercise-${exercise.order}` &&
            record.isCompleted
          ),
        })),
      };
    }) || [];

    // Calculate overall course progress
    const totalItems = moduleProgress.reduce((sum, module) => sum + module.totalItems, 0);
    const totalCompleted = moduleProgress.reduce((sum, module) => sum + module.completedItems, 0);
    const overallProgress = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

    return NextResponse.json({
      courseId: course.courseId,
      courseTitle: course.title,
      displayName: course.displayName,
      overallProgress,
      totalItems,
      totalCompleted,
      modules: moduleProgress,
    });

  } catch (error) {
    console.error('Error fetching course progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log('🚀 Progress API POST triggered from frontend');

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.log('❌ Progress API: User not authenticated');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { courseId, moduleId, itemType, itemKey, isCompleted } = body;

    console.log('📥 Progress API received:', { courseId, moduleId, itemType, itemKey, isCompleted });

    if (!courseId || !itemKey || typeof isCompleted !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get course to verify it exists
    console.log('🔍 Looking up course:', courseId);
    const course = await prisma.course.findUnique({
      where: { courseId },
      select: { id: true },
    });

    if (!course) {
      console.log('❌ Course not found:', courseId);
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    console.log('✅ Course found:', course.id);

    // Upsert progress record
    console.log('💾 Saving progress to database...');
    let progress;
    try {
      progress = await prisma.courseUserProgress.upsert({
        where: {
          userId_itemKey: {
            userId,
            itemKey,
          },
        },
        update: {
          isCompleted,
          completedAt: isCompleted ? new Date() : null,
        },
        create: {
          userId,
          courseId: course.id,
          courseModuleId: moduleId,
          itemType,
          itemKey,
          isCompleted,
          completedAt: isCompleted ? new Date() : null,
        },
      });
      console.log('✅ Progress saved successfully:', progress.id);
    } catch (dbError) {
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error';
      console.error('❌ Database error:', errorMessage);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    console.log('🎉 Progress API POST completed successfully');
    return NextResponse.json(progress);

  } catch (error) {
    console.error('Error updating course progress:', error);
    return NextResponse.json(
      { error: 'Failed to update course progress' },
      { status: 500 }
    );
  }
}
