"use client";

import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingCompound } from "@/components/loading-compound";

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!siteConfig.enableForeignLanguage) {
      router.push("/dashboard");
      return;
    }

    // Check authentication for practice pages
    const checkAuth = async () => {
      try {
        // Check if user has any authentication tokens
        const nextAuthToken = localStorage.getItem('next-auth.session-token') ||
                             localStorage.getItem('__Secure-next-auth.session-token');
        const jwtToken = localStorage.getItem('token') ||
                        localStorage.getItem('student_token') ||
                        localStorage.getItem('college_token');

        console.log('Practice layout: NextAuth token present:', !!nextAuthToken);
        console.log('Practice layout: JWT token present:', !!jwtToken);

        const hasTokens = !!(nextAuthToken || jwtToken);
        console.log('Practice layout: Has any tokens:', hasTokens);

        setIsAuthenticated(hasTokens);

        if (!hasTokens) {
          // Redirect to signin if no tokens found
          console.log('Practice layout: No tokens found, redirecting to signin');
          router.push('/auth/signin');
          return;
        }
      } catch (error) {
        console.error('Practice layout: Auth check failed:', error);
        setIsAuthenticated(false);
        router.push('/auth/signin');
        return;
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading while checking authentication
  if (!authChecked) {
    return (
      <LoadingCompound
        text="Loading practice session..."
        size="lg"
        variant="spinner"
        className="min-h-screen bg-background"
      />
    );
  }

  // Redirect if not authenticated
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (!siteConfig.enableForeignLanguage) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Practice routes render without dashboard layout (no sidebar)
  return <>{children}</>;
}
