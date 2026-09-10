import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RevealInit />
      <Header />
      <main className="min-h-[70vh] pb-10">{children}</main>
      <Footer />
    </>
  );
}
