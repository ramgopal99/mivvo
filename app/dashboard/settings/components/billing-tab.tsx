"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Sparkles } from "lucide-react"

export function BillingTab() {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <Heart className="h-5 w-5" />
            <span>Free Launch Offer</span>
          </CardTitle>
          <CardDescription className="text-primary/80">
            🎉 Launch celebration! Mivvo is now completely free for all users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-primary">All Features Included</p>
                <p className="text-sm text-primary/80">No limits, no restrictions</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Free
            </Badge>
          </div>
          <div className="text-center py-4">
            <p className="text-sm text-primary/80">
              🚀 Launch special: Enjoy unlimited mock interviews, AI feedback, and all premium features completely free!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
