/**
 * One-off script: grant 3000 credits and set userType to PRO for a given user ID.
 * Usage: npx tsx scripts/grant-credits-and-pro.ts
 * Or:    npm run grant-credits-pro
 *
 * Requires DATABASE_URL in .env (or environment).
 *
 * Note: DB stores allocation in MINUTES. UI displays minutes × 12 as "credits".
 * So 3000 display credits = 250 minutes. creditResetAt is set so the 30-day
 * expiration window starts from now (otherwise /api/user/time-data would expire them).
 */

import "dotenv/config"
import { PrismaClient } from "@prisma/client"

const USER_ID = "cmj0qsbkj00005agw8i7rren7"
/** Display credits the user should see (e.g. 3000). Stored in DB as minutes: displayCredits / 12 */
const DISPLAY_CREDITS = 3000
const CREDITS_PER_MINUTE = 12
const ALLOCATION_MINUTES = Math.round(DISPLAY_CREDITS / CREDITS_PER_MINUTE) // 250

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("Missing DATABASE_URL in environment. Set it in .env or export it.")
    process.exit(1)
  }

  const prisma = new PrismaClient()

  try {
    const user = await prisma.user.findUnique({
      where: { id: USER_ID },
      select: {
        id: true,
        email: true,
        name: true,
        userType: true,
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true,
      },
    })

    if (!user) {
      console.error(`User not found with id: ${USER_ID}`)
      process.exit(1)
    }

    const now = new Date()
    await prisma.user.update({
      where: { id: USER_ID },
      data: {
        userType: "PRO",
        totalCreditAllocation: ALLOCATION_MINUTES,
        usedCredits: 0,
        creditResetAt: now, // Start 30-day expiration from now so /api/user/time-data doesn't expire credits
      },
    })

    // Re-fetch to confirm write
    const updated = await prisma.user.findUnique({
      where: { id: USER_ID },
      select: {
        userType: true,
        totalCreditAllocation: true,
        usedCredits: true,
        creditResetAt: true,
      },
    })

    if (!updated) {
      console.error("Update reported success but user could not be re-fetched.")
      process.exit(1)
    }

    const displayTotal = (updated.totalCreditAllocation ?? 0) * CREDITS_PER_MINUTE
    const displayUsed = (updated.usedCredits ?? 0) * CREDITS_PER_MINUTE
    console.log("Update successful (verified by re-fetch).")
    console.log(`  User: ${user.email} (${user.name ?? user.id})`)
    console.log(`  userType: ${user.userType} → ${updated.userType}`)
    console.log(`  totalCreditAllocation (minutes): ${user.totalCreditAllocation ?? "null"} → ${updated.totalCreditAllocation}`)
    console.log(`  usedCredits (minutes): ${user.usedCredits} → ${updated.usedCredits}`)
    console.log(`  creditResetAt: ${user.creditResetAt?.toISOString() ?? "null"} → ${updated.creditResetAt?.toISOString()}`)
    console.log(`  In UI: ${displayTotal} credits total, ${displayUsed} used, ${displayTotal - displayUsed} available`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
