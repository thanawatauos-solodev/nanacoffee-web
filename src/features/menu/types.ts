import type { Localized } from "@/i18n/config";

export type CategoryId = "thai" | "vietnamese" | "western" | "coffee" | "tea" | "dessert";

export type MenuCategory = {
  id: CategoryId;
  name: Localized;
  blurb: Localized;
  /** Tint used behind the plate illustration of items in this category. */
  tint: string;
};

/** Labels ("ร้อน" / "Hot") come from the dictionary, keyed by id. */
export type Variant = {
  id: "hot" | "iced" | "frappe";
  price: number;
};

export type MenuTag = "signature" | "bestseller" | "new";

type BaseMenuItem = {
  id: string;
  categoryId: CategoryId;
  name: Localized;
  description: Localized;
  emoji: string;
  /** Optional photo under /public, e.g. "/menu/yum-pla-duk-fu.jpg". Replaces the emoji plate. */
  image?: string;
  tags?: MenuTag[];
  spicy?: 1 | 2 | 3;
  /** Other names customers use ("สเต๊กหมู"), for menu search and spotting the dish in reviews. */
  aliases?: string[];
};

/** An item has either one fixed price or a set of variants (hot / iced / frappe), never both. */
export type MenuItem = BaseMenuItem &
  ({ price: number; variants?: never } | { price?: never; variants: readonly [Variant, ...Variant[]] });
