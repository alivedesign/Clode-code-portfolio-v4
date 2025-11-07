import type { Metadata } from "next";
import "./globals.css";

// Note: Using system fonts (SF Pro on macOS, Segoe UI on Windows, etc.)
// To use custom SF Pro fonts across all platforms, add font files to public/fonts/
// and uncomment the localFont configuration in this file (see public/fonts/README.md)

export const metadata: Metadata = {
  title: "Evgeny Shkuratov - Product Designer & Developer",
  description: "Portfolio of Evgeny Shkuratov - Design Thinking, Product Design, and Development",
  keywords: ["product design", "UX design", "portfolio", "Evgeny Shkuratov"],
  authors: [{ name: "Evgeny Shkuratov" }],
  creator: "Evgeny Shkuratov",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Evgeny Shkuratov - Product Designer & Developer",
    description: "Portfolio of Evgeny Shkuratov - Design Thinking, Product Design, and Development",
    siteName: "Evgeny Shkuratov Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evgeny Shkuratov - Product Designer & Developer",
    description: "Portfolio of Evgeny Shkuratov - Design Thinking, Product Design, and Development",
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
        {children}
      </body>
    </html>
  );
}
