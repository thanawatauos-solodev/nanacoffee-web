import type { CSSProperties, ReactNode } from "react";
import { LeafSprig } from "@/components/brand/decor";

/** Title block at the top of inner pages. */
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: ReactNode }) {
  return (
    <div className="relative mx-auto max-w-2xl pb-8 pt-6 text-center md:pt-10">
      <LeafSprig
        className="pointer-events-none absolute -left-2 top-0 hidden h-28 animate-float text-sage/60 sm:block"
        style={{ "--tilt": "-30deg" } as CSSProperties}
      />
      <p className="animate-rise font-script text-3xl leading-none text-caramel">{eyebrow}</p>
      <h1 className="mt-2 animate-rise text-4xl font-semibold tracking-tight text-espresso sm:text-5xl" style={{ animationDelay: "80ms" }}>
        {title}
      </h1>
      {description ? (
        <p className="mx-auto mt-3 max-w-lg animate-rise text-[15px] text-mocha" style={{ animationDelay: "160ms" }}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
