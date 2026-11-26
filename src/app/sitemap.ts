import type { MetadataRoute } from "next";
import { tourIsLive } from "@/features/tour/data/tour";
import { locales } from "@/i18n/config";
import { languageAlternates, localizePath } from "@/i18n/paths";
import { absoluteUrl } from "@/lib/site-url";

const routes: readonly { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/reviews", priority: 0.6 },
  // Listed once the tour shows the real shop, not the sample photos.
  ...(tourIsLive ? [{ path: "/tour", priority: 0.6 }] : []),
];

/** Every page in every language, each entry listing its translations (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(locale, path)),
      changeFrequency: "weekly" as const,
      priority,
      alternates: { languages: languageAlternates(path, absoluteUrl) },
    })),
  );
}
