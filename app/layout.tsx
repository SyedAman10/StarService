import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StarServices - Discover Validated Startup Ideas",
  description: "Turn social conversations into successful startups. Discover validated startup ideas from Reddit, Twitter, and social media. Get instant validation, professional landing pages, and complete marketing campaigns.",
  keywords: ["startup ideas", "business ideas", "startup validation", "market research", "landing page builder", "marketing campaigns"],
  authors: [{ name: "StarServices" }],
  openGraph: {
    title: "StarServices - Discover Validated Startup Ideas",
    description: "Turn social conversations into successful startups. AI-powered idea discovery and validation platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StarServices - Discover Validated Startup Ideas",
    description: "Turn social conversations into successful startups. AI-powered idea discovery and validation platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
