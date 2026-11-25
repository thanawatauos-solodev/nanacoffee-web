import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Put on the <h2> so the parent section can use aria-labelledby. */
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      <p className={cn("font-script text-2xl leading-none", light ? "text-honey" : "text-caramel")}>{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          "mt-2 text-3xl font-semibold tracking-tight sm:text-4xl",
          light ? "text-foam" : "text-espresso",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-3 text-[15px] sm:text-base", light ? "text-cream/75" : "text-mocha")}>{description}</p>
      ) : null}
    </div>
  );
}
