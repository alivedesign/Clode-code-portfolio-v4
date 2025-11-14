import type { Metadata } from "next";
import "./globals.css";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { FallingAvatars } from "@/components/FallingAvatars";

// Note: Using system fonts (SF Pro on macOS, Segoe UI on Windows, etc.)
// To use custom SF Pro fonts across all platforms, add font files to public/fonts/
// and uncomment the localFont configuration in this file (see public/fonts/README.md)

export const metadata: Metadata = {
  metadataBase: new URL('https://shkuratovdesigner.com'),
  title: "Shkuratov Designer",
  description: "Helping Solo Founders & Startups Ship User-Centric Products Faster",
  keywords: ["product design", "UX design", "portfolio", "Evgeny Shkuratov", "AI-powered builder"],
  authors: [{ name: "Evgeny Shkuratov" }],
  creator: "Evgeny Shkuratov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shkuratovdesigner.com",
    title: "Shkuratov Designer",
    description: "Helping Solo Founders & Startups Ship User-Centric Products Faster",
    siteName: "Shkuratov Designer",
    images: [
      {
        url: 'https://shkuratovdesigner.com/images/opengraph.png',
        width: 1800,
        height: 945,
        alt: 'Evgeny Shkuratov - Product Designer Portfolio',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shkuratov Designer",
    description: "Helping Solo Founders & Startups Ship User-Centric Products Faster",
    images: ['https://shkuratovdesigner.com/images/opengraph.png'],
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
