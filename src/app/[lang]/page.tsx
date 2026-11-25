import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { SignatureMenu } from "@/features/menu/components/signature-menu";
import { ReviewsSection } from "@/features/reviews/components/reviews-section";
import { Amenities } from "@/features/shop/components/amenities";
import { Hero } from "@/features/shop/components/hero";
import { PromoCarousel } from "@/features/shop/components/promo-carousel";
import { Story } from "@/features/shop/components/story";
import { TasteRibbon } from "@/features/shop/components/taste-ribbon";
import { VisitInfo } from "@/features/shop/components/visit-info";
import { getDictionary, getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, title: t.site.title, description: t.site.description, path: "/", absoluteTitle: true });
}

export default async function HomePage() {
  const t = await getDictionary();
  return (
    <>
      <Hero />
      {/* Clip the tilted ribbon so it never widens the page. */}
      <div className="overflow-hidden py-8">
        <TasteRibbon />
      </div>
      <div className="space-y-24 pt-16 sm:space-y-32 sm:pt-20">
        <Story />
        <SignatureMenu />
        <section aria-labelledby="promo-title" className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading id="promo-title" eyebrow={t.promotions.eyebrow} title={t.promotions.title} />
          <div className="mt-6">
            <PromoCarousel />
          </div>
        </section>
        <Amenities />
        <ReviewsSection />
        <VisitInfo />
      </div>
    </>
  );
}
