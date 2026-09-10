"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Reveals .reveal elements on scroll. Bulletproof: MutationObserver catches
   late client-rendered cards, re-runs on every route, and a safety sweep
   guarantees nothing ever stays invisible. */
export default function RevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const els = () => Array.from(document.querySelectorAll(".reveal:not(.in)"));
    if (!("IntersectionObserver" in window)) {
      els().forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.05 }
    );
    const observeAll = () => els().forEach((el) => io.observe(el));
    observeAll();

    // catch cards rendered after this effect (client components, route changes)
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    // re-scan shortly after route render settles
    const t1 = setTimeout(observeAll, 300);
    const t2 = setTimeout(observeAll, 1200);
    // absolute safety: force-reveal anything still hidden
    const t3 = setTimeout(() => els().forEach((el) => el.classList.add("in")), 2500);

    return () => {
      io.disconnect();
      mo.disconnect();
      [t1, t2, t3].forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
