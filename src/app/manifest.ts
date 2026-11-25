import type { MetadataRoute } from "next";
import th from "@/i18n/dictionaries/th";
import { siteConfig } from "@/lib/site-config";

/** Install metadata for "Add to Home Screen". One manifest for the site, in the default language. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} ${siteConfig.nameTh} ${th.site.branch}`,
    short_name: siteConfig.name,
    description: th.site.description,
    lang: "th",
    start_url: "/",
    display: "standalone",
    background_color: "#f5ecdc",
    theme_color: "#f5ecdc",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
