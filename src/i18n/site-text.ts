import stored from "@content/site-text.json";
import { fromContent, inLocale, type StoredLocalized } from "@/lib/content";
import type { Locale } from "./config";

/**
 * Page copy the shop edits in the admin (/keystatic → ข้อความบนเว็บ), saved to content/site-text.json.
 * The dictionaries (th.ts, en.ts) pull these strings in; everything else there (buttons, labels,
 * accessibility text) stays in code.
 */

type L = StoredLocalized;
type TitleBody = { title?: L; body?: L };

type StoredSiteText = {
  site?: { title?: L; description?: L; tagline?: L };
  hero?: { intro?: L };
  ribbon?: L[];
  story?: { titleStart?: L; titleAccent?: L; titleEnd?: L; body?: L[] };
  signature?: { title?: L; description?: L };
  amenities?: {
    title?: L;
    description?: L;
    items?: { airConditioned?: TitleBody; parking?: TitleBody; atmosphere?: TitleBody; takeaway?: TitleBody };
  };
  menu?: { intro?: L; takeaway?: TitleBody };
  reviews?: { sectionTitle?: L; sectionDescription?: L; pageIntro?: L; thanks?: TitleBody };
  tour?: { intro?: L };
  footer?: { blurb?: L };
};

const text = fromContent<StoredSiteText>(stored);

export function siteText(locale: Locale) {
  const pick = (value: L | undefined) => inLocale(value, locale);
  const titleBody = (value: TitleBody | undefined) => ({ title: pick(value?.title), body: pick(value?.body) });
  const list = (values: L[] | undefined) => (values ?? []).map(pick).filter(Boolean);

  return {
    site: { title: pick(text.site?.title), description: pick(text.site?.description), tagline: pick(text.site?.tagline) },
    hero: { intro: pick(text.hero?.intro) },
    ribbon: list(text.ribbon),
    story: {
      titleStart: pick(text.story?.titleStart),
      titleAccent: pick(text.story?.titleAccent),
      titleEnd: pick(text.story?.titleEnd),
      body: list(text.story?.body),
    },
    signature: { title: pick(text.signature?.title), description: pick(text.signature?.description) },
    amenities: {
      title: pick(text.amenities?.title),
      description: pick(text.amenities?.description),
      items: {
        airConditioned: titleBody(text.amenities?.items?.airConditioned),
        parking: titleBody(text.amenities?.items?.parking),
        atmosphere: titleBody(text.amenities?.items?.atmosphere),
        takeaway: titleBody(text.amenities?.items?.takeaway),
      },
    },
    menu: { intro: pick(text.menu?.intro), takeaway: titleBody(text.menu?.takeaway) },
    reviews: {
      sectionTitle: pick(text.reviews?.sectionTitle),
      sectionDescription: pick(text.reviews?.sectionDescription),
      pageIntro: pick(text.reviews?.pageIntro),
      thanks: titleBody(text.reviews?.thanks),
    },
    tour: { intro: pick(text.tour?.intro) },
    footer: { blurb: pick(text.footer?.blurb) },
  };
}
