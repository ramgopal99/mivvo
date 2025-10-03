"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Mic, Clock, User } from "lucide-react"
import { landingConfig } from "../../config/landing-config"

const iconMap = {
  Mic,
  Play
}

export function Step2Interview() {
  return (
    <div className="space-y-3 h-full flex flex-col">
      {/* Interview Status */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <span className="text-xs font-medium text-gray-700">{landingConfig.steps.step2.interview.status}</span>
        </div>
        <Badge variant="outline" className="text-xs px-2 py-1">
          <Clock className="w-3 h-3 mr-1" />
          {landingConfig.steps.step2.interview.time}
        </Badge>
      </div>

      {/* AI Interviewer Card */}
      <Card className="border-2 border-gray-200 flex-1">
        <CardContent className="p-3 h-full flex flex-col">
          <div className="flex items-start space-x-2 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900">{landingConfig.steps.step2.interview.aiName}</span>
                <Badge variant="secondary" className="text-xs px-1 py-0">{landingConfig.steps.step2.interview.aiStatus}</Badge>
              </div>
              <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                &quot;{landingConfig.steps.step2.interview.question}&quot;
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse animation-delay-150" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse animation-delay-300" />
                </div>
                <span className="text-xs text-gray-500">{landingConfig.steps.step2.interview.listeningText}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recording Controls */}
      <div className="flex items-center justify-center space-x-2">
        {landingConfig.steps.step2.interview.controls.map((control, index) => {
          const IconComponent = iconMap[control.icon as keyof typeof iconMap]
          const isStart = control.icon === "Play"
          
          return (
            <div 
              key={index}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs ${
                isStart 
                  ? "bg-red-500 text-white" 
                  : "border border-gray-300 bg-white text-gray-600"
              }`}
            >
              <IconComponent className="w-3 h-3" />
              <span>{control.text}</span>
            </div>
          )
        })}
      </div>

      {/* Real-time Feedback */}
      <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          <span className="text-xs text-green-700 font-medium">{landingConfig.steps.step2.interview.feedback}</span>
        </div>
      </div>
    </div>
  )
}
