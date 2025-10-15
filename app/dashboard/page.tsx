import { StatsOverview, RecentInterviews, ProgressTracker } from "./_components"
import { dummyStats, dummyInterviews, dummyProgress } from "./_components/dummy-data"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your mock interview progress and quick actions.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview stats={dummyStats} />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        {/* Recent Interviews */}
        <div className="flex flex-col">
          <RecentInterviews interviews={dummyInterviews} />
        </div>

        {/* Progress Tracker */}
        <div className="flex flex-col">
          <ProgressTracker progress={dummyProgress} />
        </div>
      </div>
    </div>
  )
}
