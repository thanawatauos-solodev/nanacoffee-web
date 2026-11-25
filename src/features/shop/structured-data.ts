import { getMenuPriceRange } from "@/features/menu/catalog";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/paths";
import { dictionaryFor } from "@/i18n/server";
import { brandTitle } from "@/lib/seo";
import { siteConfig, socialProfiles } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";
import { formatClock } from "@/lib/time";

const everyDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const cuisines: Record<Locale, string[]> = {
  th: ["อาหารไทย", "อาหารเวียดนาม", "อาหารฝรั่ง", "กาแฟ", "ของหวาน"],
  en: ["Thai", "Vietnamese", "Western", "Coffee", "Desserts"],
};

const amenities: Record<Locale, [string, string]> = {
  th: ["ห้องแอร์", "ที่จอดรถ"],
  en: ["Air-conditioned room", "Parking"],
};

/**
 * schema.org Restaurant + WebSite, rendered on every page in the page's language.
 * This is what lets Google show hours, phone and address and connect the site to its Maps listing.
 * Both languages share one @id, so search engines see a single business.
 *
 * Reviews are deliberately left out: Google ignores ratings a business publishes about itself
 * (and may treat them as spam). Real ratings come from the Google Business Profile.
 */
export function siteJsonLd(locale: Locale) {
  const t = dictionaryFor(locale);
  const price = getMenuPriceRange();
  const address = siteConfig.address[locale];
  const restaurantId = absoluteUrl("/#restaurant");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Restaurant", "CafeOrCoffeeShop"],
        "@id": restaurantId,
        name: `${siteConfig.name} (${siteConfig.nameTh}) ${t.site.branch}`,
        alternateName: [siteConfig.nameTh, siteConfig.name],
        description: t.site.description,
        url: absoluteUrl(localizePath(locale, "/")),
        image: absoluteUrl(localizePath(locale, "/opengraph-image")),
        logo: absoluteUrl("/icon.svg"),
        telephone: siteConfig.phone.e164,
        priceRange: `฿${price.min}–${price.max}`,
        servesCuisine: cuisines[locale],
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          addressLocality: address.district,
          addressRegion: address.province,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
        hasMap: siteConfig.maps.searchUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: everyDay,
            opens: formatClock(siteConfig.hours.open),
            closes: formatClock(siteConfig.hours.close),
          },
        ],
        hasMenu: absoluteUrl(localizePath(locale, "/menu")),
        amenityFeature: amenities[locale].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
        ...(socialProfiles.length ? { sameAs: socialProfiles.map((profile) => profile.url) } : {}),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: brandTitle,
        alternateName: siteConfig.name,
        url: absoluteUrl("/"),
        inLanguage: ["th", "en"],
        publisher: { "@id": restaurantId },
      },
    ],
  };
}
