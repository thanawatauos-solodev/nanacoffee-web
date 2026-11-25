import { cn } from "@/lib/cn";

/** Cup-and-leaf mark. Inherits `currentColor` so it works on light and dark surfaces. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} fill="none">
      <circle cx="24" cy="24" r="23" fill="currentColor" opacity="0.1" />
      <path
        d="M12 21h20v6.5a9 9 0 0 1-9 9h-2a9 9 0 0 1-9-9V21Z"
        fill="currentColor"
      />
      <path d="M32 23.5h2.2a3.8 3.8 0 0 1 0 7.6H31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M10 39h26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M22.5 17.5c-2.6-1.2-3.9-4.6-2.4-8.6 3.9.7 6 3.4 5.3 6.9-.2.8-1.3 2.2-2.9 1.7Z"
        fill="#4b6a43"
      />
      <path d="M22.6 17.4c.2-2.3.9-4.4 2.3-6.2" stroke="#dfe7d4" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ subtitle, className, tone = "dark" }: { subtitle: string; className?: string; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={cn("size-10 shrink-0", light ? "text-honey" : "text-roast")} />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={cn("font-display text-[1.35rem] font-semibold italic tracking-tight", light ? "text-foam" : "text-espresso")}>
          NaNa Coffee
        </span>
        <span className={cn("mt-1 text-[11px] font-medium tracking-wide", light ? "text-cream/70" : "text-mocha")}>
          {subtitle}
        </span>
      </span>
    </span>
  );
}
