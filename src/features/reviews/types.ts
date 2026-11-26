import type { Locale } from "@/i18n/config";

/** Topic labels live in the dictionaries (reviews.topics). */
export type ReviewTopic = "coffee" | "food" | "dessert" | "atmosphere" | "service";
export const reviewTopicIds: readonly ReviewTopic[] = ["coffee", "food", "dessert", "atmosphere", "service"];

export const reviewSources = {
  google: "Google",
  facebook: "Facebook",
} as const;

export type ReviewSource = keyof typeof reviewSources;

export type Review = {
  id: string;
  /** Display name as the customer agreed to show it, e.g. first name only. */
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** `YYYY-MM-DD` */
  date: string;
  source: ReviewSource;
  /** The review exactly as the customer wrote it. */
  text: string;
  /** Language of `text`. */
  language: Locale;
  /** Optional translations, shown (and labelled as translated) on the other language's pages. */
  translations?: Partial<Record<Locale, string>>;
  topics: readonly ReviewTopic[];
  /** Menu item ids the review mentions, found from the dish names in its text; shown as links to the menu. */
  dishIds?: readonly string[];
};
