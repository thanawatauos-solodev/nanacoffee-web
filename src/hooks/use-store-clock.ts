"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getStoreClock, type StoreClock } from "@/lib/time";

const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

// A minute-precision stamp is a stable primitive, so React only re-renders when the minute flips.
const getSnapshot = () => Math.floor(Date.now() / MINUTE);
const getServerSnapshot = () => null;

/**
 * Current store-local date and time, or `null` while prerendering and hydrating.
 * Reading the clock only on the client keeps pages statically prerenderable.
 */
export function useStoreClock(): StoreClock | null {
  const stamp = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => (stamp === null ? null : getStoreClock(new Date(stamp * MINUTE))), [stamp]);
}

const noopSubscribe = () => () => {};

/** `false` during SSR and hydration, `true` once running in the browser. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
