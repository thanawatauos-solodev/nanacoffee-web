import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { localizePath } from "@/i18n/paths";
import { getDictionary, getLocale } from "@/i18n/server";

export default async function NotFound() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <div className="plate size-40 text-7xl" aria-hidden>
        <span className="animate-float">🍽️</span>
      </div>
      <p className="mt-8 font-script text-3xl text-caramel">{t.notFound.eyebrow}</p>
      <h1 className="mt-1 text-3xl font-semibold text-espresso">{t.notFound.title}</h1>
      <p className="mt-2 text-mocha">{t.notFound.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={localizePath(locale, "/")} className={buttonStyles({ size: "lg" })}>
          {t.notFound.home}
        </Link>
        <Link href={localizePath(locale, "/menu")} className={buttonStyles({ variant: "outline", size: "lg" })}>
          {t.notFound.menu}
        </Link>
      </div>
    </div>
  );
}
