"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Target,
  Calendar,
  Download,
  BarChart3
} from "lucide-react"

// Dummy growth data
const growthMetrics = {
  userGrowth: {
    current: 1250,
    previous: 1080,
    growth: 15.7,
    target: 1500,
    trend: "up"
  },
  collegeGrowth: {
    current: 45,
    previous: 38,
    growth: 18.4,
    target: 60,
    trend: "up"
  },
  revenueGrowth: {
    current: 56250,
    previous: 46800,
    growth: 20.2,
    target: 75000,
    trend: "up"
  }
}

const monthlyGrowth = [
  { month: "Jul", users: 980, colleges: 32, revenue: 39200 },
  { month: "Aug", users: 1050, colleges: 35, revenue: 42000 },
  { month: "Sep", users: 1120, colleges: 38, revenue: 45600 },
  { month: "Oct", users: 1180, colleges: 40, revenue: 48800 },
  { month: "Nov", users: 1220, colleges: 42, revenue: 52400 },
  { month: "Dec", users: 1250, colleges: 45, revenue: 56250 }
]

const userAcquisition = {
  organic: 45,
  referrals: 25,
  partnerships: 20,
  marketing: 10
}

const retentionData = [
  { period: "Day 1", retention: 100 },
  { period: "Day 7", retention: 85 },
  { period: "Day 30", retention: 72 },
  { period: "Day 90", retention: 65 },
  { period: "Day 180", retention: 58 }
]

export default function AdminGrowthPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Growth Metrics</h1>
          <p className="text-muted-foreground">
            User growth, engagement, and expansion analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 6 Months
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Growth Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Growth</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{growthMetrics.userGrowth.current.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-green-100 text-green-800">
                +{growthMetrics.userGrowth.growth}%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Target Progress</span>
                <span>{Math.round((growthMetrics.userGrowth.current / growthMetrics.userGrowth.target) * 100)}%</span>
              </div>
              <Progress
                value={(growthMetrics.userGrowth.current / growthMetrics.userGrowth.target) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">College Expansion</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{growthMetrics.collegeGrowth.current}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-green-100 text-green-800">
                +{growthMetrics.collegeGrowth.growth}%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Target Progress</span>
                <span>{Math.round((growthMetrics.collegeGrowth.current / growthMetrics.collegeGrowth.target) * 100)}%</span>
              </div>
              <Progress
                value={(growthMetrics.collegeGrowth.current / growthMetrics.collegeGrowth.target) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${growthMetrics.revenueGrowth.current.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="bg-green-100 text-green-800">
                +{growthMetrics.revenueGrowth.growth}%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last month
              </span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Target Progress</span>
                <span>{Math.round((growthMetrics.revenueGrowth.current / growthMetrics.revenueGrowth.target) * 100)}%</span>
              </div>
              <Progress
                value={(growthMetrics.revenueGrowth.current / growthMetrics.revenueGrowth.target) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Analytics Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Growth Trends</TabsTrigger>
          <TabsTrigger value="acquisition">User Acquisition</TabsTrigger>
          <TabsTrigger value="retention">User Retention</TabsTrigger>
          <TabsTrigger value="forecast">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>
                  Monthly active user growth over 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 flex items-end justify-between gap-2">
                    {monthlyGrowth.map((item) => (
                      <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                        <div className="flex flex-col items-center gap-1 w-full">
                          <div
                            className="bg-primary rounded-t w-full transition-all hover:bg-primary/80"
                            style={{ height: `${(item.users / 1400) * 200}px` }}
                          />
                          <span className="text-xs font-medium">{item.users}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>College & Revenue Growth</CardTitle>
                <CardDescription>
                  Institution and revenue expansion trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Colleges</span>
                      <span className="text-sm text-muted-foreground">{monthlyGrowth[monthlyGrowth.length - 1].colleges}</span>
                    </div>
                    <div className="h-24 flex items-end justify-between gap-1">
                      {monthlyGrowth.map((item) => (
                        <div
                          key={item.month}
                          className="bg-blue-500 rounded-t flex-1 transition-all hover:bg-blue-600"
                          style={{ height: `${(item.colleges / 50) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Revenue ($k)</span>
                      <span className="text-sm text-muted-foreground">{(monthlyGrowth[monthlyGrowth.length - 1].revenue / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="h-24 flex items-end justify-between gap-1">
                      {monthlyGrowth.map((item) => (
                        <div
                          key={item.month}
                          className="bg-green-500 rounded-t flex-1 transition-all hover:bg-green-600"
                          style={{ height: `${(item.revenue / 60000) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="acquisition" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Acquisition Channels</CardTitle>
                <CardDescription>
                  Breakdown of how users discover the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Organic Search</span>
                    <span className="text-sm font-medium">{userAcquisition.organic}%</span>
                  </div>
                  <Progress value={userAcquisition.organic} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Referrals</span>
                    <span className="text-sm font-medium">{userAcquisition.referrals}%</span>
                  </div>
                  <Progress value={userAcquisition.referrals} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Partnerships</span>
                    <span className="text-sm font-medium">{userAcquisition.partnerships}%</span>
                  </div>
                  <Progress value={userAcquisition.partnerships} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Marketing Campaigns</span>
                    <span className="text-sm font-medium">{userAcquisition.marketing}%</span>
                  </div>
                  <Progress value={userAcquisition.marketing} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Strategies</CardTitle>
                <CardDescription>
                  Recommended actions to accelerate growth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">College Partnerships</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Partner with 5 more universities this quarter
                      </p>
                      <Badge className="bg-blue-100 text-blue-800">High Impact</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Referral Program</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Launch student referral incentives
                      </p>
                      <Badge className="bg-green-100 text-green-800">Medium Impact</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Content Marketing</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Increase blog posts and case studies
                      </p>
                      <Badge className="bg-purple-100 text-purple-800">Ongoing</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Retention Curve</CardTitle>
              <CardDescription>
                Percentage of users still active over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 flex items-end justify-center">
                  <div className="flex items-end gap-8">
                    {retentionData.map((data) => (
                      <div key={data.period} className="flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-12 transition-all hover:from-blue-600 hover:to-blue-500"
                            style={{ height: `${data.retention * 2}px` }}
                          />
                          <span className="text-xs font-medium">{data.retention}%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{data.period}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-muted-foreground">7-Day Retention</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">72%</div>
                    <div className="text-sm text-muted-foreground">30-Day Retention</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">65%</div>
                    <div className="text-sm text-muted-foreground">90-Day Retention</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Growth Forecast</CardTitle>
                <CardDescription>
                  Predicted growth for the next 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Users (March)</span>
                    <span className="text-sm font-medium">1,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Users (June)</span>
                    <span className="text-sm font-medium">1,780</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue (March)</span>
                    <span className="text-sm font-medium">$67,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue (June)</span>
                    <span className="text-sm font-medium">$82,100</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Growth Projections</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on current trends, we project 15-20% monthly growth
                    with conservative estimates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Milestone Targets</CardTitle>
                <CardDescription>
                  Key growth milestones to achieve
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">2,000 Users</p>
                      <p className="text-sm text-muted-foreground">Target: Q2 2024</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">100 Colleges</p>
                      <p className="text-sm text-muted-foreground">Target: Q3 2024</p>
                    </div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">$100K MRR</p>
                      <p className="text-sm text-muted-foreground">Target: Q4 2024</p>
                    </div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
