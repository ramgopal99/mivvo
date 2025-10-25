"use client"

export default function HelpPage() {
  return (
    <div className="space-y-6 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers, get support, and learn how to use the platform effectively
          </p>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Center</h3>
          <p className="text-gray-600">Coming Soon</p>
          <p className="text-sm text-gray-500 mt-2">Help documentation and support features will be available in a future update</p>
        </div>
      </div>
    </div>
  )
}
