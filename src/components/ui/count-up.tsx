"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * A number that counts up the first time it scrolls into view.
 * The final value is what prerenders, so crawlers and no-JS visitors see the real figure.
 */
export function CountUp({ to, duration = 1.6, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(to);
  const display = useTransform(value, (v) => Math.round(v).toLocaleString("th-TH"));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    value.set(0);
    const controls = animate(value, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
