import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";
import { dishNames, formatPriceRange, getCategory, getSignatureItems } from "../catalog";
import { FoodPlate } from "./food-plate";

export async function SignatureMenu() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const items = getSignatureItems();
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="signature-title" className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          id="signature-title"
          eyebrow={t.signature.eyebrow}
          title={t.signature.title}
          description={t.signature.description}
        />
        <Link href={localizePath(locale, "/menu")} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-leaf">
          {t.signature.seeAll}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <ul className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
        {items.map((item, index) => {
          const category = getCategory(item.categoryId);
          const { name, alt } = dishNames(item, locale);
          return (
            <li key={item.id} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <Link
                  href={localizePath(locale, `/menu#${item.categoryId}`)}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[30px] bg-foam p-5 shadow-soft ring-1 ring-roast/6 transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-lift"
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-28 opacity-80"
                    style={{ background: `linear-gradient(180deg, ${category.tint}, transparent)` }}
                  />
                  <div className="relative flex items-start justify-between">
                    <FoodPlate name={name} emoji={item.emoji} image={item.image} tint={category.tint} size="lg" />
                    <span className="rounded-full bg-foam/90 px-2.5 py-1 text-[11px] font-semibold text-roast ring-1 ring-roast/8">
                      {category.name[locale]}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-xl font-semibold text-espresso">{name}</h3>
                  <p lang={locale === "th" ? "en" : "th"} className="relative text-xs italic text-mocha/70">
                    {alt}
                  </p>
                  <p className="relative mt-2 line-clamp-2 text-sm text-mocha">{item.description[locale]}</p>
                  <div className="relative mt-auto flex items-center justify-between pt-5">
                    <p className="font-display text-2xl font-semibold text-caramel-deep">{formatPriceRange(item)}</p>
                    <span className="grid size-10 place-items-center rounded-full bg-espresso text-cream transition-colors group-hover:bg-leaf">
                      <ArrowRight size={17} className="transition-transform group-hover:-rotate-45" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
