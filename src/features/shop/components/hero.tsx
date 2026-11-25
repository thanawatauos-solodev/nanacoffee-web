import { ArrowRight, MessageCircle, Navigation, Star } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CoffeeBean, LeafSprig, SpinningBadge } from "@/components/brand/decor";
import { buttonStyles } from "@/components/ui/button";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";
import { lineUrl, siteConfig } from "@/lib/site-config";
import { CallButton } from "./contact-buttons";
import { LatteArt } from "./latte-art";
import { OpenStatusBadge } from "./open-status-badge";

// CSS-only entrance so the hero paints with the HTML, before any JavaScript loads.
const rise = (delayMs: number): CSSProperties => ({ animationDelay: `${delayMs}ms` });

export async function Hero() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Atmosphere: warm glow + soft organic blob */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 size-[520px] rounded-full bg-honey/25 blur-3xl" />
        <div className="absolute -right-32 top-24 size-[460px] rounded-full bg-sage/25 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-6 sm:px-6 md:grid-cols-[1.05fr_1fr] md:gap-6 md:pb-24 md:pt-10">
        <div>
          <div className="animate-rise" style={rise(0)}>
            <OpenStatusBadge />
          </div>

          <p className="mt-7 animate-rise font-script text-3xl leading-none text-caramel sm:text-4xl" style={rise(80)}>
            {t.hero.welcome}
          </p>
          <h1 id="hero-title" className="mt-2 animate-rise" style={rise(160)}>
            <span className="block font-display text-[3.4rem] font-semibold italic leading-[1.05] tracking-tight text-espresso sm:text-7xl lg:text-[5.5rem]">
              {siteConfig.name}
            </span>
            <span className="mt-2 block font-display text-2xl font-medium text-roast sm:text-3xl">
              <span lang="th">{siteConfig.nameTh}</span> <span className="text-mocha/70">·</span> {t.site.branch}
            </span>
          </h1>

          <p className="mt-5 max-w-md animate-rise text-[15px] text-mocha sm:text-base" style={rise(260)}>
            {t.hero.intro}
          </p>

          <div className="mt-8 flex animate-rise flex-wrap gap-3" style={rise(360)}>
            <Link href={localizePath(locale, "/menu")} className={buttonStyles({ size: "lg", className: "group" })}>
              {t.hero.seeMenu}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <CallButton variant="outline">{t.hero.call}</CallButton>
          </div>

          <div className="mt-6 flex animate-rise flex-wrap gap-x-6 gap-y-3 text-sm" style={rise(440)}>
            <a
              href={siteConfig.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-medium text-roast"
            >
              <span className="grid size-9 place-items-center rounded-full bg-caramel/14 text-caramel-deep transition group-hover:bg-caramel group-hover:text-foam">
                <Navigation size={16} />
              </span>
              {t.hero.directions}
            </a>
            {lineUrl ? (
              <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-medium text-roast">
                <span className="grid size-9 place-items-center rounded-full bg-[#06c755]/12 text-[#05a948] transition group-hover:bg-[#06c755] group-hover:text-white">
                  <MessageCircle size={16} />
                </span>
                {t.hero.line}
              </a>
            ) : null}
            <Link href={localizePath(locale, "/reviews")} className="group inline-flex items-center gap-2 font-medium text-roast">
              <span className="grid size-9 place-items-center rounded-full bg-honey/30 text-caramel-deep transition group-hover:bg-honey group-hover:text-espresso">
                <Star size={16} />
              </span>
              {t.hero.reviews}
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px] animate-rise" style={rise(200)} aria-hidden>
          <div className="absolute inset-[6%] rounded-[58%_42%_52%_48%/48%_56%_44%_52%] bg-sage-soft" />
          <LeafSprig
            className="absolute -left-2 top-[4%] h-[42%] animate-float text-leaf"
            style={{ "--tilt": "-24deg" } as CSSProperties}
          />
          <LeafSprig
            className="absolute -right-1 bottom-[6%] h-[34%] animate-float text-sage"
            style={{ "--tilt": "150deg", animationDelay: "-3s" } as CSSProperties}
          />
          <LatteArt className="absolute inset-[9%] drop-shadow-xl" />
          <CoffeeBean className="absolute right-[12%] top-[6%] w-7 animate-float text-roast" style={{ "--tilt": "30deg" } as CSSProperties} />
          <CoffeeBean
            className="absolute left-[18%] bottom-[4%] w-6 animate-float text-mocha"
            style={{ "--tilt": "-40deg", animationDelay: "-2s" } as CSSProperties}
          />
          <CoffeeBean
            className="absolute right-[2%] top-[42%] w-5 animate-float text-roast/80"
            style={{ "--tilt": "75deg", animationDelay: "-4.5s" } as CSSProperties}
          />
          <SpinningBadge
            text="NANA COFFEE • SAWANG DAEN DIN • SAKON NAKHON • "
            className="absolute -bottom-1 left-[2%] size-28 rounded-full bg-espresso text-cream shadow-lift sm:size-32"
          />
        </div>
      </div>
    </section>
  );
}
