/**
 * useScrollAnimation.js
 * GSAP ScrollTrigger hooks with prefers-reduced-motion respect.
 *
 * All animations are disabled/simplified when the user has enabled
 * the "reduce motion" accessibility setting.
 */
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Check if user prefers reduced motion */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fade-in on scroll. Element fades up from `y` offset.
 * @param {object} opts - { y, duration, delay }
 */
export const useScrollFadeIn = (opts = {}) => {
  const ref = useRef(null);
  const { y = 30, duration = 0.7, delay = 0 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.set(el, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration, delay, ease: "power2.out" });
      },
    });

    return () => trigger.kill();
  }, [y, duration, delay]);

  return ref;
};

/**
 * Stagger children on scroll. Each child fades in with a stagger delay.
 * @param {object} opts - { y, duration, stagger, childSelector }
 */
export const useScrollStagger = (opts = {}) => {
  const ref = useRef(null);
  const { y = 30, duration = 0.6, stagger = 0.1, childSelector = ":scope > *" } = opts;

  useEffect(() => {
    const container = ref.current;
    if (!container || prefersReducedMotion()) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(children, { opacity: 1, y: 0, duration, stagger, ease: "power2.out" });
      },
    });

    return () => trigger.kill();
  }, [y, duration, stagger, childSelector]);

  return ref;
};

/**
 * Stamp/rotate-settle animation on scroll (for Seal component).
 * Rotates from -12deg and scales from 0.7 with a spring-like settle.
 */
export const useStampAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.set(el, { opacity: 0, scale: 0.6, rotation: -12 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return ref;
};

/**
 * Count-up animation using GSAP + ScrollTrigger.
 * @param {number} target - Target number to count to
 * @param {number} duration - Animation duration in ms
 * @returns {[number, React.RefObject]} [currentValue, ref]
 */
export const useCountUpOnScroll = (target, duration = 2000) => {
  const ref = useRef(null);
  const valueRef = useRef({ val: 0 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;

    if (prefersReducedMotion()) {
      setCount(target);
      return;
    }

    valueRef.current.val = 0;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(valueRef.current, {
          val: target,
          duration: duration / 1000,
          ease: "power2.out",
          onUpdate: () => {
            setCount(Math.round(valueRef.current.val));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [target, duration]);

  return [count, ref];
};
