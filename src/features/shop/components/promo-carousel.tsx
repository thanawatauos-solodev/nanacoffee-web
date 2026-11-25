"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useHydrated } from "@/hooks/use-store-clock";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { localizePath } from "@/i18n/paths";
import { cn } from "@/lib/cn";
import { promotions, type Promotion } from "../data/promotions";

const AUTOPLAY_MS = 5500;

const tones: Record<Promotion["tone"], { card: string; eyebrow: string; highlight: string; cta: string }> = {
  espresso: {
    card: "bg-espresso text-cream",
    eyebrow: "text-honey",
    highlight: "text-honey",
    cta: "bg-honey text-espresso hover:bg-foam",
  },
  leaf: {
    card: "bg-leaf-deep text-foam",
    eyebrow: "text-sage-soft",
    highlight: "text-sage-soft",
    cta: "bg-foam text-leaf-deep hover:bg-sage-soft",
  },
  caramel: {
    card: "bg-caramel text-foam",
    eyebrow: "text-espresso/70",
    highlight: "text-espresso/85",
    cta: "bg-espresso text-cream hover:bg-roast",
  },
};

export function PromoCarousel() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const hydrated = useHydrated();
  const { locale, t } = useI18n();
  const promo = promotions[index];
  const tone = tones[promo.tone];
  // Start autoplay only after hydration so server and client markup match.
  const autoplay = hydrated && !reduceMotion;

  function go(step: number) {
    setSlide(([current]) => [(current + step + promotions.length) % promotions.length, step]);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t.promotions.regionLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative"
    >
      <div className="relative h-[300px] overflow-hidden rounded-[32px] shadow-lift sm:h-[280px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.article
            key={promo.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.4 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-35%" : "35%", opacity: 0, scale: 0.96 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            aria-roledescription="slide"
            aria-label={fill(t.promotions.slideLabel, { index: index + 1, total: promotions.length, title: promo.title[locale] })}
            className={cn("absolute inset-0 flex cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing", tone.card)}
          >
            <div className="relative z-10 flex flex-1 flex-col justify-center p-7 sm:p-10">
              <p className={cn("font-script text-2xl leading-none", tone.eyebrow)}>{promo.eyebrow}</p>
              <h3 className="mt-2 text-[1.7rem] font-semibold leading-tight sm:text-4xl">{promo.title[locale]}</h3>
              <p className="mt-2 max-w-sm text-sm opacity-80 sm:text-[15px]">{promo.detail[locale]}</p>
              <Link
                href={localizePath(locale, promo.href)}
                draggable={false}
                className={cn(
                  "group mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                  tone.cta,
                )}
              >
                {promo.cta[locale]}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Typographic highlight + emoji cluster */}
            <div aria-hidden className="pointer-events-none absolute right-0 bottom-0 top-0 flex w-[48%] items-center justify-center sm:relative sm:right-0 sm:w-[40%]">
              <span
                className={cn(
                  "absolute right-4 top-4 font-display text-[4.5rem] font-bold italic leading-none opacity-25 sm:static sm:text-[7.5rem] sm:opacity-100",
                  tone.highlight,
                )}
              >
                {promo.highlight[locale]}
              </span>
              <span className="absolute bottom-5 right-24 text-5xl drop-shadow-lg sm:bottom-6 sm:right-auto sm:left-2 sm:text-6xl">{promo.emoji[0]}</span>
              <span className="absolute bottom-16 right-8 rotate-12 text-4xl drop-shadow-lg sm:bottom-auto sm:right-8 sm:top-6">{promo.emoji[1]}</span>
              <span className="absolute bottom-4 right-6 -rotate-12 text-3xl opacity-90 sm:bottom-8 sm:right-4">{promo.emoji[2]}</span>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex flex-1 gap-2">
          {promotions.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSlide(([current]) => [i, i >= current ? 1 : -1])}
              aria-label={fill(t.promotions.goTo, { index: i + 1, title: p.title[locale] })}
              aria-current={i === index ? "true" : undefined}
              className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-roast/12"
            >
              {i < index ? <span className="absolute inset-0 bg-roast/45" /> : null}
              {i === index ? (
                <span
                  key={`${p.id}-${index}`}
                  className="absolute inset-0 origin-left bg-espresso"
                  style={
                    autoplay
                      ? {
                          animation: `progress ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                      : undefined
                  }
                  onAnimationEnd={autoplay ? () => go(1) : undefined}
                />
              ) : null}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t.promotions.previous}
            className="grid size-10 place-items-center rounded-full bg-foam text-roast shadow-soft ring-1 ring-roast/8 transition hover:bg-white active:scale-90"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t.promotions.next}
            className="grid size-10 place-items-center rounded-full bg-foam text-roast shadow-soft ring-1 ring-roast/8 transition hover:bg-white active:scale-90"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
