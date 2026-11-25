import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { fill } from "@/i18n/format";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";
import { writeReviewUrl } from "@/lib/site-config";
import { reviews } from "../data/reviews";
import { summarizeReviews } from "../summary";
import { ReviewMarquee } from "./review-marquee";
import { SampleNotice } from "./sample-notice";
import { StarRating } from "./star-rating";

/** Home page testimonials: headline score plus drifting review cards. */
export async function ReviewsSection() {
  if (reviews.length === 0) return null;
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const summary = summarizeReviews(reviews);

  return (
    <section aria-labelledby="reviews-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="reviews-title"
            eyebrow={t.reviews.eyebrow}
            title={t.reviews.sectionTitle}
            description={t.reviews.sectionDescription}
          />
          <div className="flex items-center gap-4 rounded-[24px] bg-foam px-5 py-4 shadow-soft ring-1 ring-roast/6">
            <p className="font-display text-5xl font-semibold leading-none text-espresso">{summary.average.toFixed(1)}</p>
            <div>
              <StarRating value={summary.average} label={fill(t.reviews.starsLabel, { value: summary.average })} size={18} />
              <p className="mt-0.5 text-sm text-mocha">{fill(t.reviews.outOf, { count: summary.count })}</p>
            </div>
          </div>
        </div>
        <SampleNotice className="mt-6" />
      </div>

      <div className="mt-8">
        <ReviewMarquee reviews={reviews} />
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4 sm:px-6">
        <Link href={localizePath(locale, "/reviews")} className={buttonStyles({ variant: "dark", size: "lg", className: "group" })}>
          {t.reviews.readAll}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href={writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "outline", size: "lg" })}
        >
          {t.reviews.writeOnGoogle}
        </a>
      </div>
    </section>
  );
}
