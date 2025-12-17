"use client";

import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!siteConfig.enableForeignLanguage) {
      router.push("/dashboard");
      return;
    }
  }, [router]);

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
