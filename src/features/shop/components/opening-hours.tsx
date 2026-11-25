"use client";

import { Clock } from "lucide-react";
import { useStoreClock } from "@/hooks/use-store-clock";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";
import { hoursText, weekdayOf } from "@/lib/time";
import { OpenStatusBadge } from "./open-status-badge";

// Dictionary day names start on Monday; JS weekdays start on Sunday (0).
const weekdayIndexes = [1, 2, 3, 4, 5, 6, 0];

/** Weekly hours with today highlighted in Thailand time (after hydration). */
export function OpeningHours({ className }: { className?: string }) {
  const { t } = useI18n();
  const clock = useStoreClock();
  const today = clock ? weekdayOf(clock.dateKey) : null;
  const hours = hoursText(t.site.timeRange);

  return (
    <div className={cn("rounded-[30px] bg-foam p-6 shadow-soft ring-1 ring-roast/6 sm:p-7", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-espresso">
          <Clock size={20} className="text-leaf" aria-hidden />
          {t.hours.title}
        </h2>
        <OpenStatusBadge className="shadow-none" />
      </div>
      <ul className="mt-5 divide-y divide-roast/8">
        {t.hours.days.map((name, i) => {
          const isToday = weekdayIndexes[i] === today;
          return (
            <li
              key={name}
              aria-current={isToday ? "date" : undefined}
              className={cn(
                "-mx-3 flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] transition-colors",
                isToday ? "bg-sage-soft font-semibold text-leaf-deep" : "text-roast",
              )}
            >
              <span className="flex items-center gap-2">
                {name}
                {isToday ? <span className="rounded-full bg-leaf px-2 py-0.5 text-[11px] text-foam">{t.hours.today}</span> : null}
              </span>
              <span className="tabular-nums">{hours}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
