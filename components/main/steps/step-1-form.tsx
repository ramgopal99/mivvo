"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { User, Mail, Clock, Briefcase } from "lucide-react"
import { landingConfig } from "../../../config/landing-config"

const iconMap = {
  User,
  Mail,
  Clock,
  Briefcase
}

export function Step1Form() {
  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="space-y-2 flex-1">
        {landingConfig.steps.step1.form.fields.map((field, index) => {
          const IconComponent = iconMap[field.icon as keyof typeof iconMap]
          const isDropdown = field.icon === "Briefcase" || field.icon === "Clock"
          
          return (
            <div key={index} className="space-y-1">
              <Label className="text-xs font-medium text-gray-700">{field.label}</Label>
              <div className="relative group">
                <IconComponent className={`absolute ${isDropdown ? 'left-3' : 'left-2'} top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 ${isDropdown ? 'group-hover:text-primary transition-colors' : ''}`} />
                <div className={`${isDropdown ? 'pl-8 pr-8' : 'pl-8'} h-8 text-sm ${isDropdown ? 'bg-white border border-gray-200 rounded-lg flex items-center justify-between text-gray-500 hover:border-primary hover:shadow-sm transition-all duration-200 cursor-pointer group' : 'bg-gray-50 border border-gray-200 rounded-md flex items-center text-gray-500'}`}>
                  <span>{field.placeholder}</span>
                  {isDropdown && (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 h-8 text-sm"
        onClick={(e) => e.preventDefault()}
      >
        {landingConfig.steps.step1.form.buttonText}
      </Button>
    </div>
  )
}
