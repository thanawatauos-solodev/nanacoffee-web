import { Armchair, CarFront, ShoppingBag, Snowflake, type LucideIcon } from "lucide-react";
import { LeafSprig } from "@/components/brand/decor";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/i18n/dictionaries/th";
import { rich } from "@/i18n/format";
import { getDictionary } from "@/i18n/server";

const amenities: ReadonlyArray<{ key: keyof Dictionary["amenities"]["items"]; icon: LucideIcon; tone: string }> = [
  { key: "airConditioned", icon: Snowflake, tone: "bg-sage-soft text-leaf-deep" },
  { key: "parking", icon: CarFront, tone: "bg-oat text-roast" },
  { key: "atmosphere", icon: Armchair, tone: "bg-honey/35 text-caramel-deep" },
  { key: "takeaway", icon: ShoppingBag, tone: "bg-chili/10 text-chili" },
];

export async function Amenities() {
  const t = await getDictionary();
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
    </section>
  );
}
