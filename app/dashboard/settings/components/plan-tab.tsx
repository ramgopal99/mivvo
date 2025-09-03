"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, Crown, Zap, Building } from "lucide-react"

export function PlanTab() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Your current subscription and plan details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Pro Plan</h3>
                <p className="text-sm text-muted-foreground">$29/month</p>
              </div>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
          <Separator />
          <div className="text-sm text-muted-foreground">
            <p>Next billing date: January 15, 2024</p>
            <p>Auto-renewal: Enabled</p>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the plan that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Free Plan */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Zap className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">Free</h3>
                  <p className="text-sm text-muted-foreground">$0/month</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Current</Button>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>5 interviews per month</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Basic AI assistance</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Standard support</span>
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="border rounded-lg p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Pro</h3>
                  <p className="text-sm text-muted-foreground">$29/month</p>
                </div>
              </div>
              <Badge variant="default">Recommended</Badge>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Unlimited interviews</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Advanced AI assistance</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Custom interview scenarios</span>
              </li>
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Enterprise</h3>
                  <p className="text-sm text-muted-foreground">Custom pricing</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Contact Sales</Button>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Team management</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Dedicated support</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>
            Your current usage for this billing period
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Interviews Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-sm text-muted-foreground">Interviews Limit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-muted-foreground">AI Assistants</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 