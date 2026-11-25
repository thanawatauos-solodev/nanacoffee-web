"use client";

import { Phone } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { localizePath, splitLocale } from "@/i18n/paths";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { isActivePath, navItems, navLabel, type NavItem } from "./nav-items";

/** App-style bottom navigation for phones, with a raised call button in the middle. Hidden from md up. */
export function MobileTabBar() {
  const { locale, t } = useI18n();
  const { path } = splitLocale(usePathname());
  const half = Math.ceil(navItems.length / 2);

  const renderTab = (item: NavItem) => {
    const { href, icon: Icon } = item;
    const active = isActivePath(path, href);
    return (
      <li key={href}>
        <Link
          href={localizePath(locale, href)}
          aria-current={active ? "page" : undefined}
          className="relative flex h-14 flex-col items-center justify-center gap-0.5 rounded-[20px] text-[11px] font-medium"
        >
          {active ? (
            <motion.span
              layoutId="mobile-tab-pill"
              className="absolute inset-0 rounded-[20px] bg-cream/12"
              transition={{ type: "spring", stiffness: 460, damping: 36 }}
            />
          ) : null}
          <Icon size={21} strokeWidth={active ? 2.3 : 1.8} className={cn("relative transition-colors", active ? "text-honey" : "text-cream/70")} />
          <span className={cn("relative transition-colors", active ? "text-cream" : "text-cream/60")}>{navLabel(t, item, true)}</span>
        </Link>
      </li>
    );
  };

  return (
    <nav
      aria-label={t.nav.mainLabel}
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 items-center rounded-[26px] bg-espresso/95 p-1.5 text-cream shadow-lift ring-1 ring-white/5 backdrop-blur-xl">
        {navItems.slice(0, half).map(renderTab)}
        <li className="flex justify-center">
          <a
            href={siteConfig.phone.href}
            aria-label={fill(t.nav.callAria, { phone: siteConfig.phone.display })}
            className="relative -mt-7 grid size-15 place-items-center rounded-full bg-leaf text-foam shadow-[0_12px_24px_-10px_rgb(51_73_46/0.9)] ring-4 ring-cream transition-transform active:scale-90"
          >
            <span className="absolute size-15 animate-pulse-ring rounded-full" aria-hidden />
            <Phone size={24} strokeWidth={2.2} />
          </a>
        </li>
        {navItems.slice(half).map(renderTab)}
      </ul>
    </nav>
  );
}
