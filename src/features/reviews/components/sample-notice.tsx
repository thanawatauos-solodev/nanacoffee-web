import { Info } from "lucide-react";
import { getDictionary } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { reviewsAreSamples } from "../data/reviews";

/** Visible until real reviews replace the samples (see data/reviews.ts). */
export async function SampleNotice({ className }: { className?: string }) {
  if (!reviewsAreSamples) return null;
  const t = await getDictionary();
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-2xl border border-dashed border-caramel/50 bg-honey/15 px-4 py-3 text-sm text-roast",
        className,
      )}
    >
      <Info size={17} className="mt-0.5 shrink-0 text-caramel-deep" aria-hidden />
      {t.reviews.sampleNotice}
    </p>
  );
}
