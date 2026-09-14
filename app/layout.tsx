import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, organizationJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

const description =
  "Free Class 10 study hub: NCERT/CBSE smart slides, notes, mind maps, quizzes and PYQs for Maths, Science, SST, English, Hindi and Artificial Intelligence — plus an advanced Smart Board for classrooms.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Class 10 Learning Hub — Smart Learning, Free Forever",
    template: "%s · Class 10 Learning Hub",
  },
  description,
  keywords: [
    "class 10",
    "CBSE class 10",
    "NCERT class 10",
    "class 10 maths",
    "class 10 science",
    "class 10 social science",
    "class 10 english",
    "class 10 hindi",
    "class 10 artificial intelligence",
    "smart board",
    "NCERT PDF",
    "free study material",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: "Mohd Haziq" }],
  creator: "Mohd Haziq",
  publisher: SITE_NAME,
  category: "education",
  alternates: {
    canonical: "/",
  },
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: SITE_NAME,
    description: "NCERT/CBSE Class 10 chapters as smart slides, quizzes and notes — plus a free advanced Smart Board.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "NCERT/CBSE Class 10 chapters as smart slides, quizzes and notes — plus a free advanced Smart Board.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: [
      "JRNgWYCLdfnRnXDLas-IrnjW38h-fgJJit3oXlxHXHw",
      "PzwcyygbgXrqaPF-JZyPIRhvlKS_Nt4oTU-i-kRvzNo",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a73e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            description,
            inLanguage: "en",
            publisher: organizationJsonLd(),
          }}
        />
        {children}
      </body>
    </html>
  );
}
