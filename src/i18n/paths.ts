import { defaultLocale, isLocale, type Locale } from "./config";

/** "/menu" → "/menu" in Thai, "/en/menu" in English. Hash fragments are kept. */
export function localizePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Splits a pathname into its locale and the locale-free path.
 * Accepts the public URL (/menu, /en/menu) and the internal one (/th/menu) alike,
 * so it gives the same answer during prerendering and in the browser.
 */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first)) return { locale: first, path: `/${rest.join("/")}` };
  return { locale: defaultLocale, path: pathname || "/" };
}

/** URLs of one page in every language, for hreflang alternates and the sitemap. */
export function languageAlternates(path: string, toUrl: (path: string) => string = (p) => p) {
  return {
    th: toUrl(localizePath("th", path)),
    en: toUrl(localizePath("en", path)),
    "x-default": toUrl(localizePath(defaultLocale, path)),
  };
}
