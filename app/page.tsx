import { getCurrentUser } from "@/app/lib/session"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to Mivvo</h1>
        <p className="text-xl text-muted-foreground">
          {user
            ? `Welcome back, ${user.name}!`
            : "Your gateway to mastering technical interviews"
          }
        </p>
      </div>

      <div className="flex justify-center">
        <Link href="/dashboard">
          <Button size="lg" className="px-8 py-3 text-lg">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
