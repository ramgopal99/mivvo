/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  ExternalLink,
  Phone,
  Mail,
  FileText,
  Video,
  Users,
  Clock,
  Eye,
  Activity,
  BarChart3,
  Shield,
  Building2
} from "lucide-react"
import { useState } from "react"

// Dummy help resources
const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics of the admin panel",
    icon: Book,
    articles: 8,
    featured: true
  },
  {
    id: "user-management",
    title: "User Management",
    description: "Managing users, roles, and permissions",
    icon: Users,
    articles: 12,
    featured: true
  },
  {
    id: "college-management",
    title: "College Management",
    description: "Onboarding and managing colleges",
    icon: Building2,
    articles: 10,
    featured: false
  },
  {
    id: "system-health",
    title: "System Health",
    description: "Monitoring and troubleshooting",
    icon: Activity,
    articles: 6,
    featured: false
  },
  {
    id: "analytics",
    title: "Analytics & Reporting",
    description: "Understanding platform metrics",
    icon: BarChart3,
    articles: 9,
    featured: true
  },
  {
    id: "security",
    title: "Security & Compliance",
    description: "Security best practices and compliance",
    icon: Shield,
    articles: 7,
    featured: false
  }
]

const featuredArticles = [
  {
    id: "1",
    title: "Admin Panel Overview",
    excerpt: "Complete guide to navigating and using the admin dashboard effectively.",
    category: "Getting Started",
    readTime: 5,
    views: 1250
  },
  {
    id: "2",
    title: "Managing User Permissions",
    excerpt: "How to assign roles, manage permissions, and maintain security.",
    category: "User Management",
    readTime: 8,
    views: 890
  },
  {
    id: "3",
    title: "System Health Monitoring",
    excerpt: "Monitor system performance, troubleshoot issues, and maintain uptime.",
    category: "System Health",
    readTime: 6,
    views: 675
  },
  {
    id: "4",
    title: "Analytics Deep Dive",
    excerpt: "Understanding growth metrics, user behavior, and platform insights.",
    category: "Analytics",
    readTime: 10,
    views: 543
  }
]

const supportOptions = [
  {
    title: "Live Chat Support",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    available: true,
    responseTime: "Usually responds instantly"
  },
  {
    title: "Email Support",
    description: "Send detailed inquiries to our support team",
    icon: Mail,
    available: true,
    responseTime: "Responds within 2 hours"
  },
  {
    title: "Phone Support",
    description: "Speak directly with a support specialist",
    icon: Phone,
    available: false,
    responseTime: "Available 9 AM - 6 PM EST"
  },
  {
    title: "Video Tutorials",
    description: "Watch step-by-step video guides",
    icon: Video,
    available: true,
    responseTime: "Available 24/7"
  }
]

export default function AdminHelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Help Center</h1>
          <p className="text-muted-foreground">
            Find answers, guides, and support for managing your platform
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help articles, guides, or FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Help Content Tabs */}
      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">Help Articles</TabsTrigger>
          <TabsTrigger value="support">Support Options</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          {/* Featured Articles */}
          <div className="grid gap-4 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {article.excerpt}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Book className="h-3 w-3" />
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views} views
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Browse by Category</CardTitle>
              <CardDescription>
                Explore help articles organized by topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <category.icon className="h-5 w-5 text-primary" />
                        </div>
                        {category.featured && (
                          <Badge className="bg-orange-100 text-orange-800">Featured</Badge>
                        )}
                      </div>
                      <h3 className="font-medium mb-1">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {category.articles} articles
                        </span>
                        <Button variant="ghost" size="sm">
                          View →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {supportOptions.map((option, index) => (
              <Card key={index} className={`transition-all ${!option.available ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${option.available ? 'bg-primary/10' : 'bg-muted'}`}>
                      <option.icon className={`h-5 w-5 ${option.available ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      {!option.available && (
                        <Badge variant="outline" className="mt-1">Coming Soon</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-3">
                    {option.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {option.responseTime}
                    </span>
                    <Button disabled={!option.available}>
                      {option.available ? 'Get Help' : 'Notify Me'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Additional ways to reach our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@interviewprep.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">1-800-ADMIN-HELP</p>
                  </div>
                </div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Support hours: Monday - Friday, 9:00 AM - 6:00 PM EST
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="font-medium mb-2">API Documentation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete API reference for developers
                  </p>
                  <Button variant="outline" className="w-full">
                    View Docs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="font-medium mb-2">Video Tutorials</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step video guides for common tasks
                  </p>
                  <Button variant="outline" className="w-full">
                    Watch Videos
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Book className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="font-medium mb-2">Best Practices</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Guidelines and best practices for admins
                  </p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                  <h3 className="font-medium mb-2">Community Forum</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other admins and share knowledge
                  </p>
                  <Button variant="outline" className="w-full">
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center">
                  <HelpCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                  <h3 className="font-medium mb-2">FAQ</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Frequently asked questions and answers
                  </p>
                  <Button variant="outline" className="w-full">
                    View FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-indigo-500" />
                  <h3 className="font-medium mb-2">Security Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Security best practices and compliance info
                  </p>
                  <Button variant="outline" className="w-full">
                    Read Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
