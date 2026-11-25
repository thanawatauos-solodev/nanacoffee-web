import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { PageIntro } from "@/components/ui/page-intro";
import { MenuBrowser } from "@/features/menu/components/menu-browser";
import { menuJsonLd } from "@/features/menu/structured-data";
import { CallButton } from "@/features/shop/components/contact-buttons";
import { getDictionary, getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, title: t.menu.metaTitle, description: t.menu.metaDescription, path: "/menu" });
}

export default async function MenuPage() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <PageIntro eyebrow={t.menu.eyebrow} title={t.menu.title} description={t.menu.intro} />
      <MenuBrowser />
      <div className="mt-16 flex flex-col items-center gap-4 rounded-[32px] bg-oat/60 px-6 py-10 text-center">
        <p className="font-script text-2xl leading-none text-caramel">{t.menu.takeaway.eyebrow}</p>
        <h2 className="text-2xl font-semibold text-espresso sm:text-3xl">{t.menu.takeaway.title}</h2>
        <p className="max-w-md text-[15px] text-mocha">{t.menu.takeaway.body}</p>
        <CallButton className="mt-2">{t.menu.takeaway.cta}</CallButton>
      </div>
      <JsonLd data={menuJsonLd(locale)} />
      <BreadcrumbJsonLd name={t.nav.menu} path="/menu" />
    </div>
  );
}
