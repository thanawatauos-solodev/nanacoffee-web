import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { LeafSprig } from "@/components/brand/decor";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";
import { siteConfig, socialProfiles } from "@/lib/site-config";
import { hoursText } from "@/lib/time";
import { navItems, navLabel } from "./nav-items";

export async function SiteFooter() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const address = siteConfig.address[locale];

  return (
    <footer className="relative mt-24 overflow-hidden bg-espresso pb-32 text-cream md:pb-0">
      <LeafSprig className="pointer-events-none absolute -right-6 -top-6 h-56 rotate-[18deg] text-leaf/40" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
        <div>
          <Logo tone="light" subtitle={`${siteConfig.nameTh} · ${t.site.branchShort}`} />
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            {t.site.tagline} · {t.footer.blurb}
          </p>
          {socialProfiles.length ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {socialProfiles.map((profile) => (
                <li key={profile.id}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold text-cream ring-1 ring-cream/20 transition-colors hover:bg-cream hover:text-espresso"
                  >
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-display text-base font-semibold text-honey">{t.footer.hours}</h2>
          <p className="flex items-center gap-2 text-cream/80">
            <Clock size={16} className="text-sage" />
            {hoursText(t.site.hours)}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <h2 className="font-display text-base font-semibold text-honey">{t.footer.contact}</h2>
          <address className="flex gap-2 not-italic text-cream/80">
            <MapPin size={16} className="mt-1 shrink-0 text-sage" />
            {address.full}
          </address>
          <a href={siteConfig.phone.href} className="flex items-center gap-2 text-cream/80 hover:text-foam">
            <Phone size={16} className="text-sage" />
            {siteConfig.phone.display}
          </a>
          <a
            href={siteConfig.maps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cream/80 hover:text-foam"
          >
            <Navigation size={16} className="text-sage" />
            {t.footer.directions}
          </a>
        </div>

        <nav aria-label={t.footer.linksLabel} className="space-y-3 text-sm">
          <h2 className="font-display text-base font-semibold text-honey">{t.footer.explore}</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={localizePath(locale, item.href)} className="text-cream/80 hover:text-foam">
                  {navLabel(t, item)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="relative border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-cream/50 sm:px-6">
          © {siteConfig.name} ({siteConfig.nameTh}) · {address.locality}
        </p>
      </div>
    </footer>
  );
}
