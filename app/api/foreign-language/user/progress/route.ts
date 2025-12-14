import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getAllCEFRLevels, skillConfig, calculatePointsFromScore } from '@/app/dashboard/foreign-lang/config';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');
    const skillType = searchParams.get('skillType'); // Optional: 'reading' or 'mcq'

    if (!language) {
      return NextResponse.json(
        { success: false, error: 'Language parameter is required' },
        { status: 400 }
      );
    }

    // Get language config from database
    const languageConfig = await prisma.languageConfig.findUnique({
      where: { language },
      select: { id: true, name: true, code: true }
    });

    if (!languageConfig) {
      return NextResponse.json(
        { success: false, error: 'Language configuration not found' },
        { status: 404 }
      );
    }

    const languageConfigId = languageConfig.id;

    // Get user's level progress for this language
    const userProgress = await prisma.userLevelProgress.findMany({
      where: {
        userId: session.user.id,
        languageId: languageConfigId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Get all reading attempts with scores to calculate points
    const readingAttempts = await prisma.readingAttempt.findMany({
      where: {
        userId: session.user.id,
        languageId: languageConfigId
      },
      include: {
        session: {
          select: {
            cefrLevel: true,
            languageId: true
          }
        },
        overallResult: {
          select: {
            overallScore: true
          }
        }
      }
    });

    // Get all MCQ attempts with scores to calculate points
    const mcqAttempts = await prisma.mcqAttempt.findMany({
      where: {
        userId: session.user.id,
        languageId: languageConfigId
      },
      include: {
        session: {
          select: {
            cefrLevel: true,
            languageId: true
          }
        },
        overallResult: {
          select: {
            overallScore: true
          }
        }
      }
    });

    // Filter attempts by skill type if specified
    let filteredReadingAttempts = readingAttempts;
    let filteredMcqAttempts = mcqAttempts;

    if (skillType) {
      if (skillType.toLowerCase() === 'reading') {
        filteredMcqAttempts = []; // Only show reading attempts
      } else if (skillType.toLowerCase() === 'mcq') {
        filteredReadingAttempts = []; // Only show MCQ attempts
      }
    }

    // Combine filtered attempts
    const allAttempts = [...filteredReadingAttempts, ...filteredMcqAttempts];


    // Calculate current level and progress
    let currentLevel = 'A1';
    const levelProgress: Record<string, {
      completedSkills: number;
      totalSkills: number;
      isCompleted: boolean;
      skills: typeof userProgress;
      totalPoints: number;
      skillPoints: Record<string, number>;
    }> = {};

    // Group progress by level
    const progressByLevel = userProgress.reduce((acc, progress) => {
      const level = progress.cefrLevel;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(progress);
      return acc;
    }, {} as Record<string, typeof userProgress>);

    // Get available skills from config (map to lowercase for consistency)
    const availableSkills = Object.keys(skillConfig);
    const totalSkills = availableSkills.length;

    // Get CEFR levels from config
    const cefrLevels = getAllCEFRLevels();
    const levels = cefrLevels.map(level => level.level);

    // Calculate points for each level and skill
    const levelPoints: Record<string, number> = {};
    const skillPoints: Record<string, Record<string, number>> = {};

    // Initialize skillPoints for all levels
    levels.forEach(level => {
      skillPoints[level] = {};
      availableSkills.forEach(skill => {
        skillPoints[level][skill] = 0;
      });
    });

    allAttempts.forEach(attempt => {
      if (attempt.overallResult?.overallScore) {
        const level = attempt.session.cefrLevel;
        // Determine skill type based on whether it's a reading or MCQ attempt
        const skill = 'readingAttempt' in attempt ? 'reading' : 'mcq'; // Use lowercase to match config keys
        const points = calculatePointsFromScore(attempt.overallResult.overallScore);

        // Accumulate level total points
        levelPoints[level] = (levelPoints[level] || 0) + points;

        // Accumulate skill-specific points
        if (skillPoints[level][skill] !== undefined) {
          skillPoints[level][skill] += points;
        }
      }
    });


    // Find the highest level where all skills are completed, or the current level being worked on
    for (const level of levels) {
      const levelData = progressByLevel[level] || [];
      const completedSkills = levelData.filter((p) => p.isCompleted).length;

      const levelTotalPoints = levelPoints[level] || 0;
      const levelSkillPoints = skillPoints[level] || {};


      levelProgress[level] = {
        completedSkills,
        totalSkills,
        isCompleted: completedSkills === totalSkills,
        skills: levelData,
        totalPoints: levelTotalPoints,
        skillPoints: levelSkillPoints
      };

      if (completedSkills < totalSkills) {
        currentLevel = level;
        break;
      } else if (completedSkills === totalSkills) {
        currentLevel = level;
      }
    }

    // Get current level details
    const currentLevelDetails = cefrLevels.find(level => level.level === currentLevel);


    return NextResponse.json({
      success: true,
      data: {
        language: languageConfig,
        currentLevel,
        currentLevelDetails,
        levelProgress,
        availableSkills: Object.keys(skillConfig).map(skill => ({
          key: skill,
          ...skillConfig[skill as keyof typeof skillConfig]
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user progress' },
      { status: 500 }
    );
  }
}