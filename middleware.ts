import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin routes - require SUPERADMIN role
        if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
          return token?.role === "SUPERADMIN"
        }
        // Allow guest access to all other dashboard routes
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*"],
}
