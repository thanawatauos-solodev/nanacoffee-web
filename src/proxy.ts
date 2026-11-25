import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Locale routing. Pages live under app/[lang], but Thai (the default) is served without a prefix:
 *   /menu      → rewritten to /th/menu (URL stays /menu)
 *   /en/menu   → served as is
 *   /th/menu   → 308 redirect to /menu, so each page has exactly one public URL
 * There is no automatic redirect by browser language: search engines crawl both versions,
 * and visitors switch with the language toggle.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (first === defaultLocale) {
    // Generated share images are linked by their internal path, so let those through.
    if (pathname.startsWith(`/${defaultLocale}/opengraph-image`)) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, files with an extension (sitemap.xml, robots.txt, icon.svg, images…)
  // and the root-level apple-icon route.
  matcher: ["/((?!_next/|api/|apple-icon|.*\\..*).*)"],
};
