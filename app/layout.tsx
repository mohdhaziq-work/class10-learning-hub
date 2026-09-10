import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./smart-board/board.css";

export const metadata: Metadata = {
  title: { default: "Class 10 Learning Hub — Smart Padhai + Smart Board", template: "%s — Class 10 Learning Hub" },
  description: "Class 10 ke saare subjects chapter-wise: slides, mind maps, flow charts, formulas, quizzes + advanced Smart Board. 100% free, smart-board ready.",
  keywords: ["class 10", "NCERT", "CBSE", "smart board", "maths", "science", "SST", "english", "hindi", "mind maps", "quiz"],
  authors: [{ name: "Class 10 Learning Hub" }],
  openGraph: {
    title: "Class 10 Learning Hub", type: "website",
    description: "Smart padhai + Smart Board — 97 chapters, 100% free.",
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#4f46e5", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* theme bina flash ke — pehle paint se pehle */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('c10-theme')||'light';if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
      </head>
      <body className="bg-slate-100 text-slate-900 dark:bg-[#0d1222] dark:text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
