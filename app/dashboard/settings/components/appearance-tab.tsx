"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Moon, Sun, Monitor } from "lucide-react"
import { useFontSize } from "@/components/providers/FontSizeProvider"
import { useColorScheme } from "@/components/providers/ColorSchemeProvider"

export function AppearanceTab() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { fontSize, setFontSize } = useFontSize()
  const { colorScheme, setColorScheme, availableSchemes } = useColorScheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  const handleFontSizeChange = (size: "small" | "medium" | "large") => {
    setFontSize(size)
  }

  const handleColorSchemeChange = (scheme: keyof typeof availableSchemes) => {
    setColorScheme(scheme)
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Choose your preferred theme for the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-muted rounded-md animate-pulse" />
              <div className="h-20 bg-muted rounded-md animate-pulse" />
              <div className="h-20 bg-muted rounded-md animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Choose your preferred theme for the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={theme || "system"}
            onValueChange={handleThemeChange}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem
                value="light"
                id="light"
                className="peer sr-only"
              />
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Sun className="mb-3 h-6 w-6" />
                Light
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="dark"
                id="dark"
                className="peer sr-only"
              />
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Moon className="mb-3 h-6 w-6" />
                Dark
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="system"
                id="system"
                className="peer sr-only"
              />
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Monitor className="mb-3 h-6 w-6" />
                System
              </Label>
            </div>
          </RadioGroup>
          
          {theme === "system" && (
            <p className="text-sm text-muted-foreground">
              Currently using {resolvedTheme === "dark" ? "dark" : "light"} mode based on your system preference
            </p>
          )}
        </CardContent>
      </Card>

      {/* Display Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>
            Customize how the application looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Font Size</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={fontSize === "small" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleFontSizeChange("small")}
              >
                Small
              </Button>
              <Button 
                variant={fontSize === "medium" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleFontSizeChange("medium")}
              >
                Medium
              </Button>
              <Button 
                variant={fontSize === "large" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleFontSizeChange("large")}
              >
                Large
              </Button>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="color-scheme">Color Scheme</Label>
            <Select value={colorScheme} onValueChange={handleColorSchemeChange}>
              <SelectTrigger id="color-scheme" className="w-full">
                <SelectValue placeholder="Select a color scheme" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(availableSchemes).map(([key, scheme]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-border"
                        style={{
                          backgroundColor: key === 'blue' ? '#3b82f6' :
                                         key === 'green' ? '#10b981' :
                                         key === 'purple' ? '#8b5cf6' :
                                         key === 'orange' ? '#f97316' :
                                         key === 'red' ? '#ef4444' : '#6b7280'
                        }}
                      />
                      <span>{scheme.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 