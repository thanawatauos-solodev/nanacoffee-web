import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";
import { absoluteUrl } from "@/lib/site-url";
import { JsonLd } from "./json-ld";

/** BreadcrumbList for an inner page, e.g. Home › Menu. Google can show it in place of the raw URL. */
export async function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const trail = [
    { name: t.nav.home, path: "/" },
    { name, path },
  ];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(localizePath(locale, item.path)),
        })),
      }}
    />
  );
}
