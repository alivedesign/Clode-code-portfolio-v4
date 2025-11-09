import type { Metadata } from "next";
import "./globals.css";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { FallingAvatars } from "@/components/FallingAvatars";

// Note: Using system fonts (SF Pro on macOS, Segoe UI on Windows, etc.)
// To use custom SF Pro fonts across all platforms, add font files to public/fonts/
// and uncomment the localFont configuration in this file (see public/fonts/README.md)

export const metadata: Metadata = {
  metadataBase: new URL('https://shkuratov.design'),
  title: "Evgeny Shkuratov - Product Designer",
  description: "Product Designer leveraging AI to build apps focused on what users actually need. 9 years of experience, 30+ client products launched.",
  keywords: ["product design", "UX design", "portfolio", "Evgeny Shkuratov", "AI-powered builder"],
  authors: [{ name: "Evgeny Shkuratov" }],
  creator: "Evgeny Shkuratov",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Evgeny Shkuratov - Product Designer & AI-Powered Builder",
    description: "Product Designer leveraging AI to build apps focused on what users actually need. 9 years of experience, 30+ client products launched.",
    siteName: "Shkuratov Designer",
    images: ['/opengraph-image'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evgeny Shkuratov - Product Designer & AI-Powered Builder",
    description: "Product Designer leveraging AI to build apps focused on what users actually need. 9 years of experience, 30+ client products launched.",
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <AnimationProvider>
          {children}
          <FallingAvatars />
        </AnimationProvider>
      </body>
    </html>
  );
}
