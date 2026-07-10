/**
 * useSmoothScroll.js
 * Initializes Lenis smooth inertia scrolling site-wide.
 * Disabled when prefers-reduced-motion: reduce is active.
 */
import { useEffect, useRef } from "react";

export const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let lenis;
    let rafId;

    const init = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
          infinite: false,
        });

        lenisRef.current = lenis;

        const raf = (time) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch (err) {
        // Lenis not available — degrade gracefully
        console.warn("Lenis smooth scroll not available:", err);
      }
    };

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};
