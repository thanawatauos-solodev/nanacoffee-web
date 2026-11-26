import stored from "@content/reviews.json";
import { findMentionedDishes } from "@/features/menu/catalog";
import { isLocale } from "@/i18n/config";
import { fromContent } from "@/lib/content";
import { reviewSources, reviewTopicIds, type Review, type ReviewSource, type ReviewTopic } from "../types";

/**
 * Customer reviews, edited in the admin (/keystatic → รีวิวลูกค้า) and saved to content/reviews.json.
 * Only add reviews copied from Google / Facebook with the customer's permission.
 *
 * While "ยังเป็นรีวิวตัวอย่าง" (isSample) is ticked, every review section shows a "sample" notice,
 * so the invented placeholder reviews can't go live unnoticed.
 */

type StoredReview = {
  author?: string;
  rating?: string;
  date?: string;
  source?: string;
  language?: string;
  text?: string;
  translation?: string;
  topics?: string[];
};

const data = fromContent<{ isSample?: boolean; items?: StoredReview[] }>(stored);

export const reviewsAreSamples: boolean = data.isSample ?? false;

function toReview(review: StoredReview, index: number): Review | null {
  const author = review.author?.trim();
  const text = review.text?.trim();
  if (!author || !text || !review.date) return null;
  const rating = Number(review.rating);
  const language = review.language && isLocale(review.language) ? review.language : "th";
  const translation = review.translation?.trim();
  return {
    id: `${review.date}-${index}`,
    author,
    rating: rating >= 1 && rating <= 5 ? (Math.round(rating) as Review["rating"]) : 5,
    date: review.date,
    source: review.source && review.source in reviewSources ? (review.source as ReviewSource) : "google",
    text,
    language,
    translations: translation ? { [language === "th" ? "en" : "th"]: translation } : undefined,
    topics: (review.topics ?? []).filter((topic): topic is ReviewTopic => reviewTopicIds.includes(topic as ReviewTopic)),
    dishIds: findMentionedDishes(`${text}\n${translation ?? ""}`),
  };
}

/** Newest first. */
export const reviews: readonly Review[] = (data.items ?? [])
  .flatMap((review, index) => toReview(review, index) ?? [])
  .sort((a, b) => b.date.localeCompare(a.date));
