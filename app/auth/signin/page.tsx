import { AuthLayout } from "../_components/auth-layout"
import { SignInForm } from "../_components/signin-form"

export default function SignInPage() {
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
