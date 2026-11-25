import { localeInfo, type Locale } from "@/i18n/config";
import { fill } from "@/i18n/format";
import { siteConfig } from "./site-config";

/** The store runs on Thailand time (UTC+7, no DST) regardless of the visitor's device. */
export const STORE_TIME_ZONE = "Asia/Bangkok";

export type StoreClock = {
  /** Calendar date in the store's time zone, `YYYY-MM-DD`. */
  dateKey: string;
  /** Minutes after midnight in the store's time zone. */
  minutes: number;
};

const partsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: STORE_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function getStoreClock(date: Date): StoreClock {
  const parts = partsFormatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  return {
    dateKey: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function formatClock(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function dateKeyToUtc(dateKey: string): Date {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** "2026-11-18" → "18 พ.ย. 2569" in Thai, "18 Nov 2026" in English. */
export function formatDateKey(dateKey: string, locale: Locale): string {
  // Date keys are calendar dates, so format them as UTC to avoid shifting the day.
  return new Intl.DateTimeFormat(localeInfo[locale].intl, {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(dateKeyToUtc(dateKey));
}

/** Fills a dictionary template such as "เปิดทุกวัน {open} – {close} น." with the store hours. */
export function hoursText(template: string): string {
  return fill(template, { open: formatClock(siteConfig.hours.open), close: formatClock(siteConfig.hours.close) });
}

/** 0 = Sunday … 6 = Saturday */
export function weekdayOf(dateKey: string): number {
  return dateKeyToUtc(dateKey).getUTCDay();
}

export type OpenStatus =
  | { isOpen: true; closesAt: string; minutesLeft: number }
  | { isOpen: false; opensAt: string; opensToday: boolean };

export function getOpenStatus(minutes: number): OpenStatus {
  const { open, close } = siteConfig.hours;
  if (minutes >= open && minutes < close) {
    return { isOpen: true, closesAt: formatClock(close), minutesLeft: close - minutes };
  }
  return { isOpen: false, opensAt: formatClock(open), opensToday: minutes < open };
}
