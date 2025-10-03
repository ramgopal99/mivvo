import { Users, Building2 } from "lucide-react"
import { AnimatedList } from "@/components/ui/animated-list"
import { landingConfig } from "@/config/landing-config"

export function CompanyPracticeBox() {
  const featureData = landingConfig.features.mainFeatures.companyPractice
  const interviewCalls = featureData.interviewCalls

  return (
    <div className="col-span-3 lg:col-span-2 group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            {featureData.title}
          </h3>
        </div>
        <p className="text-gray-600 mb-4">
          {featureData.description}
        </p>
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-slate-50 p-4">
          <AnimatedList className="w-full h-full overflow-y-auto">
            {interviewCalls.map((call, index) => (
              <div
                key={`${call.company}-${index}`}
                className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{call.company}</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {call.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{call.role}</p>
                </div>
                <Users className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </AnimatedList>
        </div>
      </div>
    </div>
  )
}
