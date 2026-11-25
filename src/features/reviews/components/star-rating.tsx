import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

/** Five stars with fractional fill, so an average like 4.7 reads correctly. `label` is the spoken rating. */
export function StarRating({ value, label, size = 16, className }: { value: number; label: string; size?: number; className?: string }) {
  return (
    <span role="img" aria-label={label} className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <span key={i} className="relative inline-block shrink-0" style={{ width: size, height: size }}>
            <Star size={size} strokeWidth={1.6} className="absolute inset-0 fill-oat text-latte" aria-hidden />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} strokeWidth={1.6} className="fill-honey text-caramel" aria-hidden />
            </span>
          </span>
        );
      })}
    </span>
  );
}
