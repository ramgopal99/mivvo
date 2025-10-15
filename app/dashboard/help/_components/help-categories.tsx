"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, MessageSquare, CreditCard, User, Shield, Settings } from "lucide-react"

const helpCategories = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of using Mivvo platform",
    topics: ["Creating an account", "Navigation guide", "First interview setup"]
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description: "Everything about conducting mock interviews",
    topics: ["Starting an interview", "Using AI features", "Reviewing results"]
  },
  {
    icon: User,
    title: "Account & Profile",
    description: "Manage your account settings and profile",
    topics: ["Updating profile", "Password management", "Account preferences"]
  },
  {
    icon: CreditCard,
    title: "Billing & Plans",
    description: "Questions about subscriptions and payments",
    topics: ["Plan comparison", "Payment methods", "Billing history"]
  },
  {
    icon: Settings,
    title: "Technical Support",
    description: "Technical issues and troubleshooting",
    topics: ["Browser compatibility", "Video/audio issues", "Error messages"]
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your data privacy and security questions",
    topics: ["Data protection", "Privacy settings", "Security features"]
  }
]

export function HelpCategories() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Help Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpCategories.map((category) => (
          <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.topics.map((topic) => (
                  <li key={topic} className="text-sm text-gray-600 hover:text-primary cursor-pointer">
                    • {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
