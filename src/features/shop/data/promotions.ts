import stored from "@content/promotions.json";
import type { Localized } from "@/i18n/config";
import { fromContent, localized, type StoredLocalized } from "@/lib/content";

/** Home page banners, edited in the admin (/keystatic → โปรโมชั่น) and saved to content/promotions.json. */

export type Promotion = {
  id: string;
  /** Script-font kicker; English reads well in both languages. */
  eyebrow: string;
  title: Localized;
  detail: Localized;
  /** Big typographic highlight on the banner, e.g. "-20%". */
  highlight: Localized;
  emoji: readonly [string, string, string];
  /** Locale-free path. */
  href: "/menu" | `/menu#${string}`;
  cta: Localized;
  tone: "espresso" | "leaf" | "caramel";
};

type StoredPromotion = {
  eyebrow?: string;
  title?: StoredLocalized;
  detail?: StoredLocalized;
  highlight?: StoredLocalized;
  cta?: StoredLocalized;
  link?: string;
  tone?: string;
  emoji?: { first?: string; second?: string; third?: string };
};

const tones: readonly Promotion["tone"][] = ["espresso", "leaf", "caramel"];

const data = fromContent<{ items?: StoredPromotion[] }>(stored);

export const promotions: readonly Promotion[] = (data.items ?? []).flatMap((promo, index): Promotion[] => {
  const title = localized(promo.title);
  if (!title.th) return [];
  const link = promo.link ?? "/menu";
  return [
    {
      id: `promo-${index}`,
      eyebrow: promo.eyebrow?.trim() ?? "",
      title,
      detail: localized(promo.detail),
      highlight: localized(promo.highlight),
      cta: localized(promo.cta),
      href: link === "/menu" || link.startsWith("/menu#") ? (link as Promotion["href"]) : "/menu",
      tone: tones.includes(promo.tone as Promotion["tone"]) ? (promo.tone as Promotion["tone"]) : "espresso",
      emoji: [promo.emoji?.first ?? "", promo.emoji?.second ?? "", promo.emoji?.third ?? ""],
    },
  ];
});
