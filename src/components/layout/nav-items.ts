import { House, MapPinned, MessageSquareHeart, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/th";

export type NavItem = {
  /** Locale-free path; wrap with localizePath() before linking. */
  href: "/" | "/menu" | "/reviews" | "/contact";
  key: "home" | "menu" | "reviews" | "contact";
  icon: LucideIcon;
};

export const navItems: readonly NavItem[] = [
  { href: "/", key: "home", icon: House },
  { href: "/menu", key: "menu", icon: UtensilsCrossed },
  { href: "/reviews", key: "reviews", icon: MessageSquareHeart },
  { href: "/contact", key: "contact", icon: MapPinned },
];

export function navLabel(t: Dictionary, item: NavItem, short = false): string {
  return short && item.key === "contact" ? t.nav.contactShort : t.nav[item.key];
}

/** `path` is the locale-free path (see splitLocale). */
export function isActivePath(path: string, href: NavItem["href"]): boolean {
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}
