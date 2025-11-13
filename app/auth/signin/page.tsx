import { Suspense } from "react"
import { AuthLayout } from "../_components/auth-layout"
import { SignInForm } from "../_components/signin-form"

function SignInContent() {
  return (
    <AuthLayout
      title="Sign In To Your Account"
      subtitle="Sign in with your Google account to get started."
      showSignUp={true}
      showSignIn={false}
    >
      <SignInForm />
    </AuthLayout>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <AuthLayout
        title="Sign In To Your Account"
        subtitle="Sign in with your Google account to get started."
        showSignUp={true}
        showSignIn={false}
      >
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md"></div>
          </div>
          <div className="text-center text-sm text-gray-500">
            Loading sign in form...
          </div>
        </div>
      </AuthLayout>
    }>
      <SignInContent />
    </Suspense>
  )
}
