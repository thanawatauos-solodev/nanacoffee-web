import stored from "@content/faq.json";
import type { Locale } from "@/i18n/config";
import { fill } from "@/i18n/format";
import { fromContent, localized, type StoredLocalized } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { formatClock } from "@/lib/time";

/**
 * Contact page FAQ, edited in the admin (/keystatic → คำถามที่พบบ่อย) and saved to content/faq.json.
 * Answers can say {phone}, {open}, {close} or {address} to use the current store details.
 */

export type FaqItem = { question: string; answer: string };

const data = fromContent<{ items?: { question?: StoredLocalized; answer?: StoredLocalized }[] }>(stored);

const entries = (data.items ?? [])
  .map((item) => ({ question: localized(item.question), answer: localized(item.answer) }))
  .filter((item) => item.question.th && item.answer.th);

function itemsFor(locale: Locale): FaqItem[] {
  const values = {
    phone: siteConfig.phone.display,
    open: formatClock(siteConfig.hours.open),
    close: formatClock(siteConfig.hours.close),
    address: siteConfig.address[locale].full,
  };
  return entries.map((item) => ({ question: item.question[locale], answer: fill(item.answer[locale], values) }));
}

export const faq: Record<Locale, readonly FaqItem[]> = { th: itemsFor("th"), en: itemsFor("en") };
