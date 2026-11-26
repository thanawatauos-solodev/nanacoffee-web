import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale, type Locale } from "./config";
import en from "./dictionaries/en";
import th, { type Dictionary } from "./dictionaries/th";

const dictionaries: Record<Locale, Dictionary> = { th, en };

/**
 * Current locale for Server Components, read from the [lang] root segment.
 * (Root param getters can't be used in Client Components or Route Handlers.)
 */
export async function getLocale(): Promise<Locale> {
  // `undefined` outside app/[lang] (the admin has its own root layout).
  const value = await lang();
  if (value === undefined || !isLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()];
}

/** For code that already knows the locale, e.g. a Route Handler reading `params`. */
export function dictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale];
}
