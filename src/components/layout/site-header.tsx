"use client";

import { Phone } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { buttonStyles } from "@/components/ui/button";
import { useI18n } from "@/i18n/client";
import { fill } from "@/i18n/format";
import { localizePath, splitLocale } from "@/i18n/paths";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { LanguageSwitcher } from "./language-switcher";
import { isActivePath, navLabel, siteNavItems } from "./nav-items";

export function SiteHeader() {
  const { locale, t } = useI18n();
  const { path } = splitLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled ? "bg-cream/85 shadow-[0_1px_0_rgb(42_26_18/0.08)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:h-20">
        <Link href={localizePath(locale, "/")} aria-label={fill(t.nav.homeAria, { name: siteConfig.name })} className="rounded-xl">
          <Logo subtitle={`${siteConfig.nameTh} · ${t.site.branchShort}`} />
        </Link>

        <nav aria-label={t.nav.mainLabel} className="hidden items-center gap-1 rounded-full bg-foam/75 p-1 ring-1 ring-roast/8 md:flex">
          {siteNavItems.map((item) => {
            const active = isActivePath(path, item.href);
            return (
              <Link
                key={item.href}
                href={localizePath(locale, item.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium transition-colors lg:px-5",
                  active ? "text-cream" : "text-roast hover:text-espresso",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="desktop-nav-pill"
                    className="absolute inset-0 rounded-full bg-espresso"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative lg:hidden">{navLabel(t, item, true)}</span>
                <span className="relative hidden lg:inline">{navLabel(t, item)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a href={siteConfig.phone.href} className={buttonStyles({ variant: "dark", size: "sm", className: "hidden lg:inline-flex" })}>
            <Phone size={15} />
            {siteConfig.phone.display}
          </a>
          <a
            href={siteConfig.phone.href}
            aria-label={fill(t.nav.callAria, { phone: siteConfig.phone.display })}
            className={buttonStyles({ variant: "outline", size: "icon", className: "size-10 lg:hidden" })}
          >
            <Phone size={17} />
          </a>
        </div>
      </div>
    </header>
  );
}
