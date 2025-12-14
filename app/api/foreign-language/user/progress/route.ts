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

    // Combine filtered attempts with skill type identification
    const allAttempts = [
      ...filteredReadingAttempts.map(attempt => ({ ...attempt, skillType: 'reading' })),
      ...filteredMcqAttempts.map(attempt => ({ ...attempt, skillType: 'mcq' }))
    ];



    // Calculate current level and progress
    let currentLevel = 'A1';
    const levelProgress: Record<string, {
      completedSkills: number;
      totalSkills: number;
      isCompleted: boolean;
      skills: typeof userProgress;
      totalPoints: number;
      skillPoints: Record<string, number>;
      levelTotalPoints?: number;
      levelSkillPoints?: Record<string, number>;
      levelSpecificTotalEarned?: number;
      levelSpecificTotalTarget?: number;
      levelSpecificSkillPoints?: Record<string, number>;
      cumulativeTotalTarget?: number;
      cumulativeSkillTarget?: number;
      totalRange?: { min: number; max: number };
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
        // Use the skill type that was added during combination
        const skill = attempt.skillType;
        const points = calculatePointsFromScore(attempt.overallResult.overallScore);

        // Accumulate level total points
        levelPoints[level] = (levelPoints[level] || 0) + points;

        // Accumulate skill-specific points
        if (skillPoints[level][skill] !== undefined) {
          skillPoints[level][skill] += points;
        }
      }
    });


    // Calculate cumulative points across levels
    const cumulativeTotalPoints: Record<string, number> = {};
    const cumulativeSkillPoints: Record<string, Record<string, number>> = {};

    // Initialize cumulative tracking
    levels.forEach(level => {
      cumulativeTotalPoints[level] = 0;
      cumulativeSkillPoints[level] = {};
      availableSkills.forEach(skill => {
        cumulativeSkillPoints[level][skill] = 0;
      });
    });

    // Calculate cumulative points for each level (including all previous levels)
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      const previousLevel = i > 0 ? levels[i - 1] : null;

      // Start with previous level's cumulative points, or 0 for first level
      cumulativeTotalPoints[level] = previousLevel ? cumulativeTotalPoints[previousLevel] : 0;
      availableSkills.forEach(skill => {
        cumulativeSkillPoints[level][skill] = previousLevel 
          ? cumulativeSkillPoints[previousLevel][skill] 
          : 0;
      });

      // Add current level's points
      cumulativeTotalPoints[level] += levelPoints[level] || 0;
      availableSkills.forEach(skill => {
        cumulativeSkillPoints[level][skill] += skillPoints[level]?.[skill] || 0;
      });
    }

    // Find the highest level where all skills are completed, or the current level being worked on
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      const levelData = progressByLevel[level] || [];
      const completedSkills = levelData.filter((p) => p.isCompleted).length;

      const levelTotalPoints = levelPoints[level] || 0;
      const levelSkillPoints = skillPoints[level] || {};

      // Get cumulative values for this level
      const cumulativeTotal = cumulativeTotalPoints[level] || 0;
      const cumulativeSkills = cumulativeSkillPoints[level] || {};

      // Get level config to get cumulative target and ranges
      const levelConfig = cefrLevels.find(l => l.level === level);
      const cumulativeTotalTarget = levelConfig?.totalTargetScore || 0;
      const cumulativeSkillTarget = levelConfig?.skillTargetScore || 0;
      const totalRange = levelConfig?.totalRange || { min: 0, max: 0 };

      // Calculate level-specific progress (points earned in THIS level only)
      const previousLevel = i > 0 ? levels[i - 1] : null;
      const previousCumulativeTotal = previousLevel ? cumulativeTotalPoints[previousLevel] || 0 : 0;
      const previousCumulativeSkills = previousLevel ? cumulativeSkillPoints[previousLevel] || {} : {};
      
      // Level-specific total: how many points earned in this level, out of this level's range
      const levelSpecificTotalEarned = cumulativeTotal - previousCumulativeTotal;
      const levelSpecificTotalTarget = totalRange.max - totalRange.min;

      // Level-specific skill points: how many points earned in this level for each skill
      const levelSpecificSkillPoints: Record<string, number> = {};
      availableSkills.forEach(skill => {
        const previousSkillPoints = previousCumulativeSkills[skill] || 0;
        const currentSkillPoints = cumulativeSkills[skill] || 0;
        levelSpecificSkillPoints[skill] = currentSkillPoints - previousSkillPoints;
      });

      levelProgress[level] = {
        completedSkills,
        totalSkills,
        isCompleted: completedSkills === totalSkills,
        skills: levelData,
        totalPoints: cumulativeTotal, // Cumulative total
        skillPoints: cumulativeSkills, // Cumulative skill points
        // Level-specific values (for display in current level)
        levelTotalPoints: levelTotalPoints,
        levelSkillPoints: levelSkillPoints,
        levelSpecificTotalEarned, // Points earned in THIS level
        levelSpecificTotalTarget, // Target for THIS level (range size)
        levelSpecificSkillPoints, // Points earned in THIS level per skill
        // Include targets and ranges for display
        cumulativeTotalTarget,
        cumulativeSkillTarget,
        totalRange
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


    // Prepare scores by category
    const readingScores = readingAttempts.map(attempt => ({
      level: attempt.session.cefrLevel,
      score: attempt.overallResult?.overallScore || 0,
      points: attempt.overallResult?.overallScore ? calculatePointsFromScore(attempt.overallResult.overallScore) : 0,
      completedAt: attempt.completedAt || attempt.createdAt,
      sessionId: attempt.sessionId,
      attemptId: attempt.id
    }));

    const mcqScores = mcqAttempts.map(attempt => ({
      level: attempt.session.cefrLevel,
      score: attempt.overallResult?.overallScore || 0,
      points: attempt.overallResult?.overallScore ? calculatePointsFromScore(attempt.overallResult.overallScore) : 0,
      completedAt: attempt.completedAt || attempt.createdAt,
      sessionId: attempt.sessionId,
      attemptId: attempt.id
    }));

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
        })),
        scores: {
          reading: readingScores,
          mcq: mcqScores
        }
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