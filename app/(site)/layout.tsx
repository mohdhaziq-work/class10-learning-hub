import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import RouteProgress from "@/components/ui/RouteProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <RevealInit />
        <RouteProgress />
      </Suspense>
      <Header />
      <main className="min-h-[70vh] pb-10">{children}</main>
      <Footer />
    </>
  );
}
