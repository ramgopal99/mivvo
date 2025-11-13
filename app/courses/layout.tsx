import { Navbar } from "@/components/main/navbar";
import { siteConfig } from "@/config/site";
import { redirect } from "next/navigation";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirect users if courses are disabled
  if (!siteConfig.enableCourses) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
    </div>
  );
}
