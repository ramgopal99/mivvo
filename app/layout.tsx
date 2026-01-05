import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import { NextAuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { AffiliateTracker } from "@/components/affiliate-tracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SUSE Mono Font Family
const suseMono = localFont({
  src: [
    // Regular weights
    {
      path: "../public/fonts/SUSEMono-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/SUSEMono-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/SUSEMono-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SUSEMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SUSEMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SUSEMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SUSEMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SUSEMono-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    // Italic variants
    {
      path: "../public/fonts/SUSEMono-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/SUSEMono-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/SUSEMono-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/SUSEMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/SUSEMono-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/SUSEMono-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/SUSEMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/SUSEMono-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-suse-mono",
});

export const metadata: Metadata = {
  title: "Mivvo - Technical Interview Platform",
  description: "Master technical interviews with mock practice, courses, and real-time collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://js.puter.com/v2/" async />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${suseMono.variable} antialiased font-mono`}
      >
        <NextAuthProvider>
          <Suspense fallback={null}>
            <AffiliateTracker />
          </Suspense>
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </NextAuthProvider>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
