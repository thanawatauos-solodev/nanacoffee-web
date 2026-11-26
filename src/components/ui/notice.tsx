import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A dashed honey-coloured note, e.g. to flag placeholder content that must not pass for real. */
export function Notice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-2xl border border-dashed border-caramel/50 bg-honey/15 px-4 py-3 text-sm text-roast",
        className,
      )}
    >
      <Info size={17} className="mt-0.5 shrink-0 text-caramel-deep" aria-hidden />
      {children}
    </p>
  );
}
