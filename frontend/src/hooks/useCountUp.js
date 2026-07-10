import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * useCountUp
 * Triggers a numeric count-up animation immediately upon component mount (page load).
 * Respects user prefers-reduced-motion settings.
 */
export const useCountUp = (target, duration = 2000) => {
  const ref = useRef(null);
  const valueRef = useRef({ val: 0 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!target) return;

    if (prefersReducedMotion()) {
      setCount(target);
      return;
    }

    valueRef.current.val = 0;

    const tween = gsap.to(valueRef.current, {
      val: target,
      duration: duration / 1000,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.round(valueRef.current.val));
      },
    });

    return () => tween.kill();
  }, [target, duration]);

  return [count, ref];
};
