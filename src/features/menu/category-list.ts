import type { CategoryId } from "./types";

/**
 * The menu's categories, in display order. Names, blurbs and dishes are edited in the admin
 * (/keystatic), one page per category; adding a category means adding it here and to CategoryId.
 * Plain data so keystatic.config.ts can import it in the browser.
 */
export const categoryList = [
  { id: "thai", adminLabel: "อาหารไทย", tint: "#dfe7d3" },
  { id: "vietnamese", adminLabel: "อาหารเวียดนาม", tint: "#d8e6dc" },
  { id: "western", adminLabel: "อาหารฝรั่ง", tint: "#f0dcc4" },
  { id: "coffee", adminLabel: "กาแฟ", tint: "#e9d6bf" },
  { id: "tea", adminLabel: "ชา & เครื่องดื่ม", tint: "#f2dfc0" },
  { id: "dessert", adminLabel: "ของหวาน", tint: "#f4d9d3" },
] as const satisfies readonly { id: CategoryId; adminLabel: string; tint: string }[];
