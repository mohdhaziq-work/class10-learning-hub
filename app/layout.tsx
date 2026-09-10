import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./smart-board/board.css";

export const metadata: Metadata = {
  title: { default: "Class 10 Learning Hub — Smart Learning + Smart Board", template: "%s — Class 10 Learning Hub" },
  description: "Class 10 all subjects chapter-wise: slides, mind maps, flow charts, formulas, quizzes, AI subject + advanced Smart Board. Free forever, works on every device.",
  keywords: ["class 10", "NCERT", "CBSE", "smart board", "maths", "science", "SST", "english", "hindi", "artificial intelligence", "KIPS", "mind maps", "quiz"],
  authors: [{ name: "Class 10 Learning Hub" }],
  openGraph: {
    title: "Class 10 Learning Hub", type: "website",
    description: "Smart learning + Smart Board — 6 subjects, 100+ chapters, free forever.",
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#0b57d0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('c10-theme')||'light';if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-gbg text-ink dark:bg-[#131314] dark:text-[#e3e3e3] antialiased">
        {children}
      </body>
    </html>
  );
}
