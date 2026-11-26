import type { Locale, Localized } from "@/i18n/config";

/**
 * Helpers for reading the JSON files under content/, which are written by the admin (keystatic.config.ts).
 * Keystatic leaves empty text boxes and empty numbers out of the file, so every stored field is optional.
 */

/**
 * Types an imported content file by the shape the admin saves, not by what TypeScript infers
 * from the file's current values: those change with every edit and must never break the build.
 */
export function fromContent<T>(json: unknown): T {
  return json as T;
}

/** A Thai + English pair as saved by the admin. */
export type StoredLocalized = { th?: string; en?: string };

/** Both languages, filling an empty one from the other so a missing translation never shows as a blank. */
export function localized(value: StoredLocalized | undefined): Localized {
  const th = value?.th?.trim() ?? "";
  const en = value?.en?.trim() ?? "";
  return { th: th || en, en: en || th };
}

/** One language of a stored pair, with the same fallback. */
export function inLocale(value: StoredLocalized | undefined, locale: Locale): string {
  return localized(value)[locale];
}
