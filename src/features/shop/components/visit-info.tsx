import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { fill } from "@/i18n/format";
import { getDictionary, getLocale } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { hoursText } from "@/lib/time";
import { CallButton, DirectionsButton, LineButton } from "./contact-buttons";
import { OpenStatusBadge } from "./open-status-badge";

/** Address, phone and map. Pass `showHeading={false}` where the page title already introduces it. */
export async function VisitInfo({ showHeading = true }: { showHeading?: boolean }) {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const address = siteConfig.address[locale];
  return (
    <section
      id="visit"
      aria-labelledby={showHeading ? "visit-title" : undefined}
      aria-label={showHeading ? undefined : t.visit.regionLabel}
      className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-6"
    >
      {showHeading ? <SectionHeading id="visit-title" eyebrow={t.visit.eyebrow} title={t.visit.title} /> : null}
      <div className={cn("grid gap-5 lg:grid-cols-[1fr_1.25fr]", showHeading && "mt-8")}>
        <Reveal>
          <div className="flex h-full flex-col rounded-[30px] bg-foam p-6 shadow-soft ring-1 ring-roast/6 sm:p-8">
            <dl className="space-y-6">
              <div className="flex gap-4">
                <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sage-soft text-leaf-deep">
                  <Clock size={20} />
                  <span className="sr-only">{t.visit.hours}</span>
                </dt>
                <dd>
                  <p className="font-display text-lg font-semibold text-espresso">{hoursText(t.site.hours)}</p>
                  <OpenStatusBadge className="mt-2 shadow-none" />
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-oat text-roast">
                  <MapPin size={20} />
                  <span className="sr-only">{t.visit.address}</span>
                </dt>
                <dd>
                  <address className="not-italic">
                    <span className="block font-display text-lg font-semibold text-espresso">{address.street}</span>
                    <span className="block text-sm text-mocha">
                      {address.locality} {siteConfig.address.postalCode}
                    </span>
                  </address>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="grid size-11 shrink-0 place-items-center rounded-2xl bg-honey/35 text-caramel-deep">
                  <Phone size={20} />
                  <span className="sr-only">{t.visit.phone}</span>
                </dt>
                <dd>
                  <a href={siteConfig.phone.href} className="font-display text-lg font-semibold text-espresso hover:text-leaf">
                    {siteConfig.phone.display}
                  </a>
                  <p className="text-sm text-mocha">{t.visit.phoneNote}</p>
                </dd>
              </div>
            </dl>
            <div className="mt-8 grid gap-3 pt-2 sm:grid-cols-2 lg:mt-auto">
              <CallButton>{t.visit.callNow}</CallButton>
              <DirectionsButton />
              <LineButton className="sm:col-span-2" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative h-full min-h-[320px] overflow-hidden rounded-[30px] bg-oat shadow-soft ring-1 ring-roast/6">
            <iframe
              title={fill(t.visit.mapTitle, { name: siteConfig.name, branch: t.site.branch })}
              src={siteConfig.maps.embedUrl[locale]}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 saturate-[0.85] sepia-[0.15]"
            />
            <a
              href={siteConfig.maps.searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "cream", size: "sm", className: "absolute bottom-4 right-4 shadow-soft" })}
            >
              {t.visit.openInMaps}
              <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
