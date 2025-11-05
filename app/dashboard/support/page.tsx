import { Metadata } from "next"
import { SupportForm } from "./_components/support-form"
import { SupportHeader } from "./_components/support-header"

export const metadata: Metadata = {
  title: "Support",
  description: "Get help and raise queries with our support team",
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SupportHeader />
        <div className="mt-8">
          <SupportForm />
        </div>
      </div>
    </div>
  )
}
