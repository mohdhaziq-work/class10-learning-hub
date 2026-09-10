import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = { themeColor: "#111111" };

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://class10-learning-hub.onrender.com"),
  title: {
    default: "Class 10 Learning Hub — Smart Learning, Free Forever",
    template: "%s · Class 10 Learning Hub",
  },
  description:
    "Free Class 10 study hub: smart slides, mind maps, quizzes and PYQs for Maths, Science, SST, English, Hindi and AI — plus an advanced Smart Board for classrooms.",
  keywords: ["class 10", "NCERT", "CBSE", "smart board", "maths", "science", "free study", "AI CBSE 417"],
  icons: { icon: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Class 10 Learning Hub",
    description: "Smart slides, quizzes and a classroom Smart Board. Free forever.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
