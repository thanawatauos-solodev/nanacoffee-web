import { Fragment, type CSSProperties } from "react";
import { getDictionary } from "@/i18n/server";

/** Tilted espresso band of what the shop offers, drifting sideways. Decorative: the same facts appear in text below. */
export async function TasteRibbon() {
  const words = (await getDictionary()).ribbon;
  return (
    <div aria-hidden className="relative -mx-2 -rotate-[1.8deg] overflow-hidden bg-espresso py-4 text-cream shadow-lift sm:py-5">
      <div className="flex w-max animate-marquee motion-reduce:animate-none" style={{ "--marquee-duration": "38s" } as CSSProperties}>
        {[0, 1].map((copy) => (
          <p key={copy} className="flex shrink-0 items-center gap-6 pr-6 font-display text-2xl italic sm:gap-8 sm:pr-8 sm:text-3xl">
            {words.map((word, i) => (
              <Fragment key={word}>
                <span className={i % 2 ? "text-honey" : "text-foam"}>{word}</span>
                <span className="text-sage not-italic">✦</span>
              </Fragment>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
