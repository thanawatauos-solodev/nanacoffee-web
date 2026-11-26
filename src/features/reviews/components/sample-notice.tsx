import { Notice } from "@/components/ui/notice";
import { getDictionary } from "@/i18n/server";
import { reviewsAreSamples } from "../data/reviews";

/** Visible until real reviews replace the samples (see data/reviews.ts). */
export async function SampleNotice({ className }: { className?: string }) {
  if (!reviewsAreSamples) return null;
  const t = await getDictionary();
  return <Notice className={className}>{t.reviews.sampleNotice}</Notice>;
}
