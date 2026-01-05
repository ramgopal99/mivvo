import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add CSP headers
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
      style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
      img-src 'self' data: https:;
      font-src 'self' data: https://cdn.jsdelivr.net;
      connect-src 'self' wss://api.puter.com https://api.puter.com;
      worker-src 'self' blob:;
      frame-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
    `.replace(/\s+/g, ' ').trim()

    const response = NextResponse.next()

    // Add CSP header
    response.headers.set('Content-Security-Policy', cspHeader)

    return response
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
