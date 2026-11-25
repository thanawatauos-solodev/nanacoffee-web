"use client";

import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { fill } from "@/i18n/format";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/cn";
import { getItemsByCategory } from "../catalog";
import { categories } from "../data/menu";
import type { CategoryId, MenuItem } from "../types";
import { MenuItemCard } from "./menu-item-card";

// Search both languages, so "latte" and "ลาเต้" find the same drink on either page.
function matches(item: MenuItem, query: string): boolean {
  if (!query) return true;
  const haystack = `${item.name.th} ${item.name.en} ${item.description.th} ${item.description.en}`.toLowerCase();
  return haystack.includes(query);
}

/** Full menu with a sticky category bar that follows scrolling, plus instant search. */
export function MenuBrowser() {
  const { locale, t } = useI18n();
  const otherLocale = locale === "th" ? "en" : "th";
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const [active, setActive] = useState<CategoryId>(categories[0].id);
  const chipBarRef = useRef<HTMLElement>(null);
  const lockScrollSpyUntil = useRef(0);

  const sections = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          items: getItemsByCategory(category.id).filter((item) => matches(item, deferredQuery)),
        }))
        .filter((section) => section.items.length > 0),
    [deferredQuery],
  );

  // Scroll-spy: highlight the category whose section sits under the sticky bar.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (performance.now() < lockScrollSpyUntil.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id as CategoryId);
      },
      { rootMargin: "-150px 0px -55% 0px" },
    );
    for (const { category } of sections) {
      const el = document.getElementById(category.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  // Keep the active chip centred in the horizontally scrolling bar.
  useEffect(() => {
    const bar = chipBarRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-category="${active}"]`);
    if (!bar || !chip) return;
    bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  function jumpTo(id: CategoryId, clickedAt: number) {
    setActive(id);
    // Ignore scroll-spy while the smooth scroll passes over other sections.
    lockScrollSpyUntil.current = clickedAt + 900;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mocha/60" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.menu.searchPlaceholder}
          aria-label={t.menu.searchLabel}
          className="h-13 w-full rounded-full border border-roast/10 bg-foam pl-11 pr-12 text-[15px] shadow-soft placeholder:text-mocha/55 focus:border-leaf focus:outline-none focus:ring-4 focus:ring-leaf/15 [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={t.menu.clearSearch}
            className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-mocha hover:bg-oat"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      <div className="sticky top-16 z-20 -mx-4 mt-6 bg-cream/88 py-3 backdrop-blur-xl sm:-mx-6 md:top-20">
        <nav ref={chipBarRef} className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:px-6" aria-label={t.menu.categoriesLabel}>
          {categories.map((category) => {
            const available = sections.some((s) => s.category.id === category.id);
            const isActive = active === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-current={isActive ? "true" : undefined}
                data-category={category.id}
                disabled={!available}
                onClick={(event) => jumpTo(category.id, event.timeStamp)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors disabled:opacity-35",
                  isActive ? "text-cream ring-transparent" : "bg-foam text-roast ring-roast/10 hover:ring-roast/25",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="menu-category-pill"
                    className="absolute inset-0 rounded-full bg-espresso"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{category.name[locale]}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {sections.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            <p className="text-5xl" aria-hidden>
              🍃
            </p>
            <p className="mt-4 font-display text-xl text-espresso">{fill(t.menu.noResults, { query })}</p>
            <button type="button" onClick={() => setQuery("")} className="mt-3 text-sm font-medium text-leaf underline-offset-4 hover:underline">
              {t.menu.showAll}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="space-y-14 pt-6">
        {sections.map(({ category, items }) => (
          <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-36 md:scroll-mt-40">
            <header className="mb-5 flex items-end justify-between gap-4 border-b border-roast/10 pb-3">
              <div>
                <p lang={otherLocale} className="font-script text-xl leading-none text-caramel">
                  {category.name[otherLocale]}
                </p>
                <h2 id={`${category.id}-title`} className="mt-1 text-2xl font-semibold text-espresso sm:text-3xl">
                  {category.name[locale]}
                </h2>
                <p className="mt-1 text-sm text-mocha">{category.blurb[locale]}</p>
              </div>
              <span className="shrink-0 rounded-full bg-oat/70 px-3 py-1 text-xs font-medium text-roast">{fill(t.menu.itemCount, { count: items.length })}
              </span>
            </header>
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.55, delay: (index % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MenuItemCard item={item} />
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
