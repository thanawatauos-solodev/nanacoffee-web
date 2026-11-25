"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { cn } from "@/lib/cn";
import { reviewTopicIds, type Review, type ReviewTopic } from "../types";
import { ReviewCard } from "./review-card";

type Filter = "all" | ReviewTopic;
type Sort = "latest" | "top";

/** Every review, filterable by what it talks about and sortable by date or score. */
export function ReviewWall({ reviews }: { reviews: readonly Review[] }) {
  const { locale, t } = useI18n();
  const sorts: Record<Sort, string> = { latest: t.reviews.sortLatest, top: t.reviews.sortTop };
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("latest");

  const filters = useMemo(
    () =>
      [
        { id: "all" as const, label: t.reviews.all, count: reviews.length },
        ...reviewTopicIds.map((topic) => ({
          id: topic,
          label: t.reviews.topics[topic],
          count: reviews.filter((review) => review.topics.includes(topic)).length,
        })),
      ].filter((f) => f.count > 0),
    [reviews, t],
  );

  const visible = useMemo(() => {
    const list = filter === "all" ? [...reviews] : reviews.filter((review) => review.topics.includes(filter));
    return list.sort((a, b) =>
      sort === "top" && a.rating !== b.rating ? b.rating - a.rating : b.date.localeCompare(a.date),
    );
  }, [reviews, filter, sort]);

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label={t.reviews.filterLabel} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors",
                  active ? "text-cream ring-transparent" : "bg-foam text-roast ring-roast/10 hover:ring-roast/25",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="review-filter-pill"
                    className="absolute inset-0 rounded-full bg-espresso"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative">
                  {f.label} <span className={cn("tabular-nums", active ? "text-cream/60" : "text-mocha/60")}>{f.count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div role="group" aria-label={t.reviews.sortLabel} className="inline-flex rounded-full bg-oat/60 p-1 text-sm">
          {(Object.keys(sorts) as Sort[]).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={sort === s}
              onClick={() => setSort(s)}
              className={cn(
                "rounded-full px-3.5 py-1.5 font-medium transition-colors",
                sort === s ? "bg-foam text-espresso shadow-soft" : "text-mocha hover:text-espresso",
              )}
            >
              {sorts[s]}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {fill(t.reviews.showing, { count: visible.length })}
      </p>

      <motion.ul layout className="mt-6 grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((review) => (
            <motion.li
              key={review.id}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <ReviewCard review={review} locale={locale} t={t.reviews} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
