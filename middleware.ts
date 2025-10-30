import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        // Protect admin routes - require SUPERADMIN role
        if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
          return token?.role === "SUPERADMIN"
        }

        // Dashboard and college routes are protected at component level due to JWT token limitations
        // College students and admins use JWT tokens stored in localStorage which middleware can't access
        // Component-level authentication checks handle both NextAuth and JWT validation
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/college/:path*"],
}
