/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"
import type { Adapter } from "next-auth/adapters"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
    }
  }

  interface User {
    id?: string
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  session: {
    strategy: "database", // Use database sessions with PrismaAdapter
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // Add role from database user
        session.user.role = user.role
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Ensure user exists and account is linked properly
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { accounts: true }
          })

          if (existingUser) {
            // Check if user has a valid role for login
            const allowedRoles = ["COLLEGE_STUDENT", "SUPERADMIN", "COLLEGE_ADMIN", "USER"]
            if (!allowedRoles.includes(existingUser.role)) {
              console.log(`Login denied: User ${user.email} has invalid role (role: ${existingUser.role})`)
              return false
            }

            // Check if account already exists
            const existingAccount = existingUser.accounts.find(
              acc => acc.provider === account.provider && acc.providerAccountId === account.providerAccountId
            )

            if (!existingAccount) {
              // Create account link if it doesn't exist
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                }
              })
            }
            return true
          } else {
            // New user - deny access (only existing students can login)
            console.log(`Login denied: New user ${user.email} attempted to sign up. Only existing students allowed.`)
            return false
          }
        } catch (error) {
          console.error("Error in signIn callback:", error)
          return false
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  // Add error handling
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user.email)
    },
    async signOut() {
      console.log("User signed out")
    },
  },
  debug: process.env.NODE_ENV === "development",
}
