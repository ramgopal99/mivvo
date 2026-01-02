import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { COURSE_ENROLLMENT_CREDITS } from '@/config/site';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { courseId },
      select: { id: true, courseId: true, title: true, price: true },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if user is already enrolled
    const existingEnrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'User is already enrolled in this course' },
        { status: 409 }
      );
    }

    // Create enrollment
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        userId,
        courseId: course.id,
      },
    });

    // Allocate course credits to the user (only if they don't already exist)
    try {
      const existingCredits = await prisma.courseCredit.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: course.id,
          },
        },
      });

      if (!existingCredits) {
        await prisma.courseCredit.create({
          data: {
            userId,
            courseId: course.id,
            totalCredits: COURSE_ENROLLMENT_CREDITS,
            usedCredits: 0,
            creditType: 'ENROLLMENT',
            isActive: true,
          },
        });
      }
    } catch (creditError) {
      // If credit allocation fails (e.g., unique constraint violation), log but don't fail enrollment
      console.error('Error allocating course credits:', creditError);
    }

    // Handle affiliate commission tracking - check multiple recent referrals
    try {
      const cookieStore = await cookies()
      const latestReferralId = cookieStore.get('affiliate_referral_id')?.value

      console.log(`[AFFILIATE] User ${userId} enrolling in course ${courseId}`)
      console.log(`[AFFILIATE] Latest referral ID from cookie: ${latestReferralId}`)

      // Get all recent referral IDs to check (for multi-user support)
      let referralIdsToCheck = []

      if (latestReferralId) {
        referralIdsToCheck.push(latestReferralId)
      }

      // Also check for additional referrals stored in a secondary cookie (for multi-user support)
      const additionalReferrals = cookieStore.get('affiliate_additional_referrals')?.value
      console.log(`[AFFILIATE] Additional referrals cookie: ${additionalReferrals}`)

      if (additionalReferrals) {
        try {
          const additionalIds = JSON.parse(additionalReferrals)
          console.log(`[AFFILIATE] Additional referral IDs: ${additionalIds.join(', ')}`)
          referralIdsToCheck.push(...additionalIds)
        } catch (e) {
          console.error('[AFFILIATE] Error parsing additional referrals:', e)
        }
      }

      // If no cookies found, this might be a logged-in user who had referral tracking
      // In a production app, you might want to check user session data or database for referral history
      // For now, we'll rely on cookies as the primary tracking mechanism

      // Remove duplicates
      referralIdsToCheck = [...new Set(referralIdsToCheck)]
      console.log(`[AFFILIATE] Total referral IDs to check: ${referralIdsToCheck.length} - ${referralIdsToCheck.join(', ')}`)

      if (referralIdsToCheck.length === 0) {
        console.log(`[AFFILIATE] No referral IDs found - no affiliate commission will be created`)
        console.log(`[AFFILIATE] This could be because:`)
        console.log(`[AFFILIATE] 1. User didn't click a referral link`)
        console.log(`[AFFILIATE] 2. Referral cookies expired (30 days)`)
        console.log(`[AFFILIATE] 3. Cookies were cleared`)
        console.log(`[AFFILIATE] 4. User used incognito/private browsing`)
      }

      // Check each referral ID for valid commission
      for (const referralId of referralIdsToCheck) {
        console.log(`[AFFILIATE] Checking referral ID: ${referralId}`)

        try {
          // Find the referral record
          const referral = await prisma.affiliateReferral.findUnique({
            where: { id: referralId },
            include: {
              affiliate: {
                include: {
                  user: true, // Include affiliate user info to check for self-referral
                },
              },
            },
          })

          console.log(`[AFFILIATE] Referral found: ${!!referral}`)
          console.log(`[AFFILIATE] Course price: ${course.price}`)

          if (referral && course.price && course.price > 0) {
            // Check if referral is within 30 days
            const referralAge = Date.now() - new Date(referral.createdAt).getTime()
            const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000
            const isReferralValid = referralAge <= thirtyDaysMs

            // Prevent self-referral (user referring themselves)
            const isSelfReferral = referral.affiliate.userId === userId

            // Note: Affiliate status was checked during referral creation (track API)
            // The 30-day validity period allows commissions even if affiliate gets suspended later
            console.log(`[AFFILIATE] Referral age: ${Math.round(referralAge / (24 * 60 * 60 * 1000))} days`)
            console.log(`[AFFILIATE] Is referral valid: ${isReferralValid}`)
            console.log(`[AFFILIATE] Is self-referral: ${isSelfReferral}`)
            console.log(`[AFFILIATE] Affiliate status: ${referral.affiliate.status}`)

            if (isReferralValid && !isSelfReferral) {
              // Calculate commission amount (ensure price is valid)
              const coursePrice = parseFloat(course.price.toString())
              const commissionAmount = coursePrice * referral.affiliate.commissionRate

              // Only create commission if amount is valid
              if (!isNaN(commissionAmount) && commissionAmount > 0) {
                // Create commission record
                await prisma.affiliateCommission.create({
                  data: {
                    affiliateId: referral.affiliateId,
                    referralId: referral.id,
                    amount: commissionAmount,
                    commissionRate: referral.affiliate.commissionRate,
                    courseId: course.id,
                    courseTitle: course.title,
                    coursePrice: coursePrice,
                    status: 'PENDING',
                  },
                })

                // Update affiliate total earnings
                await prisma.affiliate.update({
                  where: { id: referral.affiliateId },
                  data: {
                    totalEarnings: {
                      increment: commissionAmount,
                    },
                  },
                })

                // DON'T mark referral as converted - allow multiple commissions within 30 days
                console.log(`Affiliate commission created: ₹${commissionAmount} for affiliate ${referral.affiliateId} (referral age: ${Math.round(referralAge / (24 * 60 * 60 * 1000))} days)`)
                break // Stop after finding first valid referral to avoid duplicate commissions
              } else {
                console.log(`Invalid commission amount: ${commissionAmount}`)
              }
            } else {
              if (!isReferralValid) {
                console.log(`Referral expired: ${referralId} (age: ${Math.round(referralAge / (24 * 60 * 60 * 1000))} days)`)
              }
              if (isSelfReferral) {
                console.log(`Self-referral blocked: User ${userId} tried to refer themselves`)
              }
            }
          }
        } catch (referralError) {
          console.error(`Error checking referral ${referralId}:`, referralError)
          continue // Try next referral ID
        }
      }
    } catch (affiliateError) {
      // Log affiliate error but don't fail enrollment
      console.error('Error processing affiliate commission:', affiliateError);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully enrolled in course',
      enrollment,
      credits: COURSE_ENROLLMENT_CREDITS,
      course: {
        id: course.courseId,
        title: course.title,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error enrolling in course:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { courseId },
      select: { id: true },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Delete enrollment
    await prisma.courseEnrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully unenrolled from course',
    });

  } catch (error) {
    console.error('Error unenrolling from course:', error);
    return NextResponse.json(
      { error: 'Failed to unenroll from course' },
      { status: 500 }
    );
  }
}

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

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { courseId },
      select: { id: true },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check enrollment status
    const enrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
      select: {
        id: true,
        enrolledAt: true,
        isActive: true,
      },
    });

    return NextResponse.json({
      isEnrolled: !!enrollment?.isActive,
      enrollment: enrollment || null,
    });

  } catch (error) {
    console.error('Error checking enrollment status:', error);
    return NextResponse.json(
      { error: 'Failed to check enrollment status' },
      { status: 500 }
    );
  }
}
