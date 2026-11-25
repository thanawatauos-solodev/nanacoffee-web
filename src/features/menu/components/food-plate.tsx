import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  sm: { box: "size-14", emoji: "text-[1.6rem]", px: "56px" },
  md: { box: "size-[5.25rem]", emoji: "text-[2.5rem]", px: "84px" },
  lg: { box: "size-32", emoji: "text-[3.75rem]", px: "128px" },
} as const;

type FoodPlateProps = {
  name: string;
  emoji: string;
  tint: string;
  image?: string;
  size?: keyof typeof sizes;
  className?: string;
};

/**
 * Dish visual: a photo when `image` is set, otherwise the emoji served on a ceramic plate.
 * Wobbles when its parent `.group` is hovered.
 */
export function FoodPlate({ name, emoji, tint, image, size = "md", className }: FoodPlateProps) {
  const s = sizes[size];
  return (
    <div className={cn("plate shrink-0", s.box, className)} style={{ "--tint": tint } as CSSProperties}>
      {image ? (
        <Image src={image} alt={name} fill sizes={s.px} className="rounded-full object-cover p-[7%]" />
      ) : (
        <span
          aria-hidden
          className={cn(
            s.emoji,
            "leading-none drop-shadow-[0_6px_5px_rgb(42_26_18/0.28)] transition-transform duration-500 ease-spring group-hover:-rotate-12 group-hover:scale-110",
          )}
        >
          {emoji}
        </span>
      )}
    </div>
  );
}
