"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { localeInfo, locales } from "@/i18n/config";
import { localizePath, splitLocale } from "@/i18n/paths";
import { cn } from "@/lib/cn";

/** TH | EN toggle that keeps the visitor on the same page in the other language. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const { path } = splitLocale(usePathname());

  return (
    <nav aria-label={t.nav.language} className={cn("flex rounded-full bg-foam/80 p-0.5 ring-1 ring-roast/10", className)}>
      {locales.map((target) => {
        const active = target === locale;
        return (
          <Link
            key={target}
            href={localizePath(target, path)}
            hrefLang={target}
            lang={target}
            aria-current={active ? "true" : undefined}
            title={localeInfo[target].label}
            className={cn(
              "relative grid h-8 min-w-9 place-items-center rounded-full px-2 text-xs font-semibold transition-colors",
              active ? "text-cream" : "text-roast hover:text-espresso",
            )}
          >
            {active ? (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 rounded-full bg-espresso"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">{localeInfo[target].short}</span>
            <span className="sr-only"> {localeInfo[target].label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
