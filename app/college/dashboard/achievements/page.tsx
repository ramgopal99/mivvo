"use client"

import { useState } from "react"
import { AchievementsStats, AchievementCard, AchievementsLeaderboard } from "./_components"
import { dummyStudents } from "@/app/college/_components/dummy-data"

// Generate dummy achievements data
const dummyAchievements = [
  {
    id: "first-interview",
    title: "First Interview",
    description: "Completed your first mock interview",
    icon: "first-interview",
    type: "milestone" as const,
    rarity: "common" as const,
    points: 10,
    unlockedBy: [
      { name: "Alice Johnson", date: "2024-01-10" },
      { name: "Bob Smith", date: "2024-01-08" },
      { name: "Carol Davis", date: "2024-01-12" }
    ],
    requirements: "Complete 1 interview",
    totalUnlocked: 5
  },
  {
    id: "score-master",
    title: "Score Master",
    description: "Achieved a perfect score in any interview",
    icon: "perfect-score",
    type: "milestone" as const,
    rarity: "epic" as const,
    points: 50,
    unlockedBy: [
      { name: "Carol Davis", date: "2024-01-14" }
    ],
    requirements: "Score 100% in any interview type",
    totalUnlocked: 1
  },
  {
    id: "consistent-learner",
    title: "Consistent Learner",
    description: "Completed interviews for 10 consecutive days",
    icon: "consistent-learner",
    type: "completion" as const,
    rarity: "rare" as const,
    points: 25,
    unlockedBy: [
      { name: "Alice Johnson", date: "2024-01-12" },
      { name: "Bob Smith", date: "2024-01-10" }
    ],
    requirements: "Complete interviews for 10 days in a row",
    totalUnlocked: 2
  },
  {
    id: "interview-streak",
    title: "Interview Streak",
    description: "Completed 5 interviews in one week",
    icon: "interview-streak",
    type: "completion" as const,
    rarity: "rare" as const,
    points: 30,
    unlockedBy: [
      { name: "David Wilson", date: "2024-01-11" },
      { name: "Eva Martinez", date: "2024-01-09" }
    ],
    requirements: "Complete 5 interviews within 7 days",
    totalUnlocked: 3
  },
  {
    id: "skill-master",
    title: "Skill Master",
    description: "Excelled in technical, behavioral, and system design interviews",
    icon: "skill-master",
    type: "special" as const,
    rarity: "legendary" as const,
    points: 100,
    unlockedBy: [],
    requirements: "Score 90%+ in all three interview types",
    totalUnlocked: 0
  },
  {
    id: "time-champion",
    title: "Time Champion",
    description: "Spent over 20 hours practicing interviews",
    icon: "time-champion",
    type: "improvement" as const,
    rarity: "epic" as const,
    points: 40,
    unlockedBy: [
      { name: "Bob Smith", date: "2024-01-13" }
    ],
    requirements: "Accumulate 20+ hours of interview practice time",
    totalUnlocked: 1
  }
]

// Generate leaderboard data from students
const leaderboardEntries = dummyStudents
  .map(student => ({
    rank: 0, // Will be set after sorting
    student: {
      id: student.id,
      name: student.name,
      avatar: student.avatar
    },
    achievements: student.achievements.length,
    points: student.achievements.length * 10 + Math.floor(student.averageScore / 10), // Simple point calculation
    streak: Math.floor(Math.random() * 5) // Random streak for demo
  }))
  .sort((a, b) => b.points - a.points)
  .map((entry, index) => ({ ...entry, rank: index + 1 }))
  .slice(0, 10)

export default function AchievementsPage() {
  const [selectedType, setSelectedType] = useState<string>("all")

  const filteredAchievements = dummyAchievements.filter(achievement =>
    selectedType === "all" || achievement.type === selectedType
  )

  // Calculate stats
  const totalAchievements = dummyAchievements.reduce((acc, achievement) => acc + achievement.totalUnlocked, 0)
  const thisMonthAchievements = Math.round(totalAchievements * 0.3) // Estimate for this month
  const topAchievers = leaderboardEntries.filter(entry => entry.achievements >= 2).length
  const completionRate = Math.round((totalAchievements / (dummyStudents.length * dummyAchievements.length)) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">
            Celebrate student milestones and track accomplishments
          </p>
        </div>
      </div>

      {/* Stats */}
      <AchievementsStats
        totalAchievements={totalAchievements}
        thisMonthAchievements={thisMonthAchievements}
        topAchievers={topAchievers}
        completionRate={completionRate}
      />

      {/* Filters */}
      <div className="flex gap-2">
        {["all", "milestone", "improvement", "completion", "special"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === type
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {type === "all" ? "All Achievements" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            showRecentUnlocks={true}
          />
        ))}
      </div>

      {/* Leaderboard */}
      <AchievementsLeaderboard
        entries={leaderboardEntries}
        title="Achievement Leaderboard"
      />

      {filteredAchievements.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No achievements found for the selected type.
        </div>
      )}
    </div>
  )
}
