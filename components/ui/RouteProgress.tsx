"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/* Thin top progress bar on every page navigation — so it is always clear
   that the next page is opening. */
export default function RouteProgress() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // route arrived → hide
  useEffect(() => {
    setActive(false);
    if (timer.current) clearTimeout(timer.current);
  }, [pathname, search]);

  // any internal link click → show
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const a = t.closest?.('a[href^="/"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href === pathname || href.startsWith("/#")) return;
      if (a.target === "_blank") return;
      setActive(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setActive(false), 5000); // safety
    };
    const onNav = () => setActive(true);
    document.addEventListener("click", onClick);
    window.addEventListener("c10-navigate", onNav);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("c10-navigate", onNav);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);

  if (!active) return null;
  return (
    <div className="route-progress" aria-hidden="true">
      <span />
    </div>
  );
}
