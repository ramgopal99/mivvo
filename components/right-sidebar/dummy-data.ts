// Dummy data for right sidebar components

export const userProfileData = {
  name: "Brooklyn Simmons",
  email: "brooklyn.simmons@example.com",
  image: "/api/placeholder/64/64",
  title: "UI/UX Designer & Developer",
  points: 876,
  stats: {
    daysStreak: 54,
    goalsInMonth: 6,
    secondPlace: 2
  }
}

// Helper function to generate calendar data for current week
function generateWeeklyStreakData() {
  const now = new Date()
  const currentMonth = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  
  // Get current week's Monday
  const currentDay = now.getDay()
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay // Sunday is 0, so -6 to get Monday
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset)
  
  // Generate 7 days starting from Monday
  const calendarDays = []
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    
    // Mark days as completed if they are before today
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to start of day
    day.setHours(0, 0, 0, 0) // Reset time to start of day
    
    const isCompleted = day < today
    
    calendarDays.push({
      day: daysOfWeek[i],
      date: day.getDate(),
      completed: isCompleted,
      fullDate: new Date(day)
    })
  }
  
  // Calculate weeks completed based on current date
  const currentWeek = Math.ceil((now.getDate() - monday.getDate() + 1) / 7)
  const weeksCompleted = Math.min(currentWeek, 4) // Cap at 4 weeks
  const totalWeeks = 4
  
  return {
    currentMonth,
    weeksCompleted,
    totalWeeks,
    calendarDays
  }
}

export const weeklyStreakData = generateWeeklyStreakData()

export const courseProgressData = {
  inProgress: {
    count: 3,
    label: "In Progress"
  },
  completed: {
    count: 17,
    label: "Completed"
  }
}

export const rightSidebarData = {
  userProfile: userProfileData,
  weeklyStreak: weeklyStreakData,
  courseProgress: courseProgressData
}
