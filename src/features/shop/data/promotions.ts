import type { Localized } from "@/i18n/config";

/** Home page banner content. These are sample promotions: replace with the store's real ones. */

export type Promotion = {
  id: string;
  /** Script-font kicker; English reads well in both languages. */
  eyebrow: string;
  title: Localized;
  detail: Localized;
  /** Big typographic highlight on the banner, e.g. "-20%". */
  highlight: Localized;
  emoji: readonly [string, string, string];
  /** Locale-free path. */
  href: "/menu" | `/menu#${string}`;
  cta: Localized;
  tone: "espresso" | "leaf" | "caramel";
};

export const promotions: readonly Promotion[] = [
  {
    id: "happy-hour",
    eyebrow: "Happy Hour",
    title: { th: "กาแฟเย็นทุกแก้ว ลด 20%", en: "20% off every iced coffee" },
    detail: {
      th: "ทุกวัน 14:00 – 16:00 น. ทานที่ร้านหรือสั่งกลับบ้านก็ได้",
      en: "Every day 14:00 – 16:00, dine in or take away.",
    },
    highlight: { th: "-20%", en: "-20%" },
    emoji: ["🧋", "☕", "🧊"],
    href: "/menu#coffee",
    cta: { th: "ดูเมนูกาแฟ", en: "See coffee menu" },
    tone: "espresso",
  },
  {
    id: "afternoon-set",
    eyebrow: "Afternoon Set",
    title: { th: "เค้กไอศกรีม + กาแฟร้อน", en: "Ice cream cake + hot coffee" },
    detail: {
      th: "เซ็ตบ่ายสบายๆ คู่หูที่ลงตัวที่สุดของนานาคอฟฟี่",
      en: "Our favourite afternoon pairing at NaNa Coffee.",
    },
    highlight: { th: "฿129", en: "฿129" },
    emoji: ["🍰", "☕", "🍓"],
    href: "/menu#dessert",
    cta: { th: "ดูเมนูของหวาน", en: "See desserts" },
    tone: "leaf",
  },
  {
    id: "group-treat",
    eyebrow: "Group Treat",
    title: { th: "มากันเป็นแก๊ง รับของหวานฟรี", en: "Come as a group, dessert's on us" },
    detail: {
      th: "มา 6 ท่านขึ้นไป รับฟรีของหวาน 1 จาน นั่งห้องแอร์ฉลองกันได้ยาวๆ",
      en: "Groups of 6 or more get a free dessert. Settle into the air-con room and celebrate.",
    },
    highlight: { th: "ฟรี!", en: "Free!" },
    emoji: ["❄️", "🍨", "🎉"],
    href: "/menu#dessert",
    cta: { th: "ดูเมนูของหวาน", en: "See desserts" },
    tone: "caramel",
  },
];
