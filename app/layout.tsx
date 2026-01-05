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
  title: {
    default: "Mivvo – Practice. Learn. Succeed.",
    template: "%s | Mivvo"
  },
  description: "An evolving platform for mock interviews, AI practice, structured courses, and collaboration. Master your skills with AI-powered practice and real-world scenarios.",
  keywords: ["mock interviews", "AI practice", "coding interviews", "interview preparation", "technical interviews", "career development", "skill assessment"],
  authors: [{ name: "Mivvo Team" }],
  creator: "Mivvo",
  publisher: "Mivvo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mivvo.life'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mivvo – Practice. Learn. Succeed.",
    description: "An evolving platform for mock interviews, AI practice, structured courses, and collaboration. Master your skills with AI-powered practice and real-world scenarios.",
    url: 'https://mivvo.life', // Replace with your actual domain
    siteName: 'Mivvo',
    images: [
      {
        url: '/intro.png',
        width: 1200,
        height: 630,
        alt: 'Mivvo - Practice. Learn. Succeed.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mivvo – Practice. Learn. Succeed.",
    description: "An evolving platform for mock interviews, AI practice, structured courses, and collaboration.",
    images: ['/intro.png'],
    creator: '@mivvo', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/mivvo.ico',
    shortcut: '/mivvo.ico',
    apple: '/mivvo.svg',
  },
  manifest: '/manifest.json',
  other: {
    'google-site-verification': 'your-verification-code-here', // Add Google Search Console verification
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mivvo",
              "url": "https://mivvo.com", // Replace with your actual domain
              "logo": "https://mivvo.com/mivvo.svg", // Replace with your actual domain
              "description": "An evolving platform for mock interviews, AI practice, structured courses, and collaboration.",
              "sameAs": [
                "https://twitter.com/mivvo", // Replace with your actual social media
                "https://linkedin.com/company/mivvo", // Replace with your actual social media
                "https://github.com/mivvo" // Replace with your actual social media
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@mivvo.com" // Replace with your actual contact email
              }
            })
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
