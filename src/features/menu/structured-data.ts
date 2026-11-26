import type { Locale } from "@/i18n/config";
import { dictionaryFor } from "@/i18n/server";
import { localizePath } from "@/i18n/paths";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";
import { dishNames, getItemsByCategory } from "./catalog";
import { categories } from "./data/menu";

/** schema.org Menu with every section, dish and price, so search engines can read the menu directly. */
export function menuJsonLd(locale: Locale) {
  const t = dictionaryFor(locale);
  const url = absoluteUrl(localizePath(locale, "/menu"));

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${url}#menu`,
    name: `${t.menu.metaTitle} · ${siteConfig.name} ${siteConfig.nameTh} ${t.site.branch}`,
    url,
    inLanguage: locale,
    hasMenuSection: categories.filter((category) => getItemsByCategory(category.id).length > 0).map((category) => ({
      "@type": "MenuSection",
      name: category.name[locale],
      description: category.blurb[locale],
      hasMenuItem: getItemsByCategory(category.id).map((item) => {
        const { name, alt } = dishNames(item, locale);
        return {
          "@type": "MenuItem",
          name,
          alternateName: alt,
          description: item.description[locale],
          ...(item.image ? { image: absoluteUrl(item.image) } : {}),
          offers: item.variants
            ? item.variants.map((variant) => ({
                "@type": "Offer",
                name: t.menu.variants[variant.id],
                price: variant.price,
                priceCurrency: "THB",
              }))
            : { "@type": "Offer", price: item.price, priceCurrency: "THB" },
        };
      }),
    })),
  };
}
