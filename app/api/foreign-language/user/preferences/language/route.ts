/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { language } = body;

    if (!language) {
      return NextResponse.json(
        { success: false, error: 'Language is required' },
        { status: 400 }
      );
    }

    // Update user's preferred language
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { preferredLanguage: language },
      select: {
        id: true,
        preferredLanguage: true
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user language preference:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update language preference' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's preferred language
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        preferredLanguage: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        preferredLanguage: user.preferredLanguage || 'ENGLISH' // Default to English
      }
    });
  } catch (error) {
    console.error('Error fetching user language preference:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch language preference' },
      { status: 500 }
    );
  }
}