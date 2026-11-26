import type { Locale } from "@/i18n/config";
import { formatBaht } from "@/lib/format";
import { categories, menuItems } from "./data/menu";
import type { CategoryId, MenuCategory, MenuItem } from "./types";

const itemsById = new Map(menuItems.map((item) => [item.id, item]));
const categoriesById = new Map(categories.map((category) => [category.id, category]));

export function getMenuItem(id: string): MenuItem | undefined {
  return itemsById.get(id);
}

export function getCategory(id: CategoryId): MenuCategory {
  const category = categoriesById.get(id);
  if (!category) throw new Error(`Unknown menu category: ${id}`);
  return category;
}

export function getItemsByCategory(id: CategoryId): MenuItem[] {
  return menuItems.filter((item) => item.categoryId === id);
}

export function getSignatureItems(): MenuItem[] {
  return menuItems.filter((item) => item.tags?.includes("signature"));
}

export function getPriceRange(item: MenuItem): { min: number; max: number } {
  if (!item.variants) return { min: item.price, max: item.price };
  const prices = item.variants.map((variant) => variant.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** "฿120", or "฿45–65" for drinks that come hot / iced / frappe. */
export function formatPriceRange(item: MenuItem): string {
  const { min, max } = getPriceRange(item);
  return min === max ? formatBaht(min) : `${formatBaht(min)}–${max.toLocaleString("th-TH")}`;
}

/** Cheapest and dearest dish on the whole menu, for schema.org `priceRange`. */
export function getMenuPriceRange(): { min: number; max: number } {
  const ranges = menuItems.map(getPriceRange);
  return { min: Math.min(...ranges.map((r) => r.min)), max: Math.max(...ranges.map((r) => r.max)) };
}

// Every name a dish goes by, longest first, so "มัทฉะลาเต้" is claimed before "ลาเต้" can match inside it.
const dishNameIndex = menuItems
  .flatMap((item) =>
    [item.name.th, item.name.en, ...(item.aliases ?? [])].map((name) => ({ name: name.trim().toLowerCase(), id: item.id })),
  )
  .filter(({ name }) => name.length >= 2)
  .sort((a, b) => b.name.length - a.name.length);

/**
 * Ids of the dishes a piece of text mentions by name, in the order they first appear.
 * Lets a review link to the dishes it talks about without anyone tagging them.
 */
export function findMentionedDishes(text: string): string[] {
  let remaining = text.toLowerCase();
  const found = new Map<string, number>();
  for (const { name, id } of dishNameIndex) {
    const at = remaining.indexOf(name);
    if (at === -1) continue;
    if (!found.has(id) || at < found.get(id)!) found.set(id, at);
    // Blank out every match so shorter names can't match inside it.
    remaining = remaining.replaceAll(name, "\u0000".repeat(name.length));
  }
  return [...found].sort((a, b) => a[1] - b[1]).map(([id]) => id);
}

/** The dish name in the reader's language, plus the other language as a subtitle. */
export function dishNames(item: MenuItem, locale: Locale): { name: string; alt: string } {
  return locale === "th" ? { name: item.name.th, alt: item.name.en } : { name: item.name.en, alt: item.name.th };
}
