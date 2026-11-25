"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** App-wide client context. Motion honours the OS "reduce motion" setting everywhere. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
