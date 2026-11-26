import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { Notice } from "@/components/ui/notice";
import { PageIntro } from "@/components/ui/page-intro";
import { TourViewer } from "@/features/tour/components/tour-viewer";
import { tourIsLive, tourIsSample, tourSpots } from "@/features/tour/data/tour";
import { getDictionary, getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return {
    ...pageMetadata({ locale, title: t.tour.title, description: t.tour.metaDescription, path: "/tour" }),
    // Sample photos show another shop: keep them out of search results.
    ...(tourIsLive ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function TourPage() {
  if (tourSpots.length === 0) notFound();
  const t = await getDictionary();
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <PageIntro eyebrow={t.tour.eyebrow} title={t.tour.title} description={t.tour.intro || undefined} />
      {tourIsSample ? <Notice className="mx-auto mb-6 max-w-2xl">{t.tour.sampleNotice}</Notice> : null}
      <TourViewer spots={tourSpots} />
      <BreadcrumbJsonLd name={t.tour.title} path="/tour" />
    </div>
  );
}
