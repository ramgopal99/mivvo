import { Navbar, HeroSection, FeaturesSection, StepsSection, EducationSection, MorphingSection, FaqSection, TestimonialsSection, CtaSection, Footer } from "@/components/main"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
        <div className="min-h-screen w-full overflow-x-hidden">
          <Navbar />
          <HeroSection />
          <div id="features"> 
            <FeaturesSection />
          </div>
          <StepsSection />
          <EducationSection />
          <MorphingSection />
          <div id="faq">
            <FaqSection />
          </div>
          <TestimonialsSection />
          <CtaSection />
          <Footer />
        </div>
  )
}
