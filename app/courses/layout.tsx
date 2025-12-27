"use client";

import { Navbar } from "@/components/main/navbar";
import { siteConfig } from "@/config/site";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Redirect users if courses are disabled
  useEffect(() => {
    if (!siteConfig.enableCourses) {
      redirect("/");
    }
  }, []);

  // Hide navbar for demo pages
  const isDemoPage = pathname?.includes('/demo');

  return (
    <div className="min-h-screen bg-background">
      {!isDemoPage && <Navbar />}
      {children}
    </div>
  );
}
