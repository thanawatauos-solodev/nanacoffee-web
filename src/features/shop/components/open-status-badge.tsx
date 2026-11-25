"use client";

import { useStoreClock } from "@/hooks/use-store-clock";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { cn } from "@/lib/cn";
import { getOpenStatus, hoursText } from "@/lib/time";

/** Live "open now / closed" pill, computed in Thailand time on the visitor's device. */
export function OpenStatusBadge({ className }: { className?: string }) {
  const { t } = useI18n();
  const clock = useStoreClock();
  const status = clock ? getOpenStatus(clock.minutes) : null;

  let dot = "bg-mocha/40";
  let text = hoursText(t.site.hours);
  if (status?.isOpen) {
    const closingSoon = status.minutesLeft <= 60;
    dot = closingSoon ? "bg-caramel" : "bg-leaf animate-pulse-ring";
    text = fill(closingSoon ? t.status.closingSoon : t.status.open, { time: status.closesAt });
  } else if (status) {
    dot = "bg-chili/80";
    text = fill(status.opensToday ? t.status.opensToday : t.status.opensTomorrow, { time: status.opensAt });
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-foam/85 px-3.5 py-1.5 text-[13px] font-medium text-roast shadow-soft ring-1 ring-roast/8 backdrop-blur",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", dot)} aria-hidden />
      <span aria-live="polite">{text}</span>
    </span>
  );
}
