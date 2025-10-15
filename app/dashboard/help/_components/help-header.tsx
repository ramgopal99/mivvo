import { HelpCircle } from "lucide-react"

export function HelpHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Help & Support Center
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Find answers to common questions, get help with features, and contact our support team.
      </p>
    </div>
  )
}
