import coffee from "@content/menu/coffee.json";
import dessert from "@content/menu/dessert.json";
import tea from "@content/menu/tea.json";
import thai from "@content/menu/thai.json";
import vietnamese from "@content/menu/vietnamese.json";
import western from "@content/menu/western.json";
import { fromContent, localized, type StoredLocalized } from "@/lib/content";
import { categoryList } from "../category-list";
import type { CategoryId, MenuCategory, MenuItem, MenuTag, Variant } from "../types";

/**
 * Menu content, edited in the admin (/keystatic → เมนู): one JSON file per category under content/menu/.
 * Hot / iced / frappe labels come from the dictionaries (menu.variants).
 */

type StoredMenuItem = {
  /** The Thai name plus the item's id (`slug`), which also names its image folder. */
  nameTh?: { name?: string; slug?: string };
  nameEn?: string;
  description?: StoredLocalized;
  price?:
    | { discriminant: "single"; value?: number }
    | { discriminant: "variants"; value?: Partial<Record<Variant["id"], number>> };
  tags?: string[];
  spicy?: string;
  image?: string;
  emoji?: string;
  aliases?: string;
};

type StoredCategory = { name?: StoredLocalized; blurb?: StoredLocalized; items?: StoredMenuItem[] };

const stored = fromContent<Record<CategoryId, StoredCategory>>({ thai, vietnamese, western, coffee, tea, dessert });

const variantOrder: readonly Variant["id"][] = ["hot", "iced", "frappe"];
const knownTags: readonly MenuTag[] = ["signature", "bestseller", "new"];

function toPrice(price: StoredMenuItem["price"]): Pick<MenuItem, "price" | "variants"> | null {
  if (price?.discriminant === "variants") {
    const prices = price.value ?? {};
    const [first, ...rest] = variantOrder.flatMap((id) => (prices[id] == null ? [] : [{ id, price: prices[id] }]));
    return first ? { variants: [first, ...rest] } : null;
  }
  return price?.value == null ? null : { price: price.value };
}

function toMenuItem(item: StoredMenuItem, categoryId: CategoryId, index: number): MenuItem | null {
  const name = localized({ th: item.nameTh?.name, en: item.nameEn });
  const price = toPrice(item.price);
  if (!name.th || !price) {
    // Skip instead of failing the build, so one half-finished dish doesn't hold back other edits.
    console.warn(`[menu] Skipped ${categoryId} item ${index + 1} (${name.th || "no name"}): it needs a name and a price.`);
    return null;
  }
  const spicy = Number(item.spicy);
  const aliases = (item.aliases ?? "")
    .split(/[,،、]/)
    .map((alias) => alias.trim())
    .filter(Boolean);
  return {
    id: `${categoryId}-${item.nameTh?.slug || index}`,
    categoryId,
    name,
    description: localized(item.description),
    emoji: item.emoji?.trim() || "🍽️",
    image: item.image || undefined,
    tags: (item.tags ?? []).filter((tag): tag is MenuTag => knownTags.includes(tag as MenuTag)),
    spicy: spicy === 1 || spicy === 2 || spicy === 3 ? spicy : undefined,
    aliases,
    ...price,
  } as MenuItem;
}

export const categories: readonly MenuCategory[] = categoryList.map(({ id, adminLabel, tint }) => {
  const name = localized(stored[id].name);
  return {
    id,
    name: { th: name.th || adminLabel, en: name.en || adminLabel },
    blurb: localized(stored[id].blurb),
    tint,
  };
});

export const menuItems: readonly MenuItem[] = categoryList.flatMap(({ id }) =>
  (stored[id].items ?? []).flatMap((item, index) => toMenuItem(item, id, index) ?? []),
);
