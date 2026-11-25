import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { PageIntro } from "@/components/ui/page-intro";
import { Reveal } from "@/components/ui/reveal";
import { FaqList } from "@/features/shop/components/faq-list";
import { OpeningHours } from "@/features/shop/components/opening-hours";
import { VisitInfo } from "@/features/shop/components/visit-info";
import { fill } from "@/i18n/format";
import { getDictionary, getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { hoursText } from "@/lib/time";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const description = fill(t.contactPage.metaDescription, {
    phone: siteConfig.phone.display,
    hours: hoursText(t.site.hours),
    address: siteConfig.address[locale].full,
  });
  return pageMetadata({ locale, title: t.contactPage.title, description, path: "/contact" });
}

export default async function ContactPage() {
  const t = await getDictionary();
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <PageIntro
          eyebrow={t.contactPage.eyebrow}
          title={t.contactPage.title}
          description={fill(t.contactPage.intro, { hours: hoursText(t.site.hours) })}
        />
      </div>
      <VisitInfo showHeading={false} />
      <div className="mx-auto mt-20 grid max-w-6xl gap-12 px-4 sm:mt-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-start lg:gap-10">
        <Reveal className="lg:sticky lg:top-28">
          <OpeningHours />
        </Reveal>
        <FaqList />
      </div>
      <BreadcrumbJsonLd name={t.contactPage.title} path="/contact" />
    </div>
  );
}
