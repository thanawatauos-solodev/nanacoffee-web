import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { PageIntro } from "@/components/ui/page-intro";
import { RatingSummary } from "@/features/reviews/components/rating-summary";
import { ReviewWall } from "@/features/reviews/components/review-wall";
import { SampleNotice } from "@/features/reviews/components/sample-notice";
import { WriteReviewCard } from "@/features/reviews/components/write-review-card";
import { reviews } from "@/features/reviews/data/reviews";
import { summarizeReviews } from "@/features/reviews/summary";
import { getDictionary, getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, title: t.reviews.pageTitle, description: t.reviews.metaDescription, path: "/reviews" });
}

export default async function ReviewsPage() {
  const t = await getDictionary();
  const summary = summarizeReviews(reviews);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <PageIntro eyebrow={t.reviews.eyebrow} title={t.reviews.pageTitle} description={t.reviews.pageIntro} />
      <SampleNotice className="mx-auto mb-8 max-w-2xl" />
      <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        <aside className="space-y-5 lg:sticky lg:top-28">
          <div className="rounded-[30px] bg-foam p-6 shadow-soft ring-1 ring-roast/6 sm:p-7">
            <RatingSummary summary={summary} />
          </div>
          <WriteReviewCard />
        </aside>
        <ReviewWall reviews={reviews} />
      </div>
      <BreadcrumbJsonLd name={t.reviews.pageTitle} path="/reviews" />
    </div>
  );
}
