import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { menuItems } from "@/features/menu/data/menu";
import { rich } from "@/i18n/format";
import { getDictionary } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { hoursText } from "@/lib/time";

const openHours = (siteConfig.hours.close - siteConfig.hours.open) / 60;

export async function Story() {
  const t = await getDictionary();
  const { facts } = t.story;

  const tiles = [
    { value: 7, ...facts.days, tone: "bg-espresso text-cream", accent: "text-honey" },
    { value: openHours, unit: facts.hours.unit, label: hoursText(facts.hours.label), tone: "bg-foam text-espresso ring-1 ring-roast/6", accent: "text-caramel-deep" },
    { value: menuItems.length, ...facts.dishes, tone: "bg-sage-soft text-leaf-deep", accent: "text-leaf" },
    { value: 3, ...facts.cuisines, tone: "bg-honey/40 text-espresso", accent: "text-caramel-deep" },
  ];

  return (
    <section aria-labelledby="story-title" className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal>
          <p className="font-script text-2xl leading-none text-caramel">{t.story.eyebrow}</p>
          <h2 id="story-title" className="mt-3 text-[2.1rem] font-semibold leading-[1.25] tracking-tight text-espresso sm:text-5xl">
            {t.story.titleStart}
            <br />
            <span className="italic text-leaf">{t.story.titleAccent}</span> {rich(t.story.titleEnd)}
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-[15px] text-mocha sm:text-base">
            {t.story.body.map((paragraph) => (
              <p key={paragraph}>{rich(paragraph)}</p>
            ))}
          </div>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {tiles.map((tile, index) => (
            <li key={tile.unit} className={cn(index % 2 === 1 && "translate-y-6")}>
              <Reveal delay={index * 0.08} className={cn("rounded-[28px] p-5 shadow-soft sm:p-6", tile.tone)}>
                <p className="flex items-baseline gap-1.5">
                  <CountUp to={tile.value} className={cn("font-display text-5xl font-semibold leading-none sm:text-6xl", tile.accent)} />
                  <span className="font-display text-lg font-semibold">{tile.unit}</span>
                </p>
                <p className="mt-2 text-[13px] opacity-75">{tile.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
