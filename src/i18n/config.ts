/**
 * Supported languages. Thai is the default and lives at the root URLs (/menu);
 * every other locale is prefixed (/en/menu). See src/proxy.ts for the routing.
 */
export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A value written once per language, e.g. a dish name. */
export type Localized<T = string> = Record<Locale, T>;

export const localeInfo: Record<Locale, { label: string; short: string; intl: string; openGraph: string }> = {
  th: { label: "ไทย", short: "TH", intl: "th-TH", openGraph: "th_TH" },
  en: { label: "English", short: "EN", intl: "en-GB", openGraph: "en_US" },
};
