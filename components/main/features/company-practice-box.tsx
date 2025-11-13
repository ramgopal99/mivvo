import { Users, Building2 } from "lucide-react"
import { AnimatedList } from "@/components/ui/animated-list"
import { landingConfig } from "@/config/landing-config"

export function CompanyPracticeBox() {
  const featureData = landingConfig.features.mainFeatures.companyPractice
  const interviewCalls = featureData.interviewCalls

  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-2 group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 w-full">
      <div className="relative p-3 sm:p-4 md:p-5 lg:p-6 w-full overflow-hidden">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-tight break-words flex-1">
            {featureData.title}
          </h3>
        </div>
        <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed break-words px-0.5">
          {featureData.description}
        </p>
        <div className="relative min-h-[250px] sm:min-h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl border bg-slate-50 p-2 sm:p-3 md:p-4">
          <AnimatedList className="w-full h-full overflow-y-auto scrollbar-hide">
            {interviewCalls.map((call, index) => (
              <div
                key={`${call.company}-${index}`}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 mb-2"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base break-words">{call.company}</span>
                    <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded-full whitespace-nowrap">
                      {call.type}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">{call.role}</p>
                </div>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </AnimatedList>
        </div>
      </div>
    </div>
  )
}
