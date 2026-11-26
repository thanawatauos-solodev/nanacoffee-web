import { House, MapPinned, MessageSquareHeart, Rotate3d, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { tourIsLive } from "@/features/tour/data/tour";
import type { Dictionary } from "@/i18n/dictionaries/th";

export type NavItem = {
  /** Locale-free path; wrap with localizePath() before linking. */
  href: "/" | "/menu" | "/reviews" | "/contact" | "/tour";
  key: "home" | "menu" | "reviews" | "contact" | "tour";
  icon: LucideIcon;
};

/** The mobile tab bar's four, laid out two on each side of its call button. */
export const navItems: readonly NavItem[] = [
  { href: "/", key: "home", icon: House },
  { href: "/menu", key: "menu", icon: UtensilsCrossed },
  { href: "/reviews", key: "reviews", icon: MessageSquareHeart },
  { href: "/contact", key: "contact", icon: MapPinned },
];

/**
 * Header and footer links: the same four plus the 360° tour, once it shows the real shop
 * (see features/tour/data/tour.ts). On phones the tour is reached from the home page card.
 */
export const siteNavItems: readonly NavItem[] = tourIsLive
  ? [...navItems.slice(0, 3), { href: "/tour", key: "tour", icon: Rotate3d }, ...navItems.slice(3)]
  : navItems;

export function navLabel(t: Dictionary, item: NavItem, short = false): string {
  if (short && item.key === "contact") return t.nav.contactShort;
  if (short && item.key === "tour") return t.nav.tourShort;
  return t.nav[item.key];
}

/** `path` is the locale-free path (see splitLocale). */
export function isActivePath(path: string, href: NavItem["href"]): boolean {
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}
