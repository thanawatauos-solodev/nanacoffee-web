import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary, getLocale } from "@/i18n/server";
import { faq } from "../data/faq";

/** Native <details> accordion: works without JavaScript and keeps every answer in the HTML for search engines. */
export async function FaqList({ className }: { className?: string }) {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <section aria-labelledby="faq-title" className={className}>
      <SectionHeading id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
      <div className="mt-6 space-y-3">
        {faq[locale].map((item) => (
          <details
            key={item.question}
            name="faq"
            className="group rounded-[22px] bg-foam shadow-soft ring-1 ring-roast/6 transition-shadow open:shadow-lift"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold text-espresso [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-oat text-roast transition-transform duration-300 ease-spring group-open:rotate-45 group-open:bg-espresso group-open:text-cream">
                <Plus size={16} aria-hidden />
              </span>
            </summary>
            <p className="px-5 pb-5 text-[15px] text-mocha">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
