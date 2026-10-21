import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { site } from "@/lib/site";
import "./globals.css";

// Absolute base for OG image URLs. Vercel sets this env var automatically.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} | Digital Marketing, Visuals & Web`,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // GeistSans is self-hosted via next/font: no external request, no font swap shift.
    <html lang="en" className={GeistSans.variable}>
      <body className="min-h-dvh">
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
