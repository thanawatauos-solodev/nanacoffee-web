import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** Hand-drawn style decorative shapes. All are `aria-hidden` and purely visual. */

export function LeafSprig({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 160" aria-hidden className={className} style={style} fill="none">
      <path d="M60 158C58 112 62 64 78 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {[
        { d: "M62 128c-20-4-34-18-36-36 18 2 32 14 36 36Z", o: 0.9 },
        { d: "M63 110c18-6 30-20 30-38-17 4-28 17-30 38Z", o: 0.75 },
        { d: "M66 82c-18-6-28-20-27-38 16 5 26 18 27 38Z", o: 0.9 },
        { d: "M70 58c15-7 23-20 22-35-14 5-22 16-22 35Z", o: 0.75 },
        { d: "M74 34c-12-5-18-15-17-27 12 4 18 13 17 27Z", o: 0.9 },
      ].map((leaf) => (
        <path key={leaf.d} d={leaf.d} fill="currentColor" opacity={leaf.o} />
      ))}
    </svg>
  );
}

export function CoffeeBean({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 52" aria-hidden className={className} style={style}>
      <ellipse cx="20" cy="26" rx="17" ry="23" fill="currentColor" />
      <path
        d="M21 5c-7 7-7 14-2 21s5 14-2 21"
        stroke="rgb(0 0 0 / 0.28)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Circular text badge that slowly spins. */
export function SpinningBadge({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("relative grid place-items-center", className)} aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" />
        </defs>
        <text className="fill-current font-sans text-[17px] font-semibold tracking-[0.28em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 48 48" className="w-[34%]" fill="none">
        <path d="M10 20h22v7a10 10 0 0 1-10 10h-2a10 10 0 0 1-10-10v-7Z" fill="currentColor" />
        <path d="M32 22.5h2.5a4 4 0 0 1 0 8H31" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
