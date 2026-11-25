import { Languages } from "lucide-react";
import Link from "next/link";
import { getMenuItem, dishNames } from "@/features/menu/catalog";
import type { MenuItem } from "@/features/menu/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/th";
import { fill } from "@/i18n/format";
import { localizePath } from "@/i18n/paths";
import { cn } from "@/lib/cn";
import { formatDateKey } from "@/lib/time";
import { reviewSources, type Review } from "../types";
import { StarRating } from "./star-rating";

const avatarTints = ["bg-sage-soft text-leaf-deep", "bg-honey/40 text-caramel-deep", "bg-oat text-roast", "bg-chili/12 text-chili"];

// Thai leading vowels (เ แ โ ใ ไ) are written before the consonant, so keep both for the avatar letter.
function initialOf(name: string): string {
  const chars = Array.from(name);
  return /[เแโใไ]/.test(chars[0] ?? "") ? chars.slice(0, 2).join("") : (chars[0] ?? "?");
}

function tintFor(id: string): string {
  let hash = 0;
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return avatarTints[hash % avatarTints.length];
}

type ReviewCardProps = {
  review: Review;
  locale: Locale;
  /** Passed in (rather than read from context) so the card renders in Server and Client Components alike. */
  t: Dictionary["reviews"];
  className?: string;
};

export function ReviewCard({ review, locale, t, className }: ReviewCardProps) {
  const dishes = (review.dishIds ?? []).map(getMenuItem).filter((item): item is MenuItem => item !== undefined);
  const translation = review.language === locale ? undefined : review.translations?.[locale];

  return (
    <figure
      className={cn(
        "relative flex h-full flex-col rounded-[26px] bg-foam p-5 shadow-soft ring-1 ring-roast/6 sm:p-6",
        className,
      )}
    >
      <span aria-hidden className="pointer-events-none absolute right-5 top-1 font-display text-7xl leading-none text-oat">
        ”
      </span>
      <StarRating value={review.rating} label={fill(t.starsLabel, { value: review.rating })} />
      <blockquote lang={translation ? locale : review.language} className="relative mt-3 text-[15px] leading-relaxed text-roast">
        <p>{translation ?? review.text}</p>
      </blockquote>
      {translation ? (
        <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-mocha/70">
          <Languages size={12} aria-hidden />
          {t.translated}
        </p>
      ) : null}

      {dishes.length ? (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.dishesMentioned}>
          {dishes.map((dish) => (
            <li key={dish.id}>
              <Link
                href={localizePath(locale, `/menu#${dish.categoryId}`)}
                className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-roast ring-1 ring-roast/8 transition-colors hover:bg-oat"
              >
                <span aria-hidden>{dish.emoji}</span>
                {dishNames(dish, locale).name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <figcaption className="mt-auto flex items-center gap-3 pt-5">
        <span
          aria-hidden
          className={cn("grid size-10 shrink-0 place-items-center rounded-full font-display text-lg font-semibold", tintFor(review.id))}
        >
          {initialOf(review.author)}
        </span>
        <span className="min-w-0">
          <span lang={review.language} className="block font-semibold text-espresso">
            {review.author}
          </span>
          <span className="block text-xs text-mocha">
            <time dateTime={review.date}>{formatDateKey(review.date, locale)}</time> ·{" "}
            {fill(t.via, { source: reviewSources[review.source] })}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
