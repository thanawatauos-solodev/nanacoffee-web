import "server-only";

/**
 * Public origin of the site, used for canonical URLs, the sitemap, Open Graph and JSON-LD.
 *
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://nanacoffee.co.th) once the domain is known.
 * Until then a Vercel deployment uses its production URL, and local builds use localhost.
 */
function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

/** Vercel preview deployments must stay out of search results; everything else may be indexed. */
export const allowIndexing = process.env.VERCEL_ENV !== "preview";
