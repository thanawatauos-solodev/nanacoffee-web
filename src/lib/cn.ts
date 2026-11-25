import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom tokens from globals.css so that, e.g., `text-cream`
// is treated as a colour (not a font size) and `shadow-soft` overrides `shadow-lift`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "espresso",
        "roast",
        "mocha",
        "caramel",
        "caramel-deep",
        "honey",
        "cream",
        "foam",
        "oat",
        "latte",
        "leaf",
        "leaf-deep",
        "sage",
        "sage-soft",
        "chili",
      ],
      shadow: ["soft", "lift"],
      ease: ["soft", "spring"],
      animate: ["rise", "float", "spin-slow", "steam", "pulse-ring", "shimmer"],
      font: ["display", "script"],
    },
  },
});

/** Join class names; later classes win over earlier conflicting ones (`hidden` beats `inline-flex`). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
