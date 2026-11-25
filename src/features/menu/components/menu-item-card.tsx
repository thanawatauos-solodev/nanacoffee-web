"use client";

import { fill } from "@/i18n/format";
import { useI18n } from "@/i18n/client";
import { formatBaht } from "@/lib/format";
import { dishNames, formatPriceRange, getCategory } from "../catalog";
import type { MenuItem } from "../types";
import { FoodPlate } from "./food-plate";
import { MenuBadges } from "./menu-badges";

/** Menu-board row: plate, name, dotted leader and price, with every drink option priced underneath. */
export function MenuItemCard({ item }: { item: MenuItem }) {
  const { locale, t } = useI18n();
  const { name, alt } = dishNames(item, locale);

  return (
    <article className="group flex h-full gap-4 rounded-[26px] bg-foam/85 p-3.5 shadow-soft ring-1 ring-roast/6 transition-[transform,box-shadow] duration-300 ease-soft hover:-translate-y-0.5 hover:shadow-lift sm:p-4">
      <FoodPlate name={name} emoji={item.emoji} image={item.image} tint={getCategory(item.categoryId).tint} className="mt-1" />
      <div className="flex min-w-0 flex-1 flex-col">
        <MenuBadges item={item} className="mb-1" />
        <div className="flex items-end">
          <h3 className="min-w-0 font-display text-[17px] font-semibold leading-snug text-espresso">{name}</h3>
          <span aria-hidden className="dotted-leader" />
          <span className="shrink-0 font-display text-[17px] font-semibold text-caramel-deep tabular-nums">
            {formatPriceRange(item)}
          </span>
        </div>
        <p lang={locale === "th" ? "en" : "th"} className="text-xs italic text-mocha/70">
          {alt}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-mocha">{item.description[locale]}</p>
        {item.variants ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-3" aria-label={fill(t.menu.pricesLabel, { name })}>
            {item.variants.map((variant) => (
              <li key={variant.id} className="rounded-full bg-cream px-2.5 py-0.5 text-xs text-mocha ring-1 ring-roast/8">
                {t.menu.variants[variant.id]}{" "}
                <span className="font-semibold text-roast tabular-nums">{formatBaht(variant.price)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
