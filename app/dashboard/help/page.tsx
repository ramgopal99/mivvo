import { Metadata } from "next"
import { HelpHeader } from "./_components/help-header"
import { HelpAccordion } from "./_components/help-accordion"
import { ContactSupport } from "./_components/contact-support"

export const metadata: Metadata = {
  title: "Help & Support",
  description: "Get help and support for Mivvo platform",
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <HelpHeader />
        <HelpAccordion />
        <ContactSupport />
      </div>
    </div>
  )
}
