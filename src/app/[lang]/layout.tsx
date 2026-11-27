import type { Metadata, Viewport } from "next";
import { Anuphan, Charm, Trirong } from "next/font/google";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { siteJsonLd } from "@/features/shop/structured-data";
import { I18nProvider } from "@/i18n/client";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";
import { brandTitle } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { allowIndexing, siteUrl } from "@/lib/site-url";
import "../globals.css";

// Thai-first type system: Anuphan for reading, Trirong for display, Charm for script accents.
// All three include Latin glyphs, so the English pages use the same faces.
// Only the body face is preloaded. Preloading every Trirong and Charm file put 22 fonts (~300 KB) ahead of
// everything else on each page; now headings and accents briefly show a size-matched fallback on a first visit.
// Keep the weights in step with the font-* classes used on display and script text: a missing one renders
// in the nearest weight that is loaded.
const anuphan = Anuphan({ subsets: ["thai", "latin"], variable: "--font-anuphan", display: "swap" });
const trirong = Trirong({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-trirong",
  display: "swap",
  preload: false,
});
const charm = Charm({ subsets: ["thai", "latin"], weight: "400", variable: "--font-charm", display: "swap", preload: false });

/** Prerender every page once per language. */
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    metadataBase: siteUrl,
    title: { default: t.site.title, template: `%s · ${brandTitle}` },
    description: t.site.description,
    applicationName: siteConfig.name,
    category: "restaurant",
    keywords: t.site.keywords,
    twitter: { card: "summary_large_image" },
    robots: allowIndexing ? undefined : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f5ecdc",
  viewportFit: "cover",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${anuphan.variable} ${trirong.variable} ${charm.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <I18nProvider locale={locale} dictionary={t}>
          <Providers>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
            >
              {t.site.skipToContent}
            </a>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <MobileTabBar />
          </Providers>
        </I18nProvider>
        <JsonLd data={siteJsonLd(locale)} />
      </body>
    </html>
  );
}
