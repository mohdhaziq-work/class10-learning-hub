"use client";
import { useEffect } from "react";

/* Scroll-reveal — portfolio-style micro animation, zero dependency */
export default function Reveal() {
 useEffect(() => {
 const io = new IntersectionObserver(
 (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
 { threshold: 0.12 }
 );
 document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
 return () => io.disconnect();
 }, []);
 return null;
}
