import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-leaf text-foam shadow-[0_10px_24px_-12px_rgb(51_73_46/0.8)] hover:bg-leaf-deep hover:shadow-[0_14px_28px_-12px_rgb(51_73_46/0.9)]",
  dark: "bg-espresso text-cream hover:bg-roast",
  caramel: "bg-caramel text-foam hover:bg-caramel-deep",
  outline: "border border-roast/15 bg-foam/80 text-espresso hover:border-roast/35 hover:bg-foam",
  ghost: "text-roast hover:bg-roast/6",
  cream: "bg-foam text-espresso hover:bg-white",
  /** LINE brand green, for "chat on LINE" links. */
  line: "bg-[#06c755] text-white hover:bg-[#05a948]",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
  icon: "size-11",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/** Class recipe shared by <Button> and link-styled buttons (<Link className={buttonStyles()}>). */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    "inline-flex shrink-0 select-none items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap",
    "transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-soft active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
