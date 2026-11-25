import { ExternalLink, PenLine } from "lucide-react";
import { LeafSprig } from "@/components/brand/decor";
import { buttonStyles } from "@/components/ui/button";
import { getDictionary } from "@/i18n/server";
import { cn } from "@/lib/cn";
import { siteConfig, writeReviewUrl } from "@/lib/site-config";

/** Asks happy customers to review on Google, which is what actually drives local search ranking. */
export async function WriteReviewCard({ className }: { className?: string }) {
  const { reviews: t } = await getDictionary();
  return (
    <div className={cn("relative overflow-hidden rounded-[30px] bg-espresso p-6 text-cream shadow-lift sm:p-7", className)}>
      <LeafSprig className="pointer-events-none absolute -bottom-8 -right-6 h-40 rotate-[200deg] text-leaf/60" />
      <p className="relative font-script text-2xl leading-none text-honey">{t.thanks.eyebrow}</p>
      <h2 className="relative mt-2 text-2xl font-semibold text-foam">{t.thanks.title}</h2>
      <p className="relative mt-2 text-sm text-cream/75">
        {t.thanks.body}
      </p>
      <div className="relative mt-5 flex flex-wrap gap-2">
        <a
          href={writeReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "cream", className: "group" })}
        >
          <PenLine size={16} />
          {t.writeOnGoogle}
          <ExternalLink size={14} className="opacity-50" aria-hidden />
        </a>
        {siteConfig.social.facebook ? (
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "ghost", className: "text-cream hover:bg-cream/10" })}
          >
            {t.writeOnFacebook}
            <ExternalLink size={14} className="opacity-50" aria-hidden />
          </a>
        ) : null}
      </div>
    </div>
  );
}
