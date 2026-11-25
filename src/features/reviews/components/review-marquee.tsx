import type { CSSProperties } from "react";
import { getDictionary, getLocale } from "@/i18n/server";
import { cn } from "@/lib/cn";
import type { Review } from "../types";
import { ReviewCard } from "./review-card";

/**
 * Two rows of review cards drifting in opposite directions (CSS only).
 * Each row renders its list twice and slides by exactly one copy for a seamless loop;
 * the copy is inert and hidden from assistive tech. Hover or focus pauses a row, and
 * with reduced motion the rows become plain horizontal scrollers.
 */
export async function ReviewMarquee({ reviews }: { reviews: readonly Review[] }) {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const rows = [reviews.filter((_, i) => i % 2 === 0), reviews.filter((_, i) => i % 2 === 1)];

  return (
    <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="group/marquee no-scrollbar overflow-hidden py-2 motion-reduce:overflow-x-auto">
          <div
            className={cn(
              "flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] motion-reduce:animate-none",
              rowIndex === 1 && "[animation-direction:reverse]",
            )}
            style={{ "--marquee-duration": `${row.length * 11}s` } as CSSProperties}
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                inert={copy === 1}
                className={cn("flex gap-4 pl-4", copy === 1 && "motion-reduce:hidden")}
              >
                {row.map((review) => (
                  <li key={review.id} className="w-[290px] shrink-0 sm:w-[360px]">
                    <ReviewCard review={review} locale={locale} t={t.reviews} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
