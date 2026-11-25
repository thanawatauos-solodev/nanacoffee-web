import type { Review } from "./types";

export type ReviewSummary = {
  count: number;
  /** Mean rating rounded to one decimal, 0 when there are no reviews. */
  average: number;
  distribution: { stars: 5 | 4 | 3 | 2 | 1; count: number; share: number }[];
};

export function summarizeReviews(list: readonly Review[]): ReviewSummary {
  const count = list.length;
  const total = list.reduce((sum, review) => sum + review.rating, 0);
  return {
    count,
    average: count ? Math.round((total / count) * 10) / 10 : 0,
    distribution: ([5, 4, 3, 2, 1] as const).map((stars) => {
      const n = list.filter((review) => review.rating === stars).length;
      return { stars, count: n, share: count ? n / count : 0 };
    }),
  };
}
