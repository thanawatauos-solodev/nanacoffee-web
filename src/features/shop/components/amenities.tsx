import { Armchair, ArrowRight, CarFront, Rotate3d, ShoppingBag, Snowflake, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { LeafSprig } from "@/components/brand/decor";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { tourIsLive } from "@/features/tour/data/tour";
import type { Dictionary } from "@/i18n/dictionaries/th";
import { rich } from "@/i18n/format";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";

const amenities: ReadonlyArray<{ key: keyof Dictionary["amenities"]["items"]; icon: LucideIcon; tone: string }> = [
  { key: "airConditioned", icon: Snowflake, tone: "bg-sage-soft text-leaf-deep" },
  { key: "parking", icon: CarFront, tone: "bg-oat text-roast" },
  { key: "atmosphere", icon: Armchair, tone: "bg-honey/35 text-caramel-deep" },
  { key: "takeaway", icon: ShoppingBag, tone: "bg-chili/10 text-chili" },
];

export async function Amenities() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <section aria-labelledby="place-title" className="relative mx-auto max-w-6xl px-4 sm:px-6">
      <LeafSprig className="pointer-events-none absolute -top-8 right-4 hidden h-40 rotate-[24deg] text-sage/50 md:block" />
      <SectionHeading
        id="place-title"
        eyebrow={t.amenities.eyebrow}
        title={rich(t.amenities.title)}
        description={t.amenities.description}
      />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {amenities.map(({ key, icon: Icon, tone }, index) => {
          const item = t.amenities.items[key];
          return (
            <Reveal key={key} delay={index * 0.08}>
              <div className="group h-full rounded-[26px] bg-foam/80 p-5 shadow-soft ring-1 ring-roast/6 transition-transform duration-500 ease-soft hover:-translate-y-1">
                <span className={`grid size-12 place-items-center rounded-2xl transition-transform duration-500 ease-spring group-hover:-rotate-6 group-hover:scale-110 ${tone}`}>
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold text-espresso">{item.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-mocha">{item.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
      {tourIsLive ? (
        <Reveal delay={0.32}>
          <Link
            href={localizePath(locale, "/tour")}
            className="group mt-3 flex items-center gap-4 rounded-[26px] bg-espresso p-5 text-cream shadow-lift transition-transform duration-500 ease-soft hover:-translate-y-1 sm:mt-4"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cream/10 text-honey transition-transform duration-500 ease-spring group-hover:rotate-12">
              <Rotate3d size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[17px] font-semibold text-foam">{t.tour.teaser.title}</span>
              <span className="block text-[13px] text-cream/75">{t.tour.teaser.body}</span>
            </span>
            <ArrowRight size={20} className="shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      ) : null}
    </section>
  );
}
