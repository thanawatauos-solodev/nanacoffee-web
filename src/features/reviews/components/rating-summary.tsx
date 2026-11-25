"use client";

import { motion } from "motion/react";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { cn } from "@/lib/cn";
import type { ReviewSummary } from "../summary";
import { StarRating } from "./star-rating";

/** Average score with a 5→1 star breakdown whose bars grow in when scrolled into view. */
export function RatingSummary({ summary, className }: { summary: ReviewSummary; className?: string }) {
  const { t } = useI18n();
  return (
    <div className={className}>
      <div className="flex items-end gap-4">
        <p className="font-display text-7xl font-semibold leading-[0.9] text-espresso">{summary.average.toFixed(1)}</p>
        <div className="pb-1">
          <StarRating value={summary.average} label={fill(t.reviews.starsLabel, { value: summary.average })} size={20} />
          <p className="mt-1 text-sm text-mocha">{fill(t.reviews.outOf, { count: summary.count })}</p>
        </div>
      </div>

      <dl className="mt-6 space-y-2.5">
        {summary.distribution.map(({ stars, count, share }) => (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <dt className="w-12 shrink-0 text-mocha">{fill(t.reviews.starRow, { stars })}</dt>
            <dd className="flex flex-1 items-center gap-3">
              <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-oat">
                <motion.span
                  className={cn("absolute inset-y-0 left-0 origin-left rounded-full", stars >= 4 ? "bg-caramel" : "bg-latte")}
                  style={{ width: `${share * 100}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: (5 - stars) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              <span className="w-5 text-right tabular-nums text-mocha">{count}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
