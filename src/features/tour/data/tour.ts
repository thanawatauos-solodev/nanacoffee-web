import stored from "@content/tour.json";
import type { Localized } from "@/i18n/config";
import { fromContent, localized, type StoredLocalized } from "@/lib/content";

/**
 * The 360° tour, edited in the admin (/keystatic → ทัวร์ 360°) and saved to content/tour.json.
 * Each spot is one equirectangular photo (2:1) under public/tour/.
 *
 * While "ยังเป็นภาพตัวอย่าง" (isSample) is ticked the tour page carries a sample notice, stays out of
 * search engines and isn't linked from the home page, footer or sitemap: the placeholder photos
 * show another shop and must not pass for NaNa Coffee.
 */

export type TourSpot = {
  id: string;
  name: Localized;
  description: Localized;
  /** Public path of the 360° photo. */
  image: string;
};

type StoredSpot = {
  /** The Thai name plus the spot's id (`slug`), which also names its image folder. */
  nameTh?: { name?: string; slug?: string };
  nameEn?: string;
  description?: StoredLocalized;
  image?: string;
};

const data = fromContent<{ isSample?: boolean; spots?: StoredSpot[] }>(stored);

export const tourSpots: readonly TourSpot[] = (data.spots ?? []).flatMap((spot, index): TourSpot[] => {
  const name = localized({ th: spot.nameTh?.name, en: spot.nameEn });
  if (!name.th || !spot.image) {
    console.warn(`[tour] Skipped spot ${index + 1} (${name.th || "no name"}): it needs a name and a 360° photo.`);
    return [];
  }
  return [{ id: spot.nameTh?.slug || `spot-${index}`, name, description: localized(spot.description), image: spot.image }];
});

export const tourIsSample: boolean = data.isSample ?? false;

/** Linked from the rest of the site and listed for search engines only once it shows the real shop. */
export const tourIsLive: boolean = tourSpots.length > 0 && !tourIsSample;
