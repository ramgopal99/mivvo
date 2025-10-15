import { AuthLayout } from "../_components/auth-layout"
import { SignUpForm } from "../_components/signup-form"

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Sign up with your Google account to join Mivvo."
      showSignUp={false}
      showSignIn={true}
    >
      <SignUpForm />
    </AuthLayout>
  )
}
