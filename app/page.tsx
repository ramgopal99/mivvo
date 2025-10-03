import { Navbar, HeroSection, StepsSection, EducationSection, MorphingSection } from "@/components/main"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />
      <HeroSection />
      <StepsSection />
      <MorphingSection />
      <EducationSection />
    </div>
  )
}
