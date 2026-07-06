import { useState, useEffect, useRef } from "react";

/**
 * useCountUp — animates a number from 0 to `target` when the element
 * scrolls into view. Returns [displayValue, ref] where ref is attached
 * to the element you want to trigger the animation on.
 *
 * @param {number} target    - Final number to count up to
 * @param {number} duration  - Animation duration in ms (default 1800)
 * @param {number} threshold - IntersectionObserver threshold (default 0.4)
 */
export const useCountUp = (target, duration = 1800, threshold = 0.4) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic: decelerates as it approaches the target
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, threshold]);

  return [count, ref];
};
